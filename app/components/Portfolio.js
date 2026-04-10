'use client';

import { useState } from 'react';
import YoutubeModal from './YoutubeModal';

const portfolioItems = [
  {
    id: 1,
    colSpan: 8,
    aspect: '16/9',
    category: 'Video',
    title: 'Pickle Jar',
    sub: 'Melbourne · Hospitality Film',
    video: '/videos/pickle-jar-loop.mp4',
    youtubeId: 'R9qTTNp8zTg',
    vertical: false,
  },
  {
    id: 2,
    colSpan: 4,
    aspect: '9/16',
    category: 'Video',
    title: 'Venice Short',
    sub: 'Venice · Travel Film',
    video: '/videos/venice-loop.mp4',
    youtubeId: '9U2GI0VM088',
    vertical: true,
  },
  {
    id: 3,
    colSpan: 4,
    aspect: '9/16',
    category: 'Video',
    title: 'Floridia Masterclass',
    sub: 'Melbourne · Food Film',
    video: '/videos/floridia-masterclass-loop.mp4',
    youtubeId: '_fIUtf0YXgk',
    vertical: true,
  },
  {
    id: 4,
    colSpan: 8,
    aspect: '16/9',
    category: 'Video',
    title: 'Wise Words',
    sub: 'Melbourne · Short Film',
    video: '/videos/wise-words-loop.mp4',
    youtubeId: 'pj_JFZlQJzg',
    vertical: false,
  },
  {
    id: 5,
    colSpan: 6,
    aspect: '4/3',
    category: 'Photo',
    title: "Fratellino's Pizzeria",
    sub: 'Fitzroy · Food Photography',
    image: '/images/fratellino-pizzeria-01.webp',
  },
  {
    id: 6,
    colSpan: 6,
    aspect: '4/3',
    category: 'Photo',
    title: "Fratellino's Pizzeria",
    sub: 'Fitzroy · Food Photography',
    image: '/images/fratellino-pizzeria-02.webp',
  },
];

const filters = ['All', 'Video', 'Photo'];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  const filtered =
    activeFilter === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  function handleItemClick(item) {
    if (item.youtubeId) {
      setActiveVideo(item);
      setModalOpen(true);
    }
  }

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
              onClick={() => handleItemClick(item)}
              onMouseEnter={(e) => {
                const vid = e.currentTarget.querySelector('video');
                if (vid) {
                  vid.play();
                  vid.style.filter = 'grayscale(0)';
                }
              }}
              onMouseLeave={(e) => {
                const vid = e.currentTarget.querySelector('video');
                if (vid) {
                  vid.pause();
                  vid.style.filter = 'grayscale(1)';
                }
              }}
              style={{
                gridColumn: `span ${item.colSpan}`,
                position: 'relative',
                overflow: 'hidden',
                cursor: item.youtubeId ? 'pointer' : 'default',
                backgroundColor: 'var(--charcoal)',
                aspectRatio: item.aspect,
              }}
            >
              {/* Media */}
              {item.video ? (
                <video
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(1)',
                    transition: 'filter 0.5s ease',
                  }}
                >
                  <source src={item.video} type="video/mp4" />
                </video>
              ) : item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, var(--charcoal) 0%, rgba(46,43,36,0.6) 100%)',
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
              )}

              {/* Play icon for videos */}
              {item.youtubeId && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    pointerEvents: 'none',
                  }}
                >
                  <div
                    className="portfolio-play"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      border: '1.5px solid rgba(244,239,229,0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      transition: 'transform 0.3s ease, border-color 0.3s ease',
                    }}
                  >
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                      <path d="M1 1L13 8L1 15V1Z" fill="rgba(244,239,229,0.8)" />
                    </svg>
                  </div>
                </div>
              )}

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
                  zIndex: 3,
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
                .portfolio-thumb:hover .portfolio-play {
                  transform: scale(1.1);
                  border-color: var(--sienna) !important;
                }
              `}</style>
            </div>
          ))}
        </div>
      </div>

      <YoutubeModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setActiveVideo(null); }}
        videoId={activeVideo?.youtubeId}
        title={activeVideo?.title}
        vertical={activeVideo?.vertical}
      />

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
