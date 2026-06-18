import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const target = join(process.cwd(), "node_modules", "@tinacms", "cli", "dist", "index.js");
const before = '"process.env": `new Object(${JSON.stringify(publicEnv)})`,';
const after = '"process.env": JSON.stringify(publicEnv),';

let source = readFileSync(target, "utf8");

if (source.includes(after)) {
  console.log("patch-tinacms-vite-define: already patched");
  process.exit(0);
}

if (!source.includes(before)) {
  throw new Error("patch-tinacms-vite-define: expected TinaCMS define snippet not found");
}

source = source.replace(before, after);
writeFileSync(target, source);
console.log("patch-tinacms-vite-define: patched @tinacms/cli for Vite 6 define syntax");
