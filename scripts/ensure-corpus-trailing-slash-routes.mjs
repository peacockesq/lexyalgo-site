import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import bundle from "../src/data/corpus/v1/bundle.json" with { type: "json" };

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "out");
const routes = ["/corpus/", "/corpus/search/", "/corpus/live-authority/", ...bundle.entries.map((entry) => entry.route)];
const repairedRoutes = [];

for (const route of routes) {
  const clean = route.replace(/^\//, "").replace(/\/$/, "");
  const source = join(out, `${clean}.html`);
  const target = join(out, clean, "index.html");
  await mkdir(dirname(target), { recursive: true });
  await copyFile(source, target);
  repairedRoutes.push(route);
}

console.log(JSON.stringify({ ok: true, repairedRoutes }, null, 2));
