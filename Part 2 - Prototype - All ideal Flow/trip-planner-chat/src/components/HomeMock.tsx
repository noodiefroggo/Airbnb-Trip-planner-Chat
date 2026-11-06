/** Static mock of the Airbnb mobile home screen that sits under the chat. */

const CATEGORIES = ["Homes", "Experiences", "Services"];
const LISTINGS = [
  { title: "Home in Higashiyama", sub: "11–13 Apr · Superhost", price: "$172", tone: "from-[#F6C9A8] to-[#D98C5F]" },
  { title: "Flat in Nakagyo", sub: "18–20 Apr · Guest favourite", price: "$118", tone: "from-[#C7D7E8] to-[#7E9DBF]" },
  { title: "Room in Arashiyama", sub: "25–27 Apr", price: "$96", tone: "from-[#D5E3C2] to-[#8FAF6E]" },
];

export function HomeMock({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <div className="flex h-full flex-col bg-white" aria-label="Airbnb home (mock)">
      <div className="px-5 pt-12">
        <button
          type="button"
          className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-white text-[14px] font-semibold text-ink shadow-[0_3px_12px_rgba(0,0,0,0.15)]"
          tabIndex={-1}
        >
          <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
            <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Start your search
        </button>
        <div className="mt-5 flex justify-around border-b border-hairline text-[12px] font-semibold">
          {CATEGORIES.map((c, i) => (
            <span key={c} className={`pb-3 ${i === 0 ? "border-b-2 border-ink text-ink" : "text-muted"}`}>
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-5 pt-5">
        <p className="text-[18px] font-bold text-ink">Popular homes in Kyoto ›</p>
        <div className="mt-3 flex gap-3">
          {LISTINGS.map((l) => (
            <div key={l.title} className="w-[150px] shrink-0">
              <div className={`relative aspect-square rounded-2xl bg-gradient-to-br ${l.tone}`}>
                <span className="absolute left-2 top-2 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold">Guest favourite</span>
                <span className="absolute right-2 top-2 text-white" aria-hidden>♡</span>
              </div>
              <p className="mt-2 truncate text-[13px] font-semibold text-ink">{l.title}</p>
              <p className="truncate text-[12px] text-muted">{l.sub}</p>
              <p className="text-[12px] text-ink">
                <span className="font-semibold">{l.price}</span> night
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[18px] font-bold text-ink">Available this weekend ›</p>
        <div className="mt-3 flex gap-3">
          {[0, 1].map((i) => (
            <div key={i} className="aspect-square w-[150px] shrink-0 rounded-2xl bg-[#EEE]" />
          ))}
        </div>
      </div>

      {/* reopen trigger, sits above the tab bar */}
      <button
        type="button"
        onClick={onOpenChat}
        className="absolute bottom-[84px] right-4 z-10 inline-flex items-center gap-2 rounded-full bg-rausch-dark py-3 pl-3.5 pr-4 text-[14px] font-semibold text-white shadow-[0_8px_24px_rgba(255,56,92,0.45)] hover:bg-[#C1083A]"
      >
        <svg viewBox="0 0 20 20" className="size-5" aria-hidden>
          <path
            fill="currentColor"
            d="M10 2c4.4 0 8 3 8 6.8 0 3.7-3.6 6.7-8 6.7-.8 0-1.6-.1-2.3-.3L4 17v-3.4C2.8 12.4 2 10.7 2 8.8 2 5 5.6 2 10 2z"
          />
        </svg>
        Plan a trip
      </button>

      <nav className="flex h-[72px] shrink-0 items-start justify-around border-t border-hairline bg-white pt-2.5 text-[10px] font-medium text-muted">
        {[
          { label: "Explore", active: true },
          { label: "Wishlists" },
          { label: "Trips" },
          { label: "Messages" },
          { label: "Profile" },
        ].map((t) => (
          <span key={t.label} className={`flex flex-col items-center gap-1 ${t.active ? "text-rausch" : ""}`}>
            <span className={`size-5 rounded-full border-2 ${t.active ? "border-rausch" : "border-[#B0B0B0]"}`} />
            {t.label}
          </span>
        ))}
      </nav>
    </div>
  );
}
