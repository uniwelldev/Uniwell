import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SubPage } from '@/components/sub-page';
import { WorkGrid } from '@/components/work-grid';
import { projects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'Selected projects by UNIVELLE across brand, web, content, marketing and AI.',
  alternates: { canonical: '/work' },
};

export default function Work() {
  return (
    <SubPage wide>
      <p className="eyebrow">SELECTED WORK</p>
      <h1 className="sub-title">Things we&apos;ve made.</h1>
      <p className="sub-lead">
        A look at the brands, products and systems we&apos;ve built with our
        clients.
      </p>
      {projects.length ? (
        <WorkGrid />
      ) : (
        <p className="sub-lead">
          Projects are being added. Get in touch to hear about our work.
        </p>
      )}
      <Link className="sub-cta" href="/#contact">
        START YOUR PROJECT <ArrowRight size={18} />
      </Link>
    </SubPage>
  );
}
