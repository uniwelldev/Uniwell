import Link from 'next/link';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Sparkles,
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { MotionProvider } from '@/components/animations';
import { ServiceAccordion } from '@/components/service-accordion';
import { HeroOrb } from '@/components/hero-orb';
import { LogoMark } from '@/components/logo';
import { Cursor } from '@/components/cursor';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { Intro } from '@/components/intro';
import { Approach } from '@/components/approach';
import { projects } from '@/lib/projects';
import { ProjectCard } from '@/components/project-card';

export default function Home() {
  return (
    <MotionProvider>
      <main id="top">
        <Cursor />
        <div className="dark-stage">
          <Navigation />
          <section className="hero container">
            <div className="hero-meta" data-hero-reveal>
              <span>
                <span className="status-dot" /> INDEPENDENT DIGITAL STUDIO
              </span>
              <span>MARKETING × CONTENT × AI × SOFTWARE × BRAND</span>
            </div>
            <div className="hero-title-wrap">
              <h1
                className="hero-title"
                aria-label="We Automate. We Create. We Accelerate."
              >
                <span data-hero-reveal aria-hidden="true">
                  WE AUTOMATE.
                </span>
                <span data-hero-reveal aria-hidden="true">
                  WE CREATE.
                </span>
                <span data-hero-reveal aria-hidden="true">
                  WE{' '}
                  <i>
                    ACCELERATE<span className="title-star">✳</span>
                  </i>
                </span>
              </h1>
              <HeroOrb />
            </div>
            <div className="hero-bottom" data-hero-reveal>
              <p>
                One studio for everything digital. Brand, website, content, marketing and
                AI automation, built to work together and move your business
                forward.
              </p>
              <a
                href="#expertise"
                className="round-arrow"
                aria-label="Explore our expertise"
              >
                <ArrowDownRight size={28} />
              </a>
              <span className="vertical-marker">SCROLL TO EXPLORE — 001</span>
            </div>
            <div className="hero-grid" aria-hidden="true" />
          </section>
          <div className="marquee" aria-hidden="true">
            <div className="marquee-track">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i}>
                  STRATEGY <Asterisk /> DESIGN <Asterisk /> TECHNOLOGY{' '}
                  <Asterisk /> AUTOMATION <Asterisk />{' '}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Intro />

        <section className="services-section" id="expertise">
          <div className="container">
            <div className="section-topline dark-line" data-reveal>
              <span>02 / WHAT WE DO</span>
              <span>CONNECTED CAPABILITIES</span>
            </div>
            <div className="services-head" data-reveal>
              <h2>
                ONE STUDIO.
                <br />
                <em>ENDLESS</em> POSSIBILITIES.
              </h2>
              <p>
                From first impression to lasting impact. Every discipline
                working together.
              </p>
            </div>
            <ServiceAccordion />
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="container">
            <div className="section-topline" data-reveal>
              <span>03 / SELECTED WORK</span>
              <span>500+ PROJECTS DELIVERED</span>
            </div>
            <div className="work-head" data-reveal>
              <h2>
                MADE WITH
                <br />
                <em>PEOPLE.</em>
              </h2>
              <Link className="text-link" href="/work">
                VIEW ALL WORK <ArrowUpRight size={18} />
              </Link>
            </div>
            <div className="work-grid">
              {projects.slice(0, 3).map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>

        <section className="manifesto-section">
          <div className="manifesto-visual" aria-hidden="true">
            <div className="manifesto-shape" data-parallax>
              <div className="manifesto-orbit manifesto-orbit-one" />
              <div className="manifesto-orbit manifesto-orbit-two" />
              <div className="manifesto-logo-panel">
                <LogoMark className="manifesto-logo-mark" />
                <span className="manifesto-logo-name">BYTE<strong>LAMP</strong><sup>®</sup></span>
              </div>
              <span className="manifesto-design-note">CREATIVITY × INTELLIGENCE</span>
            </div>
          </div>
          <div className="container manifesto-content">
            <p className="eyebrow light" data-reveal>
              BUILT FOR THE BOLD
            </p>
            <h2 data-reveal>
              ORDINARY
              <br />
              IS NOT <em>OUR</em>
              <br />
              THING.
            </h2>
            <p data-reveal>
              We blend human creativity and emerging technology to make work
              that feels different — and delivers differently.
            </p>
          </div>
        </section>

        <Approach />

        <section className="statement-section">
          <div className="container" data-reveal>
            <span>YOUR NEXT CHAPTER STARTS HERE</span>
            <p>
              GREAT IDEAS
              <br />
              DESERVE <i>GREAT</i>
              <br />
              EXECUTION<span className="period">.</span>
            </p>
            <a href="#contact">
              LET&apos;S MAKE IT HAPPEN <ArrowRight size={20} />
            </a>
          </div>
          <Sparkles
            className="statement-spark"
            size={150}
            strokeWidth={0.7}
            aria-hidden="true"
          />
        </section>

        <Contact />
        <Footer />
      </main>
    </MotionProvider>
  );
}
