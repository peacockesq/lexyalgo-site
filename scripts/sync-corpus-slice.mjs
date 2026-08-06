import { existsSync } from "node:fs";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const siblingWorktree = root.endsWith("-site") ? `${root.slice(0, -5)}-corpus` : "";
const defaultCorpusRoot = siblingWorktree && existsSync(siblingWorktree)
  ? siblingWorktree
  : resolve(root, "../corpus");
const corpusRoot = resolve(process.env.LEXY_CORPUS_ROOT ?? defaultCorpusRoot);
const python = process.env.LEXY_CORPUS_PYTHON ?? join(corpusRoot, ".venv", "bin", "python");
const exporterOutput = join(corpusRoot, "fixtures", "public-authorities", "v1", "export");
const publicOutput = join(root, "public", "corpus");
const dataOutput = join(root, "src", "data", "corpus", "v1");

function run(command, args, cwd) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, { cwd, stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolvePromise();
      else reject(new Error(`${command} exited with ${code}`));
    });
  });
}

await run(python, ["-m", "corpus.static_export", "--output", exporterOutput], corpusRoot);

await rm(publicOutput, { recursive: true, force: true });
await mkdir(dirname(publicOutput), { recursive: true });
await cp(exporterOutput, publicOutput, { recursive: true });

await rm(dataOutput, { recursive: true, force: true });
await mkdir(dataOutput, { recursive: true });
await cp(join(exporterOutput, "api", "v1"), dataOutput, { recursive: true });
await writeFile(join(dataOutput, "bundle.json"), await readFile(join(exporterOutput, "bundle.json")));

console.log(`Synced contract ${JSON.parse(await readFile(join(exporterOutput, "manifest.json"), "utf8")).contract_version} into ${publicOutput} and ${dataOutput}`);
