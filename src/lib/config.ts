export const site = {
  name: 'UNIVELLE',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  email: 'hello@example.com', // Replace before launch
  whatsapp: '', // International number without +, e.g. 919876543210
  bookingUrl: '', // Your Calendly/Cal.com public booking link
  description:
    'UNIVELLE is an independent digital studio building brands, experiences and intelligent systems.',
};

export const services = [
  {
    index: '01',
    slug: 'digital-marketing',
    tone: 'linear-gradient(165deg,#1a2a00 0%,#5f9300 100%)',
    title: 'Digital Marketing',
    tag: 'GROWTH',
    detail:
      'Paid media, SEO, performance strategy and campaigns that make every impression count.',
    points: [
      'Paid media planning and management',
      'Search engine optimisation',
      'Performance strategy and reporting',
      'Campaign concepts and landing pages',
    ],
  },
  {
    index: '02',
    slug: 'social-content',
    tone: 'linear-gradient(165deg,#3a0d00 0%,#f04e1f 100%)',
    title: 'Social & Content',
    tag: 'CULTURE',
    detail:
      'Social-first stories, creative direction, reels and community experiences that people remember.',
    points: [
      'Social media strategy and calendars',
      'Short-form video and reels',
      'Creative direction and content production',
      'Community management',
    ],
  },
  {
    index: '03',
    slug: 'ai-automation',
    tone: 'linear-gradient(165deg,#00201c 0%,#0fb59a 100%)',
    title: 'AI & Automation',
    tag: 'INTELLIGENCE',
    detail:
      'AI agents, workflow automation and connected systems that give your team time back.',
    points: [
      'AI agents and assistants',
      'Workflow automation',
      'Integrations between your existing tools',
      'Process audits to find what to automate first',
    ],
  },
  {
    index: '04',
    slug: 'web-software',
    tone: 'linear-gradient(165deg,#0b1445 0%,#2f5bff 100%)',
    title: 'Web & Software',
    tag: 'EXPERIENCE',
    detail:
      'High-performance websites, digital products and custom platforms built to convert.',
    points: [
      'Marketing websites and landing pages',
      'Web apps and custom platforms',
      'Performance, accessibility and SEO foundations',
      'Ongoing maintenance and iteration',
    ],
  },
  {
    index: '05',
    slug: 'brand-design',
    tone: 'linear-gradient(165deg,#3d2a00 0%,#f2b01e 100%)',
    title: 'Brand & Design',
    tag: 'IDENTITY',
    detail:
      'Visual identities, art direction, UI/UX and motion systems that feel unmistakably yours.',
    points: [
      'Brand strategy and visual identity',
      'Art direction',
      'UI/UX design',
      'Motion and design systems',
    ],
  },
];

export const steps = [
  {
    n: '01',
    title: 'Discover',
    text: 'Listen deeply. Understand the challenge, audience and ambition.',
    tags: ['Conversations', 'Audit', 'Goals'],
  },
  {
    n: '02',
    title: 'Imagine',
    text: 'Connect strategy and imagination into one sharp direction.',
    tags: ['Strategy', 'Concepts', 'Direction'],
  },
  {
    n: '03',
    title: 'Build',
    text: 'Design, engineer and refine every touchpoint with purpose.',
    tags: ['Design', 'Development', 'Refinement'],
  },
  {
    n: '04',
    title: 'Evolve',
    text: 'Measure what matters, learn quickly and keep moving forward.',
    tags: ['Measure', 'Learn', 'Improve'],
  },
];
