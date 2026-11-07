/**
 * The content pack has no cleared photos, so each card gets a simple
 * illustrated placeholder instead of a stock image.
 */

import type { DishKind, ExperienceArt, FoodArt, StayArt } from "@/lib/mockReply";

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

/* ---------- Scenario B: foodie ---------- */

export function RiverRoomArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <rect width="320" height="180" fill="#DCE8EE" />
      {/* hills + river through the window */}
      <rect x="150" y="18" width="150" height="96" fill="#BFD7E4" />
      <path d="M150 78 q36 -30 72 -6 t78 -12 v54 h-150z" fill="#8DAE8A" />
      <path d="M150 100 q60 -10 150 4 v10 h-150z" fill="#6FA3C2" />
      <rect x="150" y="18" width="150" height="96" fill="none" stroke="#8C6B4A" strokeWidth="5" />
      <path d="M225 18v96" stroke="#8C6B4A" strokeWidth="3" />
      {/* tatami floor */}
      <path d="M0 124 h320 v56 h-320z" fill="#D8CB95" />
      <path d="M0 150 h320 M106 124 v56 M213 124 v56" stroke="#B9AA6E" strokeWidth="2" />
      {/* low table + futon */}
      <rect x="28" y="104" width="96" height="10" rx="2" fill="#5B3B2A" />
      <rect x="36" y="114" width="6" height="14" fill="#5B3B2A" />
      <rect x="110" y="114" width="6" height="14" fill="#5B3B2A" />
      <ellipse cx="62" cy="102" rx="9" ry="4" fill="#FF385C" />
      <rect x="18" y="140" width="120" height="22" rx="6" fill="#F4EFE4" />
      <rect x="18" y="140" width="34" height="22" rx="6" fill="#E9D7C3" />
      {/* hanging lamp */}
      <path d="M80 0v40" stroke="#5B3B2A" strokeWidth="2" />
      <ellipse cx="80" cy="50" rx="16" ry="12" fill="#FBE7C2" />
    </svg>
  );
}

export function MarketArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <rect width="320" height="180" fill="#F3E3CF" />
      {/* glass arcade roof */}
      <path d="M0 0 h320 v34 q-160 -26 -320 0z" fill="#C9D6D8" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path key={i} d={`M${i * 54} 0 v30`} stroke="#9FB0B3" strokeWidth="3" />
      ))}
      {/* stall banners */}
      {["#C8312E", "#E5A33B", "#3E6B8F", "#7C9A4C", "#C8312E"].map((c, i) => (
        <g key={i}>
          <rect x={10 + i * 62} y="44" width="52" height="16" rx="2" fill={c} />
          <rect x={14 + i * 62} y="64" width="44" height="70" fill="#FFF8EC" />
          <rect x={14 + i * 62} y="118" width="44" height="16" fill="#8A5A3C" />
          <circle cx={26 + i * 62} cy="110" r="6" fill={["#E9C46A", "#F4A261", "#90BE6D", "#E76F51", "#F2CC8F"][i]} />
          <circle cx={42 + i * 62} cy="108" r="5" fill={["#F4A261", "#90BE6D", "#E9C46A", "#F2CC8F", "#E76F51"][i]} />
        </g>
      ))}
      {/* paper lanterns */}
      {[40, 150, 260].map((x) => (
        <g key={x}>
          <path d={`M${x} 30 v10`} stroke="#5B3B2A" strokeWidth="2" />
          <rect x={x - 8} y="38" width="16" height="22" rx="7" fill="#FF385C" />
        </g>
      ))}
      <rect y="134" width="320" height="46" fill="#B9A58A" />
      <path d="M0 150 h320" stroke="#A48F73" strokeWidth="2" strokeDasharray="14 10" />
    </svg>
  );
}

export function TofuArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <rect width="120" height="120" fill="#33403A" />
      {/* clay pot */}
      <ellipse cx="60" cy="66" rx="46" ry="40" fill="#6B4A3A" />
      <ellipse cx="60" cy="62" rx="38" ry="32" fill="#EDE6D6" />
      {/* tofu cubes */}
      <rect x="38" y="48" width="18" height="16" rx="2" fill="#FFFFFF" stroke="#E2DACA" />
      <rect x="62" y="44" width="18" height="16" rx="2" fill="#FFFFFF" stroke="#E2DACA" />
      <rect x="52" y="66" width="18" height="16" rx="2" fill="#FFFFFF" stroke="#E2DACA" />
      {/* kombu + greens */}
      <path d="M30 72 q10 6 20 0" stroke="#3E5B2E" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="84" cy="70" r="4" fill="#6F9A3E" />
      <circle cx="78" cy="78" r="3" fill="#6F9A3E" />
      {/* steam */}
      <path d="M44 22 q-6 -8 0 -14 M60 20 q-6 -8 0 -14 M76 22 q-6 -8 0 -14" stroke="#D7DED9" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Scenario C: budget + nature ---------- */

