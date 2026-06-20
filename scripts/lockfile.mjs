// Helper compartilhado para manifestos `<dir>/.lockfile.json` por content-hash.
//
// Um lockfile fixa o sha256 de cada arquivo de entrada/saída relevante,
// chaveado por caminho relativo ao repo. É a resposta honesta a "esta saída
// gerada está em sincronia com a fonte?" — mtime é facilmente enganado por
// `touch`, `git checkout` ou re-salvar sem editar. Os checks em
// `scripts/checks/` usam estes manifestos para detectar drift; os produtores
// (codegen) chamam `writeLockfile` para atualizá-los após uma run bem-sucedida.
//
// Forma do lockfile (estável, chaves ordenadas, newline final):
//   { "version": 1, "sources": { "<path>": "<sha256>", ... } }
// Portado de ERPVVF (scripts/lockfile.mjs).
import { createHash } from "node:crypto";
import { readFile, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

const LOCKFILE_NAME = ".lockfile.json";

export { LOCKFILE_NAME };

export async function hashFile(absolutePath) {
  const buf = await readFile(absolutePath);
  return createHash("sha256").update(buf).digest("hex");
}

export async function hashFiles(repoRoot, relativePaths) {
  const out = {};
  for (const rel of relativePaths) {
    out[rel] = await hashFile(path.join(repoRoot, rel));
  }
  return out;
}

// Erro distinto para lockfile ilegível/malformado. Callers NÃO devem
// catch-all e cair silenciosamente em mtime: um lockfile malformado é a
// mesma superfície de ameaça de um adulterado.
export class LockfileError extends Error {
  constructor(message, { path: p, cause } = {}) {
    super(message);
    this.name = "LockfileError";
    this.path = p;
    if (cause) this.cause = cause;
  }
}

// Retorna o lockfile parseado, ou `null` SÓ quando o arquivo não existe
// (ENOENT). Qualquer outra falha lança `LockfileError`.
export async function readLockfile(rootDir) {
  const lockPath = path.join(rootDir, LOCKFILE_NAME);
  let raw;
  try {
    raw = await readFile(lockPath, "utf8");
  } catch (err) {
    if (err && err.code === "ENOENT") return null;
    throw new LockfileError(`failed to read lockfile: ${err.message}`, {
      path: lockPath,
      cause: err,
    });
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new LockfileError(`lockfile is not valid JSON: ${err.message}`, {
      path: lockPath,
      cause: err,
    });
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new LockfileError(
      `lockfile root must be a JSON object (got ${Array.isArray(parsed) ? "array" : typeof parsed}).`,
      { path: lockPath },
    );
  }
  const sources = parsed.sources;
  if (sources !== undefined && (typeof sources !== "object" || sources === null || Array.isArray(sources))) {
    throw new LockfileError(`lockfile \`sources\` must be an object.`, { path: lockPath });
  }
  return { version: parsed.version ?? 1, sources: sources ?? {} };
}

// Escrita atômica: serializa num temp e renomeia por cima do alvo. Um
// `kill -9` no meio deixa o lockfile antigo ou nenhum temp — nunca um
// lockfile truncado.
export async function writeLockfile(rootDir, { sources } = {}) {
  const lockPath = path.join(rootDir, LOCKFILE_NAME);
  const tmpPath = `${lockPath}.tmp-${process.pid}-${Date.now()}`;
  const body =
    JSON.stringify({ version: 1, sources: sortMap(sources ?? {}) }, null, 2) + "\n";
  await writeFile(tmpPath, body, "utf8");
  try {
    await rename(tmpPath, lockPath);
  } catch (err) {
    try {
      await unlink(tmpPath);
    } catch {
      // já sumiu; ignora
    }
    throw err;
  }
  return lockPath;
}

function sortMap(m) {
  const out = {};
  for (const key of Object.keys(m).sort()) out[key] = m[key];
  return out;
}
