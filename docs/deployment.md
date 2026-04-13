# LexyAlgo deployment runbook

## Current hosting shape

Known production proof from issue tracking:

- `lexyalgo.com` is serving through nginx on a Hostinger-hosted server.
- The site is a static Next.js export.
- This repository is the source of truth for the build, but production publishing has been happening outside the repo.

## Build artifact

The canonical deployable artifact is the `out/` directory produced by:

```bash
npm ci
npm run build
```

GitHub Actions publishes this directory as an artifact named `site-out` on every push to `main` and on manual runs.

## Release procedure

1. Open the latest successful **Build static export** workflow run for `main`.
2. Download the `site-out` artifact.
3. Extract the artifact locally.
4. Sync the extracted files to the nginx web root that serves `lexyalgo.com`.
5. Verify the live site matches current `main`.

## Suggested host-side sync commands

Adjust paths/usernames to match the actual Hostinger setup.

```bash
rsync -av --delete ./out/ user@host:/var/www/lexyalgo.com/
```

If the artifact is downloaded as a zip/tar bundle, extract it first, then sync the exported files.

## Verification checklist

After deploy, verify at least:

- `/`
- `/pricing`
- `/terms`
- `/privacy`
- `/contact`

Recommended proof commands:

```bash
curl -I https://lexyalgo.com/
curl -I https://lexyalgo.com/pricing
curl -I https://lexyalgo.com/terms
curl -I https://lexyalgo.com/privacy
curl -I https://lexyalgo.com/contact
```

Capture the workflow run URL, artifact run SHA, and verification output in the linked issue or PR.

## Follow-up automation options

Once Hostinger access is confirmed, upgrade this from build-only to full deployment by choosing one of:

1. GitHub Actions + SSH/rsync to the Hostinger box
2. GitHub Actions + SCP upload + atomic symlink switch on host
3. Move hosting to a repo-connected static platform if operationally simpler

Until host credentials and target paths are confirmed, this repo intentionally stops at producing a proof-backed deployable artifact.
