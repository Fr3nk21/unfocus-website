const items = [
  'Hospitality & Food',
  'Social Media Content',
  'Event Coverage',
  'Corporate Video',
  'Legacy Video',
  'Commercial Photography',
];

function TickerItems() {
  return (
    <>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0' }}>
          <span
            style={{
              fontFamily: 'var(--font-imfell), Georgia, serif',
              fontStyle: 'italic',
              fontSize: '1.0625rem',
              color: 'var(--ink)',
              padding: '0 2rem',
              whiteSpace: 'nowrap',
            }}
          >
            {item}
          </span>
          <span
            style={{
              color: 'var(--sienna)',
              fontSize: '0.75rem',
              padding: '0 0.5rem',
            }}
          >
            ✦
          </span>
        </span>
      ))}
    </>
  );
}

export default function Ticker() {
  return (
    <div
      style={{
        backgroundColor: 'var(--cream)',
        borderTop: '1px solid rgba(24,21,15,0.1)',
        borderBottom: '1px solid rgba(24,21,15,0.1)',
        overflow: 'hidden',
        padding: '1rem 0',
      }}
    >
      <div className="ticker-track">
        <TickerItems />
        <TickerItems />
      </div>
    </div>
  );
}
