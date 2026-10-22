import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { categoryLabel, type Project } from '@/lib/projects';

export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <Link href={`/work/${p.slug}`} className="project-card" data-cursor="VIEW">
      <div className="project-media" style={{ background: p.accent }}>
        {p.image && (
          <Image
            src={p.image}
            alt={`${p.title} for ${p.client}`}
            fill
            sizes="(max-width: 700px) 100vw, 50vw"
          />
        )}
        {p.sample && <span className="project-badge">SAMPLE</span>}
      </div>
      <div className="project-meta">
        <span>
          {categoryLabel(p.category).toUpperCase()} · {p.year}
        </span>
        <ArrowUpRight size={18} aria-hidden="true" />
      </div>
      <h3>{p.title}</h3>
      <p>{p.summary}</p>
    </Link>
  );
}
