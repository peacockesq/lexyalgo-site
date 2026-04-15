# LexyAlgo site staging and release notes

This repo is a static marketing shell for LexyAlgo. Treat every release as a built artifact, not a hand-edited Hostinger upload.

## Build model

- framework: Next.js static export
- output mode: `output: 'export'`
- export artifact: `out/`
- CMS/build wrapper: TinaCMS during local build

## Commands

```bash
npm install
npm run lint
npm run build
```

Expected result:
- static files are produced in `out/`
- no server-only runtime dependency is required to render the built site

## Staging target

Current known staging surface:
- `https://staging.lexyalgo.com`

## GitHub-driven deploy path

This repo includes `.github/workflows/deploy-static-export.yml` so `main` can publish through GitHub Actions instead of drifting behind a manual Hostinger upload.

### Trigger model

- push to `main` -> build and deploy to the `production` GitHub environment
- manual dispatch -> build any ref and deploy it to `staging` or `production`

### Required GitHub environment configuration

Create GitHub environments named `staging` and `production`.

Recommended split:

Environment variables:
- `DEPLOY_HOST` - Hostinger SSH host
- `DEPLOY_PORT` - optional, defaults to `22`
- `DEPLOY_USER` - SSH user for the target account
- `DEPLOY_PATH` - remote publish directory (the confirmed docroot for that environment)
- `DEPLOY_BASE_URL` - site base URL used for post-deploy verification
- `DEPLOY_KNOWN_HOSTS` - optional pinned host key block; if omitted the workflow falls back to `ssh-keyscan`

Environment secret:
- `DEPLOY_SSH_KEY` - private key with write access to the publish directory

Compatibility note:
- the workflow accepts `DEPLOY_HOST`, `DEPLOY_PORT`, `DEPLOY_USER`, `DEPLOY_PATH`, `DEPLOY_BASE_URL`, and `DEPLOY_KNOWN_HOSTS` from either environment variables or secrets
- `DEPLOY_SSH_KEY` must remain a secret

### What the workflow proves

- `npm run lint`
- `npm run build`
- static artifact uploaded to GitHub Actions
- `out/build-meta.json` stamped with commit SHA and workflow metadata
- deployed `build-meta.json` matches the exact commit GitHub built

### First-time setup checklist

1. confirm the exact Hostinger SSH host, user, and docroot for both staging and production
2. add the environment variables and `DEPLOY_SSH_KEY` secret above in GitHub
3. run the workflow manually against `staging`
4. verify `https://staging.lexyalgo.com/build-meta.json` returns the expected SHA
5. smoke-test the staging URLs listed below
6. once staging is clean, let the `main` push path handle production deploys

## Minimum smoke checklist

After a staging or production push, verify:

1. home page loads over HTTPS
2. primary product sections render
3. nav links work without routing failures
4. blog/content pages render from the built static output
5. waitlist or contact surfaces do not throw client errors
6. `build-meta.json` reports the expected commit SHA

## Proof to keep with each release

- build command used
- commit SHA
- deployment workflow run URL
- staging or production URL checked
- whether the release is CLEAN or BLOCKED
