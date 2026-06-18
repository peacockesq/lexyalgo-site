# LexyAlgo static runtime inventory — 2026-06-18

This inventory was captured read-only before rebuilding the runtime-as-code slice from stale PR #78. No deployment, DNS change, container restart, or new infrastructure was performed.

## Scope and source

- Repository: `peacockesq/lexyalgo-site`
- Current main at inventory start: `5060c378ff34555323029a45cdcda1a1290235cc`
- Stale source PR: #78, branch `deploy/hetzner-runtime`
- PR #78 status at capture: still open and untouched; its diff contains 2,292 files, including 2,272 `content/corpus/*` files. This replacement keeps only the runtime/runbook slice and excludes that corpus dump.

## Public DNS and HTTP state

Captured from the worker host on 2026-06-18 UTC:

| Host | A record observed | HTTP proof | Server header | Notes |
| --- | --- | --- | --- | --- |
| `lexyalgo.com` | `82.25.93.50` | `200` | `nginx/1.31.1` | Production is currently on the existing `srv801553`/`lexyvps` host, not the Hetzner staging host. |
| `www.lexyalgo.com` | `82.25.93.50` | `200` | `nginx/1.31.1` | Same production origin and static artifact as apex. |
| `staging.lexyalgo.com` | `37.27.49.209` | `200` | `Caddy`, `nginx/1.31.0` | Existing Hetzner host `lexy-hetzner-01`; no DNS or proxy changes made here. |

## Runtime/container state

### Production (`srv801553` / `lexyvps`, `82.25.93.50`)

- Public hosts: `lexyalgo.com`, `www.lexyalgo.com`
- Container: `lexyalgo-site`
- Image name observed: `lexyalgo-site:latest`
- Restart policy: `unless-stopped`
- Docker network: `coolify`
- Container has no mounts; it serves baked static files from `/usr/share/nginx/html`.
- Internal readiness probe: `http://127.0.0.1:3000/` returned `200 OK` from nginx.
- Public reverse proxy: `coolify-proxy` / Traefik is running on the host and terminates public 80/443.

### Staging (`lexy-hetzner-01`, `37.27.49.209`)

- Public host: `staging.lexyalgo.com`
- Container observed: `lexyalgo-site-staging`
- Image name observed: `lexyalgo-site-staging-site:plan-profile-61d1b14a`
- Restart policy: `unless-stopped`
- Docker network: `coolify`
- Container has no mounts; it serves baked static files from `/usr/share/nginx/html`.
- Internal readiness probe: `http://127.0.0.1:3000/` returned `200 OK` from nginx.
- Public response includes both Caddy and nginx headers.

### Hetzner repo/runtime drift

The Hetzner `/opt/lexyalgo-site` checkout is on stale branch `deploy/hetzner-runtime` at `8a1fd1e4d8792c89a86c6a2d0b98e9a770fd2362` and has many dirty `content/corpus/cases/*.json` files. That branch is the source of the old PR #78 bloat and should not be merged as-is.

## Runtime-as-code represented in this repository

This branch adds:

- `Dockerfile`: builds the static Next.js export with Node 22, then serves `out/` with nginx on port `3000`.
- `docker-compose.hetzner.yml`: one-service compose runtime for the existing `coolify` external Docker network, with configurable image/container names.
- `scripts/verify-static-runtime.mjs`: read-only DNS/HTTP smoke verifier for production, www, staging, and `/products/asset-divider`.
- `.dockerignore`: keeps local caches, Git data, environment files, and worker evidence out of Docker contexts.

The compose file intentionally does not declare proxy labels, new networks, volumes, databases, or secrets. It mirrors the existing static-container shape and expects the already-existing Coolify/Traefik/Caddy routing layer to point at the container on port `3000`.

## Safe verification commands

Local/non-deploying checks:

```bash
npm ci
npm run lint
npm run build
docker compose -f docker-compose.hetzner.yml config
LEXYALGO_SITE_CONTAINER=lexyalgo-site-runtime-check \
  LEXYALGO_SITE_IMAGE=lexyalgo-site:runtime-check \
  docker compose -f docker-compose.hetzner.yml build site
npm run verify:runtime
```

Do not run `docker compose up` against production/staging from a development workstation. Deployment remains controlled by the existing GitHub Actions/static export path or an explicitly approved operator runbook.

## Deployment guardrails

- No deployment is authorized by this card.
- Do not close PR #78 until the replacement PR lands and Willie explicitly approves that disposition.
- Browser QA before any deployment approval must cover desktop and mobile smoke for `/` and `/products/asset-divider` on the staged candidate.
