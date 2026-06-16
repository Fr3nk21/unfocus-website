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

const LAYER_CONFIG = [
  { scale: 1.3, speed: 60, opacity: 1.0 },
  { scale: 1.0, speed: 45, opacity: 1.0 },
  { scale: 0.75, speed: 30, opacity: 1.0 },
  { scale: 0.55, speed: 18, opacity: 1.0 },
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

      const speedFactor = 1; // constant, never changes
      let lastTime = performance.now();

      const loader = new THREE.TextureLoader();
      const layers = [];
      for (let l = 0; l < DEPTH_LAYERS; l++) layers[l] = [];

      // --- Preload all textures, then build the gallery ------------------
      const loadedTextures = [];
      let loadCount = 0;

      ALL_IMAGES.forEach((path, idx) => {
        loader.load(
          path,
          (tex) => {
            loadedTextures[idx] = tex;
            loadCount++;
            if (loadCount === ALL_IMAGES.length) buildGallery();
          },
          undefined,
          () => {
            loadCount++;
            if (loadCount === ALL_IMAGES.length) buildGallery();
          }
        );
      });

      // Shuffled pool of successfully-loaded textures, cycled through.
      let texPool = [];
      let texIdx = 0;
      function getNextTexture() {
        const tex = texPool[texIdx % texPool.length];
        texIdx++;
        return tex;
      }

      function addSprite(layerIndex, startX) {
        const cfg = LAYER_CONFIG[layerIndex];
        const texture = getNextTexture();
        const img = texture.image;

        const baseSize = 200 * cfg.scale;
        let spriteW = baseSize;
        let spriteH = baseSize;

        if (img && img.width && img.height) {
          const ratio = img.width / img.height;
          if (ratio > 1) {
            // Landscape
            spriteW = baseSize;
            spriteH = baseSize / ratio;
          } else {
            // Portrait
            spriteH = baseSize;
            spriteW = baseSize * ratio;
          }
        }

        const mat = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          opacity: 1.0,
        });
        const sprite = new THREE.Sprite(mat);
        sprite.scale.set(spriteW, spriteH, 1);

        const spacing = spriteW * (0.4 + Math.random() * 0.3);
        sprite.position.set(
          startX + spriteW / 2 + spacing,
          spriteH / 2 + Math.random() * Math.max(1, h - spriteH),
          -layerIndex * 50
        );
        sprite.userData = {
          speed: cfg.speed * (0.6 + Math.random() * 0.5),
          width: spriteW,
          height: spriteH,
          seed: Math.random() * 1000,
          baseY: sprite.position.y,
        };
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
            const sprite = addSprite(l, rightMost);
            rightMost = sprite.position.x + sprite.userData.width / 2;
          }
        }
      }

      function buildGallery() {
        texPool = loadedTextures.filter(Boolean).sort(() => Math.random() - 0.5);
        if (texPool.length === 0) return; // nothing loaded — render nothing
        fillViewport();
        lastTime = performance.now();
        animate();
      }

      function animate() {
        animationId = requestAnimationFrame(animate);
        const now = performance.now();
        const dt = Math.min(40, now - lastTime) / 1000;
        lastTime = now;

        for (const sprites of layers) {
          for (const s of sprites) {
            const ud = s.userData;
            s.position.x += ud.speed * speedFactor * dt; // constant rightward motion

            // wrap around when off screen
            if (s.position.x - ud.width / 2 > w) {
              s.position.x = -ud.width / 2 - Math.random() * ud.width;
            }

            // gentle float
            const pulse = 1 + Math.sin(now * 0.001 + ud.seed) * 0.008;
            s.scale.x = ud.width * pulse;
            s.scale.y = ud.height * pulse;
            s.position.y = ud.baseY + Math.sin(now * 0.0008 + ud.seed) * 4;
          }
        }

        renderer.render(scene, camera);
      }

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
      {/* Canvas container */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '60vh',
          cursor: 'default',
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}
