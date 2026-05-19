'use client';

import { useEffect, useRef } from 'react';

const PHOTO_PATHS = [
  '/images/portfolio/fratellino/01.webp',
  '/images/portfolio/fratellino/02.webp',
  '/images/portfolio/fratellino/03.webp',
  '/images/portfolio/fratellino/04.webp',
  '/images/portfolio/venice/01.webp',
  '/images/portfolio/venice/02.webp',
  '/images/portfolio/venice/03.webp',
  '/images/portfolio/venice/04.webp',
  '/images/portfolio/venice/05.webp',
  '/images/portfolio/bar-ussou/01.webp',
  '/images/portfolio/bar-ussou/02.webp',
  '/images/portfolio/bar-ussou/03.webp',
  '/images/portfolio/bar-ussou/04.webp',
  '/images/portfolio/agriturismo/01.webp',
  '/images/portfolio/agriturismo/02.webp',
  '/images/portfolio/agriturismo/03.webp',
  '/images/portfolio/agriturismo/04.webp',
  '/images/portfolio/possum/01.webp',
  '/images/portfolio/possum/02.webp',
  '/images/portfolio/possum/03.webp',
  '/images/portfolio/possum/04.webp',
];

const THUMB_PATHS = [
  '/videos/toyota-thumb.jpg',
  '/videos/pickle-jar-thumb.jpg',
  '/videos/liam-thumb.jpg',
  '/videos/fratellino-thumb.jpg',
  '/videos/floridia-night-thumb.jpg',
];

const ALL_IMAGES = [...PHOTO_PATHS, ...THUMB_PATHS];

const DEPTH_LAYERS = 4;
const MAX_WIDTH = 180;
const MAX_HEIGHT = 180;

const LAYER_CONFIG = [
  { scale: 1.4, speed: 70, opacity: 1.0 },
  { scale: 1.0, speed: 40, opacity: 0.8 },
  { scale: 0.7, speed: 25, opacity: 0.6 },
  { scale: 0.5, speed: 15, opacity: 0.4 },
];

