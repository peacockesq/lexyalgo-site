import Link from "next/link";
import type { AuthorityStructure } from "@/lib/corpus";

export function AuthorityBreadcrumbs({ title, jurisdiction, authorityType, structure }: { title: string; jurisdiction?: string; authorityType?: string; structure?: AuthorityStructure | null }) {
  const statutory = authorityType === "statute" || authorityType === "constitution";
  const segments = statutory && jurisdiction ? statuteSegments(jurisdiction, structure) : [];
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link href="/corpus/" className="transition-colors hover:text-slate-900">LexyCorpus</Link></li>
        <li aria-hidden="true">/</li>
        <li><Link href="/corpus/search/" className="transition-colors hover:text-slate-900">Search</Link></li>
        {segments.map((segment) => <li key={`${segment.label}-${segment.href}`} className="contents"><span aria-hidden="true">/</span><Link href={segment.href} className="transition-colors hover:text-slate-900">{segment.label}</Link></li>)}
        <li aria-hidden="true">/</li>
        <li className="max-w-[28rem] truncate text-slate-700" aria-current="page">{title}</li>
      </ol>
    </nav>
  );
}

function statuteSegments(jurisdiction: string, structure?: AuthorityStructure | null) {
  const entries: Array<{ label: string; href: string }> = [];
  const params = new URLSearchParams({ jurisdiction });
  entries.push({ label: jurisdiction, href: `/corpus/search/?${params}` });
  const collection = structure?.code_name || structure?.collection;
  if (collection) entries.push({ label: collection, href: `/corpus/search/?${params}` });
  if (structure?.title_number || structure?.title_name) {
    if (structure.title_number) params.set("title_number", structure.title_number);
    entries.push({ label: [structure.title_number && `Title ${structure.title_number}`, structure.title_name].filter(Boolean).join(" — "), href: `/corpus/search/?${params}` });
  }
  if (structure?.chapter || structure?.chapter_name) {
    if (structure.chapter) params.set("chapter", structure.chapter);
    entries.push({ label: [structure.chapter && `Chapter ${structure.chapter}`, structure.chapter_name].filter(Boolean).join(" — "), href: `/corpus/search/?${params}` });
  }
  return entries;
}
