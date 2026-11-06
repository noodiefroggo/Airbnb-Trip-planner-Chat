/**
 * The content pack has no cleared photos, so each card gets a simple
 * illustrated placeholder instead of a stock image.
 */

export function MachiyaArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F9D9C4" />
          <stop offset="1" stopColor="#F3B89A" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#sky)" />
      <circle cx="250" cy="52" r="22" fill="#FDF1E6" opacity="0.9" />
      {/* roof */}
      <path d="M40 92 L160 54 L280 92 Z" fill="#3E3A39" />
      <rect x="58" y="90" width="204" height="90" fill="#7A4E35" />
      {/* lattice */}
      {Array.from({ length: 13 }).map((_, i) => (
        <rect key={i} x={70 + i * 14} y="104" width="5" height="62" fill="#5A3826" />
      ))}
      <rect x="140" y="118" width="40" height="62" fill="#2E2220" />
      <rect x="146" y="124" width="28" height="18" fill="#F6C27A" opacity="0.85" />
      {/* lantern */}
      <rect x="96" y="96" width="14" height="20" rx="6" fill="#FF385C" />
      {/* garden */}
      <ellipse cx="34" cy="176" rx="60" ry="26" fill="#6E8B5A" />
      <ellipse cx="300" cy="178" rx="54" ry="22" fill="#5D7A4B" />
    </svg>
  );
}

export function TeaArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <rect width="320" height="180" fill="#E7EBDC" />
      {/* tatami */}
      <rect y="118" width="320" height="62" fill="#CFC7A0" />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={i * 64} y="118" width="2" height="62" fill="#B3AA80" />
      ))}
      {/* shoji */}
      <rect x="20" y="16" width="120" height="96" fill="#F7F4EA" stroke="#9C8A6A" strokeWidth="4" />
      <path d="M60 16v96M100 16v96M20 48h120M20 80h120" stroke="#9C8A6A" strokeWidth="2" />
      {/* bowl */}
      <path d="M170 120 h96 a48 40 0 0 1 -96 0z" fill="#3B4A3A" />
      <ellipse cx="218" cy="120" rx="48" ry="9" fill="#7FA34C" />
      {/* whisk */}
      <path d="M250 70 l-14 40" stroke="#C9A86A" strokeWidth="6" strokeLinecap="round" />
      <path d="M231 106 q5 10 10 0" stroke="#C9A86A" strokeWidth="3" fill="none" />
    </svg>
  );
}

export function RamenArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <rect width="120" height="120" fill="#2B2422" />
      <circle cx="60" cy="62" r="44" fill="#B3462F" />
      <circle cx="60" cy="62" r="36" fill="#E8B86B" />
      <path d="M32 58 q8 -8 16 0 t16 0 t16 0 t16 0" stroke="#F6E2A8" strokeWidth="3" fill="none" />
      <path d="M32 68 q8 -8 16 0 t16 0 t16 0 t16 0" stroke="#F6E2A8" strokeWidth="3" fill="none" />
      <circle cx="46" cy="48" r="9" fill="#FFFFFF" />
      <circle cx="46" cy="48" r="4.5" fill="#F2A33A" />
      <rect x="64" y="40" width="20" height="14" rx="3" fill="#8A5A3C" />
      <circle cx="74" cy="78" r="4" fill="#5E8F3A" />
      <circle cx="66" cy="82" r="3" fill="#5E8F3A" />
      <path d="M86 10 L46 104" stroke="#D9B48A" strokeWidth="3" />
      <path d="M94 12 L54 106" stroke="#D9B48A" strokeWidth="3" />
    </svg>
  );
}

const DISH_COLOURS = ["#E8B86B", "#C9803F", "#B9C97A", "#E7C59A"];

export function DishArt({ index, className }: { index: number; className?: string }) {
  const broth = DISH_COLOURS[index % DISH_COLOURS.length];
  const isGyoza = index === 3;
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden>
      <rect width="80" height="80" fill="#F4EEE6" />
      {isGyoza ? (
        <>
          <ellipse cx="40" cy="42" rx="30" ry="22" fill="#2F2A28" />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${20 + i * 14} 50 q7 -20 14 0z`} fill={broth} stroke="#A8662E" strokeWidth="1.5" />
          ))}
        </>
      ) : (
        <>
          <circle cx="40" cy="42" r="28" fill="#2F2A28" />
          <circle cx="40" cy="42" r="22" fill={broth} />
          <path d="M24 40 q6 -6 12 0 t12 0 t12 0" stroke="#FBEFC9" strokeWidth="2" fill="none" />
          <circle cx="32" cy="34" r="5" fill="#fff" />
          <circle cx="32" cy="34" r="2.4" fill="#F2A33A" />
        </>
      )}
    </svg>
  );
}
