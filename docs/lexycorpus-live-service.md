# LexyCorpus live-service wiring

The `/corpus` static export has a reviewed 39-authority fixture fallback, but a deployment can bind it to the real read-only LexyCorpus service at build time:

```text
LEXYCORPUS_API_URL=https://api.example.com
LEXYCORPUS_MCP_URL=https://mcp.example.com/mcp
```

The deployment workflow maps those GitHub environment variables or secrets to `NEXT_PUBLIC_LEXYCORPUS_API_URL` and `NEXT_PUBLIC_LEXYCORPUS_MCP_URL`. They are public endpoints, not credentials.

When the API URL is present, `/corpus/search/` queries `/v1/search` with all A–F grades discoverable. Results open `/corpus/live-authority/?slug=...`, which fetches the canonical authority and proof bundle from the same service. D/F records remain visible with conspicuous reliance warnings. If the live request fails, the UI says so and falls back to the reviewed static slice instead of presenting stale fixture data as live.

Do not set these values until the API and MCP hosts pass trusted-host, CORS/origin, rate-limit, read-only database, contract-version, proof, citation-resolution, and API/MCP parity checks. Routing or setting the production GitHub environment values is a deployment action and requires the normal reviewed cutover.
