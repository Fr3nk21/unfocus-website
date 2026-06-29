'use client';
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [phase, setPhase] = useState('visible'); // 'visible' | 'fadeout' | 'gone'

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase('fadeout'), 1400);
    const hideTimer = setTimeout(() => setPhase('gone'), 2000);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  if (phase === 'gone') return null;

  return (
    <>
      {/* Loading screen */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#18150F',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        opacity: phase === 'fadeout' ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: phase === 'fadeout' ? 'none' : 'all',
      }}>
        <p style={{
          fontFamily: 'var(--font-manrope), sans-serif',
          fontSize: 'clamp(1.1rem, 4vw, 1.4rem)',
          fontWeight: 600,
          letterSpacing: '0.08em',
          color: '#F0EBE1',
          margin: 0,
          textTransform: 'uppercase',
          opacity: phase === 'fadeout' ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}>
          Francesco Bugugnoli
        </p>
        <p style={{
          fontFamily: 'var(--font-manrope), sans-serif',
          fontSize: 'clamp(0.65rem, 2.5vw, 0.8rem)',
          fontWeight: 300,
          letterSpacing: '0.2em',
          color: 'var(--sienna)',
          margin: 0,
          textTransform: 'uppercase',
          opacity: phase === 'fadeout' ? 0 : 1,
          transition: 'opacity 0.4s ease 0.1s',
        }}>
          Videographer & Photographer
        </p>
      </div>

      {/* Page fade-in overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99998,
        backgroundColor: '#18150F',
        opacity: phase === 'gone' ? 0 : phase === 'fadeout' ? 0 : 1,
        transition: 'opacity 0.6s ease 0.3s',
        pointerEvents: 'none',
      }} />
    </>
  );
}