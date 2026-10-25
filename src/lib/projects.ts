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

export const projects: Project[] = [
  {
    slug: 'digitalfunda',
    title: 'DigitalFunda',
    client: 'DigitalFunda',
    year: '2026',
    category: 'web-software',
    summary:
      'Website for a performance marketing agency in India, built around Google Ads, Meta Ads and measurable growth.',
    image: '/work/digitalfunda.jpg',
    url: 'https://digital-funda-website.vercel.app/',
    challenge:
      'DigitalFunda needed a site that explains performance marketing in business terms and turns visitors into growth conversations.',
    solution:
      'We designed and built a dark, data-led website with an animated campaign-intelligence hero, service and approach sections, an FAQ and a clear "Discuss your growth" call to action.',
    accent: 'linear-gradient(135deg,#0b1445,#5b6cff)',
  },
  {
    slug: 'geekybuzz',
    title: 'GeekyBuzz',
    client: 'GeekyBuzz',
    year: '2026',
    category: 'web-software',
    summary:
      'A review and comparison platform that helps people find SaaS and AI tools worth their money.',
    image: '/work/geekybuzz.jpg',
    url: 'https://www.geekybuzz.com/',
    challenge:
      'Choosing software is confusing: too many tools, unclear pricing and reviews that read like ads.',
    solution:
      'We designed and built a fast content platform with tool search, task-based browsing, side-by-side comparisons, pricing breakdowns and practical guides.',
    accent: 'linear-gradient(135deg,#5b2bd6,#c9a8ff)',
  },
  {
    slug: 'inaya-travels',
    title: 'Inaya Travels',
    client: 'Inaya Travels',
    year: '2026',
    category: 'web-software',
    summary:
      'Website for a travel company selling handpicked tour packages across India and the world, booked over WhatsApp.',
    image: '/work/inaya-travels.jpg',
    url: 'https://www.inayatravelsltd.com/',
    challenge:
      'Inaya Travels wanted travellers to see complete itineraries and prices up front, then book without long forms or back-and-forth.',
    solution:
      'We designed and built a warm, editorial website with destination and deal listings, package pages with itinerary and price, a downloadable brochure and a WhatsApp-first booking flow.',
    accent: 'linear-gradient(135deg,#3d2a00,#e8c98a)',
  },
  {
    slug: 'pawaac',
    title: 'PAWAAC Drones',
    client: 'PAWAAC',
    year: '2026',
    category: 'web-software',
    summary:
      'Website for an Indian defence-tech company building fully autonomous surveillance drones for army and police.',
    image: '/work/pawaac.jpg',
    url: 'https://pawaac.com/',
    challenge:
      'PAWAAC needed to explain complex autonomous drone technology to defence and police buyers in a way that feels credible and clear.',
    solution:
      'We designed and built a cinematic, dark website with a 3D drone hero, sections on the problem, core technology (GPS-denied navigation, vision AI, decision OS), operating environments and products.',
    accent: 'linear-gradient(135deg,#000000,#3a3a3a)',
  },
];

export const categoryLabel = (slug: string) =>
  services.find((s) => s.slug === slug)?.title ?? slug;
