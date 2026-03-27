import RevealWrapper from './RevealWrapper';

export default function Testimonial() {
  return (
    <section
      style={{
        backgroundColor: 'var(--ivory)',
        borderTop: '1px solid var(--parchment)',
        borderBottom: '1px solid var(--parchment)',
      }}
    >
      <RevealWrapper>
        <div className="testimonial">
          <blockquote>
            <p>
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
                  position: 'relative',
                  zIndex: 1,
                }}
              />
              <cite>
                Marco Grossi · Grossi Florentino · Melbourne CBD
              </cite>
            </footer>
          </blockquote>
        </div>
      </RevealWrapper>
    </section>
  );
}
