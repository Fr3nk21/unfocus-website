'use client';

import { useState, useRef, useEffect } from 'react';
import ThreeHero from './ThreeHero';
import YoutubeModal from './YoutubeModal';
import PhotoLightbox from './PhotoLightbox';

const portfolioItems = [
  {
    id: 'v-toyota',
    aspect: '16/9',
    category: 'Video',
    title: 'Toyota Finance',
    sub: 'with Red Herring Digital',
    video: '/videos/toyota-loop.mp4',
    youtubeId: '',
    vertical: false,
  },
  {
    id: 'p-fratellino',
    aspect: '16/9',
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
    aspect: '16/9',
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
    aspect: '16/9',
    category: 'Video',
    title: 'Pickle Jar',
    sub: 'with GTano',
    video: '/videos/pickle-jar-loop.mp4',
    youtubeId: 'R9qTTNp8zTg',
    vertical: false,
  },
  {
    id: 'v-liam',
    aspect: '16/9',
    category: 'Video',
    title: 'Wake Up and Live',
    sub: 'with the AOD',
    video: '/videos/liam-loop.mp4',
    youtubeId: '',
    vertical: false,
  },
  {
    id: 'p-bar-ussou',
    aspect: '16/9',
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
    aspect: '16/9',
    category: 'Photo',
    title: 'Agriturismo',
    sub: 'C’era Una Volta',
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
    aspect: '16/9',
    category: 'Video',
    title: 'Floridia',
    sub: 'with Atti.Co',
    video: '/videos/floridia-night-loop.mp4',
    youtubeId: 'N-tIYwkcpAE',
    vertical: false,
  },
  {
    id: 'v-fratellino',
    aspect: '16/9',
    category: 'Video',
    title: 'Fratellino Pizzeria',
    sub: '',
    video: '/videos/fratellino-loop.mp4',
    youtubeId: 'akSOmj9-SVs',
    vertical: true,
  },
  {
    id: 'p-possum',
    aspect: '16/9',
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

const filters = ['All', 'Video', 'Photo'];

export default function HeroPortfolio() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function handleScroll() {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = -rect.top;
      const scrollRange = sectionHeight - viewportHeight;
      const progress = Math.max(0, Math.min(1, scrolled / scrollRange));
      setScrollProgress(progress);
      setAnimationComplete(progress >= 0.95);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filtered =
    activeFilter === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  function handleVideoClick(item) {
    if (!animationComplete) return;
    if (item.youtubeId) {
      setActiveVideo(item);
      setModalOpen(true);
    }
  }

  function handlePhotoClick(item) {
    if (!animationComplete) return;
    setActivePhoto(item);
    setLightboxOpen(true);
  }

  return (
    <>
      <section
        ref={sectionRef}
        id="portfolio"
        style={{ minHeight: '300vh', position: 'relative' }}
      >
        {/* Sticky viewport container */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--ivory)',
          }}
        >
          {/* Canvas line network — fades with hero text */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              opacity: Math.max(0, 1 - scrollProgress * 2),
              pointerEvents: 'none',
            }}
          >
            <ThreeHero />
          </div>

          {/* Hero text overlay — fades out as scroll progresses */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '72px 2rem 0 4rem',
              opacity: Math.max(0, 1 - scrollProgress * 3),
              transform: `translateY(${scrollProgress * -60}px)`,
              transition: 'none',
              pointerEvents: scrollProgress > 0.3 ? 'none' : 'auto',
            }}
            className="hero-text-col"
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
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#4ADE80',
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
                  backgroundColor: 'var(--sienna)',
                  color: 'var(--ivory)',
                  padding: '0.85rem 2rem',
                  fontSize: '0.8rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  fontWeight: 400,
                  display: 'inline-block',
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                Get in touch
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--sienna)';
                  e.currentTarget.style.gap = '0.7rem';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--taupe)';
                  e.currentTarget.style.gap = '0.4rem';
                }}
              >
                What I do →
              </a>
            </div>
          </div>

          {/* Scroll cue — fades out quickly */}
          <div
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              opacity: Math.max(0, 1 - scrollProgress * 5),
              pointerEvents: scrollProgress > 0.15 ? 'none' : 'auto',
            }}
          >
            <a
              href="#portfolio"
              aria-label="Scroll to portfolio"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                animation: 'gentleBounce 2s ease-in-out infinite',
              }}
            >
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                <path d="M1 1L10 10L19 1" stroke="var(--taupe)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
          </div>

          {/* Portfolio header — fades in after animation nears completion */}
          <div
            style={{
              position: 'absolute',
              top: '2rem',
              left: '2rem',
              right: '2rem',
              zIndex: 5,
              opacity: Math.min(1, Math.max(0, (scrollProgress - 0.5) * 4)),
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              maxWidth: '1280px',
              margin: '0 auto',
              pointerEvents: scrollProgress < 0.6 ? 'none' : 'auto',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--taupe)',
                  marginBottom: '0.5rem',
                  fontWeight: 400,
                }}
              >
                Portfolio
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  fontWeight: 700,
                  color: 'var(--ink)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                }}
              >
                Recent work
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    minHeight: '44px',
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

          {/* The Grid — projects scale and reveal on scroll */}
          <div
            className="portfolio-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.25rem',
              maxWidth: '1280px',
              width: 'calc(100% - 4rem)',
              padding: '5rem 0 2rem',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {filtered.map((item, index) => {
              const isFeatured = index === 0;
              let itemScale, itemOpacity;

              if (isFeatured) {
                const scaleStart = 3.5;
                itemScale = scaleStart - (scaleStart - 1) * Math.min(1, scrollProgress * 1.5);
                itemOpacity = 1;
              } else {
                const delay = 0.3 + index * 0.03;
                const itemProgress = Math.max(0, Math.min(1, (scrollProgress - delay) / 0.5));
                itemScale = itemProgress;
                itemOpacity = itemProgress;
              }

              const isVideo = item.category === 'Video';
              const isPhoto = item.category === 'Photo';

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isVideo) handleVideoClick(item);
                    if (isPhoto) handlePhotoClick(item);
                  }}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: animationComplete ? 'pointer' : 'default',
                    aspectRatio: '16/9',
                    backgroundColor: 'var(--charcoal)',
                    transform: `scale(${itemScale})`,
                    opacity: itemOpacity,
                    transition: 'none',
                    zIndex: isFeatured ? 2 : 1,
                  }}
                >
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

                  {isPhoto && (
                    <img
                      src={item.cover}
                      alt={item.title}
                      loading={index < 4 ? 'eager' : 'lazy'}
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

                  {/* Gallery badge */}
                  {isPhoto && item.images && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        zIndex: 2,
                        pointerEvents: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        opacity: animationComplete ? 1 : 0,
                        transition: 'opacity 0.4s ease',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(244,239,229,0.8)" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <rect x="7" y="7" width="10" height="10" rx="1" />
                      </svg>
                      <span style={{ fontSize: '0.65rem', color: 'rgba(244,239,229,0.8)' }}>
                        {item.images.length}
                      </span>
                    </div>
                  )}

                  {/* Title overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)',
                      padding: '1.5rem 1.25rem 1.25rem',
                      zIndex: 3,
                      pointerEvents: 'none',
                      opacity: animationComplete ? 1 : 0,
                      transition: 'opacity 0.5s ease',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'rgba(14,12,8,0.55)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        padding: '0.75rem 1rem',
                        borderRadius: '4px',
                        display: 'inline-block',
                      }}
                    >
                      <h3
                        className="portfolio-overlay-title"
                        style={{
                          fontFamily: 'var(--font-playfair), Georgia, serif',
                          fontSize: '1.25rem',
                          fontWeight: 500,
                          color: '#F4EFE5',
                          marginBottom: item.sub ? '0.15rem' : 0,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {item.title}
                      </h3>
                      {item.sub && (
                        <p
                          className="portfolio-overlay-sub"
                          style={{
                            fontSize: '0.75rem',
                            color: 'rgba(244,239,229,0.6)',
                            fontWeight: 300,
                            margin: 0,
                          }}
                        >
                          {item.sub}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* CTA card — only when filtering and animation done */}
            {activeFilter !== 'All' && animationComplete && (
              <div
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  backgroundColor: '#1E1B14',
                  aspectRatio: '16/9',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: '2rem',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                    fontWeight: 500,
                    color: '#F0EBE1',
                    textAlign: 'center',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.3,
                  }}
                >
                  Curious to see more?
                </h3>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'rgba(240,235,225,0.5)',
                    fontWeight: 300,
                    textAlign: 'center',
                    marginTop: '0.5rem',
                  }}
                >
                  Let&apos;s talk about your project →
                </p>
              </div>
            )}
          </div>

          {/* Bottom gradient fade — matches the old Hero */}
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
              opacity: Math.max(0, 1 - scrollProgress * 4),
            }}
          />
        </div>
      </section>

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
          .portfolio-grid {
            grid-template-columns: 1fr !important;
            width: calc(100% - 2rem) !important;
            padding: 4rem 0 1rem !important;
          }
          .hero-text-col {
            padding: 72px 1.5rem 0 1.5rem !important;
          }
          .portfolio-overlay-title {
            font-size: 1rem !important;
          }
          .portfolio-overlay-sub {
            font-size: 0.65rem !important;
          }
        }
      `}</style>
    </>
  );
}
