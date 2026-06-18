export default function SectionWatermark({ text, position = 'right' }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="section-watermark"
        style={{
          position: 'absolute',
          top: '50%',
          [position]: '-2%',
          transform: 'translateY(-50%)',
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
      </span>
      <style>{`
        @media (max-width: 767px) {
          .section-watermark { font-size: 4.5rem !important; }
        }
      `}</style>
    </>
  );
}
