'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

export default function SectionWatermark({ text, position = 'right' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Subtle horizontal drift as the section scrolls through the viewport.
  // Range kept small so it reads as depth, not distraction.
  const x = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <>
      <motion.span
        ref={ref}
        aria-hidden="true"
        className="section-watermark"
        style={{
          position: 'absolute',
          top: '50%',
          [position]: '-2%',
          y: '-50%',              // replaces transform: translateY(-50%)
          x: reduce ? 0 : x,     // parallax; disabled when prefers-reduced-motion
          fontFamily: 'var(--font-manrope), system-ui, sans-serif',
          fontSize: 'clamp(7rem, 18vw, 16rem)',
          fontWeight: 800,
          color: 'var(--ink)',
          opacity: 0.03,
          pointerEvents: 'none',
          zIndex: 0,
          letterSpacing: '-0.05em',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
      >
        {text}
      </motion.span>
      <style>{`
        @media (max-width: 767px) {
          .section-watermark { font-size: 4.5rem !important; }
        }
      `}</style>
    </>
  );
}
