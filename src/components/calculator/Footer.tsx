'use client';

import Link from 'next/link';

export function CalculatorFooter() {
  return (
    <footer className="mt-16 border-t border-gray-200 pt-8 pb-12">
      <div className="mx-auto max-w-4xl text-center text-sm text-gray-500 space-y-2">
        <p>© 2026 LexyAlgo. Document preparation tools, not a law firm.</p>
        <div className="flex items-center justify-center gap-4">
          <Link href="https://lexyalgo.com" className="text-[#1E5F6C] hover:underline">
            lexyalgo.com
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/do-not-sell" className="hover:underline">
            Do Not Sell My Personal Information
          </Link>
        </div>
      </div>
    </footer>
  );
}
