'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
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

function SplitChars({ text, className }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span key={i} className="char" style={{ display: 'inline-block' }}>
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  );
}

export default function HeroNew() {
  const heroRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [textRevealed, setTextRevealed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);

  // GSAP diagonal + text animation
  useEffect(() => {
    let ctx;

    async function animate() {
      const gsap = (await import('gsap')).default;
      if (!heroRef.current) return;

      ctx = gsap.context(() => {
        const leftChars = heroRef.current.querySelectorAll('.hero-text-left .char');
        const rightChars = heroRef.current.querySelectorAll('.hero-text-right .char');
        const ground = heroRef.current.querySelector('.hero-ground');
        const air = heroRef.current.querySelector('.hero-air');

        gsap.set(leftChars, { opacity: 0, y: 20 });
        gsap.set(rightChars, { opacity: 0, y: -20 });

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.3 });

        // Animate the diagonal by updating CSS custom property via inline style
        tl.to({ val: 120 }, {
          val: -60,
          duration: 2,
          ease: 'elastic.inOut(1.2, 0.6)',
          onUpdate: function () {
            if (heroRef.current) {
              const deg = Math.round(this.targets()[0].val);
              ground.style.background = `linear-gradient(${deg}deg, var(--ivory) 50%, var(--sienna) 50%)`;
              air.style.background = `linear-gradient(${deg}deg, transparent calc(50% - var(--thickness) - var(--border)), var(--ivory) calc(50% - var(--thickness) - var(--border)), var(--ivory) calc(50% - var(--thickness)), var(--parchment) calc(50% - var(--thickness)), var(--parchment) calc(50% + var(--thickness)), var(--sienna) calc(50% + var(--thickness)), var(--sienna) calc(50% + var(--thickness) + var(--border)), transparent calc(50% + var(--thickness) + var(--border)))`;
            }
          },
        })
        .to(leftChars, { opacity: 1, y: 0, stagger: -0.04, duration: 0.6 }, 0.8)
        .to(rightChars, { opacity: 1, y: 0, stagger: 0.04, duration: 0.6 }, 0.8)
        .add(() => setTextRevealed(true), 2);
      }, heroRef);
    }

    animate();
    return () => ctx?.revert();
  }, []);

  const toPrev = () => setActiveIndex((p) => Math.max(0, p - 1));
  const toNext = () => setActiveIndex((p) => Math.min(portfolioItems.length - 1, p + 1));
  const toSlide = (i) => setActiveIndex(i);

  function handleProjectClick(item) {
    if (item.category === 'Video' && item.youtubeId) {
      setActiveVideo(item);
      setModalOpen(true);
    } else if (item.category === 'Photo' && item.images) {
      setActivePhoto(item);
      setLightboxOpen(true);
    }
  }

  const CARD_W = 'clamp(200px, 24vw, 340px)';

  return (
    <>
      <section
        ref={heroRef}
        id="portfolio"
        className="hero-new"
        style={{
          '--thickness': '8px',
          '--border': '8px',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          gap: '2rem',
          paddingTop: '72px',
          paddingBottom: '4rem',
        }}
      >
        {/* Diagonal background — ground layer */}
        <div
          className="hero-ground"
          style={{
            position: 'absolute',
            inset: '-25%',
            zIndex: 0,
            background: 'linear-gradient(120deg, var(--ivory) 50%, var(--sienna) 50%)',
          }}
        />

        {/* Diagonal background — border/stripe layer */}
        <div
          className="hero-air"
          style={{
            position: 'absolute',
            inset: '-25%',
            zIndex: 1,
            background: `linear-gradient(120deg,
              transparent calc(50% - var(--thickness) - var(--border)),
              var(--ivory) calc(50% - var(--thickness) - var(--border)),
              var(--ivory) calc(50% - var(--thickness)),
              var(--parchment) calc(50% - var(--thickness)),
              var(--parchment) calc(50% + var(--thickness)),
              var(--sienna) calc(50% + var(--thickness)),
              var(--sienna) calc(50% + var(--thickness) + var(--border)),
              transparent calc(50% + var(--thickness) + var(--border)))`,
          }}
        />

        {/* Canvas line network */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            pointerEvents: 'none',
            opacity: 0.45,
            mixBlendMode: 'overlay',
          }}
        >
          <ThreeHero />
        </div>

        {/* Location badge */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <p
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--taupe)',
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
        </div>

        {/* Main headline */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <span style={{ color: 'var(--sienna)', fontStyle: 'italic' }}>
              <SplitChars text="CRAFTED," className="hero-text-left" />
            </span>
            <span style={{ color: 'var(--ink)' }}>
              <SplitChars text="NOT CREATED." className="hero-text-right" />
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
              color: 'var(--taupe)',
              fontWeight: 300,
              maxWidth: '450px',
              marginTop: '1rem',
              opacity: textRevealed ? 1 : 0,
              transition: 'opacity 0.8s ease',
            }}
          >
            Video and photography for hospitality, corporate, and social brands.
          </p>
        </div>

        {/* ── Project carousel ──────────────────────────────────────── */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            overflow: 'hidden',
            padding: '0.5rem 0 0',
            opacity: textRevealed ? 1 : 0,
            transform: textRevealed ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
          }}
        >
          {/* Track — centered on active card */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              gap: '1rem',
              padding: '1rem 0 0.5rem',
            }}
          >
            {portfolioItems.map((item, i) => {
              const isActive = activeIndex === i;
              const offset = i - activeIndex;

              return (
                <motion.div
                  key={item.id}
                  style={{ perspective: '800px', flexShrink: 0 }}
                  animate={{ opacity: Math.abs(offset) > 3 ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    style={{
                      width: CARD_W,
                      aspectRatio: '2/3',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      position: 'relative',
                      cursor: isActive && (item.youtubeId || item.images) ? 'pointer' : offset !== 0 ? 'pointer' : 'default',
                      willChange: 'transform',
                    }}
                    animate={{
                      rotateY: offset * -35,
                      scale: isActive ? 1 : 0.82,
                      z: isActive ? 0 : -80,
                    }}
                    transition={{ type: 'spring', bounce: 0.1, duration: 0.9 }}
                    onClick={() => {
                      if (isActive) handleProjectClick(item);
                      else toSlide(i);
                    }}
                  >
                    {/* Media */}
                    {item.category === 'Video' && item.video ? (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      >
                        <source src={item.video} type="video/mp4" />
                      </video>
                    ) : item.cover ? (
                      <img
                        src={item.cover}
                        alt={item.title}
                        loading={i < 4 ? 'eager' : 'lazy'}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : null}

                    {/* Gradient */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '55%',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)',
                        pointerEvents: 'none',
                        zIndex: 1,
                      }}
                    />

                    {/* Category badge */}
                    <span
                      style={{
                        position: 'absolute',
                        top: '0.75rem',
                        left: '0.75rem',
                        fontSize: '0.6rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#F4EFE5',
                        backgroundColor: 'var(--sienna)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '3px',
                        zIndex: 2,
                      }}
                    >
                      {item.category}
                    </span>

                    {/* Title — only on active */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: '1rem',
                        right: '1rem',
                        zIndex: 2,
                      }}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        filter: isActive ? 'blur(0px)' : 'blur(4px)',
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-playfair), Georgia, serif',
                          fontSize: '1.1rem',
                          fontWeight: 500,
                          color: '#F4EFE5',
                          margin: 0,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {item.title}
                      </p>
                      {item.sub && (
                        <p
                          style={{
                            fontSize: '0.75rem',
                            color: 'rgba(244,239,229,0.6)',
                            fontWeight: 300,
                            margin: '0.15rem 0 0',
                          }}
                        >
                          {item.sub}
                        </p>
                      )}
                      {item.youtubeId && (
                        <p style={{ fontSize: '0.7rem', color: 'rgba(244,239,229,0.45)', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                          Watch full video
                        </p>
                      )}
                      {item.images && (
                        <p style={{ fontSize: '0.7rem', color: 'rgba(244,239,229,0.45)', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>
                          View {item.images.length} photos
                        </p>
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '1.25rem',
            }}
          >
            <button
              onClick={toPrev}
              disabled={activeIndex === 0}
              className="carousel-btn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {portfolioItems.map((_, i) => (
                <div
                  key={i}
                  onClick={() => toSlide(i)}
                  style={{
                    width: activeIndex === i ? '20px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: activeIndex === i ? 'var(--sienna)' : 'var(--parchment)',
                    cursor: 'pointer',
                    transition: 'width 0.3s ease, background-color 0.3s ease',
                  }}
                />
              ))}
            </div>

            <button
              onClick={toNext}
              disabled={activeIndex === portfolioItems.length - 1}
              className="carousel-btn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            animation: 'gentleBounce 2s ease-in-out infinite',
          }}
        >
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
            <path d="M1 1L10 10L19 1" stroke="var(--taupe)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
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
        .hero-ground, .hero-air {
          will-change: background;
        }
        .carousel-btn {
          background: none;
          border: 1px solid var(--parchment);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--taupe);
          transition: border-color 0.2s ease, color 0.2s ease, opacity 0.2s ease;
        }
        .carousel-btn:hover:not(:disabled) {
          border-color: var(--sienna);
          color: var(--sienna);
        }
        .carousel-btn:disabled {
          opacity: 0.3;
          cursor: default;
        }
        @media (max-width: 768px) {
          .hero-new h1 {
            font-size: clamp(2.2rem, 12vw, 4rem) !important;
          }
        }
      `}</style>
    </>
  );
}
