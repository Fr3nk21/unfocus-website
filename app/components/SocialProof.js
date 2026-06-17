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
    <section id="testimonial" className="site-section" style={{ backgroundColor: 'var(--ivory)', position: 'relative', overflow: 'hidden' }}>
      <SectionWatermark text="TRUSTED" position="left" />

      <div
        className="site-container socialproof-grid"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
        }}
      >
        {/* LEFT: testimonials */}
        <div
          style={{ minWidth: 0 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <RevealWrapper variant="reveal">
            <SectionLabel number="03" />
            <p className="t-eyebrow">Testimonials</p>
            <h2 className="t-h2" style={{ color: 'var(--ink)', marginBottom: '2rem' }}>
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
              color: 'var(--ink)',
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
            <p style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--taupe)' }}>
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
                  backgroundColor: active === i ? 'var(--sienna)' : 'var(--parchment)',
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

        {/* RIGHT: two client logo carousels with edge fade */}
        <div className="logos-wrap" style={{ minWidth: 0, overflow: 'hidden' }}>
          <div className="logo-row">
            <div className="logo-track logo-track--ltr">
              {[...LOGOS, ...LOGOS, ...LOGOS].map((src, i) => (
                <div key={i} className="logo-item"><img src={src} alt="" loading="lazy" draggable={false} /></div>
              ))}
            </div>
          </div>
          <div className="logo-row">
            <div className="logo-track logo-track--rtl">
              {[...LOGOS, ...LOGOS, ...LOGOS].map((src, i) => (
                <div key={i} className="logo-item"><img src={src} alt="" loading="lazy" draggable={false} /></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .logos-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          width: 100%;
          overflow: hidden;
          /* Edge fade mask: logos dissolve at left and right edges */
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
        }
        .logo-row { width: 100%; overflow: hidden; }
        .logo-track {
          display: flex;
          gap: 3rem;
          width: max-content;
          align-items: center;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .logo-track--ltr { animation-name: logoScrollLtr; animation-duration: 28s; }
        .logo-track--rtl { animation-name: logoScrollRtl; animation-duration: 34s; }
        .logo-track:hover { animation-play-state: paused; }
        .logo-item {
          flex-shrink: 0;
          height: 42px;
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
          filter: brightness(0);            /* solid black in light mode */
        }
        .dark .logo-item img {
          filter: brightness(0) invert(1);  /* solid white in dark mode */
        }
        @keyframes logoScrollLtr {
          from { transform: translateX(-33.333%); }
          to { transform: translateX(0); }
        }
        @keyframes logoScrollRtl {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @media (max-width: 768px) {
          .socialproof-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .logo-item { height: 36px; }
        }
      `}</style>
    </section>
  );
}
