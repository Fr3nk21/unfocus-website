'use client';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#1E1B14',
        borderTop: '1px solid rgba(244,239,229,0.1)',
        padding: '1.5rem 0',
      }}
    >
      <div
        className="site-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {/* Left: copyright (no more name) */}
        <span style={{ fontSize: '0.75rem', color: 'rgba(244,239,229,0.4)' }}>
          © 2026 Francesco Bugugnoli. All rights reserved.
        </span>

        {/* Right: location + instagram + privacy inline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <span
            style={{
              fontSize: '0.75rem',
              color: 'rgba(244,239,229,0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
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
            Richmond, Melbourne VIC
          </span>
          <a
            href="https://www.instagram.com/francesco_bugugnoli/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{ color: 'rgba(244,239,229,0.4)', display: 'flex', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sienna)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(244,239,229,0.4)')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
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
            Privacy
          </button>
        </div>
      </div>
    </footer>
  );
}
