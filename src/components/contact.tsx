'use client';
import { useState, type FormEvent } from 'react';
import { ArrowUpRight, CalendarDays, MessageCircle, Send } from 'lucide-react';
import { site } from '@/lib/config';
export function Contact() {
  const [status, setStatus] = useState('');
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `UNIVELLE project inquiry — ${String(data.get('service'))}`;
    const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\n\nProject:\n${data.get('message')}`;
    if (site.email === 'hello@example.com') {
      setStatus(
        'The contact email has not been configured yet. Add your real email in src/lib/config.ts before launch.',
      );
      return;
    }
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus(
      'Your email app should open with the inquiry. Please send it to complete your request.',
    );
  }
  return (
    <section className="contact-section" id="contact">
      <div className="container contact-layout">
        <div data-reveal>
          <p className="eyebrow light">{'// THE NEXT MOVE'}</p>
          <h2 className="contact-title">
            HAVE A<br />
            <em>BIG IDEA?</em>
          </h2>
          <p className="contact-description">
            The most interesting things start with a conversation. Tell us what
            you have in mind.
          </p>
          <div className="contact-actions">
            {site.whatsapp ? (
              <a
                className="outline-pill"
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={17} /> WhatsApp <ArrowUpRight size={16} />
              </a>
            ) : (
              <span className="disabled-action">
                <MessageCircle size={17} /> WhatsApp · Coming soon
              </span>
            )}
            {site.bookingUrl ? (
              <a
                className="outline-pill"
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CalendarDays size={17} /> Book a call{' '}
                <ArrowUpRight size={16} />
              </a>
            ) : (
              <span className="disabled-action">
                <CalendarDays size={17} /> Booking · Coming soon
              </span>
            )}
          </div>
        </div>
        <form className="inquiry-form" onSubmit={submit} data-reveal>
          <p className="form-label">
            START A PROJECT <span>↗</span>
          </p>
          <label>
            Your name
            <input
              name="name"
              required
              maxLength={100}
              placeholder="How should we call you?"
            />
          </label>
          <label>
            Email address
            <input
              name="email"
              type="email"
              required
              maxLength={200}
              placeholder="you@company.com"
            />
          </label>
          <label>
            What can we help with?
            <select name="service" required defaultValue="">
              <option value="" disabled>
                Select a service
              </option>
              <option>Digital Marketing</option>
              <option>Social & Content</option>
              <option>AI & Automation</option>
              <option>Web & Software</option>
              <option>Brand & Design</option>
              <option>Something else</option>
            </select>
          </label>
          <label>
            Tell us about your project
            <textarea
              name="message"
              required
              rows={3}
              maxLength={3000}
              placeholder="The big picture, your goals, your timeline..."
            />
          </label>
          <button className="submit-btn" type="submit">
            PREPARE INQUIRY <Send size={16} />
          </button>
          <p className="form-note">
            This opens your email app; it does not submit to a server.
          </p>
          {status && (
            <p role="status" className="form-status">
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
