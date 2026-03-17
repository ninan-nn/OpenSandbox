# Copyright 2026 Alibaba Group Holding Ltd.
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

from unittest.mock import MagicMock, patch

import httpx
import pytest
from fastapi import HTTPException

from src.api.schema import NetworkRule
from src.config import AppConfig, IngressConfig, RuntimeConfig, ServerConfig
from src.services.constants import SANDBOX_HTTP_PORT_LABEL, SandboxErrorCodes
from src.services.docker import DockerSandboxService


class _MockResponse:
    def __init__(self, status_code: int, payload=None, text: str = ""):
        self.status_code = status_code
        self._payload = payload
        self.text = text

    def json(self):
        return self._payload


def _app_config() -> AppConfig:
    return AppConfig(
        server=ServerConfig(),
        runtime=RuntimeConfig(type="docker", execd_image="ghcr.io/opensandbox/platform:latest"),
        ingress=IngressConfig(mode="direct"),
    )


@patch("src.services.docker.docker")
def test_get_egress_policy_requires_sidecar(mock_docker):
    sandbox_id = "sbx-1"

    mock_client = MagicMock()
    sandbox_container = MagicMock()
    sandbox_container.attrs = {
        "Config": {"Labels": {SANDBOX_HTTP_PORT_LABEL: "51080"}},
        "NetworkSettings": {"IPAddress": "172.18.0.11"},
    }

    def list_side_effect(*_, **kwargs):
        label = kwargs.get("filters", {}).get("label")
        if label == f"opensandbox.io/id={sandbox_id}":
            return [sandbox_container]
        if label == f"opensandbox.io/egress-sidecar-for={sandbox_id}":
            return []
        return []

    mock_client.containers.list.side_effect = list_side_effect
    mock_docker.from_env.return_value = mock_client

    service = DockerSandboxService(config=_app_config())

    with pytest.raises(HTTPException) as exc_info:
        service.get_egress_policy(sandbox_id)

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail["code"] == SandboxErrorCodes.EGRESS_POLICY_NOT_FOUND


@patch("src.services.docker.httpx.request")
@patch("src.services.docker.docker")
def test_patch_egress_rules_uses_sidecar_patch_semantics(mock_docker, mock_httpx_request):
    sandbox_id = "sbx-2"

    mock_client = MagicMock()
    sandbox_container = MagicMock()
    sidecar_container = MagicMock()
    sandbox_container.attrs = {
        "Config": {"Labels": {SANDBOX_HTTP_PORT_LABEL: "51081"}},
        "NetworkSettings": {"IPAddress": "172.18.0.12"},
    }

    def list_side_effect(*_, **kwargs):
        label = kwargs.get("filters", {}).get("label")
        if label == f"opensandbox.io/id={sandbox_id}":
            return [sandbox_container]
        if label == f"opensandbox.io/egress-sidecar-for={sandbox_id}":
            return [sidecar_container]
        return []

    mock_client.containers.list.side_effect = list_side_effect
    mock_docker.from_env.return_value = mock_client

    captured_patch_body = []
    seen_urls = []

    def request_side_effect(method, url, json=None, timeout=None):
        seen_urls.append(url)
        if method == "PATCH":
            captured_patch_body.extend(json or [])
            return _MockResponse(200, payload={"status": "ok"})
        raise AssertionError(f"unexpected method: {method}")

    mock_httpx_request.side_effect = request_side_effect

    service = DockerSandboxService(config=_app_config())
    service.patch_egress_rules(
        sandbox_id,
        [
            NetworkRule(action="allow", target="example.com"),
            NetworkRule(action="deny", target="EXAMPLE.com"),
            NetworkRule(action="allow", target="pypi.org"),
        ],
    )

    assert captured_patch_body == [
        {"action": "allow", "target": "example.com"},
        {"action": "deny", "target": "EXAMPLE.com"},
        {"action": "allow", "target": "pypi.org"},
    ]
    assert seen_urls == [
        "http://127.0.0.1:18080/policy",
    ]


@patch("src.services.docker.httpx.request")
@patch("src.services.docker.docker")
def test_patch_egress_rules_request_error_uses_update_failed_code(mock_docker, mock_httpx_request):
    sandbox_id = "sbx-3"

    mock_client = MagicMock()
    sandbox_container = MagicMock()
    sidecar_container = MagicMock()
    sandbox_container.attrs = {
        "Config": {"Labels": {SANDBOX_HTTP_PORT_LABEL: "51082"}},
        "NetworkSettings": {"IPAddress": "172.18.0.13"},
    }

    def list_side_effect(*_, **kwargs):
        label = kwargs.get("filters", {}).get("label")
        if label == f"opensandbox.io/id={sandbox_id}":
            return [sandbox_container]
        if label == f"opensandbox.io/egress-sidecar-for={sandbox_id}":
            return [sidecar_container]
        return []

    mock_client.containers.list.side_effect = list_side_effect
    mock_docker.from_env.return_value = mock_client
    mock_httpx_request.side_effect = httpx.RequestError("network down")

    service = DockerSandboxService(config=_app_config())
    with pytest.raises(HTTPException) as exc_info:
        service.patch_egress_rules(
            sandbox_id,
            [NetworkRule(action="allow", target="example.com")],
        )

    assert exc_info.value.status_code == 500
    assert exc_info.value.detail["code"] == SandboxErrorCodes.EGRESS_POLICY_UPDATE_FAILED
