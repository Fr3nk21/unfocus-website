export default function SectionLabel({ number, align = 'left' }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        marginBottom: '1rem',
      }}
      aria-hidden="true"
    >
      <span
        style={{
          fontSize: '0.7rem',
          fontVariantNumeric: 'tabular-nums',
          color: 'var(--sienna)',
          fontWeight: 500,
          letterSpacing: '0.1em',
        }}
      >
        {number}
      </span>
      <span style={{ width: '40px', height: '1px', background: 'var(--sienna)', opacity: 0.4 }} />
    </div>
  );
}
