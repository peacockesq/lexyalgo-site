# LexyAlgo site staging and release notes

This repo is the static marketing shell for LexyAlgo. It builds to static output and should be treated like a release artifact, not an app server with hidden runtime behavior.

## Purpose

Use this runbook when updating staging, checking a release candidate, or explaining how the site should be verified.

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
- no server-only runtime dependency should be required to render the built site

## Staging target

Current known staging surface:
- `https://staging.lexyalgo.com`

## Minimum smoke checklist

After a staging push, verify:

1. home page loads over HTTPS
2. primary product sections render
3. nav links work without server-side routing failures
4. blog/content pages render from the built static output
5. contact and public-alpha entry surfaces do not throw client errors
6. branding matches the LexyAlgo house-of-brands positioning

## Content/release notes

Current live product framing in this repo:
- Support Calculator and QDRO Services are live references
- Estate Planning is a free beta reference
- Divorce Forms, Asset Divider, Co-Parent, and LexyFiling are public-alpha references exposed on the main site

If product readiness changes, update both:
- `README.md`
- the page/content copy that markets the product

## Gotchas

- because this repo exports static files, validate the built `out/` artifact, not just local dev mode
- if staging is broken, check whether the static build artifact itself is wrong before blaming routing or TLS
- keep framework/version upgrades explicit and tracked, not implied

## Proof to keep with each release

- build command used
- commit SHA
- staging URL checked
- one screenshot or direct URL per major section checked
- whether the build is CLEAN or BLOCKED
