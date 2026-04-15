# GitHub environment bootstrap for static deploys

Use this when wiring the `staging` and `production` GitHub environments for `.github/workflows/deploy-static-export.yml`.

## Environment names

Create or reuse exactly these two GitHub environments:

- `staging`
- `production`

## Required environment secrets

Set these secrets on **each** environment:

- `DEPLOY_HOST`
- `DEPLOY_USER`
- `DEPLOY_PATH`
- `DEPLOY_SSH_KEY`

## Optional environment secrets

- `DEPLOY_PORT` (defaults to `22`)
- `DEPLOY_KNOWN_HOSTS` (recommended, otherwise the workflow falls back to `ssh-keyscan`)
- `DEPLOY_BASE_URL` (recommended, enables post-deploy `build-meta.json` verification)

## What each value should contain

- `DEPLOY_HOST`: SSH host or IP for the Hostinger target
- `DEPLOY_USER`: SSH username
- `DEPLOY_PATH`: nginx web root for the static site on that host
- `DEPLOY_SSH_KEY`: private key allowed to write to `DEPLOY_PATH`
- `DEPLOY_PORT`: SSH port if not `22`
- `DEPLOY_KNOWN_HOSTS`: exact `known_hosts` line for the target host
- `DEPLOY_BASE_URL`: public base URL, for example `https://staging.lexyalgo.com` or `https://lexyalgo.com`

## UI checklist

For each environment:

1. Open `Settings` → `Environments`
2. Select `staging` or `production`
3. Add the required secrets above
4. Save `DEPLOY_BASE_URL` so the workflow can verify `/build-meta.json`
5. Rerun `Deploy static export`

## Verification targets

After wiring `staging`:

1. Run `Deploy static export` with `environment=staging`
2. Confirm the workflow succeeds
3. Confirm `https://staging.lexyalgo.com/build-meta.json` reports the run SHA

After wiring `production`:

1. Push or rerun against `main`
2. Confirm the workflow succeeds in the `production` environment
3. Confirm `https://lexyalgo.com/build-meta.json` reports the deployed SHA

## Quick operator note

The workflow currently reads **environment secrets**, not repository-level vars, for the deploy connection values. If the environment exists but these secret names are empty, the run will fail early with:

`Missing DEPLOY_HOST or DEPLOY_SSH_KEY for environment <name>`
