# LexyAlgo deployment runbook

## Current hosting shape

Known production proof from issue tracking and live Hostinger inspection:

- `lexyalgo.com` and `staging.lexyalgo.com` are fronted by Traefik on a Hostinger-hosted server.
- Production currently routes to container `lexyalgo-site` on port `3000`.
- Staging currently routes to container `lexyalgo-site-staging` on port `3000`.
- The site is a static Next.js export.
- This repository is the source of truth for the build and now also carries the deploy workflow for Hostinger.

## Build artifact

The canonical deployable artifact is the `out/` directory produced by:

```bash
npm ci
npm run build
```

GitHub Actions publishes this directory as the `static-export` artifact in `.github/workflows/deploy-static-export.yml`.

Each deploy also stamps `out/build-meta.json`, which records the environment, Git SHA, workflow run, and build timestamp. The deploy workflow uses that file for post-deploy verification.

## GitHub Actions deployment flow

Primary deploy workflow: `.github/workflows/deploy-static-export.yml`

Related CI workflow: `.github/workflows/build-static-export.yml`

### Automatic production deploy

On every push to `main`, `Deploy static export` will:

1. resolve the deploy target to `production`
2. build the static export
3. upload the `static-export` artifact
4. stage the built artifact on Hostinger over SSH
5. promote the staged artifact either into a live container or a plain host path, depending on environment wiring
6. verify `https://lexyalgo.com/build-meta.json` matches the built SHA, if `DEPLOY_BASE_URL` is configured for the environment

### Manual deploy

You can also run `Deploy static export` manually and choose:

- `staging`
- `production`

You can also choose the ref to build and deploy.

## Required GitHub configuration

The deploy workflow accepts the non-sensitive deploy values from **GitHub environment variables or environment secrets**. `DEPLOY_SSH_KEY` must remain an environment secret.

Environment names:

- `staging`
- `production`

### Required configuration for each environment

Environment variables:
- `DEPLOY_HOST`
- `DEPLOY_USER`
- either `DEPLOY_PATH` for a plain host-path deploy, or both `DEPLOY_CONTAINER` and `DEPLOY_CONTAINER_PATH` for a container-backed deploy

Environment secret:
- `DEPLOY_SSH_KEY`

### Optional but recommended configuration for each environment

Environment variables or secrets:
- `DEPLOY_PORT` (defaults to `22`)
- `DEPLOY_KNOWN_HOSTS`
- `DEPLOY_BASE_URL`

See [`docs/github-environment-bootstrap.md`](./github-environment-bootstrap.md) for the exact bootstrap checklist.

## Target path expectations

The workflow always stages the built `out/` directory onto the Hostinger box first.

From there it supports two deploy modes:

### Container-backed deploy

If `DEPLOY_CONTAINER` is set, the workflow streams the staged artifact into the running container and replaces the configured container path.

Current known live Lexy targets:

- production container: `lexyalgo-site`
- production container path: `/usr/share/nginx/html`
- staging container: `lexyalgo-site-staging`
- staging container path: `/app/out`

### Plain host-path deploy

If `DEPLOY_CONTAINER` is not set, the workflow replaces the configured host path directly.

Set `DEPLOY_PATH` to the directory the web server already serves for that hostname.

## Contact form activation

The `/contact` page now posts to `https://formsubmit.co/hello@lexyalgo.com` so the static site has a real delivery path without adding server infrastructure. The form includes the FormSubmit honeypot (`_honey`) plus an explicit `_url=https://lexyalgo.com/contact` source marker so mailbox reviewers can tie activation/delivery mail back to the live page.

After the first live submission, FormSubmit will send an activation email to `hello@lexyalgo.com`. Someone with inbox access must click that activation link once before future submissions will deliver normally.

Contact form checks after deploy:

1. Submit a test message on `/contact`
2. Confirm the browser lands on `/contact/thanks`
3. Confirm the activation email or submission email arrives in `hello@lexyalgo.com`
4. If activation was required, click it and repeat one more test submission
5. Confirm the honeypot field stays empty in the delivered message and CAPTCHA challenged the browser as expected

## Verification checklist

After deploy, verify at least:

- `/`
- `/pricing`
- `/terms`
- `/privacy`
- `/contact`
- `/contact/thanks`
- `/build-meta.json`

Recommended proof commands:

```bash
curl -I https://lexyalgo.com/
curl -I https://lexyalgo.com/pricing
curl -I https://lexyalgo.com/terms
curl -I https://lexyalgo.com/privacy
curl -I https://lexyalgo.com/contact
curl https://lexyalgo.com/build-meta.json
```

Capture the workflow run URL, deployed SHA, and verification output in the linked issue or PR.
