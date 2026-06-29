'use client';

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    } else if (consent === 'accepted') {
      loadAnalytics();
    }
  }, []);

  useEffect(() => {
    function handleShowPrivacy() { setShowPolicy(true); }
    window.addEventListener('show-privacy', handleShowPrivacy);
    return () => window.removeEventListener('show-privacy', handleShowPrivacy);
  }, []);

  function loadAnalytics() {
    if (window.gtag) return;
    const GA_ID = 'G-Y4ZKMCE62V';
    if (GA_ID === 'G-XXXXXXXXXX') return;

    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function handleAccept() {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
    loadAnalytics();
  }

  function handleDecline() {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  }

  if (!visible && !showPolicy) return null;

  return (
    <>
      {/* Cookie banner */}
      {visible && !showPolicy && (
        <div
          style={{
            position: 'fixed',
            bottom: '6rem',
            left: '2rem',
            maxWidth: '480px',
            zIndex: 9997,
            backgroundColor: '#1E1B14',
            border: '1px solid rgba(244,239,229,0.1)',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 10px 50px rgba(0,0,0,0.5)',
            animation: 'cookieSlideUp 0.5s ease',
          }}
        >
          <p
            style={{
              fontSize: '0.85rem',
              color: '#F0EBE1',
              fontWeight: 400,
              lineHeight: 1.6,
              margin: '0 0 0.35rem',
            }}
          >
            Cookies
          </p>
          <p
            style={{
              fontSize: '0.78rem',
              color: 'rgba(240,235,225,0.6)',
              fontWeight: 300,
              lineHeight: 1.6,
              margin: '0 0 1.25rem',
            }}
          >
            This site uses cookies to analyse traffic and improve your experience.
            No personal data is sold or shared with third parties.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={handleAccept}
              style={{
                backgroundColor: 'var(--sienna)',
                color: '#F4EFE5',
                border: 'none',
                padding: '0.6rem 1.25rem',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontWeight: 400,
                borderRadius: '4px',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Accept
            </button>
            <button
              onClick={handleDecline}
              style={{
                backgroundColor: 'transparent',
                color: 'rgba(244,239,229,0.5)',
                border: '1px solid rgba(244,239,229,0.15)',
                padding: '0.6rem 1.25rem',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontWeight: 300,
                borderRadius: '4px',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(244,239,229,0.3)';
                e.currentTarget.style.color = 'rgba(244,239,229,0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(244,239,229,0.15)';
                e.currentTarget.style.color = 'rgba(244,239,229,0.5)';
              }}
            >
              Decline
            </button>
            <button
              onClick={() => setShowPolicy(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(244,239,229,0.35)',
                fontSize: '0.7rem',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: '0.5rem',
              }}
            >
              Privacy policy
            </button>
          </div>
        </div>
      )}

      {/* Privacy policy modal */}
      {showPolicy && (
        <div
          onClick={() => setShowPolicy(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(14,12,8,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="privacy-scroll"
            style={{
              backgroundColor: '#1E1B14',
              borderRadius: '12px',
              maxWidth: '640px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              padding: '2.5rem',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setShowPolicy(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'none',
                border: 'none',
                color: 'rgba(244,239,229,0.5)',
                fontSize: '1.25rem',
                cursor: 'pointer',
                lineHeight: 1,
              }}
            >
              ✕
            </button>

            <h2
              style={{
                fontFamily: 'var(--font-manrope), sans-serif',
                fontSize: '1.75rem',
                fontWeight: 600,
                color: '#F0EBE1',
                marginBottom: '1.5rem',
              }}
            >
              Privacy Policy
            </h2>

            <div
              style={{
                fontSize: '0.85rem',
                color: 'rgba(240,235,225,0.7)',
                lineHeight: 1.8,
                fontWeight: 300,
              }}
            >
              <p><strong style={{ color: '#F0EBE1', fontWeight: 500 }}>Last updated:</strong> May 2026</p>

              <p style={{ marginTop: '1.25rem' }}>
                <strong style={{ color: '#F0EBE1', fontWeight: 500 }}>Who I am</strong><br />
                This website is operated by Francesco Bugugnoli, a freelance videographer and photographer based in Richmond, Melbourne, Australia.
              </p>

              <p style={{ marginTop: '1.25rem' }}>
                <strong style={{ color: '#F0EBE1', fontWeight: 500 }}>What data I collect</strong><br />
                When you use the contact form, I collect your name, email address, service interest, location, and message. This information is used solely to respond to your enquiry.
              </p>

              <p style={{ marginTop: '1.25rem' }}>
                <strong style={{ color: '#F0EBE1', fontWeight: 500 }}>Analytics</strong><br />
                With your consent, this site uses Google Analytics to understand how visitors interact with the website. This includes pages visited, time on site, device type, and approximate location. IP addresses are anonymised. No personal data is sold or shared with third parties.
              </p>

              <p style={{ marginTop: '1.25rem' }}>
                <strong style={{ color: '#F0EBE1', fontWeight: 500 }}>Cookies</strong><br />
                This site uses essential cookies for basic functionality and, with your consent, analytics cookies from Google. You can withdraw consent at any time by clearing your browser cookies.
              </p>

              <p style={{ marginTop: '1.25rem' }}>
                <strong style={{ color: '#F0EBE1', fontWeight: 500 }}>Your rights</strong><br />
                Under the Australian Privacy Act 1988 and the EU General Data Protection Regulation (GDPR), you have the right to access, correct, or delete your personal data. Contact me at bugugnolifrancesco@gmail.com for any privacy-related requests.
              </p>
            </div>

            <button
              onClick={() => setShowPolicy(false)}
              style={{
                marginTop: '2rem',
                backgroundColor: 'var(--sienna)',
                color: '#F4EFE5',
                border: 'none',
                padding: '0.7rem 1.5rem',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes cookieSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
          .privacy-scroll::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}
