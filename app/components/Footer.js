'use client';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#1E1B14',
        borderTop: '1px solid rgba(244,239,229,0.1)',
        padding: '1.5rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {/* Name */}
        <span
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#F4EFE5',
            letterSpacing: '-0.01em',
          }}
        >
          Francesco Bugugnoli
        </span>

        {/* Location with green dot — center */}
        <span
          style={{
            fontSize: '0.8rem',
            color: 'rgba(244,239,229,0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#4ADE80',
              animation: 'livePulse 2s ease-in-out infinite',
            }}
          />
          Richmond, Melbourne VIC · Australia
        </span>

        {/* Instagram icon */}
        <a
          href="https://www.instagram.com/francesco_bugugnoli/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          style={{ color: 'rgba(244,239,229,0.4)', display: 'flex', transition: 'color 0.2s' }}
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

      {/* Copyright + privacy — thin row below */}
      <div
        style={{
          maxWidth: '1440px',
          margin: '1rem auto 0',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(244,239,229,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.7rem',
          color: 'rgba(244,239,229,0.3)',
        }}
      >
        <span>© 2026 Francesco Bugugnoli. All rights reserved.</span>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('show-privacy'))}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(244,239,229,0.3)',
            fontSize: '0.7rem',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Privacy Policy
        </button>
      </div>
    </footer>
  );
}
