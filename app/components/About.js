'use client';

import Image from 'next/image';
import RevealWrapper from './RevealWrapper';

export default function About() {
  return (
    <section
      id="about"
      className="site-section"
      style={{
        backgroundColor: 'var(--ivory)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'start',
        }}
        className="about-grid site-container"
      >
        {/* Left: portrait placeholder */}
        <RevealWrapper variant="reveal-scale">
          <div style={{ position: 'relative', maxWidth: '400px', margin: 0 }}>
            {/* Offset ornamental frame */}
            <div
              style={{
                position: 'absolute',
                inset: '-16px',
                border: '1px solid var(--parchment)',
                borderRadius: '16px',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
            <Image
              src="/images/portrait-francesco-bugugnoli.jpg"
              alt="Francesco Bugugnoli — Videographer and Photographer, Melbourne"
              width={600}
              height={750}
              quality={80}
              style={{
                width: '100%',
                aspectRatio: '4/5',
                objectFit: 'cover',
                objectPosition: 'center 30%',
                display: 'block',
                position: 'relative',
                zIndex: 1,
                margin: '0 auto',
                borderRadius: '12px',
              }}
            />

          </div>
        </RevealWrapper>

        {/* Right: text */}
        <div className="about-text-col">
          <RevealWrapper variant="reveal" delay={0}>
            <p className="t-eyebrow">About</p>
          </RevealWrapper>

          <RevealWrapper variant="reveal" delay={0.15}>
            <h2
              className="t-h2"
              style={{ marginBottom: 'var(--space-title-to-body)' }}
            >
              Italian eye.{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--sienna)' }}>
                Melbourne
              </em>{' '}
              stories.
            </h2>
          </RevealWrapper>

          <RevealWrapper variant="reveal" delay={0.3}>
            <p
              className="t-body"
              style={{ color: 'var(--charcoal)', marginBottom: '1.25rem' }}
            >
              Born in northern Italy. Raised around architecture, food, and a culture where aesthetics are not optional. Melbourne gave me a new lens — same eye, different light.
            </p>
          </RevealWrapper>

          <RevealWrapper variant="reveal" delay={0.45}>
            <p
              className="t-body"
              style={{ color: 'var(--charcoal)', marginBottom: '1.5rem' }}
            >
              Every frame is considered. Every edit, intentional. I work with light, texture, and the quiet moments between action.
            </p>
          </RevealWrapper>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
