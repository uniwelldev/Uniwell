'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { LogoMark } from '@/components/logo';

const links = [
  ['Expertise', '/#expertise'],
  ['Work', '/work'],
  ['About', '/about'],
  ['Approach', '/#approach'],
  ['Contact', '/#contact'],
];

export function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="BYTELAMP home">
        <LogoMark className="logo-mark" />
        BYTE<em>LAMP</em>
        <span>®</span>
      </Link>
      <nav
        id="main-nav"
        className={open ? 'nav-links open' : 'nav-links'}
        aria-label="Main navigation"
      >
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <Link className="nav-cta" href="/#contact">
        LET&apos;S TALK <ArrowUpRight size={16} />
      </Link>
      <button
        className="menu-toggle"
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="main-nav"
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
