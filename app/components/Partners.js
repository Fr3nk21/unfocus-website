'use client';

const partners = [
  { name: 'Toyota', logo: '/images/partners/toyota.svg' },
  { name: 'Floridia', logo: '/images/partners/floridia.svg' },
  { name: 'Fratellino', logo: '/images/partners/fratellino.svg' },
  { name: 'Pickle Jar', logo: '/images/partners/pickle-jar.svg' },
  { name: 'BMPRO', logo: '/images/partners/bmpro.svg' },
  { name: 'Grossi Florentino', logo: '/images/partners/grossi.svg' },
];

function LogoSet() {
  return (
    <>
      {partners.map((partner, i) => (
        <div
          key={i}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 3rem',
            minWidth: '160px',
            height: '48px',
            flexShrink: 0,
          }}
        >
          <img
            src={partner.logo}
            alt={partner.name}
            style={{
              maxHeight: '36px',
              maxWidth: '120px',
              objectFit: 'contain',
              opacity: 0.4,
              filter: 'grayscale(1)',
              transition: 'opacity 0.3s ease, filter 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.filter = 'grayscale(0)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.4';
              e.currentTarget.style.filter = 'grayscale(1)';
            }}
          />
        </div>
      ))}
    </>
  );
}

export default function Partners() {
  return (
    <section
      style={{
        backgroundColor: 'var(--ivory)',
        borderTop: '1px solid var(--parchment)',
        borderBottom: '1px solid var(--parchment)',
        padding: '5rem 0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem',
          marginBottom: '1.5rem',
        }}
      >
        <p
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--taupe)',
            fontWeight: 400,
            textAlign: 'center',
          }}
        >
          Clients
        </p>
      </div>
      <div className="partners-track-container" style={{ overflow: 'hidden' }}>
        <div className="partners-track">
          <LogoSet />
          <LogoSet />
        </div>
      </div>

      <style>{`
        .partners-track {
          display: flex;
          animation: partnerScroll 30s linear infinite;
          width: max-content;
        }
        @keyframes partnerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .partners-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
