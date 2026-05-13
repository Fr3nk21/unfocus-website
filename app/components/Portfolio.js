'use client';

import { useState } from 'react';
import YoutubeModal from './YoutubeModal';
import PhotoLightbox from './PhotoLightbox';

const portfolioItems = [
  {
    id: 'v-toyota',
    aspect: '16/9',
    category: 'Video',
    title: 'Toyota',
    sub: 'Melbourne · Brand Testimonial',
    video: '/videos/toyota-loop.mp4',
    youtubeId: '',
    vertical: false,
  },
  {
    id: 'v-fratellino',
    aspect: '16/9',
    category: 'Video',
    title: 'Fratellino',
    sub: 'Melbourne · Hospitality Social',
    video: '/videos/fratellino-loop.mp4',
    youtubeId: '',
    vertical: false,
  },
  {
    id: 'p-fratellino',
    aspect: '16/9',
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
    aspect: '16/9',
    category: 'Video',
    title: 'Pickle Jar',
    sub: 'Melbourne · Music Video',
    video: '/videos/pickle-jar-loop.mp4',
    youtubeId: 'R9qTTNp8zTg',
    vertical: false,
  },
  {
    id: 'v-liam',
    aspect: '16/9',
    category: 'Video',
    title: 'Liam',
    sub: 'Melbourne · Short Documentary',
    video: '/videos/liam-loop.mp4',
    youtubeId: '',
    vertical: false,
  },
  {
    id: 'p-venice',
    aspect: '16/9',
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
  {
    id: 'p-bar-ussou',
    aspect: '16/9',
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
    aspect: '16/9',
    category: 'Video',
    title: 'Floridia Night',
    sub: 'Melbourne · Event Social',
    video: '/videos/floridia-night-loop.mp4',
    youtubeId: '',
    vertical: false,
  },
  {
    id: 'p-agriturismo',
    aspect: '16/9',
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
    aspect: '16/9',
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
  const isVideo = item.category === 'Video';
  const isPhoto = item.category === 'Photo';

  function handleMouseEnter(e) {
    if (isPhoto) {
      const img = e.currentTarget.querySelector('img');
      if (img) img.style.transform = 'scale(1.05)';
    }
  }

  function handleMouseLeave(e) {
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
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: 'var(--charcoal)',
        aspectRatio: item.aspect,
      }}
    >
      {/* Video items: autoplaying loop */}
      {isVideo && (
        <video
          autoPlay
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
          }}
        >
          <source src={item.video} type="video/mp4" />
        </video>
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

      {/* Permanent gradient overlay with title */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
          padding: '3rem 1.5rem 1.25rem',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--sienna)',
            fontWeight: 400,
            marginBottom: '0.3rem',
            display: 'block',
          }}
        >
          {item.category}
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '1.25rem',
            fontWeight: 500,
            color: '#F4EFE5',
            marginBottom: '0.15rem',
            letterSpacing: '-0.01em',
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            fontSize: '0.75rem',
            color: 'rgba(244,239,229,0.6)',
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
            gridTemplateColumns: 'repeat(2, 1fr)',
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
        @media (max-width: 768px) {
          .portfolio-grid > div {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
