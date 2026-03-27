'use client';

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
        <RevealWrapper>
          <div style={{ position: 'relative' }}>
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
            <div
              style={{
                backgroundColor: 'var(--charcoal)',
                width: '100%',
                maxWidth: '400px',
                aspectRatio: '4/5',
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Corner brackets */}
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  style={{
                    position: 'absolute',
                    width: '24px',
                    height: '24px',
                    borderColor: 'rgba(244,239,229,0.25)',
                    borderStyle: 'solid',
                    borderWidth: 0,
                    ...(i === 0 && { top: '12px', left: '12px', borderTopWidth: '1px', borderLeftWidth: '1px' }),
                    ...(i === 1 && { top: '12px', right: '12px', borderTopWidth: '1px', borderRightWidth: '1px' }),
                    ...(i === 2 && { bottom: '12px', left: '12px', borderBottomWidth: '1px', borderLeftWidth: '1px' }),
                    ...(i === 3 && { bottom: '12px', right: '12px', borderBottomWidth: '1px', borderRightWidth: '1px' }),
                  }}
                />
              ))}
              <span
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(244,239,229,0.3)',
                  fontWeight: 300,
                }}
              >
                Portrait
              </span>
            </div>

            {/* Label below */}
            <p
              style={{
                marginTop: '0.75rem',
                fontSize: '0.7rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--taupe)',
                fontWeight: 300,
              }}
            >
              Portrait · Francesco Bugugnoli
            </p>
          </div>
        </RevealWrapper>

        {/* Right: text */}
        <div className="about-text-col">
          <RevealWrapper>
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
              The Maker
            </p>
          </RevealWrapper>

          <RevealWrapper>
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
              soul.
            </h2>
          </RevealWrapper>

          <RevealWrapper>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.78,
                color: 'var(--charcoal)',
                marginBottom: '1.25rem',
                fontWeight: 300,
              }}
            >
              Born in northern Italy, I grew up surrounded by architecture,
              food, and a culture that treats aesthetics as a daily practice.
              Moving to Melbourne only deepened that sensibility — this city
              has a visual energy unlike anywhere else.
            </p>
          </RevealWrapper>

          <RevealWrapper>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.78,
                color: 'var(--charcoal)',
                marginBottom: '1.5rem',
                fontWeight: 300,
              }}
            >
              My approach to visual storytelling is rooted in light, texture,
              and the quiet moments between action. Every frame is considered.
              Every edit is intentional.
            </p>
          </RevealWrapper>

          {/* Sienna divider */}
          <div
            style={{
              width: '4rem',
              height: '1px',
              backgroundColor: 'var(--sienna)',
              marginBottom: '1.5rem',
            }}
          />

          <RevealWrapper>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.78,
                color: 'var(--charcoal)',
                fontWeight: 300,
              }}
            >
              Working primarily with hospitality venues, corporate brands, and
              individuals across Melbourne, I create content that doesn&apos;t
              just look good — it performs. From Richmond to Fitzroy, South
              Yarra to Collingwood, UnFocus brings a European eye to Melbourne
              stories.
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
