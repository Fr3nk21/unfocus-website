'use client';

import { useState } from 'react';
import RevealWrapper from './RevealWrapper';
import SectionLabel from './SectionLabel';
import SectionWatermark from './SectionWatermark';

const services = [
  { word: 'Social media videos', image: '/videos/pickle-jar-thumb.jpg' },
  { word: 'Hospitality content', image: '/videos/fratellino-thumb.jpg' },
  { word: 'Corporate films', image: '/videos/toyota-thumb.jpg' },
  { word: 'Event coverage', image: '/videos/floridia-night-thumb.jpg' },
  { word: 'Legacy videos', image: '/videos/liam-thumb.jpg' },
  { word: 'Commercial photography', image: '/images/portfolio/bar-ussou/01.webp' },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="services" className="site-section" style={{
      backgroundColor: 'var(--cream)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <SectionWatermark text="CREATE" position="right" />
      <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Two columns aligned */}
        <div className="services-grid" style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start',
        }}>
          {/* Faint vertical divider between columns */}
          <span aria-hidden="true" className="services-divider" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'var(--ink)', opacity: 0.06, pointerEvents: 'none' }} />

          {/* Left: header + service list together */}
          <div>
            <RevealWrapper variant="reveal">
              <SectionLabel number="01" />
              <p className="t-eyebrow">Services</p>
              <h2 className="t-h2" style={{ marginBottom: '2.5rem' }}>What I <span style={{ color: 'var(--sienna)' }}>create</span></h2>
            </RevealWrapper>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {services.map((service, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveIndex(i)}
                style={{
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--parchment)',
                  cursor: 'default',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <span style={{
                  fontSize: '0.8rem',
                  color: activeIndex === i ? 'var(--sienna)' : 'var(--taupe)',
                  fontWeight: 400,
                  fontVariantNumeric: 'tabular-nums',
                  transition: 'color 0.3s ease',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  fontWeight: 500,
                  color: activeIndex === i ? 'var(--ink)' : 'var(--taupe)',
                  opacity: activeIndex === i ? 1 : 0.5,
                  transition: 'color 0.3s ease, opacity 0.3s ease',
                }}>
                  {service.word}
                </span>
              </div>
            ))}
            </div>
          </div>

          {/* Right: large square image, top-aligned with heading, right edge to container edge */}
          <div style={{
            position: 'relative',
            aspectRatio: '1 / 1',
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
            justifySelf: 'end',
          }}>
            {services.map((service, i) => (
              <img
                key={i}
                src={service.image}
                alt={service.word}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: activeIndex === i ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .services-grid > div:last-child {
            order: -1;
            margin-bottom: 1.5rem;
          }
          .services-divider { display: none !important; }
        }
      `}</style>
    </section>
  );
}
