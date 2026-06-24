'use client';

import { useState } from 'react';
import RevealWrapper from './RevealWrapper';
import SectionLabel from './SectionLabel';
import SectionWatermark from './SectionWatermark';
import useIsMobile from '../hooks/useIsMobile';

const services = [
  { word: 'Social media videos', image: '/images/services/DSC08931.webp' },
  { word: 'Hospitality content', image: '/images/services/05_01_fratellino.webp' },
  { word: 'Corporate films', image: '/images/services/italpaint_project02_05.webp' },
  { word: 'Event coverage', image: '/images/services/DSC08108.webp' },
  { word: 'Legacy videos', image: '/images/services/DSC03098.webp' },
  { word: 'Commercial photography', image: '/images/services/DSC05443.webp' },
];

export default function Services() {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="services" className="site-section" style={{
      backgroundColor: 'var(--cream)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <SectionWatermark text="CREATE" position="right" extraStyle={{ right: '12%' }} />
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

          {/* Right: hover image stack (desktop) or swipeable carousel (mobile) */}
          {isMobile ? (
            <div className="snap-carousel services-carousel">
              {services.map((service, i) => (
                <figure key={i} className="services-carousel-card">
                  <img src={service.image} alt={service.word} loading="lazy" />
                  <figcaption className="services-carousel-label">{service.word}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
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
          )}
        </div>
      </div>

      <style>{`
        .services-carousel {
          gap: 1rem;
          overflow-y: visible;
          scroll-padding-inline-start: 0;
          padding: 0 0 1rem;
        }
        .services-carousel-card {
          position: relative;
          flex: 0 0 auto;
          width: 80%;
          max-width: 340px;
          aspect-ratio: 1 / 1;
          scroll-snap-align: start;
          border-radius: 12px;
          overflow: hidden;
          margin: 0;
        }
        .services-carousel-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .services-carousel-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%);
          pointer-events: none;
        }
        .services-carousel-label {
          position: absolute;
          left: 1rem;
          bottom: 1rem;
          z-index: 1;
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #F4EFE5;
          margin: 0;
          pointer-events: none;
        }
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .services-divider { display: none !important; }
        }
      `}</style>
    </section>
  );
}
