'use client';

import { useState, useEffect } from 'react';

export default function WhatsAppButton() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    function onScroll() {
      const footer = document.querySelector('footer');
      if (!footer) return;
      const footerTop = footer.getBoundingClientRect().top;
      const vh = window.innerHeight;
      // Fade out just before the footer overlaps the button
      setHidden(footerTop < vh - 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <a
        href="https://api.whatsapp.com/send?phone=61476278891"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="wa-btn"
        style={{
          opacity: hidden ? 0 : 1,
          pointerEvents: hidden ? 'none' : 'auto',
          transform: hidden ? 'translateY(20px)' : 'translateY(0)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        <span className="wa-content">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--sienna)">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="wa-online-dot" />
          <span className="wa-label">Online now</span>
        </span>
        <span className="wa-border wa-border--animated" />
      </a>

      <style>{`
        .wa-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 9998;
          border-radius: 100px;
          padding: 0;
          border: 2px solid rgba(244,239,229,0.1);
          cursor: pointer;
          background: #1E1B14;
          text-decoration: none;
          display: inline-block;
          transition: translate 0.16s ease-out, scale 0.16s ease-out;
        }
        .wa-btn:active {
          translate: 0 1px;
          scale: 0.98;
        }
        .wa-btn:hover {
          border-color: rgba(244,239,229,0.2);
        }

        .wa-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.1rem;
          border-radius: inherit;
          position: relative;
          z-index: 2;
          background: #1E1B14;
        }

        .wa-label {
          color: #F0EBE1;
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: 0.02em;
        }

        .wa-online-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #4ADE80;
          box-shadow: 0 0 6px rgba(74,222,128,0.5);
          animation: livePulse 2s ease-in-out infinite;
        }

        .wa-border {
          position: absolute;
          inset: -2px;
          container-type: inline-size;
          border: 2px solid transparent;
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box;
          mask-composite: exclude;
          border-radius: inherit;
        }

        .wa-border--animated::after {
          content: '';
          width: calc(100cqi + 4px);
          height: calc(100cqi + 4px);
          background: conic-gradient(
            from 0deg,
            transparent 0%,
            transparent 75%,
            rgba(74,222,128,0.15) 82%,
            rgba(74,222,128,0.4) 88%,
            #4ADE80 94%,
            rgba(74,222,128,0.4) 97%,
            transparent 100%
          );
          position: absolute;
          top: 50%;
          left: 50%;
          translate: -50% -50%;
          z-index: -1;
          animation: waSpin 3s infinite linear;
        }

        @keyframes waSpin {
          to { rotate: 360deg; }
        }

        @media (max-width: 767px) {
          .wa-btn {
            bottom: max(1rem, env(safe-area-inset-bottom, 1rem));
            right: 1rem;
          }
          .wa-label,
          .wa-online-dot {
            display: none;
          }
          .wa-content {
            padding: 0.875rem;
          }
        }
      `}</style>
    </>
  );
}
