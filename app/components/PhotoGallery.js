'use client';

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
          <div key={i} className="gallery-item">
            <img src={src} alt="" loading="lazy" draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PhotoGallery() {
  return (
    <section className="gallery-section" aria-label="Photo gallery">
      <PhotoRow photos={ROW_ONE} direction="left" speed={70} />
      <PhotoRow photos={ROW_TWO} direction="right" speed={85} />

      <style>{`
        .gallery-section {
          background-color: #1E1B14;
          padding: 3rem 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .gallery-row { width: 100%; overflow: hidden; }
        .gallery-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation-name: galleryScroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .gallery-track:hover { animation-play-state: paused; }
        .gallery-item {
          height: 260px;
          flex-shrink: 0;
          border-radius: 12px;
          overflow: hidden;
        }
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
        @media (max-width: 768px) {
          .gallery-item { height: 180px; }
          .gallery-track { gap: 1rem; }
          .gallery-section { gap: 1rem; }
        }
      `}</style>
    </section>
  );
}
