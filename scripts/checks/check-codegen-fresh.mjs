#!/usr/bin/env node
// Garante que o código gerado do OpenAPI está em sincronia com o spec.
// Compara o content-hash do `openapi.yaml` contra o `.lockfile.json`
// commitado ao lado de cada árvore gerada — mtime é enganável por `touch`,
// `git checkout` ou re-salvar sem editar.
//
// CLI standalone (o VVLEADHUB não tem o aggregator `run-all.mjs` do ERPVVF):
// roda direto via `node scripts/checks/check-codegen-fresh.mjs` e sai com
// código != 0 em drift. Plugado no `pnpm verify` (D-22 / WO-CI-001).
//
// Fast-path: enquanto não houver lockfile (bootstrap, antes do 1º codegen),
// cai numa comparação por mtime para não regredir o comportamento.
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { hashFile, LockfileError, readLockfile } from "../lockfile.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");

const SPEC = "packages/api-spec/openapi.yaml";
const GENERATED_ROOTS = [
  "packages/api-zod/src/generated",
  "packages/api-client/src/generated",
];
const FIX_HINT = "Rode `pnpm codegen:api` e commite os arquivos regenerados + lockfiles.";

const SKIP_DIR_NAMES = new Set(["node_modules", ".git", "dist", "build"]);

async function newestMtime(dir) {
  let newest = -Infinity;
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return null;
  }
  for (const e of entries) {
    if (e.isDirectory() && SKIP_DIR_NAMES.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      const sub = await newestMtime(full);
      if (sub !== null && sub > newest) newest = sub;
    } else if (e.isFile()) {
      const s = await stat(full);
      if (s.mtimeMs > newest) newest = s.mtimeMs;
    }
  }
  return newest === -Infinity ? null : newest;
}

async function pathExists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function run() {
  const violations = [];
  const specAbs = path.join(repoRoot, SPEC);

  if (!(await pathExists(specAbs))) {
    violations.push({ file: SPEC, message: `spec não encontrado.`, hint: FIX_HINT });
    return violations;
  }

  const currentSpecHash = await hashFile(specAbs);

  for (const relRoot of GENERATED_ROOTS) {
    const fullRoot = path.join(repoRoot, relRoot);
    let lock;
    try {
      lock = await readLockfile(fullRoot);
    } catch (err) {
      if (err instanceof LockfileError) {
        violations.push({
          file: `${relRoot}/.lockfile.json`,
          message: `lockfile ilegível ou malformado: ${err.message}`,
          hint: `Um lockfile malformado desliga silenciosamente o guardrail. Restaure do git ou rode \`pnpm codegen:api\`.`,
        });
        continue;
      }
      throw err;
    }

    if (lock) {
      const stored = lock.sources?.[SPEC];
      if (!stored) {
        violations.push({
          file: `${relRoot}/.lockfile.json`,
          message: `lockfile não tem a entrada \`${SPEC}\`.`,
          hint: FIX_HINT,
        });
        continue;
      }
      if (stored !== currentSpecHash) {
        violations.push({
          file: relRoot,
          message: `${SPEC} divergiu do hash fixado em ${relRoot}/.lockfile.json — codegen desatualizado.`,
          hint: FIX_HINT,
        });
      }
      continue;
    }

    // Fast-path: sem lockfile ainda (bootstrap) — compara por mtime.
    const newest = await newestMtime(fullRoot);
    if (newest === null) {
      violations.push({
        file: relRoot,
        message: `diretório gerado ausente ou vazio.`,
        hint: FIX_HINT,
      });
      continue;
    }
    const specStat = await stat(specAbs);
    if (specStat.mtimeMs > newest) {
      violations.push({
        file: relRoot,
        message: `${SPEC} é mais novo que a saída em ${relRoot} — codegen desatualizado (sem lockfile; fast-path por mtime).`,
        hint: FIX_HINT,
      });
    }
  }

  return violations;
}

const violations = await run();
if (violations.length > 0) {
  console.error("check-codegen-fresh: drift detectado\n");
  for (const v of violations) {
    console.error(`  ✗ ${v.file}\n    ${v.message}\n    → ${v.hint}\n`);
  }
  process.exit(1);
}
console.log("check-codegen-fresh: ok");
