'use client';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#1E1B14',
        borderTop: '1px solid rgba(244,239,229,0.1)',
        padding: '3.5rem 2rem 2rem',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: '1.125rem',
          color: '#F4EFE5',
          fontWeight: 500,
          marginBottom: '1.25rem',
          letterSpacing: '-0.01em',
        }}
      >
        Francesco Bugugnoli
      </p>

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
          marginBottom: '1.5rem',
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

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '2rem',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#4ADE80',
            display: 'inline-block',
            flexShrink: 0,
            animation: 'livePulse 2s ease-in-out infinite',
          }}
        />
        <span
          style={{
            fontSize: '0.8rem',
            color: 'rgba(244,239,229,0.5)',
            fontWeight: 300,
          }}
        >
          Richmond, Melbourne VIC · Australia
        </span>
      </div>

      <p
        style={{
          fontSize: '0.75rem',
          color: 'rgba(244,239,229,0.3)',
          fontWeight: 300,
          borderTop: '1px solid rgba(244,239,229,0.06)',
          paddingTop: '1.25rem',
        }}
      >
        © 2026 Francesco Bugugnoli. All rights reserved.
      </p>
      <button
        onClick={() => window.dispatchEvent(new CustomEvent('show-privacy'))}
        style={{
          background: 'none',
          border: 'none',
          color: 'rgba(244,239,229,0.3)',
          fontSize: '0.7rem',
          cursor: 'pointer',
          textDecoration: 'underline',
          marginTop: '0.5rem',
          display: 'block',
          marginInline: 'auto',
        }}
      >
        Privacy Policy
      </button>
    </footer>
  );
}
