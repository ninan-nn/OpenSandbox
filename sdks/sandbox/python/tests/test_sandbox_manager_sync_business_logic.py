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

from datetime import datetime, timedelta, timezone
from uuid import uuid4

import httpx

from opensandbox.config.connection_sync import ConnectionConfigSync
from opensandbox.models.sandboxes import NetworkPolicy, NetworkRule, SandboxEndpoint
from opensandbox.sync.manager import SandboxManagerSync


class _SandboxServiceStub:
    def __init__(self) -> None:
        self.renew_calls: list[tuple[object, datetime]] = []
        self.endpoint_calls: list[tuple[object, int, bool]] = []

    def list_sandboxes(self, _filter):  # pragma: no cover
        raise RuntimeError("not used")

    def get_sandbox_info(self, _sandbox_id):  # pragma: no cover
        raise RuntimeError("not used")

    def kill_sandbox(self, _sandbox_id):  # pragma: no cover
        raise RuntimeError("not used")

    def renew_sandbox_expiration(self, sandbox_id, new_expiration_time: datetime) -> None:
        self.renew_calls.append((sandbox_id, new_expiration_time))

    def pause_sandbox(self, _sandbox_id) -> None:  # pragma: no cover
        raise RuntimeError("not used")

    def resume_sandbox(self, _sandbox_id):  # pragma: no cover
        raise RuntimeError("not used")

    def get_sandbox_endpoint(self, sandbox_id, port: int, use_server_proxy: bool = False) -> SandboxEndpoint:
        self.endpoint_calls.append((sandbox_id, port, use_server_proxy))
        return SandboxEndpoint(endpoint=f"sync-manager-egress:{port}", headers={"X-Egress": "1"})


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


def test_sync_manager_renew_uses_utc_datetime() -> None:
    svc = _SandboxServiceStub()
    mgr = SandboxManagerSync(svc, ConnectionConfigSync())

    sid = str(uuid4())
    mgr.renew_sandbox(sid, timedelta(seconds=5))

    assert len(svc.renew_calls) == 1
    _, dt = svc.renew_calls[0]
    assert dt.tzinfo is timezone.utc


def test_sync_manager_close_does_not_close_user_transport() -> None:
    class CustomTransport(httpx.BaseTransport):
        def __init__(self) -> None:
            self.closed = False

        def handle_request(self, request: httpx.Request) -> httpx.Response:  # pragma: no cover
            raise RuntimeError("not used")

        def close(self) -> None:
            self.closed = True

    t = CustomTransport()
    cfg = ConnectionConfigSync(transport=t)

    mgr = SandboxManagerSync(_SandboxServiceStub(), cfg)
    mgr.close()
    assert t.closed is False


def test_sync_manager_get_egress_policy_uses_endpoint_and_direct_egress_service(monkeypatch) -> None:
    svc = _SandboxServiceStub()
    egress_service = _EgressServiceStub()

    class _FactoryStub:
        def __init__(self, connection_config: ConnectionConfigSync) -> None:
            assert connection_config.use_server_proxy is True

        def create_egress_service(self, endpoint: SandboxEndpoint) -> _EgressServiceStub:
            assert endpoint.endpoint == "sync-manager-egress:18080"
            assert endpoint.headers == {"X-Egress": "1"}
            return egress_service

    monkeypatch.setattr("opensandbox.sync.manager.AdapterFactorySync", _FactoryStub)

    mgr = SandboxManagerSync(svc, ConnectionConfigSync(use_server_proxy=True))
    sid = str(uuid4())
    policy = mgr.get_egress_policy(sid)

    assert svc.endpoint_calls == [(sid, 18080, True)]
    assert policy.default_action == "deny"
    assert policy.egress is not None
    assert policy.egress[0].target == "pypi.org"


def test_sync_manager_patch_egress_rules_uses_endpoint_and_direct_egress_service(monkeypatch) -> None:
    svc = _SandboxServiceStub()
    egress_service = _EgressServiceStub()

    class _FactoryStub:
        def __init__(self, connection_config: ConnectionConfigSync) -> None:
            assert connection_config.use_server_proxy is False

        def create_egress_service(self, endpoint: SandboxEndpoint) -> _EgressServiceStub:
            assert endpoint.endpoint == "sync-manager-egress:18080"
            return egress_service

    monkeypatch.setattr("opensandbox.sync.manager.AdapterFactorySync", _FactoryStub)

    mgr = SandboxManagerSync(svc, ConnectionConfigSync(use_server_proxy=False))
    sid = str(uuid4())
    rules = [NetworkRule(action="deny", target="pypi.org")]

    mgr.patch_egress_rules(sid, rules)

    assert svc.endpoint_calls == [(sid, 18080, False)]
    assert egress_service.patch_calls == [rules]
