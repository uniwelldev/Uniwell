import Link from 'next/link';
import { site } from '@/lib/config';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <Link href="/" className="footer-logo" aria-label="BYTELAMP home">
            <LogoMark className="logo-mark" />
            BYTE<em>LAMP</em>
            <span>®</span>
          </Link>
          <p>
            CREATIVE MINDS.
            <br />
            INTELLIGENT SYSTEMS.
            <br />
            MEASURABLE IMPACT.
          </p>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}. ALL RIGHTS RESERVED.
          </span>
          <nav aria-label="Legal" className="footer-legal">
            <Link href="/privacy">PRIVACY</Link>
            <Link href="/terms">TERMS</Link>
          </nav>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  );
}
