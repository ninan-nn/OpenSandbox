#
# Copyright 2025 Alibaba Group Holding Ltd.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
from __future__ import annotations

from datetime import timedelta
from uuid import uuid4

import pytest

from opensandbox.config.connection_sync import ConnectionConfigSync
from opensandbox.exceptions import SandboxReadyTimeoutException
from opensandbox.models.sandboxes import NetworkPolicy, NetworkRule, SandboxEndpoint
from opensandbox.sync.sandbox import SandboxSync


class _Noop:
    pass


class _SandboxServiceStub:
    def __init__(self) -> None:
        self.endpoint_calls: list[tuple[object, int, bool]] = []

    def get_sandbox_endpoint(self, sandbox_id, port: int, use_server_proxy: bool = False) -> SandboxEndpoint:
        self.endpoint_calls.append((sandbox_id, port, use_server_proxy))
        return SandboxEndpoint(endpoint=f"sync-egress:{port}", headers={"X-Egress": "1"})


class _EgressServiceStub:
    def __init__(self) -> None:
        self.patch_calls: list[list[NetworkRule]] = []

    def get_policy(self) -> NetworkPolicy:
        return NetworkPolicy(
            defaultAction="deny",
            egress=[NetworkRule(action="allow", target="pypi.org")],
        )

    def patch_rules(self, rules: list[NetworkRule]) -> None:
        self.patch_calls.append(rules)


def test_sync_check_ready_timeout_message_includes_troubleshooting_hints() -> None:
    def _always_false(_: SandboxSync) -> bool:
        return False

    sbx = SandboxSync(
        sandbox_id=str(uuid4()),
        sandbox_service=_Noop(),
        filesystem_service=_Noop(),
        command_service=_Noop(),
        health_service=_Noop(),
        metrics_service=_Noop(),
        connection_config=ConnectionConfigSync(
            domain="10.0.0.2:8080",
            use_server_proxy=False,
        ),
        custom_health_check=_always_false,
    )

    with pytest.raises(SandboxReadyTimeoutException) as exc_info:
        sbx.check_ready(timeout=timedelta(seconds=0.01), polling_interval=timedelta(seconds=0))

    message = str(exc_info.value)
    assert "ConnectionConfig(domain=10.0.0.2:8080, use_server_proxy=False)" in message
    assert "ConnectionConfigSync(use_server_proxy=True)" in message


def test_sync_get_egress_policy_uses_endpoint_and_direct_egress_service(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    svc = _SandboxServiceStub()
    egress_service = _EgressServiceStub()

    class _FactoryStub:
        def __init__(self, connection_config: ConnectionConfigSync) -> None:
            assert connection_config.use_server_proxy is True

        def create_egress_service(self, endpoint: SandboxEndpoint) -> _EgressServiceStub:
            assert endpoint.endpoint == "sync-egress:18080"
            assert endpoint.headers == {"X-Egress": "1"}
            return egress_service

    monkeypatch.setattr("opensandbox.sync.sandbox.AdapterFactorySync", _FactoryStub)

    sbx = SandboxSync(
        sandbox_id=str(uuid4()),
        sandbox_service=svc,
        filesystem_service=_Noop(),
        command_service=_Noop(),
        health_service=_Noop(),
        metrics_service=_Noop(),
        connection_config=ConnectionConfigSync(use_server_proxy=True),
    )

    policy = sbx.get_egress_policy()

    assert svc.endpoint_calls == [(sbx.id, 18080, True)]
    assert policy.default_action == "deny"
    assert policy.egress is not None
    assert policy.egress[0].target == "pypi.org"


def test_sync_patch_egress_rules_uses_endpoint_and_direct_egress_service(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    svc = _SandboxServiceStub()
    egress_service = _EgressServiceStub()

    class _FactoryStub:
        def __init__(self, connection_config: ConnectionConfigSync) -> None:
            assert connection_config.use_server_proxy is False

        def create_egress_service(self, endpoint: SandboxEndpoint) -> _EgressServiceStub:
            assert endpoint.endpoint == "sync-egress:18080"
            return egress_service

    monkeypatch.setattr("opensandbox.sync.sandbox.AdapterFactorySync", _FactoryStub)

    sbx = SandboxSync(
        sandbox_id=str(uuid4()),
        sandbox_service=svc,
        filesystem_service=_Noop(),
        command_service=_Noop(),
        health_service=_Noop(),
        metrics_service=_Noop(),
        connection_config=ConnectionConfigSync(use_server_proxy=False),
    )
    rules = [NetworkRule(action="allow", target="www.github.com")]

    sbx.patch_egress_rules(rules)

    assert svc.endpoint_calls == [(sbx.id, 18080, False)]
    assert egress_service.patch_calls == [rules]
