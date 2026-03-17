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

from fastapi.testclient import TestClient

from src.api import lifecycle
from src.api.schema import NetworkPolicy, NetworkRule


def test_get_sandbox_egress_success(client: TestClient, auth_headers: dict, monkeypatch):
    class StubService:
        @staticmethod
        def get_egress_policy(sandbox_id: str) -> NetworkPolicy:
            assert sandbox_id == "sandbox-1"
            return NetworkPolicy(
                defaultAction="deny",
                egress=[NetworkRule(action="allow", target="pypi.org")],
            )

    monkeypatch.setattr(lifecycle, "sandbox_service", StubService())

    response = client.get("/sandboxes/sandbox-1/egress", headers=auth_headers)
    assert response.status_code == 200
    assert response.json() == {
        "defaultAction": "deny",
        "egress": [{"action": "allow", "target": "pypi.org"}],
    }


def test_patch_sandbox_egress_success(client: TestClient, auth_headers: dict, monkeypatch):
    captured = {}

    class StubService:
        @staticmethod
        def patch_egress_rules(sandbox_id: str, rules: list[NetworkRule]) -> None:
            captured["sandbox_id"] = sandbox_id
            captured["rules"] = [r.model_dump() for r in rules]

    monkeypatch.setattr(lifecycle, "sandbox_service", StubService())

    response = client.patch(
        "/sandboxes/sandbox-2/egress",
        headers=auth_headers,
        json=[
            {"action": "allow", "target": "example.com"},
            {"action": "deny", "target": "example.com"},
        ],
    )
    assert response.status_code == 200
    assert captured == {
        "sandbox_id": "sandbox-2",
        "rules": [
            {"action": "allow", "target": "example.com"},
            {"action": "deny", "target": "example.com"},
        ],
    }
