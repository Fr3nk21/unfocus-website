'use client';

import { useEffect, useRef } from 'react';

export default function RevealWrapper({ children, className = '', variant = 'reveal', delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add(variant);

    if (delay > 0) {
      el.style.transitionDelay = `${delay}s`;
    }

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
  }, [variant, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
