'use client';
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1200);
    const hideTimer = setTimeout(() => setVisible(false), 1700);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  if (!visible) return null;

  return (
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
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.5s ease',
      pointerEvents: fadeOut ? 'none' : 'all',
    }}>
      <p style={{
        fontFamily: 'var(--font-manrope), sans-serif',
        fontSize: 'clamp(1.1rem, 4vw, 1.4rem)',
        fontWeight: 600,
        letterSpacing: '0.08em',
        color: '#F0EBE1',
        margin: 0,
        textTransform: 'uppercase',
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
      }}>
        Videographer, Melbourne.
      </p>
    </div>
  );
}