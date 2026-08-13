import type { AuthorityVersion } from "@/lib/corpus";
import { AuthorityTextReader } from "./AuthorityTextReader";

export function PrimaryTextReader({ version, title, citation, authorityType, sectionNumber }: { version: AuthorityVersion; title: string; citation: string; authorityType: string; sectionNumber?: string | null }) {
  return <AuthorityTextReader primaryText={version.primary_text} paragraphs={version.paragraphs} title={title} citation={citation} authorityType={authorityType} sectionNumber={sectionNumber} />;
}
