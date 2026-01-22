// Copyright 2026 Alibaba Group Holding Ltd.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as openapiFetch from "openapi-fetch";
import type { Client } from "openapi-fetch";

type CreateClient = <Paths extends object>(config: {
  baseUrl?: string;
  headers?: Record<string, string>;
  fetch?: typeof fetch;
}) => Client<Paths>;

function resolveCreateClient(): CreateClient {
  const mod = openapiFetch as unknown as {
    default?: CreateClient;
    createClient?: CreateClient;
  };

  if (typeof mod.default === "function") {
    return mod.default;
  }

  if (typeof mod.createClient === "function") {
    return mod.createClient;
  }

  throw new TypeError("openapi-fetch createClient export not found");
}

export const createClient: CreateClient = resolveCreateClient();
