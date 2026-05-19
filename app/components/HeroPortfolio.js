'use client';

import { useState, useEffect } from 'react';
import ThreeHero from './ThreeHero';
import YoutubeModal from './YoutubeModal';
import PhotoLightbox from './PhotoLightbox';

const portfolioItems = [
  {
    id: 'v-toyota',
    category: 'Video',
    title: 'Toyota Finance',
    sub: 'with Red Herring Digital',
    video: '/videos/toyota-loop.mp4',
    youtubeId: '',
    vertical: false,
  },
  {
    id: 'p-fratellino',
    category: 'Photo',
    title: 'Fratellino Pizzeria',
    sub: '',
    cover: '/images/portfolio/fratellino/thumb.webp',
    images: [
      '/images/portfolio/fratellino/01.webp',
      '/images/portfolio/fratellino/02.webp',
      '/images/portfolio/fratellino/03.webp',
      '/images/portfolio/fratellino/04.webp',
    ],
  },
  {
    id: 'p-venice',
    category: 'Photo',
    title: 'Venice',
    sub: '',
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
    id: 'v-pickle-jar',
    category: 'Video',
    title: 'Pickle Jar',
    sub: 'with GTano',
    video: '/videos/pickle-jar-loop.mp4',
    youtubeId: 'R9qTTNp8zTg',
    vertical: false,
  },
  {
    id: 'v-liam',
    category: 'Video',
    title: 'Wake Up and Live',
    sub: 'with the AOD',
    video: '/videos/liam-loop.mp4',
    youtubeId: '',
    vertical: false,
  },
  {
    id: 'p-bar-ussou',
    category: 'Photo',
    title: 'Bar Oussou',
    sub: 'with GTano',
    cover: '/images/portfolio/bar-ussou/thumb.webp',
    images: [
      '/images/portfolio/bar-ussou/01.webp',
      '/images/portfolio/bar-ussou/02.webp',
      '/images/portfolio/bar-ussou/03.webp',
      '/images/portfolio/bar-ussou/04.webp',
    ],
  },
  {
    id: 'p-agriturismo',
    category: 'Photo',
    title: 'Agriturismo',
    sub: "C'era Una Volta",
    cover: '/images/portfolio/agriturismo/thumb.webp',
    images: [
      '/images/portfolio/agriturismo/01.webp',
      '/images/portfolio/agriturismo/02.webp',
      '/images/portfolio/agriturismo/03.webp',
      '/images/portfolio/agriturismo/04.webp',
    ],
  },
  {
    id: 'v-floridia-night',
    category: 'Video',
    title: 'Floridia',
    sub: 'with Atti.Co',
    video: '/videos/floridia-night-loop.mp4',
    youtubeId: 'N-tIYwkcpAE',
    vertical: false,
  },
  {
    id: 'v-fratellino',
    category: 'Video',
    title: 'Fratellino Pizzeria',
    sub: '',
    video: '/videos/fratellino-loop.mp4',
    youtubeId: 'akSOmj9-SVs',
    vertical: true,
  },
  {
    id: 'p-possum',
    category: 'Photo',
    title: 'Possum',
    sub: 'with Filmnonick and Radical Raliens',
    cover: '/images/portfolio/possum/thumb.webp',
    images: [
      '/images/portfolio/possum/01.webp',
      '/images/portfolio/possum/02.webp',
      '/images/portfolio/possum/03.webp',
      '/images/portfolio/possum/04.webp',
    ],
  },
];

