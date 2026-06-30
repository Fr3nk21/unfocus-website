'use client';

import RevealWrapper from './RevealWrapper';
import SectionLabel from './SectionLabel';

const LOGOS = [
  '/images/partners/rhd.png',
  '/images/partners/coasit.png',
  '/images/partners/gtano.webp',
  '/images/partners/attico.webp',
  '/images/partners/aod.png',
  '/images/partners/filmonick.png',
  '/images/partners/fratellino.png',
  '/images/partners/delbocia.webp',
  '/images/partners/agriturismo.png',
  '/images/partners/evans.svg',
  '/images/partners/italpaint.webp',
  '/images/partners/ogi.webp',
  '/images/partners/starlight.webp',
  '/images/partners/toyota.webp',
];

const ROW_ONE = LOGOS.slice(0, 4);
const ROW_TWO = LOGOS.slice(4);

function LogoRow({ logos, direction = 'left', speed = 40 }) {
  const doubled = [...logos, ...logos, ...logos]; // triple for seamless wide loop
  return (
    <div className="logo-row">
      <div className="logo-track" style={{ animationDuration: speed + 's', animationDirection: direction === 'left' ? 'normal' : 'reverse' }}>
        {doubled.map((src, i) => (
          <div key={i} className="logo-item">
            <img src={src} alt="" loading="lazy" draggable={false} width="160" height="42" style={{ width: 'auto', height: '100%', objectFit: 'contain' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Partners() {
  return (
    <section className="site-section" style={{ backgroundColor: '#1E1B14' /* fixed dark, matches Gallery */ }}>
      <div className="site-container" style={{ textAlign: 'center' }}>
        <RevealWrapper variant="reveal">
          <SectionLabel number="03" align="center" />
          <p className="t-eyebrow">Clients</p>
          <h2 className="t-h2" style={{ color: '#F4EFE5' }}>Trusted by</h2>
        </RevealWrapper>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2.5rem' }}>
        <LogoRow logos={ROW_ONE} direction="left" speed={25} />
        <LogoRow logos={ROW_TWO} direction="right" speed={32} />
      </div>

      <style>{`
        .logo-row { width: 100%; overflow: hidden; }
        .logo-track {
          display: flex;
          gap: 4rem;
          width: max-content;
          align-items: center;
          animation-name: logoScroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .logo-track:hover { animation-play-state: paused; }
        .logo-item {
          flex-shrink: 0;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.55;
          transition: opacity 0.3s ease;
        }
        .logo-item:hover { opacity: 1; }
        .logo-item img {
          height: 100%;
          width: auto;
          object-fit: contain;
          filter: grayscale(1) brightness(1.6);
        }
        @keyframes logoScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}
