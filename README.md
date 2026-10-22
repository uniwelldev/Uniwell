# UNIVELLE® — Agency Website / Phase 1

An original, responsive Next.js 15 + React 19 + TypeScript + Tailwind 4 homepage with GSAP scroll animation, accessible mobile navigation, reusable visual system, services, approach and inquiry UI.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. For deployment, run `npm run build` and deploy to Vercel or any Next.js-compatible host.

## Before going live

1. Edit `src/lib/config.ts` with your real agency email, WhatsApp number (international format, digits only), and Calendly/Cal.com URL. Until configured, WhatsApp and booking are visibly marked coming soon.
2. The inquiry form currently prepares an email via `mailto:` and **does not store or send data server-side**. Replace it with a validated server action/API route + email provider (Resend, etc.) for reliable production submissions, spam protection, and confirmation.
3. Add real case studies, verified results, business details, privacy policy, and legal pages before launch. None are invented here.
4. Add a real domain to your hosting provider and configure DNS, analytics consent and Search Console.
5. Test on actual mobile devices, check WCAG contrast, and run Lighthouse performance audits.

## Architecture

- `src/app/page.tsx`: homepage composition
- `src/app/globals.css`: visual design system and responsive layout
- `src/components/animations.tsx`: GSAP ScrollTrigger animations, reduced-motion support
- `src/components/navigation.tsx`: accessible responsive navigation
- `src/components/contact.tsx`: inquiry and external contact actions
- `src/lib/config.ts`: agency settings and services data

This is **Phase 1**, not a completed multi-page agency website. Additional routes, CMS, backend lead capture, and real portfolio work belong in later phases.
