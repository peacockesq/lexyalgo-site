import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFile(join(root, path), "utf8");
const requireText = (content, expected, source) => {
  if (!content.includes(expected)) throw new Error(`${source} is missing ${JSON.stringify(expected)}`);
};

const [nginx, dockerfile, workflow, reader, search, home, types] = await Promise.all([
  read("deploy/nginx/default.conf"),
  read("Dockerfile"),
  read(".github/workflows/deploy-static-export.yml"),
  read("src/components/corpus/LiveAuthorityReader.tsx"),
  read("src/components/corpus/CorpusSearch.tsx"),
  read("src/components/corpus/CorpusHome.tsx"),
  read("src/lib/corpus/live-types.ts"),
]);

requireText(nginx, "^/corpus/(cases|statutes|constitutions)/", "nginx route configuration");
requireText(nginx, "/corpus/live-authority/index.html", "nginx route configuration");
requireText(dockerfile, "COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf", "Dockerfile");
requireText(workflow, "Install canonical LexyCorpus route configuration", "deployment workflow");
requireText(workflow, "nginx -t && nginx -s reload", "deployment workflow");
requireText(workflow, 'mv "$BACKUP" "$TARGET"', "deployment rollback");
requireText(workflow, "/corpus/cases/florida/1000-friends-of-florida-inc-v-department-of-community-affairs/824-so-2d-989/", "deployment smoke test");
requireText(reader, "/v1/paths/", "live authority reader");
requireText(reader, "window.history.replaceState", "legacy URL migration");
requireText(reader, 'link[rel="canonical"]', "canonical metadata");
requireText(search, "row.canonical_path ||", "search result routing");
requireText(home, "row.canonical_path ||", "homepage result routing");
requireText(types, "canonical_path?: string", "live API types");
requireText(types, "export type LivePathResponse", "live path API types");

console.log(JSON.stringify({
  ok: true,
  routeCollections: ["cases", "statutes", "constitutions"],
  legacySlugFallback: true,
  rollbackSafeNginxReload: true,
}, null, 2));