export default function HeroPortfolio() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);

  useEffect(() => {
    const slides = document.querySelectorAll('.snap-slide');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSlide(parseInt(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0.5 }
    );
    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  function handleClick(item) {
    if (item.category === 'Video' && item.youtubeId) {
      setActiveVideo(item);
      setModalOpen(true);
    } else if (item.category === 'Photo' && item.images) {
      setActivePhoto(item);
      setLightboxOpen(true);
    }
  }

  return (
    <>
      {/* ── Hero slide ─────────────────────────────────────────────── */}
      <section
        id="portfolio"
        className="snap-slide"
        data-index="0"
        style={{
          height: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          backgroundColor: 'var(--ivory)',
          paddingTop: '72px',
        }}
      >
        <ThreeHero />

        {/* Bottom gradient */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '200px',
            background: 'linear-gradient(to bottom, transparent 0%, var(--ivory) 100%)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Hero content */}
        <div
          className="hero-content"
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 2rem 0 4rem',
            width: '100%',
          }}
        >
          <p
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--taupe)',
              marginBottom: '1.5rem',
              fontWeight: 400,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#4ADE80',
                display: 'inline-block',
                animation: 'livePulse 2s ease-in-out infinite',
              }}
            />
            Richmond · Melbourne, Australia
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
              lineHeight: 1.08,
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '1.75rem',
              letterSpacing: '-0.02em',
            }}
          >
            <em style={{ fontStyle: 'italic', color: 'var(--sienna)' }}>Crafted,</em>{' '}
            not created.
          </h1>

          <p
            style={{
              fontSize: '1.0625rem',
              lineHeight: 1.72,
              color: 'var(--charcoal)',
              maxWidth: '480px',
              marginBottom: '2.5rem',
              fontWeight: 300,
              opacity: 0.85,
            }}
          >
            Video and photography for hospitality, corporate, and social brands. Based in Melbourne.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <a
              href="#contact"
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.85rem 2rem',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 400,
                backgroundColor: 'var(--sienna)',
                color: 'var(--ivory)',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <span>Get in touch</span>
            </a>
            <a
              href="#services"
              style={{
                color: 'var(--taupe)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                letterSpacing: '0.04em',
                fontWeight: 400,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'color 0.2s ease, gap 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--sienna)'; e.currentTarget.style.gap = '0.7rem'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--taupe)'; e.currentTarget.style.gap = '0.4rem'; }}
            >
              What I do →
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
            animation: 'gentleBounce 2s ease-in-out infinite',
          }}
        >
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
            <path d="M1 1L10 10L19 1" stroke="var(--taupe)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </section>

      {/* ── Project slides ──────────────────────────────────────────── */}
      {portfolioItems.map((item, index) => (
        <section
          key={item.id}
          className="snap-slide"
          data-index={index + 1}
          onClick={() => handleClick(item)}
          style={{
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
            cursor: (item.youtubeId || item.images) ? 'pointer' : 'default',
          }}
        >
          {/* Background: looping video */}
          {item.category === 'Video' && item.video && (
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

          {/* Background: cover photo */}
          {item.category === 'Photo' && item.cover && (
            <img
              src={item.cover}
              alt={item.title}
              loading={index < 2 ? 'eager' : 'lazy'}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          )}

          {/* Dark gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 45%, transparent 70%)',
              zIndex: 1,
            }}
          />

          {/* Project info */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '0 2rem 3.5rem',
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--sienna)',
                fontWeight: 400,
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              {item.category} · {String(index + 1).padStart(2, '0')}/{String(portfolioItems.length).padStart(2, '0')}
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#F4EFE5',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: item.sub ? '0.3rem' : 0,
              }}
            >
              {item.title}
            </h2>

            {item.sub && (
              <p style={{ fontSize: '1rem', color: 'rgba(244,239,229,0.6)', fontWeight: 300 }}>
                {item.sub}
              </p>
            )}

            {item.category === 'Photo' && item.images && (
              <p
                style={{
                  fontSize: '0.75rem',
                  color: 'rgba(244,239,229,0.4)',
                  marginTop: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(244,239,229,0.5)" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <rect x="7" y="7" width="10" height="10" rx="1" />
                </svg>
                Click to view {item.images.length} photos
              </p>
            )}

            {item.category === 'Video' && item.youtubeId && (
              <p
                style={{
                  fontSize: '0.75rem',
                  color: 'rgba(244,239,229,0.4)',
                  marginTop: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(244,239,229,0.5)" strokeWidth="1.5">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Click to watch full video
              </p>
            )}
          </div>

          {/* Progress dots — right edge */}
          <div
            style={{
              position: 'absolute',
              right: '1.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {portfolioItems.map((_, i) => (
              <div
                key={i}
                style={{
                  width: '4px',
                  height: currentSlide === i + 1 ? '24px' : '4px',
                  borderRadius: '2px',
                  backgroundColor: currentSlide === i + 1 ? 'var(--sienna)' : 'rgba(244,239,229,0.3)',
                  transition: 'height 0.3s ease, background-color 0.3s ease',
                }}
              />
            ))}
          </div>
        </section>
      ))}

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
          .hero-content {
            padding: 0 1.5rem !important;
          }
          .snap-slide h2 {
            font-size: 1.75rem !important;
          }
        }
      `}</style>
    </>
  );
}
