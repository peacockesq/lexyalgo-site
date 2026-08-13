import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthorityActions } from "@/components/corpus/AuthorityActions";
import { AuthorityBreadcrumbs } from "@/components/corpus/AuthorityBreadcrumbs";
import { AuthorityHero } from "@/components/corpus/AuthorityHero";
import { PrimaryTextReader } from "@/components/corpus/PrimaryTextReader";
import { VerificationCard } from "@/components/corpus/VerificationCard";
import { VerificationFooter } from "@/components/corpus/VerificationFooter";
import { buildAuthorityViewModel, listCorpusEntries, loadAuthorityEntry } from "@/lib/corpus";

export const dynamicParams = false;

export function generateStaticParams() {
  return listCorpusEntries().map((entry) => ({
    jurisdiction: entry.response.record.jurisdiction,
    authorityType: entry.response.record.authority_type,
    slug: entry.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = loadAuthorityEntry(slug);
  if (!entry) return {};
  const title = entry.response.record.title ?? entry.response.record.heading ?? "Corpus authority";
  const citation = entry.response.record.citation_aliases[0]?.display_value ?? "";
  return {
    title: `${title} | LexyCorpus`,
    description: `${citation}. Read the authority and see whether its text has been checked against an official source.`,
  };
}

export default async function AuthorityPage({ params }: { params: Promise<{ jurisdiction: string; authorityType: string; slug: string }> }) {
  const { jurisdiction, authorityType, slug } = await params;
  const entry = loadAuthorityEntry(slug);
  if (!entry || entry.response.record.jurisdiction !== jurisdiction || entry.response.record.authority_type !== authorityType) notFound();
  const vm = buildAuthorityViewModel(entry);
  const structure = vm.response.record.structure || vm.response.version.structure;

  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6 sm:py-14">
      <article className="mx-auto max-w-5xl">
        <AuthorityBreadcrumbs title={vm.title} jurisdiction={vm.response.record.jurisdiction} authorityType={vm.response.record.authority_type} structure={structure} />
        <AuthorityHero vm={vm} />
        <div className="mx-auto max-w-4xl">
          <div className="py-10"><VerificationCard vm={vm} /></div>
          <AuthorityActions
            slug={vm.entry.slug}
            primaryText={vm.response.version.primary_text}
            citation={vm.citation}
            sourceUrl={vm.sourceArtifacts.find((artifact) => artifact.canonical_url)?.canonical_url ?? null}
            apiRoute={vm.entry.api_route}
            proofRoute={vm.entry.proof_route}
          />
          <PrimaryTextReader version={vm.response.version} title={vm.title} citation={vm.citation} authorityType={vm.response.record.authority_type} sectionNumber={structure?.section_number} />
          <VerificationFooter vm={vm} />
        </div>
      </article>
    </div>
  );
}
