# LexyAlgo Corporate Website

Marketing site for [lexyalgo.com](https://lexyalgo.com) — a house of brands for divorce technology tools.

## Live Products
- **Support Calculator** — Free child support and retirement division calculators
- **QDRO Services** — Live intake and document generation flow
- **Estate Planning** — Free beta access for wills, trusts, POAs, and healthcare directives

## Public Alpha Products
- **Divorce Forms** — Court-form-driven divorce documents
- **Asset Divider** — Visual property division with behavioral design
- **Co-Parent** — Shared calendar, expense tracking, communication
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

Release/runbook reference:
- `docs/STAGING-AND-RELEASE.md`

## Environment Variables

- `NEXT_PUBLIC_VBOUT_API_KEY` — VBOUT email marketing API key for waitlist signups

## Disclaimer

LexyAlgo provides document preparation tools, not legal advice.