export function CityFlatArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <rect width="320" height="180" fill="#FFF6E0" />
      {/* big window with city */}
      <rect x="170" y="20" width="126" height="104" fill="#CFE6F5" />
      <path d="M176 124 v-40 h22 v-18 h20 v58 h14 v-50 h24 v50 h16 v-30 h18 v30z" fill="#A9BCCB" />
      <rect x="170" y="20" width="126" height="104" fill="none" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M233 20v104M170 72h126" stroke="#FFFFFF" strokeWidth="4" />
      <circle cx="270" cy="42" r="10" fill="#FFD46B" />
      {/* floor + rug */}
      <rect y="132" width="320" height="48" fill="#E6CFA8" />
      <ellipse cx="110" cy="158" rx="80" ry="14" fill="#F2A07B" />
      {/* sofa */}
      <rect x="40" y="100" width="120" height="40" rx="10" fill="#3F7C85" />
      <rect x="40" y="88" width="120" height="22" rx="10" fill="#4F909A" />
      <rect x="52" y="96" width="26" height="18" rx="5" fill="#FFD46B" />
      {/* plant */}
      <rect x="10" y="112" width="20" height="24" rx="3" fill="#C27C4E" />
      <path d="M20 112 q-14 -24 -2 -40 M20 112 q12 -26 4 -44 M20 112 q-2 -30 -10 -36" stroke="#4E8A4A" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* lamp */}
      <path d="M150 20v40" stroke="#555" strokeWidth="2" />
      <path d="M138 60 h24 l-6 -12 h-12z" fill="#FF385C" />
    </svg>
  );
}

export function ToriiArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <linearGradient id="dawn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5B6C9A" />
          <stop offset="0.6" stopColor="#F2A88A" />
          <stop offset="1" stopColor="#F7D3A6" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#dawn)" />
      <circle cx="160" cy="118" r="26" fill="#FFE2B0" />
      {/* forest */}
      <path d="M0 100 q40 -30 80 -6 t80 -8 t80 4 t80 -10 v100 h-320z" fill="#3E5A44" />
      {/* tunnel of torii, receding */}
      {[
        { x: 40, w: 240, h: 150, t: 12 },
        { x: 80, w: 160, h: 112, t: 9 },
        { x: 110, w: 100, h: 84, t: 7 },
        { x: 130, w: 60, h: 64, t: 5 },
      ].map((g, i) => (
        <g key={i} fill={i % 2 ? "#D9481F" : "#E85A2A"}>
          <rect x={g.x - 8} y={180 - g.h} width={g.w + 16} height={g.t} rx="2" />
          <rect x={g.x} y={180 - g.h + g.t * 2} width={g.w} height={g.t * 0.7} />
          <rect x={g.x + g.t} y={180 - g.h} width={g.t} height={g.h} />
          <rect x={g.x + g.w - g.t * 2} y={180 - g.h} width={g.t} height={g.h} />
        </g>
      ))}
      <rect x="-8" y="168" width="336" height="12" fill="#2C2522" />
    </svg>
  );
}

export function SkewerArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <rect width="120" height="120" fill="#3A2F2A" />
      {/* paper tray */}
      <path d="M14 70 h92 l-10 30 h-72z" fill="#F4E8D2" />
      {/* tamago on a stick */}
      <path d="M30 20 L44 92" stroke="#D9B48A" strokeWidth="3" />
      <rect x="22" y="34" width="26" height="30" rx="4" fill="#F5C842" transform="rotate(-11 35 49)" />
      <path d="M26 44 h20 M26 52 h20" stroke="#E0AE2C" strokeWidth="2" transform="rotate(-11 35 49)" />
      {/* skewer */}
      <path d="M90 14 L70 96" stroke="#D9B48A" strokeWidth="3" />
      {[28, 44, 60].map((y, i) => (
        <circle key={y} cx={86 - i * 4} cy={y} r="9" fill="#9C4A25" stroke="#6E2F14" strokeWidth="2" />
      ))}
      <path d="M78 26 l10 4 M74 42 l10 4 M70 58 l10 4" stroke="#C7783F" strokeWidth="2" />
    </svg>
  );
}

/* ---------- picking art by data ---------- */

export function StayArtFor({ art, className }: { art: StayArt; className?: string }) {
  if (art === "riverRoom") return <RiverRoomArt className={className} />;
  if (art === "cityFlat") return <CityFlatArt className={className} />;
  return <MachiyaArt className={className} />;
}

