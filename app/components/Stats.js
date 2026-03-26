import RevealWrapper from './RevealWrapper';

const stats = [
  { number: '8+', label: 'Years Experience' },
  { number: '120+', label: 'Projects Delivered' },
  { number: '50+', label: 'Melbourne Venues' },
  { number: '30+', label: 'Suburbs Served' },
];

export default function Stats() {
  return (
    <section
      className="stats-section"
      style={{
        backgroundColor: 'var(--charcoal)',
        padding: '5rem 2rem',
      }}
    >
      <RevealWrapper>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}
          className="stats-grid"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: '2rem',
                textAlign: 'center',
                borderLeft: i > 0 ? '1px solid rgba(244,239,229,0.1)' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 700,
                  color: 'var(--ivory)',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--taupe)',
                  fontWeight: 300,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </RevealWrapper>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stats-grid > div:nth-child(odd) {
            border-left: none !important;
          }
          .stats-grid > div:nth-child(3),
          .stats-grid > div:nth-child(4) {
            border-top: 1px solid rgba(244,239,229,0.1);
          }
        }
      `}</style>
    </section>
  );
}
