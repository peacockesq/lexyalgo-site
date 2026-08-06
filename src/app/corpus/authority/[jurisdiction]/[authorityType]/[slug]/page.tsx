import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthorityActions } from "@/components/corpus/AuthorityActions";
import { AuthorityBreadcrumbs } from "@/components/corpus/AuthorityBreadcrumbs";
import { AuthorityHero } from "@/components/corpus/AuthorityHero";
import { EvidenceDisclosure } from "@/components/corpus/EvidenceDisclosure";
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
    title: `${title} | LexyAlgo Corpus`,
    description: `${citation}. Primary law with explicit source, verification grade, limitations, and integrity hashes.`,
  };
}

export default async function AuthorityPage({ params }: { params: Promise<{ jurisdiction: string; authorityType: string; slug: string }> }) {
  const { jurisdiction, authorityType, slug } = await params;
  const entry = loadAuthorityEntry(slug);
  if (!entry || entry.response.record.jurisdiction !== jurisdiction || entry.response.record.authority_type !== authorityType) notFound();
  const vm = buildAuthorityViewModel(entry);

  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6 sm:py-14">
      <article className="mx-auto max-w-5xl">
        <AuthorityBreadcrumbs title={vm.title} />
        <AuthorityHero vm={vm} />
        <div className="mx-auto max-w-4xl">
          <div className="py-10"><VerificationCard vm={vm} /></div>
          {vm.canShowPrimaryText ? (
            <>
              <AuthorityActions
                slug={vm.entry.slug}
                primaryText={vm.response.version.primary_text}
                sourceUrl={vm.sourceArtifacts.find((artifact) => artifact.canonical_url)?.canonical_url ?? null}
                apiRoute={vm.entry.api_route}
                proofRoute={vm.entry.proof_route}
              />
              <PrimaryTextReader version={vm.response.version} />
            </>
          ) : (
            <>
              <nav aria-label="Defect record actions" className="flex flex-wrap gap-3 border-t border-slate-200 py-8">
                <a href={vm.entry.api_route} className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50">Authority JSON</a>
                <a href={vm.entry.proof_route} className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50">Proof bundle</a>
                <a href="#verification" className="px-2 py-2.5 text-sm font-semibold text-slate-700 underline underline-offset-4">Verification details</a>
              </nav>
              <section aria-labelledby="suppressed-heading" className="my-10 border-y-4 border-red-700 bg-red-50 px-5 py-8 sm:px-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">Primary text suppressed</p>
              <h2 id="suppressed-heading" className="mt-2 font-serif text-3xl font-semibold text-red-950">A verified material defect is open</h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-red-900">This rendition must not be used as authority until the defect is corrected, validation passes, and verification is recomputed.</p>
              {vm.proof.defects.map((defect) => (
                <div key={defect.defect_id} className="mt-6 border-t border-red-200 pt-5 text-sm text-red-950">
                  <p className="font-semibold">{defect.classification.replaceAll("_", " ")} · {defect.status}</p>
                  {defect.description && <p className="mt-2 leading-6">{defect.description}</p>}
                  {defect.correction && <p className="mt-2 leading-6"><strong>Required correction:</strong> {defect.correction}</p>}
                </div>
              ))}
              </section>
            </>
          )}
          <EvidenceDisclosure vm={vm} />
          <VerificationFooter vm={vm} />
        </div>
      </article>
    </div>
  );
}
