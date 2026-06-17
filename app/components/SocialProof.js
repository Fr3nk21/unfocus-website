'use client';

import { useState, useEffect } from 'react';
import RevealWrapper from './RevealWrapper';
import SectionLabel from './SectionLabel';
import SectionWatermark from './SectionWatermark';

const reviews = [
  {
    name: 'Marilena Kalavrytinos',
    stars: 5,
    text: 'I am extremely satisfied with the business photos and videos Francesco created. His professionalism and creativity really stand out.',
  },
  {
    name: 'Dylan Tyncherov',
    stars: 5,
    text: 'A remarkably disciplined and creatively driven filmmaker whose work speaks louder than words ever could. Concise, thoughtful, and a true doer.',
  },
  {
    name: 'Stefano Ioele',
    stars: 5,
    text: 'There are thousands of videomakers in Australia, but working with Francesco is just easy. His pragmatic approach and attention to detail make him stand out.',
  },
  {
    name: 'Peter McGregor',
    stars: 5,
    text: 'Worked with him as a DoP and camera operator. He knows what he’s doing, very competent, conscientious and reliable. Very pleasant to work with.',
  },
  {
    name: 'Patrick Dunne',
    stars: 5,
    text: 'Very happy with Francesco’s work. He was patient, easy to work with. I would definitely use him again and recommend his services.',
  },
  {
    name: 'Will Rotor',
    stars: 5,
    text: 'Francesco was very professional with a keen creative eye.',
  },
];

const LOGOS = [
  '/images/partners/rhd.png',
  '/images/partners/gtano.png',
  '/images/partners/attico.webp',
  '/images/partners/aod.png',
  '/images/partners/filmonick.png',
  '/images/partners/fratellino.png',
  '/images/partners/coasit_logo2_new.png',
  '/images/partners/delbocia.png',
];

export default function SocialProof() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section id="testimonial" className="site-section" style={{ backgroundColor: '#1E1B14', position: 'relative', overflow: 'hidden' }}>
      <SectionWatermark text="TRUSTED" position="left" />
      <div
        className="site-container social-grid"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '4rem',
          alignItems: 'center',
        }}
      >
        {/* LEFT: reviews */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <RevealWrapper variant="reveal">
            <SectionLabel number="03" />
            <p className="t-eyebrow">Testimonials</p>
            <h2 className="t-h2" style={{ color: '#F4EFE5', marginBottom: '2rem' }}>
              What clients <span style={{ color: 'var(--sienna)' }}>say</span>
            </h2>
          </RevealWrapper>

          {/* Stars */}
          <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '4px' }}>
            {[...Array(reviews[active].stars)].map((_, i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="var(--sienna)" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>

          {/* Review text */}
          <blockquote
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
              fontWeight: 400,
              color: '#F0EBE1',
              lineHeight: 1.7,
              fontStyle: 'italic',
              margin: '0 0 1rem',
              minHeight: '110px',
              transition: 'opacity 0.4s ease',
            }}
          >
            &ldquo;{reviews[active].text}&rdquo;
          </blockquote>

          {/* Author */}
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.9rem', fontWeight: 500, color: 'rgba(240,235,225,0.7)' }}>
              {reviews[active].name}
            </p>
          </div>

          {/* Dots navigation */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Review ${i + 1}`}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: active === i ? 'var(--sienna)' : 'rgba(240,235,225,0.25)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, background-color 0.3s ease',
                  transform: active === i ? 'scale(1.3)' : 'scale(1)',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: client logos grid */}
        <div>
          <p className="t-eyebrow">Clients</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1.5rem', alignItems: 'center' }}>
            {LOGOS.map((src, i) => (
              <div
                key={i}
                style={{ height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5, transition: 'opacity 0.3s' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
              >
                <img src={src} alt="" loading="lazy" draggable={false} style={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'grayscale(1) brightness(1.6)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .social-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