export function ExperienceArtFor({ art, className }: { art: ExperienceArt; className?: string }) {
  if (art === "market") return <MarketArt className={className} />;
  if (art === "torii") return <ToriiArt className={className} />;
  return <TeaArt className={className} />;
}

export function FoodArtFor({ art, className }: { art: FoodArt; className?: string }) {
  if (art === "tofu") return <TofuArt className={className} />;
  if (art === "skewer") return <SkewerArt className={className} />;
  return <RamenArt className={className} />;
}

/* ---------- menu dishes ---------- */

const DISH_COLOURS = ["#E8B86B", "#C9803F", "#B9C97A", "#E7C59A"];

export function DishArt({ dish, index, className }: { dish: DishKind; index: number; className?: string }) {
  const broth = DISH_COLOURS[index % DISH_COLOURS.length];
  let body: React.ReactNode;
  switch (dish) {
    case "gyoza":
      body = (
        <>
          <ellipse cx="40" cy="42" rx="30" ry="22" fill="#2F2A28" />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${20 + i * 14} 50 q7 -20 14 0z`} fill={broth} stroke="#A8662E" strokeWidth="1.5" />
          ))}
        </>
      );
      break;
    case "tofu":
      body = (
        <>
          <circle cx="40" cy="42" r="28" fill="#6B4A3A" />
          <circle cx="40" cy="42" r="22" fill="#EDE6D6" />
          <rect x="28" y="32" width="11" height="10" rx="1.5" fill="#fff" stroke="#DDD4C2" />
          <rect x="42" y="36" width="11" height="10" rx="1.5" fill="#fff" stroke="#DDD4C2" />
          <rect x="34" y="46" width="11" height="10" rx="1.5" fill="#fff" stroke="#DDD4C2" />
        </>
      );
      break;
    case "tempura":
      body = (
        <>
          <rect x="12" y="20" width="56" height="44" rx="6" fill="#2F2A28" />
          <rect x="16" y="24" width="48" height="36" rx="4" fill="#F7F1E3" />
          {[0, 1, 2].map((i) => (
            <ellipse key={i} cx={28 + i * 12} cy="42" rx="6" ry="13" fill="#E6B65C" stroke="#C99234" strokeWidth="1.5" transform={`rotate(${-20 + i * 20} ${28 + i * 12} 42)`} />
          ))}
        </>
      );
      break;
    case "rice":
      body = (
        <>
          <path d="M14 38 h52 a26 24 0 0 1 -52 0z" fill="#2F2A28" />
          <ellipse cx="40" cy="38" rx="26" ry="10" fill="#E7C59A" />
          <circle cx="34" cy="36" r="2.5" fill="#8A5A3C" />
          <circle cx="46" cy="39" r="2.5" fill="#E07A1F" />
          <circle cx="40" cy="34" r="2" fill="#5E8F3A" />
        </>
      );
      break;
    case "tamago":
      body = (
        <>
          <path d="M40 12 L40 70" stroke="#D9B48A" strokeWidth="3" />
          <rect x="26" y="22" width="28" height="30" rx="4" fill="#F5C842" />
          <path d="M28 32 h24 M28 42 h24" stroke="#E0AE2C" strokeWidth="2" />
        </>
      );
      break;
    case "skewer":
      body = (
        <>
          <path d="M14 66 L66 14" stroke="#D9B48A" strokeWidth="3" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={28 + i * 12} cy={52 - i * 12} r="8" fill={index % 2 ? "#9C4A25" : "#B5533C"} stroke="#6E2F14" strokeWidth="1.5" />
          ))}
        </>
      );
      break;
    case "mochi":
      body = (
        <>
          <path d="M40 10 L40 72" stroke="#D9B48A" strokeWidth="3" />
          <circle cx="40" cy="30" r="11" fill="#F3E6CF" stroke="#C99A5B" strokeWidth="2" />
          <circle cx="40" cy="52" r="11" fill="#F3E6CF" stroke="#C99A5B" strokeWidth="2" />
          <path d="M32 26 q8 6 16 0 M32 48 q8 6 16 0" stroke="#8A5A3C" strokeWidth="2.5" fill="none" />
        </>
      );
      break;
    default:
      body = (
        <>
          <circle cx="40" cy="42" r="28" fill="#2F2A28" />
          <circle cx="40" cy="42" r="22" fill={broth} />
          <path d="M24 40 q6 -6 12 0 t12 0 t12 0" stroke="#FBEFC9" strokeWidth="2" fill="none" />
          <circle cx="32" cy="34" r="5" fill="#fff" />
          <circle cx="32" cy="34" r="2.4" fill="#F2A33A" />
        </>
      );
  }
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden>
      <rect width="80" height="80" fill="#F4EEE6" />
      {body}
    </svg>
  );
}
