'use client';

import { useState } from 'react';

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
    <section id="services" style={{
      backgroundColor: 'var(--cream)',
      padding: '5rem 2rem',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--taupe)', marginBottom: '0.5rem' }}>Services</p>
          <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--ink)' }}>What I create</h2>
        </div>

        {/* Two columns aligned */}
        <div className="services-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
        }}>
          {/* Left: compact service list */}
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

          {/* Right: contained square image that changes with active service */}
          <div style={{
            position: 'relative',
            aspectRatio: '1 / 1',
            width: '100%',
            maxWidth: '480px',
            borderRadius: '12px',
            overflow: 'hidden',
            justifySelf: 'center',
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
        }
      `}</style>
    </section>
  );
}
