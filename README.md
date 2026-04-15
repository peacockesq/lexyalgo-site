# LexyAlgo Corporate Website

Marketing site for [lexyalgo.com](https://lexyalgo.com) — a house of brands for divorce technology tools.

## Live Products
- **Support Calculator** — Free child support and retirement division calculators

## Coming Soon
- **Asset Divider** — Visual property division with behavioral design
- **Co-Parent** — Shared calendar, expense tracking, communication
- **Document Generation** — Court-form-driven divorce documents
- **LexyFiling** — E-filing integration

## Tech Stack
- Next.js 16 (App Router, static export)
- TypeScript
- Tailwind CSS v4
- Space Grotesk + Inter typography

## Design System
See `/projects/lexyalgo/DESIGN-SYSTEM.md` for full token reference.

- **Core palette:** Slate/neutral for corporate site
- **Ember Red** `#B02700` — Asset Divider
- **Sage Fern** `#2E6B4F` — Co-Parent
- **Graphite Teal** `#1E5F6C` — Calculators
- **Dusty Violet** `#4B3D7A` — LexyFiling

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Static output goes to `/out/`.

## Deployment

This repo builds to a static export and can deploy it to Hostinger directly from GitHub Actions.

- Every push to `main` builds a deployable `site-out` artifact.
- The artifact includes `deploy-manifest.json` so the workflow can verify the live site is serving the expected Git SHA.
- Manual workflow runs can stay build-only or deploy to `staging` / `production`.
- Automatic production deploys are gated by repo configuration so `main` does not drift once Hostinger variables and secrets are set.

Detailed runbook: [`docs/deployment.md`](docs/deployment.md)


## Environment Variables

- `NEXT_PUBLIC_VBOUT_API_KEY` — VBOUT email marketing API key for waitlist signups

## Disclaimer

LexyAlgo provides document preparation tools, not legal advice.
