'use client';

import { useState, useRef } from 'react';
import YoutubeModal from './YoutubeModal';
import PhotoLightbox from './PhotoLightbox';

const portfolioItems = [
  // Row 1: Toyota (wide) + Fratellino video (vertical)
  {
    id: 'v-toyota',
    colSpan: 8,
    aspect: '16/9',
    category: 'Video',
    title: 'Toyota',
    sub: 'Melbourne · Brand Testimonial',
    video: '/videos/toyota-loop.mp4',
    poster: '/videos/toyota-thumb.png',
    youtubeId: '',
    vertical: false,
  },
  {
    id: 'v-fratellino',
    colSpan: 4,
    aspect: '9/16',
    category: 'Video',
    title: 'Fratellino',
    sub: 'Melbourne · Hospitality Social',
    video: '/videos/fratellino-loop.mp4',
    poster: '/videos/fratellino-thumb.png',
    youtubeId: '',
    vertical: true,
  },
  // Row 2: Fratellino photos + Pickle Jar (wide)
  {
    id: 'p-fratellino',
    colSpan: 4,
    aspect: '4/5',
    category: 'Photo',
    title: 'Fratellino',
    sub: 'Fitzroy · Hospitality Social',
    cover: '/images/portfolio/fratellino/thumb.webp',
    images: [
      '/images/portfolio/fratellino/01.webp',
      '/images/portfolio/fratellino/02.webp',
      '/images/portfolio/fratellino/03.webp',
      '/images/portfolio/fratellino/04.webp',
    ],
  },
  {
    id: 'v-pickle-jar',
    colSpan: 8,
    aspect: '16/9',
    category: 'Video',
    title: 'Pickle Jar',
    sub: 'Melbourne · Music Video',
    video: '/videos/pickle-jar-loop.mp4',
    poster: '/videos/pickle-jar-thumb.png',
    youtubeId: 'R9qTTNp8zTg',
    vertical: false,
  },
  // Row 3: Liam + Venice photos
  {
    id: 'v-liam',
    colSpan: 6,
    aspect: '16/9',
    category: 'Video',
    title: 'Liam',
    sub: 'Melbourne · Short Documentary',
    video: '/videos/liam-loop.mp4',
    poster: '/videos/liam-thumb.png',
    youtubeId: '',
    vertical: false,
  },
  {
    id: 'p-venice',
    colSpan: 6,
    aspect: '4/5',
    category: 'Photo',
    title: 'Venice',
    sub: 'Italy · Travel Social',
    cover: '/images/portfolio/venice/thumb.webp',
    images: [
      '/images/portfolio/venice/01.webp',
      '/images/portfolio/venice/02.webp',
      '/images/portfolio/venice/03.webp',
      '/images/portfolio/venice/04.webp',
      '/images/portfolio/venice/05.webp',
    ],
  },
  // Row 4: Bar Ussou photos + Floridia Night (wide)
  {
    id: 'p-bar-ussou',
    colSpan: 4,
    aspect: '4/5',
    category: 'Photo',
    title: 'Bar Ussou',
    sub: 'Melbourne · Music Band',
    cover: '/images/portfolio/bar-ussou/thumb.webp',
    images: [
      '/images/portfolio/bar-ussou/01.webp',
      '/images/portfolio/bar-ussou/02.webp',
      '/images/portfolio/bar-ussou/03.webp',
      '/images/portfolio/bar-ussou/04.webp',
    ],
  },
  {
    id: 'v-floridia-night',
    colSpan: 8,
    aspect: '16/9',
    category: 'Video',
    title: 'Floridia Night',
    sub: 'Melbourne · Event Social',
    video: '/videos/floridia-night-loop.mp4',
    poster: '/videos/floridia-night-thumb.png',
    youtubeId: '',
    vertical: false,
  },
  // Row 5: Agriturismo + Possum
  {
    id: 'p-agriturismo',
    colSpan: 6,
    aspect: '4/5',
    category: 'Photo',
    title: 'Agriturismo',
    sub: 'Italy · Travel Social',
    cover: '/images/portfolio/agriturismo/thumb.webp',
    images: [
      '/images/portfolio/agriturismo/01.webp',
      '/images/portfolio/agriturismo/02.webp',
      '/images/portfolio/agriturismo/03.webp',
      '/images/portfolio/agriturismo/04.webp',
    ],
  },
  {
    id: 'p-possum',
    colSpan: 6,
    aspect: '4/5',
    category: 'Photo',
    title: 'Possum',
    sub: 'Melbourne · Film Production',
    cover: '/images/portfolio/possum/thumb.webp',
    images: [
      '/images/portfolio/possum/01.webp',
      '/images/portfolio/possum/02.webp',
      '/images/portfolio/possum/03.webp',
      '/images/portfolio/possum/04.webp',
    ],
  },
];

