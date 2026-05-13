'use client';

import { useEffect, useRef } from 'react';

export default function ThreeHero() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let animationId;
    let renderer, scene, camera, points;
    let mouseX = 0;
    let mouseY = 0;
    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;

    async function init() {
      const THREE = await import('three');

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
      camera.position.z = 30;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);

      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 300 : 800;
      const positions = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const opacities = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 50;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

        sizes[i]    = Math.random() * 2.5 + 0.5;
        opacities[i] = Math.random() * 0.4 + 0.1;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('aSize',    new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));

      const isDark = document.documentElement.classList.contains('dark');

      const material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime:       { value: 0 },
          uMouse:      { value: new THREE.Vector2(0, 0) },
          uColor:      { value: new THREE.Color(isDark ? '#C4956C' : '#A0714F') },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        },
        vertexShader: `
          attribute float aSize;
          attribute float aOpacity;
          uniform float uTime;
          uniform vec2 uMouse;
          uniform float uPixelRatio;
          varying float vOpacity;

          void main() {
            vec3 pos = position;

            pos.x += sin(pos.y * 0.3 + uTime * 0.4) * 0.5;
            pos.y += cos(pos.x * 0.2 + uTime * 0.3) * 0.4;
            pos.z += sin(pos.x * 0.15 + pos.y * 0.15 + uTime * 0.2) * 0.3;

            vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
            vec2 screenPos = mvPos.xy / mvPos.w;
            float dist = distance(screenPos, uMouse * 0.5);
            float influence = smoothstep(8.0, 0.0, dist) * 2.0;
            pos.x += (screenPos.x - uMouse.x * 0.5) * influence * 0.3;
            pos.y += (screenPos.y - uMouse.y * 0.5) * influence * 0.3;

            mvPos = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPos;
            gl_PointSize = aSize * uPixelRatio * (20.0 / -mvPos.z);

            vOpacity = aOpacity;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          varying float vOpacity;

          void main() {
            float d = distance(gl_PointCoord, vec2(0.5));
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.1, d) * vOpacity;
            gl_FragColor = vec4(uColor, alpha);
          }
        `,
      });

      points = new THREE.Points(geometry, material);
      scene.add(points);

      const clock = new THREE.Clock();

      function animate() {
        animationId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();
        material.uniforms.uTime.value = elapsed;

        material.uniforms.uMouse.value.x += (mouseX - material.uniforms.uMouse.value.x) * 0.05;
        material.uniforms.uMouse.value.y += (mouseY - material.uniforms.uMouse.value.y) * 0.05;

        points.rotation.y = elapsed * 0.02;
        points.rotation.x = Math.sin(elapsed * 0.1) * 0.05;

        renderer.render(scene, camera);
      }

      animate();
    }

    init();

    function handleMouseMove(e) {
      mouseX = (e.clientX / width) * 2 - 1;
      mouseY = -(e.clientY / height) * 2 + 1;
    }
    window.addEventListener('mousemove', handleMouseMove);

    function handleResize() {
      width  = containerRef.current?.clientWidth  || width;
      height = containerRef.current?.clientHeight || height;
      if (camera) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
      if (renderer) renderer.setSize(width, height);
    }
    window.addEventListener('resize', handleResize);

    const htmlEl = document.documentElement;
    const observer = new MutationObserver(() => {
      if (!points) return;
      const isDark = htmlEl.classList.contains('dark');
      points.material.uniforms.uColor.value.set(isDark ? '#C4956C' : '#A0714F');
    });
    observer.observe(htmlEl, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) {
        renderer.dispose();
        if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.6,
      }}
    />
  );
}
