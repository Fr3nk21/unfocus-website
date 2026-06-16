'use client';

import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = ['portfolio', 'stats', 'services', 'about', 'testimonial', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.4s ease',
        background: 'var(--nav-bg)',
        borderBottom: '1px solid var(--rule)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="/"
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '1.125rem',
            color: 'var(--ink)',
            textDecoration: 'none',
            fontWeight: 500,
            letterSpacing: '-0.01em',
          }}
        >
          Francesco Bugugnoli
        </a>

        {/* Desktop nav */}
        <ul
          style={{
            display: 'flex',
            listStyle: 'none',
            gap: '2.5rem',
            margin: 0,
            padding: 0,
            alignItems: 'center',
          }}
          className="hidden-mobile"
        >
          {[
            { label: 'Work', href: '#hero' },
            { label: 'About', href: '#about' },
            { label: 'Services', href: '#services' },
            { label: 'Contact', href: '#contact' },
          ].map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  style={{
                    color: isActive ? 'var(--ink)' : 'var(--taupe)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    fontWeight: isActive ? 400 : 300,
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--taupe)'; }}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
          <li>
            <button onClick={toggleTheme} aria-label="Toggle colour theme" className="theme-toggle">
              <span className="toggle-icon toggle-icon-sun">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              </span>
              <span className="toggle-divider" aria-hidden="true">·</span>
              <span className="toggle-icon toggle-icon-moon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              </span>
            </button>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            flexDirection: 'column',
            gap: '5px',
          }}
          className="show-mobile"
        >
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: 'var(--ink)',
              transition: 'transform 0.3s ease',
              transform: menuOpen ? 'rotate(45deg) translate(4px,4px)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: 'var(--ink)',
              opacity: menuOpen ? 0 : 1,
              transition: 'opacity 0.3s ease',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: 'var(--ink)',
              transition: 'transform 0.3s ease',
              transform: menuOpen ? 'rotate(-45deg) translate(4px,-4px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: 'var(--ivory)',
            borderTop: '1px solid rgba(24,21,15,0.08)',
            padding: '1.5rem 2rem',
          }}
        >
          {[
            { label: 'Work', href: '#hero' },
            { label: 'About', href: '#about' },
            { label: 'Services', href: '#services' },
            { label: 'Contact', href: '#contact' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector(link.href);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                setMenuOpen(false);
              }}
              style={{
                display: 'block',
                padding: '0.75rem 0',
                color: link.label === 'Contact' ? 'var(--sienna)' : 'var(--ink)',
                textDecoration: 'none',
                fontSize: '1.125rem',
                fontFamily: 'var(--font-playfair), Georgia, serif',
                borderBottom: '1px solid rgba(24,21,15,0.06)',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
