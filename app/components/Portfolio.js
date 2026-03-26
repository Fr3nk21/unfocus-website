'use client';

import { useState } from 'react';

const portfolioItems = [
  {
    id: 1,
    colSpan: 7,
    aspect: '16/10',
    category: 'Video',
    title: 'Grossi Florentino',
    sub: 'Melbourne CBD · Hospitality Film',
  },
  {
    id: 2,
    colSpan: 5,
    aspect: '4/3',
    category: 'Photo',
    title: "Fratellino's Pizzeria",
    sub: 'Fitzroy · Food Photography',
  },
  {
    id: 3,
    colSpan: 5,
    aspect: '4/3',
    category: 'Events',
    title: 'Melbourne Food & Wine',
    sub: 'CBD · Event Coverage',
  },
  {
    id: 4,
    colSpan: 7,
    aspect: '16/9',
    category: 'Video',
    title: 'Evans Repair Co.',
    sub: 'Collingwood · Corporate Film',
  },
];

const filters = ['All', 'Video', 'Photo', 'Events'];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <section
      id="portfolio"
      style={{
        backgroundColor: 'var(--cream)',
        padding: '7rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--taupe)',
                marginBottom: '0.75rem',
                fontWeight: 400,
              }}
            >
              Selected work
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 700,
                color: 'var(--ink)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
              }}
            >
              Recent projects
            </h2>
          </div>

          {/* Filter buttons */}
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  fontSize: '0.8rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontWeight: activeFilter === filter ? 500 : 300,
                  color: activeFilter === filter ? 'var(--sienna)' : 'var(--taupe)',
                  cursor: 'pointer',
                  borderBottom: activeFilter === filter ? '1px solid var(--sienna)' : '1px solid transparent',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '1.25rem',
          }}
          className="portfolio-grid"
        >
          {filtered.map((item) => (
            <div
              key={item.id}
              className="portfolio-thumb"
              style={{
                gridColumn: `span ${item.colSpan}`,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: 'var(--charcoal)',
                aspectRatio: item.aspect,
              }}
            >
              {/* Placeholder visual */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(135deg, var(--charcoal) 0%, rgba(46,43,36,0.6) 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(244,239,229,0.2)',
                    fontWeight: 300,
                  }}
                >
                  {item.category}
                </span>
              </div>

              {/* Hover overlay */}
              <div
                className="portfolio-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(24,21,15,0.78)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.75rem',
                  transform: 'translateY(100%)',
                  transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                <span
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--sienna)',
                    fontWeight: 400,
                    marginBottom: '0.4rem',
                  }}
                >
                  {item.category}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: '1.375rem',
                    fontWeight: 500,
                    color: 'var(--ivory)',
                    marginBottom: '0.25rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--taupe)',
                    fontWeight: 300,
                    margin: 0,
                  }}
                >
                  {item.sub}
                </p>
              </div>

              <style>{`
                .portfolio-thumb:hover .portfolio-overlay {
                  transform: translateY(0) !important;
                }
              `}</style>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .portfolio-grid > div {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
}
