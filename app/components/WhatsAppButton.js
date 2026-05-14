'use client';

export default function WhatsAppButton() {
  return (
    <>
      <a
        href="https://api.whatsapp.com/send?phone=61476278891"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="wa-btn"
      >
        <span className="wa-orbit" />
        <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--sienna)">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span style={{ color: '#F0EBE1', fontSize: '0.8rem', fontWeight: 400 }}>Chat now</span>
      </a>

      <style>{`
        .wa-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 9998;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background-color: #1E1B14;
          padding: 0.75rem 1.25rem;
          border-radius: 50px;
          text-decoration: none;
          border: 1px solid rgba(244,239,229,0.1);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .wa-btn:hover {
          transform: translateY(-2px);
          border-color: var(--sienna);
        }
        .wa-orbit {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #4ADE80;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(74,222,128,0.6), -8px 0 12px rgba(74,222,128,0.3), -16px 0 18px rgba(74,222,128,0.1);
          animation: cometOrbit 3s linear infinite;
        }
        @keyframes cometOrbit {
          0% {
            top: 50%;
            left: -3px;
            transform: translateY(-50%);
          }
          25% {
            top: -3px;
            left: 50%;
            transform: translateX(-50%);
          }
          50% {
            top: 50%;
            right: -3px;
            left: auto;
            transform: translateY(-50%);
          }
          75% {
            top: calc(100% - 3px);
            left: 50%;
            right: auto;
            transform: translateX(-50%);
          }
          100% {
            top: 50%;
            left: -3px;
            right: auto;
            transform: translateY(-50%);
          }
        }
      `}</style>
    </>
  );
}
