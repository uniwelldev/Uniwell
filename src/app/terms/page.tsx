import type { Metadata } from 'next';
import { SubPage } from '@/components/sub-page';
import { site } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Terms of Use',
  alternates: { canonical: '/terms' },
};

// TODO: starter template — have it reviewed before launch.
export default function Terms() {
  return (
    <SubPage>
      <h1 className="sub-title">Terms of Use</h1>
      <div className="legal">
        <p>
          By using this website you agree to these terms. If you do not agree,
          please do not use the site.
        </p>
        <h2>Use of the site</h2>
        <p>
          The content on this site is provided for general information about{' '}
          {site.name} and its services. You may not misuse the site or attempt
          to disrupt it.
        </p>
        <h2>Intellectual property</h2>
        <p>
          The site design, text and graphics belong to {site.name} unless stated
          otherwise and may not be copied without permission.
        </p>
        <h2>No offer or guarantee</h2>
        <p>
          Information on this site is not a binding offer. Any engagement is
          governed by a separate written agreement.
        </p>
        <h2>Liability</h2>
        <p>
          The site is provided as is. To the extent the law allows, {site.name}{' '}
          is not liable for losses arising from use of the site.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about these terms:{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </SubPage>
  );
}
