import type { Metadata, Viewport } from 'next';
import { Manrope, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/config';
import { ChatLoader } from '@/components/chat-loader';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});
const space = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'BYTELAMP® — Creative, Technology & Growth',
    template: '%s | BYTELAMP®',
  },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'BYTELAMP® — Make What’s Next',
    description: site.description,
    type: 'website',
    siteName: site.name,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BYTELAMP® — Make What’s Next',
    description: site.description,
  },
};

export const viewport: Viewport = { themeColor: '#101011' };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  description: site.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${space.variable}`}>
        <a className="skip-link" href="#top">
          Skip to content
        </a>
        {children}
        <ChatLoader />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
