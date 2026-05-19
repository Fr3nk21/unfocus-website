'use client';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--charcoal)',
        borderTop: '1px solid rgba(244,239,229,0.1)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '3.5rem 2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '2rem',
          alignItems: 'center',
        }}
        className="footer-grid"
      >
        {/* Left */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: '1.125rem',
              color: 'rgba(244,239,229,0.7)',
              fontWeight: 500,
              marginBottom: '0.25rem',
              letterSpacing: '-0.01em',
            }}
          >
            Francesco Bugugnoli
          </p>
        </div>

        {/* Centre */}
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <a
            href="https://www.instagram.com/francesco_bugugnoli/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{
              color: 'rgba(244,239,229,0.4)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              display: 'inline-flex',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sienna)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(244,239,229,0.4)')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>

        {/* Right */}
        <div
          style={{
            textAlign: 'right',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '0.5rem',
          }}
        >
          <span style={{ color: 'var(--sienna)', fontSize: '0.5rem' }}>●</span>
          <span
            style={{
              fontSize: '0.8rem',
              color: 'rgba(244,239,229,0.25)',
              fontWeight: 300,
            }}
          >
            Richmond, Melbourne VIC · Australia
          </span>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          borderTop: '1px solid rgba(244,239,229,0.06)',
          padding: '1.25rem 2rem',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '0.75rem',
            color: 'var(--taupe)',
            fontWeight: 300,
            opacity: 0.6,
          }}
        >
          © 2026 Francesco Bugugnoli. All rights reserved.
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
          }
          .footer-grid > div:last-child {
            justify-content: center !important;
          }
          .footer-grid > div:nth-child(2) {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}
