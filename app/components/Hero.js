'use client';

import { useState } from 'react';
import RevealWrapper from './RevealWrapper';
import YoutubeModal from './YoutubeModal';
import ThreeHero from './ThreeHero';

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: '72px',
        overflow: 'hidden',
        backgroundColor: 'transparent',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--ivory)', zIndex: 0 }} />
      <ThreeHero />

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
          zIndex: 2,
        }}
        className="hero-grid"
      >
        {/* Left column */}
        <div>
          <RevealWrapper delay={0}>
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
              <span
                style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#4ADE80',
                  marginRight: '8px',
                  verticalAlign: 'middle',
                  animation: 'livePulse 2s ease-in-out infinite',
                }}
              />
              Richmond · Melbourne, Australia
            </p>
          </RevealWrapper>

          <RevealWrapper delay={0.15}>
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
              Stories told in{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  color: 'var(--sienna)',
                }}
              >
                light.
              </em>
            </h1>
          </RevealWrapper>

          <RevealWrapper delay={0.3}>
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
              Video and photography for hospitality, corporate, and social brands. Based in Melbourne.
            </p>
          </RevealWrapper>

          <RevealWrapper delay={0.45}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 2rem',
                  fontSize: '0.8rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 400,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: 'var(--sienna)',
                  color: 'var(--ivory)',
                  borderRadius: '0px',
                }}
              >
                <span>View Showreel</span>
              </button>
              <a
                href="#services"
                style={{
                  color: 'var(--taupe)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  letterSpacing: '0.04em',
                  fontWeight: 400,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'color 0.2s ease, gap 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--sienna)';
                  e.currentTarget.style.gap = '0.7rem';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--taupe)';
                  e.currentTarget.style.gap = '0.4rem';
                }}
              >
                What I do →
              </a>
            </div>
          </RevealWrapper>
        </div>

        {/* Right column — decorative frame */}
        <RevealWrapper delay={0.2}>
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

          </div>
        </RevealWrapper>
      </div>

      {/* Scroll cue */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}
      >
        <a
          href="#portfolio"
          aria-label="Scroll to portfolio"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            animation: 'gentleBounce 2s ease-in-out infinite',
          }}
        >
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
            <path d="M1 1L10 10L19 1" stroke="var(--taupe)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </a>
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

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '300px',
          background: 'linear-gradient(to bottom, transparent 0%, var(--ivory) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}
