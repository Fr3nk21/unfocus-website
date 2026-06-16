'use client';

import Image from 'next/image';
import RevealWrapper from './RevealWrapper';

export default function About() {
  return (
    <section
      id="about"
      style={{
        backgroundColor: 'var(--ivory)',
        padding: '5rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'start',
        }}
        className="about-grid"
      >
        {/* Left: portrait placeholder */}
        <RevealWrapper variant="reveal-scale">
          <div style={{ position: 'relative', maxWidth: '400px', margin: '0 auto' }}>
            {/* Offset ornamental frame */}
            <div
              style={{
                position: 'absolute',
                inset: '-16px',
                border: '1px solid var(--parchment)',
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
            <p
              className="ornament"
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--taupe)',
                fontVariant: 'small-caps',
                fontWeight: 400,
                marginBottom: '1rem',
              }}
            >
              About
            </p>
          </RevealWrapper>

          <RevealWrapper variant="reveal" delay={0.15}>
            <h2
              className="about-heading"
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 'clamp(38px, 3.8vw, 58px)',
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: '-0.015em',
                color: 'var(--ink)',
                marginTop: '0.75rem',
                marginBottom: '1.5rem',
              }}
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
              style={{
                fontSize: '1rem',
                lineHeight: 1.78,
                color: 'var(--charcoal)',
                marginBottom: '1.25rem',
                fontWeight: 300,
              }}
            >
              Born in northern Italy. Raised around architecture, food, and a culture where aesthetics are not optional. Melbourne gave me a new lens — same eye, different light.
            </p>
          </RevealWrapper>

          <RevealWrapper variant="reveal" delay={0.45}>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.78,
                color: 'var(--charcoal)',
                marginBottom: '1.5rem',
                fontWeight: 300,
              }}
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
