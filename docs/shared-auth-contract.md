# Shared Lexy auth contract

_Last updated: 2026-04-22_

## Why this exists

Lexy wants one sign-in story across Atlas, Asset Divider, Co-Parent, and the rest of the product family.
That only works if the session and callback contract is explicit instead of implicit.

This document captures the current reference contract, compares the live repo implementations, and narrows follow-up work to the actual remaining gaps.

## Reference contract

The current reference implementation lives in `atlas-shell`.

Minimum cross-surface contract:

1. **Shared Supabase browser env**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. **Optional shared cookie scope overrides** when cross-subdomain session continuity is required
   - `NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN`
   - `NEXT_PUBLIC_SUPABASE_COOKIE_SECURE`
3. **Explicit approved external callback destinations**
   - `NEXT_PUBLIC_LEXY_AUTH_ALLOWED_ORIGINS`
   - `LEXY_AUTH_ALLOWED_ORIGINS`
4. **Optional localhost/dev callback allowlist**
   - `NEXT_PUBLIC_LEXY_AUTH_ALLOW_LOCALHOST_CALLBACKS`
   - `LEXY_AUTH_ALLOW_LOCALHOST_CALLBACKS`
5. **Proxy/origin fallback clarity**
   - `NEXT_PUBLIC_APP_URL` when forwarded host/proto headers are unavailable
6. **Build-time truth awareness**
   - browser auth depends on `NEXT_PUBLIC_*` values being present at build time, not just runtime

## Repo comparison snapshot

| Repo | Supabase public env | Cookie domain/secure overrides | Explicit external callback allowlist | `NEXT_PUBLIC_APP_URL` origin fallback | Notes |
| --- | --- | --- | --- | --- | --- |
| `atlas-shell` | Yes | Yes | Yes (`NEXT_PUBLIC_` + server fallback) | Yes | Reference implementation today |
| `asset-divider` | Yes | **No shared cookie override layer yet** | Yes (`NEXT_PUBLIC_` + server fallback) | Yes | Main remaining contract gap |
| `coparenting-app` | Yes | Yes | Yes (`NEXT_PUBLIC_` only today) | No obvious proxy-origin fallback layer in the current auth surface | Closer to Atlas than earlier notes suggested |

## Grounding

### Atlas shell
- callback normalization + allowlist: `src/lib/auth.ts`
- cookie overrides: `src/lib/supabase/config.ts`
- browser env guardrails: `src/lib/env/public.ts`
- proxy/origin fallback: `src/lib/supabase/proxy.ts`

### Asset Divider
- callback normalization + allowlist: `src/lib/auth.ts`
- proxy/origin fallback: `src/lib/supabase/proxy.ts`
- public env validation: `src/lib/env/public.ts`
- current missing parity item: no `src/lib/supabase/config.ts` style cookie-domain/cookie-secure contract surfaced alongside the auth flow

### Co-Parent
- callback allowlist logic: `src/lib/auth.ts`
- cookie overrides: `src/lib/supabase/config.ts`
- Supabase env helpers: `src/lib/env/server.ts`
- note: this repo is materially closer to Atlas than the original issue write-up implied

## Actual remaining gaps after this comparison

### 1. Asset Divider cookie contract parity
Open a repo-specific follow-up if needed to add the same explicit cookie-domain / secure override surface Atlas and Co-Parent already expose.

### 2. Co-Parent contract clarification
Co-Parent appears partially aligned already. The next pass should verify whether it needs:
- server-side fallback for allowed origins parity with Atlas
- explicit `NEXT_PUBLIC_APP_URL` / forwarded-host origin handling in any middleware or callback paths

### 3. Shared deployment guidance
Document in each participating repo which auth values are build-time critical versus runtime-only so host deploys do not silently drift.

## Success condition

A human should be able to answer, for every Lexy app:
1. what cookie scope it uses
2. what callback destinations it allows
3. whether it can hand users back to another approved Lexy surface
4. whether it participates in shared session continuity or only local app auth

## Recommended next repo-owned follow-ups

1. `asset-divider`: add explicit cookie-domain / secure config parity if cross-subdomain session continuity is required there.
2. `coparenting-app`: verify whether callback allowlist and origin fallback need Atlas-style server/runtime parity.
3. `atlas-shell`: continue treating this as the canonical contract reference unless a more central shared package emerges.
