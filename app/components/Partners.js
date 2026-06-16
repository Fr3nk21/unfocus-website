'use client';

const partners = [
  { name: 'Red Herring Digital', logo: '/images/partners/rhd.png' },
  { name: 'GTano', logo: '/images/partners/gtano.png' },
  { name: 'Atti.Co', logo: '/images/partners/attico.webp' },
  { name: 'AOD', logo: '/images/partners/aod.png' },
  { name: 'Filmonick', logo: '/images/partners/filmonick.png' },
  { name: 'Fratellino', logo: '/images/partners/fratellino.png' },
  { name: 'CoASIt', logo: '/images/partners/coasit_logo2_new.png' },
  { name: 'Del Bocia', logo: '/images/partners/delbocia.png' },
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
            padding: '0 4.5rem',
            minWidth: '220px',
            height: '64px',
            flexShrink: 0,
          }}
        >
          <img
            src={partner.logo}
            alt={partner.name}
            style={{
              maxHeight: '52px',
              maxWidth: '160px',
              objectFit: 'contain',
              opacity: 0.35,
              filter: 'brightness(0) invert(0.9) sepia(0.1)',
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.35';
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
        padding: '3rem 0',
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
          animation: partnerScroll 40s linear infinite;
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
