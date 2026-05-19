'use client';

import { useEffect, useRef } from 'react';

const services = [
  'social media videos.',
  'hospitality content.',
  'corporate films.',
  'event coverage.',
  'legacy videos.',
  'commercial photography.',
];

export default function Services() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const wordScroll = scrollRef.current;
    if (!wordScroll) return;

    const section = wordScroll.parentElement;
    const items = [...wordScroll.querySelectorAll('li')];
    if (items.length === 0 || !section) return;

    function update() {
      const rect = section.getBoundingClientRect();
      const scrollHeight = section.offsetHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollHeight));
      const activeFloat = progress * (items.length - 1);

      items.forEach((item, i) => {
        const dist = Math.abs(i - activeFloat);
        if (dist < 0.5) {
          item.style.opacity = '1';
          item.style.filter = 'brightness(1.1)';
        } else if (dist < 1.5) {
          item.style.opacity = String((1.5 - dist).toFixed(2));
          item.style.filter = '';
        } else {
          item.style.opacity = '0.15';
          item.style.filter = '';
        }
      });
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <section id="services" className="word-scroll-section">
      <div ref={scrollRef} className="word-scroll">
        <div className="word-scroll-inner">
          <h2 className="word-scroll-heading">
            <span aria-hidden="true">I&nbsp;create&nbsp;</span>
            <span className="sr-only">
              I create social media videos, hospitality content, corporate films,
              event coverage, legacy videos, and commercial photography.
            </span>
          </h2>
          <ul>
            {services.map((service, i) => (
              <li key={i} style={{ '--i': i }}>
                {service}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .word-scroll-section {
          background: var(--cream);
          position: relative;
          min-height: 250vh;
        }

        .word-scroll {
          position: sticky;
          top: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .word-scroll-inner {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          line-height: 1.25;
          font-family: var(--font-playfair), Georgia, serif;
          font-size: clamp(2rem, 6vw, 4.5rem);
        }

        .word-scroll-heading {
          margin: 0;
          font-size: inherit;
          font-weight: 500;
          height: fit-content;
          color: var(--ink);
          white-space: nowrap;
        }

        .word-scroll ul {
          font-weight: 500;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .word-scroll li {
          color: var(--sienna);
          opacity: 0.15;
          transition: opacity 0.35s ease, filter 0.35s ease;
          cursor: default;
          padding: 0.1em 0;
        }

        @media (max-width: 768px) {
          .word-scroll-inner {
            flex-direction: column;
            align-items: center;
            text-align: center;
            font-size: clamp(1.5rem, 5vw, 2.5rem);
          }
          .word-scroll-heading {
            white-space: normal;
            padding-top: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
