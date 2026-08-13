"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AuthorityParagraph } from "@/lib/corpus";

type Paragraph = AuthorityParagraph & { id: string };

export function authorityParagraphs(primaryText: string, supplied?: AuthorityParagraph[] | null): Paragraph[] {
  const source: AuthorityParagraph[] = supplied?.length
    ? supplied
    : primaryText.split(/\n\s*\n+/).map((text) => ({ text: text.trim() })).filter((item) => item.text);
  return source.map((paragraph, index) => ({ ...paragraph, id: safeParagraphId(paragraph.id, index) }));
}

export function AuthorityTextReader({
  primaryText,
  paragraphs,
  title,
  citation,
  authorityType,
  sectionNumber,
}: {
  primaryText: string;
  paragraphs?: AuthorityParagraph[] | null;
  title: string;
  citation: string;
  authorityType: string;
  sectionNumber?: string | null;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLButtonElement>(null);
  const [selectionAction, setSelectionAction] = useState<{ quote: string; start: Paragraph; end: Paragraph; top: number; left: number } | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const normalized = useMemo(() => authorityParagraphs(primaryText, paragraphs), [paragraphs, primaryText]);

  useEffect(() => {
    const dismissWithKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectionAction(null);
    };
    const dismissOutside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!contentRef.current?.contains(target) && !actionRef.current?.contains(target)) setSelectionAction(null);
    };
    window.addEventListener("keydown", dismissWithKeyboard);
    document.addEventListener("pointerdown", dismissOutside);
    return () => {
      window.removeEventListener("keydown", dismissWithKeyboard);
      document.removeEventListener("pointerdown", dismissOutside);
    };
  }, []);

  const captureSelection = useCallback(() => {
    window.setTimeout(() => {
      if (actionRef.current?.contains(document.activeElement)) return;
      const selection = window.getSelection();
      const quote = selection?.toString().trim() || "";
      if (!selection || selection.rangeCount === 0 || !quote || !contentRef.current) {
        setSelectionAction(null);
        return;
      }
      const range = selection.getRangeAt(0);
      if (!contentRef.current.contains(range.startContainer) || !contentRef.current.contains(range.endContainer)) return;
      const startElement = range.startContainer instanceof Element ? range.startContainer : range.startContainer.parentElement;
      const endElement = range.endContainer instanceof Element ? range.endContainer : range.endContainer.parentElement;
      const startId = startElement?.closest<HTMLElement>("[data-paragraph-id]")?.dataset.paragraphId;
      const endId = endElement?.closest<HTMLElement>("[data-paragraph-id]")?.dataset.paragraphId;
      const start = normalized.find((item) => item.id === startId);
      const end = normalized.find((item) => item.id === endId);
      if (!start || !end) return;
      const rect = range.getBoundingClientRect();
      setCopied(false);
      setSelectionAction({
        quote,
        start,
        end,
        top: Math.max(12, rect.top + window.scrollY - 48),
        left: Math.max(window.scrollX + 12, Math.min(window.scrollX + window.innerWidth - 250, rect.left + window.scrollX)),
      });
    }, 0);
  }, [normalized]);

  useEffect(() => {
    document.addEventListener("selectionchange", captureSelection);
    return () => document.removeEventListener("selectionchange", captureSelection);
  }, [captureSelection]);

  async function copySelection() {
    if (!selectionAction) return;
    const locator = pinpointLocator(selectionAction.start, selectionAction.end, authorityType, sectionNumber);
    const authority = citation || title;
    const deepLink = `${window.location.origin}${window.location.pathname}${window.location.search}#${selectionAction.start.id}`;
    const plain = `“${selectionAction.quote}”\n\n${authority}${locator ? `, ${locator}` : ""}. ${deepLink}`;
    const html = `<blockquote>${escapeHtml(selectionAction.quote)}</blockquote><p><cite>${escapeHtml(authority)}${locator ? `, ${escapeHtml(locator)}` : ""}</cite>. <a href="${escapeHtml(deepLink)}">Open passage</a></p>`;
    try {
      if (navigator.clipboard.write && typeof ClipboardItem !== "undefined") {
        await navigator.clipboard.write([new ClipboardItem({
          "text/plain": new Blob([plain], { type: "text/plain" }),
          "text/html": new Blob([html], { type: "text/html" }),
        })]);
      } else {
        await navigator.clipboard.writeText(plain);
      }
      setCopied(true);
      setCopyMessage("Selected text and citation copied.");
    } catch {
      setCopied(false);
      setCopyMessage("Could not access the clipboard. Please copy the selection manually.");
    }
  }

  return (
    <section aria-labelledby="primary-text-heading" className="py-12">
      <div className="mb-8 border-b border-slate-200 pb-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Authority text</p>
        <h2 id="primary-text-heading" className="font-serif text-3xl font-semibold text-slate-950">Primary text</h2>
        <p className="mt-2 text-sm text-slate-500">Select a passage to copy it with a citation and a link back to this page.</p>
      </div>
      <div ref={contentRef} onMouseUp={captureSelection} onTouchEnd={captureSelection} className="mx-auto max-w-[72ch] font-serif text-[1.08rem] leading-[1.85] text-slate-900">
        {normalized.map((paragraph) => (
          <p id={paragraph.id} data-paragraph-id={paragraph.id} key={paragraph.id} className="mb-6 scroll-mt-28 whitespace-pre-wrap">
            {paragraph.text}
          </p>
        ))}
      </div>
      {selectionAction && (
        <button
          ref={actionRef}
          type="button"
          onClick={copySelection}
          className="absolute z-40 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-xl hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          style={{ top: selectionAction.top, left: selectionAction.left }}
          aria-label="Copy selected text with pinpoint citation"
        >
          {copied ? "Copied with citation" : "Copy with pinpoint citation"}
        </button>
      )}
      <p className="sr-only" aria-live="polite">{copyMessage}</p>
    </section>
  );
}

function safeParagraphId(value: string | null | undefined, index: number) {
  const cleaned = value?.replace(/^#/, "").replace(/[^a-zA-Z0-9_-]/g, "-");
  return cleaned || `p-${String(index + 1).padStart(6, "0")}`;
}

function pinpointLocator(start: Paragraph, end: Paragraph, authorityType: string, sectionNumber?: string | null) {
  if (start.pinpoint && start.id === end.id) return start.pinpoint;
  if (start.page !== null && start.page !== undefined && start.page !== "") {
    if (end.page !== null && end.page !== undefined && end.page !== "" && end.page !== start.page) return `pp. ${start.page}–${end.page}`;
    return `p. ${start.page}`;
  }
  if ((authorityType === "statute" || authorityType === "constitution") && sectionNumber) return `§ ${sectionNumber}`;
  const first = paragraphNumber(start);
  const last = paragraphNumber(end);
  return first === last ? `¶ ${first}` : `¶¶ ${first}–${last}`;
}

function paragraphNumber(paragraph: Paragraph) {
  return paragraph.ordinal || Number(paragraph.id.match(/(\d+)$/)?.[1]) || paragraph.id;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character] || character);
}
