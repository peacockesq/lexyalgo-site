export const DEFAULT_LEXYCORPUS_API_URL = "https://api.lexyalgo.com";
export const DEFAULT_LEXYCORPUS_MCP_URL = "https://mcp.lexyalgo.com/mcp";

export function getLexyCorpusApiUrl(): string {
  return (process.env.NEXT_PUBLIC_LEXYCORPUS_API_URL || DEFAULT_LEXYCORPUS_API_URL).replace(/\/$/, "");
}

export function getLexyCorpusMcpUrl(): string {
  return process.env.NEXT_PUBLIC_LEXYCORPUS_MCP_URL || DEFAULT_LEXYCORPUS_MCP_URL;
}
