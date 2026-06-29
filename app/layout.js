import { Manrope } from 'next/font/google';
import './globals.css';
import ThemeProvider from './components/ThemeProvider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://francescobugugnoli.com/#person',
  name: 'Francesco Bugugnoli',
  jobTitle: 'Videographer & Photographer',
  description: 'Italian-born videographer and photographer based in Richmond, Melbourne.',
  url: 'https://francescobugugnoli.com/',
  telephone: '+61476278891',
  email: 'hello@francescobugugnoli.com',
  sameAs: ['https://www.instagram.com/francesco_bugugnoli/'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Richmond',
    addressRegion: 'VIC',
    postalCode: '3121',
    addressCountry: 'AU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -37.8199,
    longitude: 144.9834,
  },
  areaServed: [
    'Richmond',
    'Fitzroy',
    'Collingwood',
    'South Yarra',
    'Carlton',
    'Northcote',
    'Brunswick',
    'Melbourne CBD',
    'Victoria',
  ],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata = {
  title: 'Francesco Bugugnoli — Videographer & Photographer Melbourne',
  description:
    'Francesco Bugugnoli is a Melbourne-based videographer and photographer specialising in hospitality, corporate, and social media content. Serving Richmond, Fitzroy, Collingwood, South Yarra and greater Melbourne.',
  metadataBase: new URL('https://francescobugugnoli.com'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://francescobugugnoli.com/',
    title: 'Francesco Bugugnoli — Videographer & Photographer Melbourne',
    description:
      'Italian-born creative based in Melbourne. Video production and photography for hospitality, corporate, and social media.',
    images: ['/images/og-image.jpg'],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Francesco Bugugnoli — Videographer Melbourne',
    description:
      'Italian-born creative based in Melbourne. Visual storytelling for hospitality and corporate brands.',
    images: ['/images/og-image.jpg'],
  },
  other: {
    'geo.region': 'AU-VIC',
    'geo.placename': 'Richmond, Melbourne, Victoria, Australia',
    'geo.position': '-37.8136;144.9631',
    ICBM: '-37.8136, 144.9631',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s||(d?'dark':'light');document.documentElement.classList.add(t);}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
