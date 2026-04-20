# 75k swarm backlog audit, 2026-04-20

Related issue: #43

## Why this exists
A large tranche of `75k-swarm-slice-*` work exists only in the local clone. This document pulls the current backlog shape into the repo so future cleanup and shipping can happen against GitHub instead of an implicit local state.

## Proof commands
Run from `projects/lexyalgo-site`:

```bash
git for-each-ref --format='%(refname:short) %(upstream:short)' 'refs/heads/75k-swarm-slice-*'
git rev-parse --abbrev-ref HEAD
git status --short | wc -l
```

## Current branch-trail snapshot
- Total `75k-swarm-slice-*` branches locally: **356**
- Branches that already have an upstream / GitHub trail: **181**
- Branches that are still local-only: **175**
- Current local-only range: **`75k-swarm-slice-201` through `75k-swarm-slice-375`**
- Local-only verified-page volume represented by commit subjects: **33,802 pages**
- Local-only duplicate removals represented by commit subjects: **181 dupes removed**

## Local working-tree risk
At audit time the repo was checked out on `75k-swarm-slice-131`, not on a clean review branch.

- Checked-out branch: **`75k-swarm-slice-131`**
- `git status --short | wc -l`: **50,897** paths
- The active working tree is therefore not a safe place to do branch-by-branch backlog triage.

That means the next shipping pass should happen from clean worktrees or temporary clones, not from the current in-place generator state.

## Local-only batch map
| Slice range | Branches | Verified pages | Dupes removed |
| --- | ---: | ---: | ---: |
| 201-225 | 25 | 6,172 | 58 |
| 226-250 | 25 | 6,188 | 52 |
| 251-275 | 25 | 6,205 | 42 |
| 276-300 | 25 | 5,757 | 11 |
| 301-325 | 25 | 4,382 | 5 |
| 326-350 | 25 | 3,231 | 5 |
| 351-375 | 25 | 1,867 | 8 |

## Boundary proof
First local-only commits:
- `75k-swarm-slice-201` → `b06559f1f` → `Add 75k swarm slice 201 (243 verified pages, 3 dupes removed)`
- `75k-swarm-slice-202` → `f057067b0` → `Add 75k swarm slice 202 (246 verified pages, 3 dupes removed)`
- `75k-swarm-slice-203` → `a983d9f0e` → `Add 75k swarm slice 203 (245 verified pages, 4 dupes removed)`

Last local-only commits:
- `75k-swarm-slice-373` → `8b3842dd8` → `Add 75k swarm slice 373 (55 verified pages, 0 dupes removed)`
- `75k-swarm-slice-374` → `ef567fb3e` → `Add 75k swarm slice 374 (55 verified pages, 0 dupes removed)`
- `75k-swarm-slice-375` → `df154cbe6` → `Add 75k swarm slice 375 (53 verified pages, 0 dupes removed)`

## Recommended next sequence
1. Use a clean worktree per batch instead of the dirty `75k-swarm-slice-131` tree.
2. Start with `201-225` as the first controlled import batch.
3. For each batch, decide one of three outcomes and record it on GitHub:
   - ship as-is with grouped PR trail,
   - supersede with a narrower regenerated batch,
   - explicitly retire obsolete slices.
4. Do not create more local-only slice branches until the existing backlog has a GitHub trail.
