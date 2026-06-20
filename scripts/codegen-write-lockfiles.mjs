#!/usr/bin/env node
// Roda DEPOIS do `orval` regenerar os schemas zod / hooks. Escreve um
// `.lockfile.json` ao lado de cada árvore gerada fixando o sha256 do
// `packages/api-spec/openapi.yaml`. `check-codegen-fresh` lê esses arquivos
// para detectar drift entre o spec e a saída commitada — comparação honesta
// de conteúdo, não mtime. (D-22 / WO-CI-001)
import path from "node:path";
import { fileURLToPath } from "node:url";
import { hashFiles, writeLockfile } from "./lockfile.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "..");

const SPEC = "packages/api-spec/openapi.yaml";
const GENERATED_DIRS = [
  "packages/api-zod/src/generated",
  "packages/api-client/src/generated",
];

const sources = await hashFiles(repoRoot, [SPEC]);
for (const rel of GENERATED_DIRS) {
  const lockPath = await writeLockfile(path.join(repoRoot, rel), { sources });
  console.log(`wrote ${path.relative(repoRoot, lockPath)}`);
}
