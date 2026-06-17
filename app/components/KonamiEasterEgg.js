'use client';

import { useState, useEffect } from 'react';

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export default function KonamiEasterEgg() {
  const [filmMode, setFilmMode] = useState(false);
  const [timecode, setTimecode] = useState('00:00:00:00');

  // Listen for the Konami sequence
  useEffect(() => {
    let buffer = [];
    function onKey(e) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buffer.push(key);
      if (buffer.length > KONAMI.length) buffer.shift();
      if (KONAMI.every((k, i) => buffer[i] === k)) {
        setFilmMode((prev) => !prev);
        buffer = [];
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Running timecode when film mode is on
  useEffect(() => {
    if (!filmMode) return;
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const h = String(Math.floor(elapsed / 3600)).padStart(2, '0');
      const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
      const s = String(Math.floor(elapsed % 60)).padStart(2, '0');
      const f = String(Math.floor((elapsed % 1) * 24)).padStart(2, '0'); // 24fps frames
      setTimecode(`${h}:${m}:${s}:${f}`);
    }, 1000 / 24);
    return () => clearInterval(id);
  }, [filmMode]);

  if (!filmMode) return null;

  return (
    <>
      {/* Film grain + warm overlay */}
      <div className="film-overlay" aria-hidden="true" />

      {/* REC indicator + timecode */}
      <div className="film-hud">
        <span className="film-rec">
          <span className="film-rec-dot" />
          REC
        </span>
        <span className="film-tc">{timecode}</span>
      </div>

      {/* Corner framing marks (like a viewfinder) */}
      <div className="film-corners" aria-hidden="true">
        <span className="fc fc-tl" /><span className="fc fc-tr" />
        <span className="fc fc-bl" /><span className="fc fc-br" />
      </div>

      <style>{`
        .film-overlay {
          position: fixed;
          inset: 0;
          z-index: 9990;
          pointer-events: none;
          /* warm cinematic tint */
          background:
            radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%),
            linear-gradient(rgba(196,120,60,0.06), rgba(196,120,60,0.06));
          mix-blend-mode: multiply;
          animation: filmFlicker 0.2s steps(2) infinite;
        }
        .film-overlay::after {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.08;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          animation: filmGrain 0.5s steps(4) infinite;
        }
        @keyframes filmFlicker {
          0% { opacity: 0.92; }
          100% { opacity: 1; }
        }
        @keyframes filmGrain {
          0% { transform: translate(0,0); }
          25% { transform: translate(-2%, 1%); }
          50% { transform: translate(1%, -2%); }
          75% { transform: translate(-1%, 2%); }
          100% { transform: translate(2%, -1%); }
        }
        .film-hud {
          position: fixed;
          top: 1.5rem;
          left: 1.5rem;
          z-index: 9991;
          display: flex;
          align-items: center;
          gap: 1rem;
          pointer-events: none;
          font-family: 'Courier New', monospace;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.9);
          text-shadow: 0 1px 4px rgba(0,0,0,0.6);
        }
        .film-rec {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: #ff4438;
          font-weight: 700;
        }
        .film-rec-dot {
          width: 9px; height: 9px;
          border-radius: 50%;
          background: #ff4438;
          animation: recBlink 1s steps(2) infinite;
        }
        @keyframes recBlink {
          0% { opacity: 1; }
          50% { opacity: 0.2; }
          100% { opacity: 1; }
        }
        .film-tc { opacity: 0.85; }
        .film-corners { position: fixed; inset: 1.5rem; z-index: 9991; pointer-events: none; }
        .fc { position: absolute; width: 22px; height: 22px; border: 2px solid rgba(255,255,255,0.6); }
        .fc-tl { top: 0; left: 0; border-right: none; border-bottom: none; }
        .fc-tr { top: 0; right: 0; border-left: none; border-bottom: none; }
        .fc-bl { bottom: 0; left: 0; border-right: none; border-top: none; }
        .fc-br { bottom: 0; right: 0; border-left: none; border-top: none; }
      `}</style>
    </>
  );
}
