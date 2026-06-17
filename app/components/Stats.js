'use client';

import { useState, useEffect, useRef } from 'react';

const stats = [
  { number: 6,  suffix: '+', label: 'Years' },
  { number: 90, suffix: '+', label: 'Projects' },
  { number: 30, suffix: '+', label: 'Clients' },
  { number: 8,  suffix: '',  label: 'Industries' },
];

function CountUp({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    let animationId;
    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) animationId = requestAnimationFrame(animate);
    }
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [started, target, duration]);

  return (
    <div ref={ref}>
      <div
        style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 700,
          color: 'var(--stats-num)',
          lineHeight: 1,
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em',
        }}
      >
        {count}{suffix}
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <section
      className="stats-section site-section"
      style={{
        backgroundColor: 'var(--stats-bg)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
        className="stats-grid site-container"
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              padding: '2rem',
              textAlign: 'center',
              borderLeft: i > 0 ? '1px solid rgba(244,239,229,0.1)' : 'none',
            }}
          >
            <CountUp target={stat.number} suffix={stat.suffix} duration={2000} />
            <div
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--stats-label)',
                fontWeight: 300,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stats-grid > div:nth-child(odd) {
            border-left: none !important;
          }
          .stats-grid > div:nth-child(3),
          .stats-grid > div:nth-child(4) {
            border-top: 1px solid rgba(244,239,229,0.1);
          }
        }
      `}</style>
    </section>
  );
}
