import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SubPage } from '@/components/sub-page';
import { categoryLabel, projects } from '@/lib/projects';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${p.client}`,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <SubPage>
      <Link className="back-link" href="/work">
        ← ALL WORK
      </Link>
      <p className="eyebrow">
        {categoryLabel(p.category).toUpperCase()} · {p.year}
        {p.sample && ' · SAMPLE'}
      </p>
      <h1 className="sub-title">{p.title}</h1>
      <p className="sub-lead">{p.summary}</p>
      <div className="project-hero" style={{ background: p.accent }}>
        {p.image && (
          <Image
            src={p.image}
            alt={`${p.title} for ${p.client}`}
            fill
            sizes="860px"
            priority
          />
        )}
      </div>
      <dl className="project-facts">
        <div>
          <dt>Client</dt>
          <dd>{p.client}</dd>
        </div>
        <div>
          <dt>Service</dt>
          <dd>{categoryLabel(p.category)}</dd>
        </div>
        <div>
          <dt>Year</dt>
          <dd>{p.year}</dd>
        </div>
      </dl>
      {p.challenge && (
        <>
          <h2 className="sub-h2">The challenge</h2>
          <p className="project-text">{p.challenge}</p>
        </>
      )}
      {p.solution && (
        <>
          <h2 className="sub-h2">What we did</h2>
          <p className="project-text">{p.solution}</p>
        </>
      )}
      {p.results && p.results.length > 0 && (
        <>
          <h2 className="sub-h2">Results</h2>
          <ul className="sub-list">
            {p.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </>
      )}
      {p.url && (
        <a
          className="sub-cta"
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          VISIT PROJECT <ArrowUpRight size={18} />
        </a>
      )}
      <br />
      <Link className="sub-cta" href="/#contact">
        WANT SOMETHING LIKE THIS? <ArrowRight size={18} />
      </Link>
    </SubPage>
  );
}
