'use client';

import { useState, useEffect } from 'react';
import RevealWrapper from './RevealWrapper';
import YoutubeModal from './YoutubeModal';

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const [showThree, setShowThree] = useState(false);
  const [ThreeHero, setThreeHero] = useState(null);

  useEffect(() => {
    import('./ThreeHero').then((mod) => {
      setThreeHero(() => mod.default);
      setShowThree(true);
    });
  }, []);

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: '72px',
        overflow: 'hidden',
        backgroundColor: 'var(--ivory)',
      }}
    >
      {showThree && ThreeHero && <ThreeHero />}

      {/* Vertical text far left */}
      <div
        style={{
          position: 'absolute',
          left: '1.25rem',
          zIndex: 1,
          top: '50%',
          transform: 'translateY(-50%)',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          fontSize: '0.65rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--taupe)',
          fontWeight: 300,
          opacity: 0.7,
          userSelect: 'none',
        }}
      >
        37.8199° S · 144.9834° E
      </div>

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '4rem 2rem 4rem 4rem',
          display: 'grid',
          gridTemplateColumns: '60% 40%',
          gap: '4rem',
          alignItems: 'center',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
        className="hero-grid"
      >
        {/* Left column */}
        <div>
          <RevealWrapper>
            <p
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--taupe)',
                fontVariant: 'small-caps',
                marginBottom: '1.5rem',
                fontWeight: 400,
              }}
            >
              Richmond · Melbourne, Australia
            </p>
          </RevealWrapper>

          <RevealWrapper>
            <h1
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                lineHeight: 1.08,
                fontWeight: 700,
                color: 'var(--ink)',
                marginBottom: '1.75rem',
                letterSpacing: '-0.02em',
              }}
            >
              Visual{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  color: 'var(--sienna)',
                }}
              >
                craft
              </em>{' '}
              that moves people
            </h1>
          </RevealWrapper>

          <RevealWrapper>
            <p
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.72,
                color: 'var(--charcoal)',
                maxWidth: '480px',
                marginBottom: '2.5rem',
                fontWeight: 300,
                opacity: 0.85,
              }}
            >
              Italian-born storyteller based in Melbourne. I create video
              and photography for hospitality, corporate, and social media
              brands that deserve to be seen clearly.
            </p>
          </RevealWrapper>

          <RevealWrapper>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 2rem',
                  fontSize: '0.875rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontWeight: 400,
                  border: '1px solid var(--ink)',
                  background: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'var(--ink)',
                  color: 'var(--ivory)',
                }}
              >
                <span>View Showreel</span>
              </button>
              <a
                href="#services"
                style={{
                  color: 'var(--sienna)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  letterSpacing: '0.04em',
                  fontWeight: 400,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'gap 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.gap = '0.7rem';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.gap = '0.4rem';
                }}
              >
                Services →
              </a>
            </div>
          </RevealWrapper>
        </div>

        {/* Right column — decorative frame */}
        <RevealWrapper>
          <div style={{ position: 'relative' }}>
            <div
              style={{
                backgroundColor: '#1C1A14',
                aspectRatio: '4/5',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {/* Ornamental corner brackets */}
              {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                <span
                  key={i}
                  style={{
                    position: 'absolute',
                    width: '28px',
                    height: '28px',
                    borderColor: 'rgba(244,239,229,0.3)',
                    borderStyle: 'solid',
                    borderWidth: 0,
                    ...(i === 0 && { top: '16px', left: '16px', borderTopWidth: '1px', borderLeftWidth: '1px' }),
                    ...(i === 1 && { top: '16px', right: '16px', borderTopWidth: '1px', borderRightWidth: '1px' }),
                    ...(i === 2 && { bottom: '16px', left: '16px', borderBottomWidth: '1px', borderLeftWidth: '1px' }),
                    ...(i === 3 && { bottom: '16px', right: '16px', borderBottomWidth: '1px', borderRightWidth: '1px' }),
                  }}
                />
              ))}

              {/* Play button */}
              <button
                className="play-circle"
                aria-label="Play showreel"
                onClick={() => setModalOpen(true)}
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  border: '1.5px solid rgba(244,239,229,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  background: 'none',
                  transition: 'border-color 0.3s ease, transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--sienna)';
                  e.currentTarget.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(244,239,229,0.5)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <svg
                  width="20"
                  height="22"
                  viewBox="0 0 20 22"
                  fill="none"
                  style={{ marginLeft: '3px' }}
                >
                  <path d="M1 1.5L19 11L1 20.5V1.5Z" fill="rgba(244,239,229,0.7)" />
                </svg>
              </button>
            </div>

            {/* Caption */}
            <p
              style={{
                marginTop: '0.75rem',
                fontSize: '0.7rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--taupe)',
                textAlign: 'center',
                fontWeight: 300,
              }}
            >
              Sony A7 IV · DaVinci Resolve
            </p>
          </div>
        </RevealWrapper>
      </div>

      {/* Scroll cue */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: '1px',
            height: '48px',
            background: 'linear-gradient(to bottom, transparent, var(--taupe))',
            animation: 'scrollTick 2s ease-in-out infinite',
          }}
        />
        <span
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--taupe)',
            fontWeight: 300,
          }}
        >
          Scroll
        </span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding: 2rem 1.5rem 5rem !important;
          }
        }
      `}</style>

      <YoutubeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} videoId="tnlTOUZydrk" title="Francesco Bugugnoli — Showreel 2025" />
    </section>
  );
}
