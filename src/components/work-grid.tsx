'use client';
import { useState } from 'react';
import { ProjectCard } from '@/components/project-card';
import { services } from '@/lib/config';
import { projects } from '@/lib/projects';

export function WorkGrid() {
  const [filter, setFilter] = useState('all');
  const used = services.filter((s) =>
    projects.some((p) => p.category === s.slug),
  );
  const shown = projects.filter(
    (p) => filter === 'all' || p.category === filter,
  );

  return (
    <>
      <div className="work-filters" role="group" aria-label="Filter projects">
        {[{ slug: 'all', title: 'All' }, ...used].map((s) => (
          <button
            key={s.slug}
            type="button"
            aria-pressed={filter === s.slug}
            onClick={() => setFilter(s.slug)}
          >
            {s.title}
          </button>
        ))}
      </div>
      <div className="work-grid">
        {shown.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </>
  );
}