export default function PhotoGallery() {
  const containerRef = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId;

    async function init() {
      const THREE = await import('three');

      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'low-power',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      let w = container.clientWidth;
      let h = container.clientHeight;
      renderer.setSize(w, h);

      const camera = new THREE.OrthographicCamera(0, w, h, 0, -1000, 1000);
      camera.position.z = 10;

      let speedFactor = 1;
      let dragActive = false;
      let lastX = 0;
      let lastTime = performance.now();

      const loader = new THREE.TextureLoader();
      const layers = [];
      for (let l = 0; l < DEPTH_LAYERS; l++) layers[l] = [];

      const shuffled = [...ALL_IMAGES].sort(() => Math.random() - 0.5);
      let imgIdx = 0;
      function getNextImage() {
        const img = shuffled[imgIdx % shuffled.length];
        imgIdx++;
        return img;
      }

      function addSprite(layerIndex, startX) {
        const cfg = LAYER_CONFIG[layerIndex];
        const path = getNextImage();

        const sizeVar = 0.85 + Math.random() * 0.3;
        const baseW = MAX_WIDTH * cfg.scale * sizeVar;
        const spacing = baseW * (0.4 + Math.random() * 0.4);

        const mat = new THREE.SpriteMaterial({ transparent: true, opacity: cfg.opacity });
        const sprite = new THREE.Sprite(mat);

        sprite.scale.set(baseW, baseW, 1);
        sprite.position.set(
          startX + baseW / 2 + spacing,
          baseW / 2 + Math.random() * (h - baseW),
          -layerIndex * 50
        );
        sprite.userData = {
          speed: cfg.speed * (0.45 + Math.random() * 0.7),
          width: baseW,
          height: baseW,
          seed: Math.random() * 1000,
          baseY: sprite.position.y,
        };

        loader.load(path, (tex) => {
          mat.map = tex;
          mat.needsUpdate = true;
          const ratio = tex.image.width / tex.image.height;
          const spriteW = baseW;
          const spriteH = baseW / ratio;
          sprite.scale.set(spriteW, spriteH, 1);
          sprite.userData.width = spriteW;
          sprite.userData.height = spriteH;
        });

        layers[layerIndex].push(sprite);
        scene.add(sprite);
        return sprite;
      }

      function fillViewport() {
        for (let l = 0; l < DEPTH_LAYERS; l++) {
          let rightMost =
            layers[l].length > 0
              ? Math.max(...layers[l].map((s) => s.position.x + s.userData.width / 2))
              : -w * 0.5;
          while (rightMost < w * 1.5) {
            addSprite(l, rightMost);
            rightMost = Math.max(...layers[l].map((s) => s.position.x + s.userData.width / 2));
          }
        }
      }

      fillViewport();

      function animate() {
        animationId = requestAnimationFrame(animate);
        const now = performance.now();
        const dt = Math.min(40, now - lastTime) / 1000;
        lastTime = now;

        for (const sprites of layers) {
          for (const s of sprites) {
            const ud = s.userData;
            s.position.x += ud.speed * speedFactor * dt;

            if (speedFactor >= 0 && s.position.x - ud.width / 2 > w) {
              s.position.x = -ud.width / 2 - Math.random() * ud.width * 0.5;
            } else if (speedFactor < 0 && s.position.x + ud.width / 2 < 0) {
              s.position.x = w + ud.width / 2 + Math.random() * ud.width * 0.5;
            }

            const pulse = 1 + Math.sin(now * 0.001 + ud.seed) * 0.01;
            s.scale.x = ud.width * pulse;
            s.scale.y = ud.height * pulse;
            s.position.y = ud.baseY + Math.sin(now * 0.0008 + ud.seed) * 4;
          }
        }

        renderer.render(scene, camera);
      }
      animate();

      // Wheel — accelerate then coast back to speed 1
      let wheelTimeout;
      function handleWheel(e) {
        e.preventDefault();
        clearTimeout(wheelTimeout);
        const dir = Math.sign(e.deltaY);
        speedFactor = dir * Math.min(5, Math.abs(speedFactor) + 0.8);
        wheelTimeout = setTimeout(() => {
          speedFactor = 1;
        }, 600);
      }
      container.addEventListener('wheel', handleWheel, { passive: false });

      // Drag
      function getX(e) { return e.touches ? e.touches[0].clientX : e.clientX; }

      function onDragStart(e) {
        dragActive = true;
        lastX = getX(e);
        container.style.cursor = 'grabbing';
      }
      function onDragMove(e) {
        if (!dragActive) return;
        const x = getX(e);
        const delta = x - lastX;
        if (Math.abs(delta) > 0) speedFactor = -delta * 0.08;
        lastX = x;
      }
      function onDragEnd() {
        dragActive = false;
        container.style.cursor = 'grab';
        // Decay back to auto-scroll
        setTimeout(() => { speedFactor = 1; }, 800);
      }

      container.addEventListener('mousedown', onDragStart);
      container.addEventListener('mousemove', onDragMove);
      window.addEventListener('mouseup', onDragEnd);
      container.addEventListener('touchstart', onDragStart, { passive: true });
      container.addEventListener('touchmove', onDragMove, { passive: true });
      window.addEventListener('touchend', onDragEnd);

      function handleResize() {
        w = container.clientWidth;
        h = container.clientHeight;
        renderer.setSize(w, h);
        camera.right = w;
        camera.top = h;
        camera.updateProjectionMatrix();
      }
      window.addEventListener('resize', handleResize);

      cleanupRef.current = () => {
        cancelAnimationFrame(animationId);
        clearTimeout(wheelTimeout);
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('mousedown', onDragStart);
        container.removeEventListener('mousemove', onDragMove);
        window.removeEventListener('mouseup', onDragEnd);
        container.removeEventListener('touchstart', onDragStart);
        container.removeEventListener('touchmove', onDragMove);
        window.removeEventListener('touchend', onDragEnd);
        window.removeEventListener('resize', handleResize);
        scene.traverse((obj) => {
          if (obj.material) {
            obj.material.map?.dispose();
            obj.material.dispose();
          }
        });
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    }

    init();
    return () => { if (cleanupRef.current) cleanupRef.current(); };
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#1E1B14',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <p
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(244,239,229,0.4)',
            marginBottom: '0.5rem',
          }}
        >
          Gallery
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--ivory)',
            margin: 0,
          }}
        >
          Through the lens
        </h2>
      </div>

      {/* Drag hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(244,239,229,0.3)"
          strokeWidth="1.5"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        <span
          style={{
            fontSize: '0.7rem',
            color: 'rgba(244,239,229,0.3)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Scroll or drag to explore
        </span>
      </div>

      {/* Canvas container */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '70vh',
          cursor: 'grab',
        }}
      />
    </section>
  );
}
