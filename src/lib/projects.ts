import { services } from '@/lib/config';

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  /** A service slug from config.ts (used for filtering). */
  category: (typeof services)[number]['slug'];
  summary: string;
  /** Path under /public, e.g. '/work/acme.jpg'. Falls back to a gradient. */
  image?: string;
  /** Live site or case-study link. */
  url?: string;
  challenge?: string;
  solution?: string;
  /** Only add results you can back up with real numbers. */
  results?: string[];
  accent: string;
  /** Remove (or set false) once you replace the sample with a real project. */
  sample?: boolean;
};

// TODO: replace these SAMPLE entries with your real projects. Each sample
// shows a "SAMPLE" badge on the site so nothing here is mistaken for real work.
export const projects: Project[] = [
  {
    slug: 'sample-brand-website',
    title: 'Sample Project One',
    client: 'Client name',
    year: '2026',
    category: 'web-software',
    summary: 'A short, one-line description of what you built for this client.',
    challenge: 'What problem did the client come to you with?',
    solution: 'What did you design, build or run to solve it?',
    accent: 'linear-gradient(135deg,#6d53bc,#b6a4ff)',
    sample: true,
  },
  {
    slug: 'sample-social-campaign',
    title: 'Sample Project Two',
    client: 'Client name',
    year: '2026',
    category: 'social-content',
    summary:
      'A short, one-line description of the campaign or content you made.',
    accent: 'linear-gradient(135deg,#c4527a,#ffb48a)',
    sample: true,
  },
  {
    slug: 'sample-automation',
    title: 'Sample Project Three',
    client: 'Client name',
    year: '2026',
    category: 'ai-automation',
    summary:
      'A short, one-line description of the system or workflow you automated.',
    accent: 'linear-gradient(135deg,#1f6f78,#9ef0d2)',
    sample: true,
  },
];

export const categoryLabel = (slug: string) =>
  services.find((s) => s.slug === slug)?.title ?? slug;
