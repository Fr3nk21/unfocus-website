'use client';

import { useState } from 'react';
import SectionWatermark from './SectionWatermark';

const PHOTOS = [
  '/images/portfolio/fratellino/01.webp',
  '/images/portfolio/fratellino/02.webp',
  '/images/portfolio/fratellino/03.webp',
  '/images/portfolio/venice/01.webp',
  '/images/portfolio/venice/02.webp',
  '/images/portfolio/venice/03.webp',
  '/images/portfolio/bar-ussou/01.webp',
  '/images/portfolio/bar-ussou/02.webp',
  '/images/portfolio/agriturismo/01.webp',
  '/images/portfolio/agriturismo/02.webp',
  '/images/portfolio/possum/01.webp',
  '/images/portfolio/possum/02.webp',
  '/videos/toyota-thumb.jpg',
  '/videos/pickle-jar-thumb.jpg',
  '/videos/floridia-night-thumb.jpg',
];

const ROW_ONE = PHOTOS.slice(0, 8);
const ROW_TWO = PHOTOS.slice(7).concat(PHOTOS.slice(0, 3));

export default function PhotoGallery() {
  const [lightbox, setLightbox] = useState(null);

  function PhotoRow({ photos, direction = 'left', speed = 60 }) {
    const doubled = [...photos, ...photos];
    return (
      <div className="gallery-row">
        <div
          className="gallery-track"
          style={{
            animationDuration: speed + 's',
            animationDirection: direction === 'left' ? 'normal' : 'reverse',
          }}
        >
          {doubled.map((src, i) => (
            <div key={i} className="gallery-item" onClick={() => setLightbox(src)}>
              <img src={src} alt="" loading="lazy" draggable={false} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="gallery-section" aria-label="Photo gallery">
      <SectionWatermark text="FRAMES" position="right" />
      <PhotoRow photos={ROW_ONE} direction="left" speed={70} />
      <PhotoRow photos={ROW_TWO} direction="right" speed={85} />

      {/* Lightbox overlay */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(14,12,8,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            cursor: 'zoom-out',
            animation: 'lightboxFade 0.25s ease',
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'none',
              border: 'none',
              color: 'rgba(244,239,229,0.7)',
              fontSize: '2rem',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            ×
          </button>
          <img
            src={lightbox}
            alt=""
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 20px 80px rgba(0,0,0,0.5)',
              cursor: 'default',
            }}
          />
        </div>
      )}

      <style>{`
        .gallery-section {
          position: relative;
          background-color: var(--ivory);
          padding: 3rem 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .gallery-row { width: 100%; overflow: hidden; position: relative; z-index: 1; }
        .gallery-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation-name: galleryScroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .gallery-track:hover { animation-play-state: paused; }
        .gallery-track:active { animation-play-state: paused; }
        .gallery-item {
          height: 260px;
          flex-shrink: 0;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .gallery-item:hover { transform: scale(1.03); }
        .gallery-item img {
          height: 100%;
          width: auto;
          display: block;
          object-fit: cover;
        }
        @keyframes galleryScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes lightboxFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 768px) {
          .gallery-item { height: 180px; }
          .gallery-track { gap: 1rem; }
          .gallery-section { gap: 1rem; padding-top: var(--section-padding-y-mobile); padding-bottom: var(--section-padding-y-mobile); }
        }
      `}</style>
    </section>
  );
}
