'use client';

import { useState, useEffect, useRef } from 'react';

const services = [
  { word: 'social media videos.', image: '/videos/pickle-jar-thumb.jpg' },
  { word: 'hospitality content.', image: '/videos/fratellino-thumb.jpg' },
  { word: 'corporate films.', image: '/videos/toyota-thumb.jpg' },
  { word: 'event coverage.', image: '/videos/floridia-night-thumb.jpg' },
  { word: 'legacy videos.', image: '/videos/liam-thumb.jpg' },
  { word: 'commercial photography.', image: '/images/portfolio/bar-ussou/01.webp' },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setActiveIndex(index);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" style={{
      backgroundColor: 'var(--cream)',
      padding: '5rem 2rem',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
      }}>
        {/* Section label */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--taupe)',
            marginBottom: '0.5rem',
          }}>
            Services
          </p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            fontWeight: 700,
            color: 'var(--ink)',
          }}>
            What I create
          </h2>
        </div>

        {/* Two columns */}
        <div className="services-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start',
        }}>
          {/* Left: scrolling service words */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {services.map((service, i) => (
              <div
                key={i}
                ref={(el) => (itemRefs.current[i] = el)}
                data-index={i}
                style={{
                  minHeight: '50vh',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    fontWeight: 500,
                    color: 'var(--taupe)',
                    opacity: 0.5,
                  }}>
                    I create
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    fontWeight: 600,
                    color: activeIndex === i ? 'var(--sienna)' : 'var(--taupe)',
                    opacity: activeIndex === i ? 1 : 0.3,
                    transition: 'color 0.4s ease, opacity 0.4s ease',
                  }}>
                    {service.word}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right: sticky photo that changes */}
          <div style={{
            position: 'sticky',
            top: '20vh',
            height: '60vh',
            borderRadius: '8px',
            overflow: 'hidden',
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
                  transition: 'opacity 0.6s ease',
                }}
              />
            ))}
            {/* Subtle overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent)',
              pointerEvents: 'none',
            }} />
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
            position: relative !important;
            top: auto !important;
            height: 50vh !important;
            order: -1;
          }
          .services-grid > div:first-child > div {
            min-height: 30vh !important;
          }
        }
      `}</style>
    </section>
  );
}