const filters = ['All', 'Video', 'Photo'];

function PortfolioItem({ item, onVideoClick, onPhotoClick }) {
  const videoRef = useRef(null);
  const isVideo = item.category === 'Video';
  const isPhoto = item.category === 'Photo';

  function handleMouseEnter(e) {
    if (isVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
      videoRef.current.style.opacity = '1';
    }
    if (isPhoto) {
      const img = e.currentTarget.querySelector('img');
      if (img) img.style.transform = 'scale(1.05)';
    }
  }

  function handleMouseLeave(e) {
    if (isVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.style.opacity = '0';
    }
    if (isPhoto) {
      const img = e.currentTarget.querySelector('img');
      if (img) img.style.transform = 'scale(1)';
    }
  }

  function handleClick() {
    if (isVideo) onVideoClick(item);
    if (isPhoto) onPhotoClick(item);
  }

  return (
    <div
      className="portfolio-thumb"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        gridColumn: `span ${item.colSpan}`,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: 'var(--charcoal)',
        aspectRatio: item.aspect,
      }}
    >
      {/* Video items: poster + hidden video overlay */}
      {isVideo && (
        <>
          {/* Poster thumbnail — always visible */}
          <img
            src={item.poster}
            alt={item.title}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(1)',
              transition: 'filter 0.5s ease',
            }}
            className="portfolio-poster"
          />
          {/* Video — hidden by default, fades in on hover */}
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            poster={item.poster}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0,
              transition: 'opacity 0.5s ease',
              zIndex: 1,
            }}
          >
            <source src={item.video} type="video/mp4" />
          </video>
        </>
      )}

      {/* Photo items: cover image */}
      {isPhoto && (
        <img
          src={item.cover}
          alt={item.title}
          loading="lazy"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      )}

      {/* Play icon for videos */}
      {isVideo && (
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

      {/* Gallery icon for photos */}
      {isPhoto && (
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: 'rgba(0,0,0,0.4)',
              padding: '0.35rem 0.65rem',
              borderRadius: '4px',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(244,239,229,0.8)" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <rect x="7" y="7" width="10" height="10" rx="1" />
            </svg>
            <span style={{ fontSize: '0.7rem', color: 'rgba(244,239,229,0.8)', fontWeight: 300 }}>
              {item.images.length}
            </span>
          </div>
        </div>
      )}

      {/* Hover overlay with title */}
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
    </div>
  );
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);

  const filtered =
    activeFilter === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  function handleVideoClick(item) {
    if (item.youtubeId) {
      setActiveVideo(item);
      setModalOpen(true);
    }
  }

  function handlePhotoClick(item) {
    setActivePhoto(item);
    setLightboxOpen(true);
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
            <PortfolioItem
              key={item.id}
              item={item}
              onVideoClick={handleVideoClick}
              onPhotoClick={handlePhotoClick}
            />
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

      <PhotoLightbox
        isOpen={lightboxOpen}
        onClose={() => { setLightboxOpen(false); setActivePhoto(null); }}
        images={activePhoto?.images || []}
        title={activePhoto?.title || ''}
      />

      <style>{`
        .portfolio-thumb:hover .portfolio-overlay {
          transform: translateY(0) !important;
        }
        .portfolio-thumb:hover .portfolio-play {
          transform: scale(1.1);
          border-color: var(--sienna) !important;
        }
        .portfolio-thumb:hover .portfolio-poster {
          filter: grayscale(0) !important;
        }
        @media (max-width: 768px) {
          .portfolio-grid > div {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
}
