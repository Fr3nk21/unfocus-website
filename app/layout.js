import { Playfair_Display, DM_Sans, IM_Fell_English } from 'next/font/google';
import './globals.css';
import Cursor from './components/Cursor';
import ThemeProvider from './components/ThemeProvider';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
});

const dmSans = DM_Sans({
  variable: '--font-dmsans',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
});

const imFell = IM_Fell_English({
  variable: '--font-imfell',
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://francescobugugnoli.com/#person',
      name: 'Francesco Bugugnoli',
      jobTitle: 'Videographer & Photographer',
      description: 'Italian-born videographer and photographer based in Richmond, Melbourne.',
      url: 'https://francescobugugnoli.com/',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Richmond',
        addressRegion: 'VIC',
        postalCode: '3121',
        addressCountry: 'AU',
      },
    },
    {
      '@type': 'LocalBusiness',
      name: 'UnFocus — Video Production Melbourne',
      url: 'https://francescobugugnoli.com/',
      email: 'hello@francescobugugnoli.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Richmond',
        addressRegion: 'VIC',
        postalCode: '3121',
        addressCountry: 'AU',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -37.8136,
        longitude: 144.9631,
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
    },
  ],
};

export const metadata = {
  title: 'Francesco Bugugnoli — Videographer & Photographer Melbourne | UnFocus',
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
    images: [{ url: '/og-image.jpg' }],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Francesco Bugugnoli — Videographer Melbourne',
    description:
      'Italian-born creative based in Melbourne. Visual storytelling for hospitality and corporate brands.',
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
      className={`${playfair.variable} ${dmSans.variable} ${imFell.variable}`}
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
      <body>
        <ThemeProvider>
          <Cursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
