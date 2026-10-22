import type { Metadata } from 'next';
import { SubPage } from '@/components/sub-page';
import { site } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  alternates: { canonical: '/privacy' },
};

// TODO: starter template — have it reviewed against the laws that apply to
// your business (e.g. GDPR, India's DPDP Act) before launch.
export default function Privacy() {
  return (
    <SubPage>
      <h1 className="sub-title">Privacy Policy</h1>
      <div className="legal">
        <p>
          This policy explains how {site.name} handles personal information
          collected through this website.
        </p>
        <h2>Information we collect</h2>
        <p>
          When you use the inquiry form we receive your name, email address, the
          service you are interested in and the message you write. If you
          contact us by email or WhatsApp we receive the details you share
          there.
        </p>
        <h2>How we use it</h2>
        <p>
          We use this information only to respond to your inquiry and to discuss
          working together. We do not sell your information.
        </p>
        <h2>Sharing</h2>
        <p>
          We share information only with service providers that help us run our
          business (for example email and scheduling tools) or when the law
          requires it.
        </p>
        <h2>Retention and your rights</h2>
        <p>
          We keep inquiries only as long as needed for the purpose above. You
          can ask us to access, correct or delete your information at any time
          by emailing <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <h2>Changes</h2>
        <p>We may update this policy and will post the new version here.</p>
      </div>
    </SubPage>
  );
}
