import RevealWrapper from './RevealWrapper';

export default function Testimonial() {
  return (
    <section
      style={{
        backgroundColor: 'var(--ivory)',
        padding: '8rem 2rem',
        borderTop: '1px solid var(--parchment)',
        borderBottom: '1px solid var(--parchment)',
      }}
    >
      <RevealWrapper
        style={{
          maxWidth: '840px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Decorative quote mark */}
        <div
          style={{
            position: 'absolute',
            top: '-3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '9rem',
            lineHeight: 1,
            color: 'var(--sienna)',
            opacity: 0.1,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          &ldquo;
        </div>

        <blockquote style={{ margin: 0 }}>
          <p
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1.125rem, 2.5vw, 1.75rem)',
              lineHeight: 1.65,
              color: 'var(--ink)',
              fontWeight: 400,
              marginBottom: '2.5rem',
            }}
          >
            &ldquo;Francesco doesn&apos;t simply film your space — he captures what
            makes it breathe. Our bookings increased within a week of
            publishing his video. An Italian eye on a Melbourne story.&rdquo;
          </p>

          <footer>
            <div
              style={{
                width: '2rem',
                height: '1px',
                backgroundColor: 'var(--sienna)',
                margin: '0 auto 1.25rem',
              }}
            />
            <cite
              style={{
                fontStyle: 'normal',
                fontSize: '0.8rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--taupe)',
                fontWeight: 400,
              }}
            >
              Marco Grossi · Grossi Florentino · Melbourne CBD
            </cite>
          </footer>
        </blockquote>
      </RevealWrapper>
    </section>
  );
}
