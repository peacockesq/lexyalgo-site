import Link from "next/link";

export function AuthorityBreadcrumbs({ title }: { title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link href="/corpus/" className="transition-colors hover:text-slate-900">LexyCorpus</Link></li>
        <li aria-hidden="true">/</li>
        <li><Link href="/corpus/search/" className="transition-colors hover:text-slate-900">Search</Link></li>
        <li aria-hidden="true">/</li>
        <li className="max-w-[28rem] truncate text-slate-700" aria-current="page">{title}</li>
      </ol>
    </nav>
  );
}
