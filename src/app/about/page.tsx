import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SubPage } from '@/components/sub-page';
import { services } from '@/lib/config';
import { team } from '@/lib/team';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet BYTELAMP, an independent digital studio and the team behind the brands, websites, content, marketing and AI systems we build.',
  alternates: { canonical: '/about' },
};

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export default function About() {
  return (
    <SubPage wide>
      <p className="eyebrow">ABOUT US</p>
      <h1 className="sub-title">One studio. Every digital superpower.</h1>
      <p className="sub-lead">
        BYTELAMP is an independent digital studio. We bring brand, website,
        content, marketing and AI automation under one roof, so your business
        gets one team that works together instead of five agencies that
        don&apos;t.
      </p>

      <h2 className="sub-h2">What we do</h2>
      <div className="about-services">
        {services.map((s) => (
          <Link key={s.slug} href={`/services/${s.slug}`}>
            <span>{s.index}</span>
            <strong>{s.title}</strong>
            <em>{s.tag}</em>
          </Link>
        ))}
      </div>

      <h2 className="sub-h2">The team</h2>
      <div className="team-grid">
        {team.map((m, i) => (
          <article className="team-card" key={`${m.name}-${i}`}>
            <div className="team-photo">
              {m.photo ? (
                <Image
                  src={m.photo}
                  alt={m.name}
                  fill
                  sizes="(max-width: 700px) 50vw, 25vw"
                />
              ) : (
                <span aria-hidden="true">{initials(m.name)}</span>
              )}
            </div>
            <h3>{m.name}</h3>
            <p>{m.role}</p>
            {m.bio && <small>{m.bio}</small>}
          </article>
        ))}
      </div>

      <Link className="sub-cta" href="/#contact">
        WORK WITH US <ArrowRight size={18} />
      </Link>
    </SubPage>
  );
}
