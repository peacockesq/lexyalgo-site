# LexyAlgo deployment runbook

## Current hosting shape

Known production proof from issue tracking:

- `lexyalgo.com` is serving through nginx on a Hostinger-hosted server.
- The site is a static Next.js export.
- This repository is the source of truth for the build and now also carries the deploy workflow for Hostinger.

## Build artifact

The canonical deployable artifact is the `out/` directory produced by:

```bash
npm ci
npm run build
```

GitHub Actions publishes this directory as an artifact named `site-out` on every push to `main` and on manual runs.

Each artifact also includes `deploy-manifest.json`, which records the Git SHA, ref, workflow run, and build timestamp. The deploy workflow verifies that the live site is serving the same SHA before marking the run successful.

## GitHub Actions deployment flow

Workflow: `.github/workflows/build-static-export.yml`

### Automatic production deploy

On every push to `main`, the workflow will:

1. build the static export
2. upload the `site-out` artifact
3. deploy to production via `rsync` over SSH, if production deploy has been enabled in repo variables
4. verify `https://lexyalgo.com/deploy-manifest.json` matches the pushed commit SHA
5. smoke-test `/`, `/pricing`, `/terms`, `/privacy`, `/contact`, and `/contact/thanks`

### Manual deploy

You can also run the workflow manually and pick one of:

- `none` for build-only
- `staging` to deploy to the staging Hostinger target
- `production` to redeploy production from the selected commit

## Required GitHub configuration

### Production repository variables

- `HOSTINGER_PROD_DEPLOY_ENABLED=true`
- `HOSTINGER_PROD_HOST`
- `HOSTINGER_PROD_PORT` (optional, defaults to `22`)
- `HOSTINGER_PROD_USER`
- `HOSTINGER_PROD_WEB_ROOT`
- `HOSTINGER_PROD_SITE_URL` (for example `https://lexyalgo.com`)

### Production repository secrets

- `HOSTINGER_PROD_SSH_KEY`
- `HOSTINGER_PROD_KNOWN_HOSTS`

### Staging repository variables

- `HOSTINGER_STAGING_HOST`
- `HOSTINGER_STAGING_PORT` (optional, defaults to `22`)
- `HOSTINGER_STAGING_USER`
- `HOSTINGER_STAGING_WEB_ROOT`
- `HOSTINGER_STAGING_SITE_URL` (for example `https://staging.lexyalgo.com`)

### Staging repository secrets

- `HOSTINGER_STAGING_SSH_KEY`
- `HOSTINGER_STAGING_KNOWN_HOSTS`

`HOSTINGER_*_KNOWN_HOSTS` should contain the exact `known_hosts` line for the target box, not a runtime `ssh-keyscan`, so workflow verification stays strict.

## Host path expectations

The workflow syncs the contents of `out/` directly into the configured nginx web root:

```bash
rsync -az --delete ./out/ user@host:/var/www/lexyalgo.com/
```

Set `HOSTINGER_*_WEB_ROOT` to the directory nginx already serves for that hostname.

## Contact form activation

The `/contact` page now posts to `https://formsubmit.co/hello@lexyalgo.com` so the static site has a real delivery path without adding server infrastructure.

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
- `/deploy-manifest.json`

Recommended proof commands:

```bash
curl -I https://lexyalgo.com/
curl -I https://lexyalgo.com/pricing
curl -I https://lexyalgo.com/terms
curl -I https://lexyalgo.com/privacy
curl -I https://lexyalgo.com/contact
curl https://lexyalgo.com/deploy-manifest.json
```

Capture the workflow run URL, deployed SHA, and verification output in the linked issue or PR.
