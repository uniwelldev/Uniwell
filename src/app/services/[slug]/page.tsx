import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ProjectCard } from '@/components/project-card';
import { services, steps } from '@/lib/config';
import { projects } from '@/lib/projects';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.detail,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  const work = projects.filter((p) => p.category === service.slug);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <div className="sv-hero" style={{ background: service.tone }}>
        <Navigation />
        <div className="sv-glow" aria-hidden="true" />
        <span className="sv-bignum" aria-hidden="true">
          {service.index}
        </span>
        <main id="top" className="container sv-hero-inner">
          <p className="sv-eyebrow">
            {service.index} / {service.tag}
          </p>
          <h1>{service.title}</h1>
          <p className="sv-lead">{service.detail}</p>
          <Link className="sv-hero-cta" href="/#contact">
            TALK TO US{' '}
            <span>
              <ArrowRight size={18} />
            </span>
          </Link>
        </main>
      </div>

      <section className="sv-section">
        <div className="container">
          <div className="section-topline">
            <span>WHAT THIS COVERS</span>
            <span>{service.title.toUpperCase()}</span>
          </div>
          <div className="cover-grid">
            {service.points.map((p, i) => (
              <div className="cover-card" key={p}>
                <span style={{ color: 'inherit' }}>0{i + 1}</span>
                <h3>{p}</h3>
                <i style={{ background: service.tone }} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sv-section sv-alt">
        <div className="container">
          <div className="section-topline">
            <span>HOW WE WORK</span>
            <span>FOUR STEPS, ONE TEAM</span>
          </div>
          <ol className="sv-steps">
            {steps.map((s) => (
              <li key={s.n}>
                <span>{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {work.length > 0 && (
        <section className="sv-section">
          <div className="container">
            <div className="section-topline">
              <span>SELECTED WORK</span>
              <Link href="/work">VIEW ALL</Link>
            </div>
            <div className="work-grid sv-work">
              {work.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sv-cta" style={{ background: service.tone }}>
        <div className="container">
          <p className="sv-eyebrow">READY WHEN YOU ARE</p>
          <h2>
            Let&apos;s talk about
            <br />
            {service.title}.
          </h2>
          <Link className="sv-hero-cta" href="/#contact">
            START A PROJECT{' '}
            <span>
              <ArrowRight size={18} />
            </span>
          </Link>
        </div>
      </section>

      <section className="sv-section">
        <div className="container">
          <div className="section-topline">
            <span>EXPLORE MORE</span>
            <span>OTHER SERVICES</span>
          </div>
          <nav className="sv-others" aria-label="Other services">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                style={{ background: s.tone }}
              >
                <span>{s.index}</span>
                <strong>{s.title}</strong>
                <ArrowUpRight size={22} aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>
      </section>
      <Footer />
    </>
  );
}
