#
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
#

from __future__ import annotations

from collections.abc import Mapping
from typing import TYPE_CHECKING, Any, TypeVar

from attrs import define as _attrs_define

from ..models.access_mode import AccessMode
from ..types import UNSET, Unset

if TYPE_CHECKING:
    from ..models.host_backend import HostBackend
    from ..models.pvc_backend import PVCBackend


T = TypeVar("T", bound="Volume")


@_attrs_define
class Volume:
    """Storage mount definition for a sandbox. Each volume entry contains:
    - A unique name identifier
    - Exactly one backend struct (host, pvc, etc.) with backend-specific fields
    - Common mount settings (mountPath, accessMode, subPath)

        Attributes:
            name (str): Unique identifier for the volume within the sandbox.
                Must be a valid DNS label (lowercase alphanumeric, hyphens allowed, max 63 chars).
            mount_path (str): Absolute path inside the container where the volume is mounted.
                Must start with '/'.
            access_mode (AccessMode): Volume access mode controlling read/write permissions.
                - RW: Read-write access
                - RO: Read-only access
            host (HostBackend | Unset): Host path bind mount backend. Maps a directory on the host filesystem
                into the container. Only available when the runtime supports host mounts.

                Security note: Host paths are restricted by server-side allowlist.
                Users must specify paths under permitted prefixes.
            pvc (PVCBackend | Unset): Kubernetes PersistentVolumeClaim mount backend. References an existing
                PVC in the same namespace as the sandbox pod.

                Only available in Kubernetes runtime.
            sub_path (str | Unset): Optional subdirectory under the backend path to mount.
                Must be a relative path without '..' components.
    """

    name: str
    mount_path: str
    access_mode: AccessMode
    host: HostBackend | Unset = UNSET
    pvc: PVCBackend | Unset = UNSET
    sub_path: str | Unset = UNSET

    def to_dict(self) -> dict[str, Any]:
        name = self.name

        mount_path = self.mount_path

        access_mode = self.access_mode.value

        host: dict[str, Any] | Unset = UNSET
        if not isinstance(self.host, Unset):
            host = self.host.to_dict()

        pvc: dict[str, Any] | Unset = UNSET
        if not isinstance(self.pvc, Unset):
            pvc = self.pvc.to_dict()

        sub_path = self.sub_path

        field_dict: dict[str, Any] = {}

        field_dict.update(
            {
                "name": name,
                "mountPath": mount_path,
                "accessMode": access_mode,
            }
        )
        if host is not UNSET:
            field_dict["host"] = host
        if pvc is not UNSET:
            field_dict["pvc"] = pvc
        if sub_path is not UNSET:
            field_dict["subPath"] = sub_path

        return field_dict

    @classmethod
    def from_dict(cls: type[T], src_dict: Mapping[str, Any]) -> T:
        from ..models.host_backend import HostBackend
        from ..models.pvc_backend import PVCBackend

        d = dict(src_dict)
        name = d.pop("name")

        mount_path = d.pop("mountPath")

        access_mode = AccessMode(d.pop("accessMode"))

        _host = d.pop("host", UNSET)
        host: HostBackend | Unset
        if isinstance(_host, Unset):
            host = UNSET
        else:
            host = HostBackend.from_dict(_host)

        _pvc = d.pop("pvc", UNSET)
        pvc: PVCBackend | Unset
        if isinstance(_pvc, Unset):
            pvc = UNSET
        else:
            pvc = PVCBackend.from_dict(_pvc)

        sub_path = d.pop("subPath", UNSET)

        volume = cls(
            name=name,
            mount_path=mount_path,
            access_mode=access_mode,
            host=host,
            pvc=pvc,
            sub_path=sub_path,
        )

        return volume
