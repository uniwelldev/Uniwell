'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { site } from '@/lib/config';

const choices = [
  'Digital Marketing',
  'Social & Content',
  'AI & Automation',
  'Web & Software',
  'Brand & Design',
  'Something else',
];

const timelines = ['As soon as possible', 'In 1–3 months', 'Just exploring'];

const questions = [
  "First things first, what's your name?",
  'What can we help you with?',
  'Tell us the big idea.',
  'When would you like to start?',
  'Where can we reach you?',
];

const emailReady = site.email !== 'hello@example.com';

function Way({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <span className="way-icon">{icon}</span>
      <span className="way-text">
        <small>{label}</small>
        {value}
      </span>
      {href && <ArrowUpRight size={20} aria-hidden="true" />}
    </>
  );
  return href ? (
    <a
      className="way"
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
    >
      {inner}
    </a>
  ) : (
    <span className="way off">{inner}</span>
  );
}

export function Contact() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [idea, setIdea] = useState('');
  const [timeline, setTimeline] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState('');
  const stage = useRef<HTMLFormElement>(null);

  const valid = [
    name.trim().length > 0,
    service !== '',
    idea.trim().length > 0,
    timeline !== '',
    /^\S+@\S+\.\S+$/.test(email.trim()),
  ];

  // Move focus to the new question's first control when the step changes.
  useEffect(() => {
    if (step > 0 || name) {
      stage.current
        ?.querySelector<HTMLElement>('[data-focus]')
        ?.focus({ preventScroll: true });
    }
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  function submit(e: FormEvent) {
    e.preventDefault();
    if (step < 5) {
      if (valid[step]) setStep(step + 1);
      return;
    }
    const subject = `BYTELAMP project inquiry — ${service}`;
    const body = `Name: ${name}\nEmail: ${email}\nService: ${service}\nStart: ${timeline}\n\nProject:\n${idea}`;
    if (!emailReady) {
      setStatus(
        'The contact email has not been configured yet. Add your real email in src/lib/config.ts before launch.',
      );
      return;
    }
    setSent(true);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus(
      'Your email app should open with the brief. Please send it to complete your request.',
    );
  }

  // Decorative barcode derived from the answers.
  const code = `${name}${service}${email}${idea}`;
  const bars = Array.from({ length: 34 }, (_, i) => {
    const c = code.charCodeAt(i % Math.max(code.length, 1)) || 70;
    return 2 + ((c * (i + 3)) % 5);
  });

  const chip = (
    label: string,
    value: string,
    set: (v: string) => void,
    first: boolean,
  ) => (
    <label key={label} className={value === label ? 'on' : ''}>
      <input
        type="radio"
        name={label}
        checked={value === label}
        onChange={() => {
          set(label);
        }}
        data-focus={first || value === label ? true : undefined}
      />
      {label}
    </label>
  );

  return (
    <section className="contact3" id="contact">
      <div className="container contact3-grid">
        <div className="contact3-left" data-reveal>
          <p className="eyebrow light">{'// THE NEXT MOVE'}</p>
          <h2 className="contact-title">
            HAVE A<br />
            <em>BIG IDEA?</em>
          </h2>
          <p className="contact-description">
            The most interesting things start with a conversation. Tell us what
            you have in mind.
          </p>
          <div className="ways">
            <Way
              icon={<Mail size={18} />}
              label="EMAIL"
              value={emailReady ? site.email : 'Coming soon'}
              href={emailReady ? `mailto:${site.email}` : undefined}
            />
            <Way
              icon={<MessageCircle size={18} />}
              label="WHATSAPP"
              value={site.whatsapp ? 'Chat with us' : 'Coming soon'}
              href={
                site.whatsapp ? `https://wa.me/${site.whatsapp}` : undefined
              }
            />
            <Way
              icon={<CalendarDays size={18} />}
              label="BOOK A CALL"
              value={site.bookingUrl ? 'Pick a time' : 'Coming soon'}
              href={site.bookingUrl || undefined}
            />
          </div>
        </div>

        <form
          className="stage"
          ref={stage}
          onSubmit={submit}
          noValidate
          data-reveal
        >
          {step < 5 ? (
            <>
              <div className="stage-top">
                <span>0{step + 1} / 05</span>
                <div className="seg" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <i key={i} className={i <= step ? 'on' : ''} />
                  ))}
                </div>
              </div>
              <div
                className="q"
                key={step}
                role="group"
                aria-labelledby="q-label"
              >
                <h3 id="q-label">{questions[step]}</h3>
                {step === 0 && (
                  <input
                    className="st-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    maxLength={100}
                    autoComplete="name"
                    data-focus
                    aria-label="Your name"
                  />
                )}
                {step === 1 && (
                  <div
                    className="st-chips"
                    role="radiogroup"
                    aria-label="Service"
                  >
                    {choices.map((c, i) =>
                      chip(c, service, setService, i === 0),
                    )}
                  </div>
                )}
                {step === 2 && (
                  <textarea
                    className="st-input area"
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="The big picture, your goals…"
                    rows={4}
                    maxLength={3000}
                    data-focus
                    aria-label="Your idea"
                  />
                )}
                {step === 3 && (
                  <div
                    className="st-chips"
                    role="radiogroup"
                    aria-label="Start time"
                  >
                    {timelines.map((t, i) =>
                      chip(t, timeline, setTimeline, i === 0),
                    )}
                  </div>
                )}
                {step === 4 && (
                  <input
                    className="st-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    maxLength={200}
                    autoComplete="email"
                    data-focus
                    aria-label="Email address"
                  />
                )}
              </div>
              <div className="stage-nav">
                <button
                  type="button"
                  className="st-back"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 0}
                >
                  <ArrowLeft size={16} /> BACK
                </button>
                <button
                  type="submit"
                  className="st-next"
                  disabled={!valid[step]}
                >
                  {step === 4 ? 'REVIEW BRIEF' : 'NEXT'}{' '}
                  <ArrowRight size={16} />
                </button>
              </div>
            </>
          ) : (
            <div className="review">
              <p className="stage-top">
                <span>READY TO SEND</span>
                <button
                  type="button"
                  className="t-edit"
                  onClick={() => setStep(0)}
                >
                  EDIT
                </button>
              </p>
              <div className={sent ? 'ticket sent' : 'ticket'}>
                <div className="ticket-main">
                  <p className="t-label">PROJECT BRIEF · {site.name}</p>
                  <dl>
                    <div>
                      <dt>FROM</dt>
                      <dd>{name}</dd>
                    </div>
                    <div>
                      <dt>NEEDS</dt>
                      <dd>{service}</dd>
                    </div>
                    <div>
                      <dt>START</dt>
                      <dd>{timeline}</dd>
                    </div>
                    <div>
                      <dt>REACH</dt>
                      <dd>{email}</dd>
                    </div>
                  </dl>
                  <p className="t-idea">{idea}</p>
                </div>
                <div className="ticket-stub">
                  <div className="bars" aria-hidden="true">
                    {bars.map((w, i) => (
                      <i key={i} style={{ height: `${w * 6 + 18}px` }} />
                    ))}
                  </div>
                  <button type="submit" className="t-send">
                    SEND <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
              <p className="cf-note">
                This opens your email app; it does not submit to a server.
              </p>
              {status && (
                <p role="status" className="cf-status">
                  {status}
                </p>
              )}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
