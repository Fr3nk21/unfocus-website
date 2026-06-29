'use client';

import { useState } from 'react';
import SectionWatermark from './SectionWatermark';

const PHOTOS = [
  '/images/gallery/01_02_laghi_gemelli.webp',
  '/images/gallery/01_04_laghi_gemelli.webp',
  '/images/gallery/04_01_venice.webp',
  '/images/gallery/04_02_venice.webp',
  '/images/gallery/04_04_venice.webp',
  '/images/gallery/05_03_fratellino.webp',
  '/images/gallery/DSC00486.webp',
  '/images/gallery/DSC00624.webp',
  '/images/gallery/DSC01484.webp',
  '/images/gallery/DSC01690-2.webp',
  '/images/gallery/DSC01694-2.webp',
  '/images/gallery/DSC01765-2.webp',
  '/images/gallery/DSC01855-2.webp',
  '/images/gallery/DSC01985-Enhanced-NR.webp',
  '/images/gallery/DSC02294.webp',
  '/images/gallery/DSC02720.webp',
  '/images/gallery/DSC03090.webp',
  '/images/gallery/DSC03575.webp',
  '/images/gallery/DSC05443.webp',
  '/images/gallery/DSC05518.webp',
  '/images/gallery/DSC05717.webp',
  '/images/gallery/DSC06730.webp',
  '/images/gallery/DSC06967.webp',
  '/images/gallery/DSC07391.webp',
  '/images/gallery/DSC08281.webp',
  '/images/gallery/DSC08502.webp',
  '/images/gallery/DSC08796.webp',
  '/images/gallery/DSC08856.webp',
  '/images/gallery/DSC09069.webp',
  '/images/gallery/DSC09640.webp',
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SHUFFLED = shuffle(PHOTOS);
const ROW_ONE = SHUFFLED.slice(0, 15);
const ROW_TWO = SHUFFLED.slice(15);

function GalleryItem({ src, onClick }) {
  const isVideo = src.endsWith('.mp4');
  return (
    <div className="gallery-item" onClick={() => onClick(src)}>
      {isVideo ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          style={{ height: '100%', width: 'auto', display: 'block', objectFit: 'cover' }}
        />
      ) : (
        <img src={src} alt="" loading="lazy" draggable={false}
  width="400" height="260"
  style={{ height: '100%', width: 'auto', display: 'block', objectFit: 'cover' }} />
      )}
    </div>
  );
}

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
            <GalleryItem key={i} src={src} onClick={setLightbox} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="gallery-section" aria-label="Photo gallery">
      <SectionWatermark text="FRAMES" position="right" />
      <PhotoRow photos={ROW_ONE} direction="left" speed={200} />
      <PhotoRow photos={ROW_TWO} direction="right" speed={260} />

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
          {lightbox.endsWith('.mp4') ? (
            <video
              src={lightbox}
              autoPlay muted loop playsInline controls
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '90vw',
                maxHeight: '85vh',
                borderRadius: '8px',
                boxShadow: '0 20px 80px rgba(0,0,0,0.5)',
              }}
            />
          ) : (
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
          )}
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