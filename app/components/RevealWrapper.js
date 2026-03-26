'use client';

import { useEffect, useRef } from 'react';

export default function RevealWrapper({ children, className = '', clip = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add(clip ? 'clip-reveal' : 'reveal');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [clip]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
