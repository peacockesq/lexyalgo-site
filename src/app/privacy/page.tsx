import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — LexyAlgo',
  description: 'LexyAlgo privacy policy. How we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <h1 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-slate-900">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: March 26, 2026</p>

      <div className="mt-10 prose prose-slate max-w-none prose-headings:font-[family-name:var(--font-space)] prose-headings:font-bold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600">

        <h2>Who We Are</h2>
        <p>
          LexyAlgo (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates lexyalgo.com and related services. We are a document preparation service — not a law firm. This policy explains how we collect, use, and protect your personal information when you use our website and tools.
        </p>

        <h2>Information We Collect</h2>
        <p>We collect information you provide directly when using our services:</p>
        <ul className="space-y-2">
          <li><strong>Account information:</strong> Name, email address, and contact details when you create an account or join a waitlist.</li>
          <li><strong>Case information:</strong> Names, dates, financial details, and other information you enter into our document preparation tools (calculators, QDRO generator, divorce forms, etc.).</li>
          <li><strong>Payment information:</strong> Billing details processed through our third-party payment processor. We do not store credit card numbers.</li>
          <li><strong>Usage data:</strong> Pages visited, features used, browser type, device information, and IP address — collected automatically to improve our services.</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <ul className="space-y-2">
          <li>To generate documents and calculations you request.</li>
          <li>To communicate with you about your account, orders, and product updates.</li>
          <li>To improve our tools and user experience.</li>
          <li>To comply with legal obligations.</li>
        </ul>
        <p>We do not use your case information to train machine learning models. Your legal data stays yours.</p>

        <h2>Who We Share Information With</h2>
        <p>
          We do not sell your personal information. We do not share your case information with anyone except:
        </p>
        <ul className="space-y-2">
          <li><strong>Service providers:</strong> Hosting, payment processing, and email delivery services that help us operate — bound by confidentiality agreements.</li>
          <li><strong>Legal requirements:</strong> When required by law, subpoena, or court order.</li>
          <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets — with notice to you.</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          We use essential cookies to keep the site functional and analytics cookies to understand how people use our tools. You can disable non-essential cookies in your browser settings. Our site works without them.
        </p>

        <h2>Data Security</h2>
        <p>
          We use industry-standard encryption (TLS) for data in transit and encrypted storage for data at rest. Access to personal data is limited to team members who need it to provide services.
        </p>

        <h2>Data Retention</h2>
        <p>
          We retain your account information as long as your account is active. Case information is retained for 12 months after document generation to allow re-downloads, then deleted. You can request earlier deletion by contacting us.
        </p>

        <h2>Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul className="space-y-2">
          <li>Access the personal information we hold about you.</li>
          <li>Request correction of inaccurate information.</li>
          <li>Request deletion of your information.</li>
          <li>Opt out of marketing communications.</li>
          <li>Request a portable copy of your data.</li>
        </ul>

        <h2>California Residents (CCPA)</h2>
        <p>
          If you are a California resident, you have additional rights under the California Consumer Privacy Act. We do not sell personal information. You can submit a &ldquo;Do Not Sell&rdquo; request at{' '}
          <Link href="/privacy/do-not-sell" className="text-teal hover:underline">lexyalgo.com/privacy/do-not-sell</Link>.
        </p>
        <p>
          You have the right to know what personal information we collect, request its deletion, and not be discriminated against for exercising your rights.
        </p>

        <h2>Children&rsquo;s Privacy</h2>
        <p>
          Our services are not directed to children under 18. We do not knowingly collect personal information from minors. If we discover we have collected information from a child, we will delete it promptly.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. We&rsquo;ll notify you of material changes by email or prominent notice on our site. Continued use after changes constitutes acceptance.
        </p>

        <h2>Contact Us</h2>
        <p>
          Questions about this policy? Contact us at{' '}
          <a href="mailto:privacy@lexyalgo.com" className="text-teal hover:underline">privacy@lexyalgo.com</a>{' '}
          or visit our <Link href="/contact" className="text-teal hover:underline">contact page</Link>.
        </p>
      </div>
    </div>
  )
}
