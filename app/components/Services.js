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
    const root = scrollRef.current;
    if (!root) return;

    const list = root.querySelector('ul');
    const items = [...list.children];
    list.style.setProperty('--count', items.length);
    items.forEach((item, i) => item.style.setProperty('--i', i));

    requestAnimationFrame(() => {
      const target = items[2]; // start on "corporate films"
      if (target) {
        const offset =
          target.offsetTop - root.clientHeight / 2 + target.clientHeight / 2;
        root.scrollTop = offset;
      }
    });
  }, []);

  return (
    <section id="services" className="word-scroll-section">
      <div
        ref={scrollRef}
        className="word-scroll"
        data-snap="true"
        data-animate="true"
      >
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
        }

        .word-scroll {
          width: 100%;
          height: 100vh;
          overflow-y: auto;
          scroll-snap-type: y proximity;
        }

        .word-scroll-inner {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          line-height: 1.25;
          font-family: var(--font-playfair), Georgia, serif;
          font-size: clamp(2rem, 6vw, 4.5rem);
        }

        .word-scroll-heading {
          position: sticky;
          top: calc(50vh - 0.5lh);
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
          padding-block: calc(50vh - 0.5lh);
          padding-left: 0;
          --step: calc(360 / var(--count, 6));
        }

        .word-scroll[data-snap="true"] li {
          scroll-snap-align: center;
        }

        .word-scroll li {
          color: var(--sienna);
          opacity: 0.2;
          transition: opacity 0.3s ease;
          cursor: default;
          padding: 0.1em 0;
        }

        @supports (animation-timeline: scroll()) and (animation-range: 0% 100%) {
          .word-scroll[data-animate="true"] li {
            animation-name: brighten;
            animation-fill-mode: both;
            animation-timing-function: linear;
            animation-range: cover calc(50% - 1lh) calc(50% + 1lh);
            animation-timeline: view();
          }

          @keyframes brighten {
            0%   { opacity: 0.15; }
            50%  { opacity: 1; filter: brightness(1.1); }
            100% { opacity: 0.15; }
          }
        }

        @supports not (animation-timeline: scroll()) {
          .word-scroll li {
            opacity: 0.6;
          }
        }

        @media (max-width: 768px) {
          .word-scroll-inner {
            flex-direction: column;
            align-items: center;
            text-align: center;
            font-size: clamp(1.5rem, 5vw, 2.5rem);
          }
          .word-scroll-heading {
            position: relative;
            top: auto;
            padding-top: 2rem;
            white-space: normal;
          }
        }
      `}</style>
    </section>
  );
}
