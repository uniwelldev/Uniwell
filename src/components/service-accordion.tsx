'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/lib/config';

export function ServiceAccordion() {
  const [active, setActive] = useState(0);

  return (
    <div className="svc-acc" data-reveal>
      {services.map((s, i) => {
        const on = i === active;
        return (
          <article
            key={s.slug}
            className={on ? 'svc-panel is-active' : 'svc-panel'}
            style={{ background: s.tone }}
            onMouseEnter={() => setActive(i)}
          >
            <button
              type="button"
              className="svc-head"
              aria-expanded={on}
              aria-controls={`svc-${s.slug}`}
              onClick={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="svc-num">{s.index}</span>
              <span className="svc-vert">{s.title}</span>
            </button>
            <div className="svc-body" id={`svc-${s.slug}`} aria-hidden={!on}>
              <span className="svc-tag">{s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.detail}</p>
              <ul>
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <Link
                href={`/services/${s.slug}`}
                className="svc-link"
                data-cursor="VIEW"
                tabIndex={on ? 0 : -1}
              >
                EXPLORE {s.title.toUpperCase()}
                <span>
                  <ArrowUpRight size={20} />
                </span>
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
