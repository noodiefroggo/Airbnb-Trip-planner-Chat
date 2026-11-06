type Props = { size?: number; className?: string; title?: string };

/** The Bélo mark, drawn as a single stroked path. */
export const BELO_PATH =
  "M16 23c-2.8-3.4-4.2-5.6-4.2-7.6 0-2 1.8-3.4 4.2-3.4s4.2 1.4 4.2 3.4c0 2-1.4 4.2-4.2 7.6zm0 0c-2.4 2.8-4.4 4.4-6.6 4.4-3.4 0-5.2-3.8-3.8-6.8L12.9 5.4C13.7 3.8 14.6 3 16 3s2.3.8 3.1 2.4l7.3 15.2c1.4 3-.4 6.8-3.8 6.8-2.2 0-4.2-1.6-6.6-4.4z";

export function AirbnbLogo({ size = 32, className, title = "Airbnb" }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title}
      fill="none"
    >
      <path d={BELO_PATH} stroke="currentColor" strokeWidth={2.6} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export function AirbnbWordmark({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 text-rausch ${className ?? ""}`}>
      <AirbnbLogo size={30} />
      <span className="text-[22px] font-extrabold tracking-[-0.03em]">airbnb</span>
    </span>
  );
}
