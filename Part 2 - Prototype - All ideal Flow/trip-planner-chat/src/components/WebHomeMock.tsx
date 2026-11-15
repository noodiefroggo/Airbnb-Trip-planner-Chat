import { AirbnbWordmark } from "./AirbnbLogo";

/**
 * Static mock of the Airbnb website home page that sits under the chat on
 * wide screens. Nothing here is interactive except the reopen button.
 */

const TABS = ["Homes", "Experiences", "Services"];
const FILTERS = ["Trending", "Countryside", "Design", "Amazing views", "Cabins", "Tiny homes", "Lakefront", "Historical"];

type Listing = { title: string; sub: string; price: string; rating: string; tone: string; badge?: string };

const POPULAR: Listing[] = [
  { title: "Home in Higashiyama", sub: "11–13 Apr", price: "$172", rating: "4.93", tone: "from-[#F6C9A8] to-[#D98C5F]", badge: "Guest favourite" },
  { title: "Flat in Nakagyo", sub: "18–20 Apr", price: "$118", rating: "4.81", tone: "from-[#C7D7E8] to-[#7E9DBF]", badge: "Guest favourite" },
  { title: "Room in Arashiyama", sub: "25–27 Apr", price: "$96", rating: "4.88", tone: "from-[#D5E3C2] to-[#8FAF6E]" },
  { title: "Townhouse in Gion", sub: "11–13 Apr", price: "$184", rating: "4.92", tone: "from-[#EBCFD3] to-[#C98791]", badge: "Superhost" },
  { title: "Loft near Kyoto Station", sub: "2–4 May", price: "$141", rating: "4.76", tone: "from-[#E4D8B8] to-[#B8A468]" },
  { title: "Home in Fushimi", sub: "9–11 May", price: "$104", rating: "4.85", tone: "from-[#CFC8E6] to-[#8F84BF]" },
];

const WEEKEND: Listing[] = [
  { title: "Room in Shimogyo", sub: "11–13 Apr", price: "$142", rating: "4.88", tone: "from-[#C9DFE6] to-[#6FA3B5]" },
  { title: "Flat in Pontocho", sub: "11–13 Apr", price: "$160", rating: "4.79", tone: "from-[#F1D9BE] to-[#CF9A63]" },
  { title: "Home in Kamigyo", sub: "11–13 Apr", price: "$127", rating: "4.9", tone: "from-[#D8E5CF] to-[#86A878]", badge: "Guest favourite" },
  { title: "Machiya in Nishijin", sub: "11–13 Apr", price: "$198", rating: "4.97", tone: "from-[#EAD2C8] to-[#C1806A]", badge: "Superhost" },
  { title: "Studio in Sakyo", sub: "11–13 Apr", price: "$89", rating: "4.72", tone: "from-[#D3D9EC] to-[#7C89BC]" },
  { title: "Cabin in Kurama", sub: "11–13 Apr", price: "$133", rating: "4.94", tone: "from-[#CFE1D9] to-[#6C9C86]" },
];

function ListingCard({ l }: { l: Listing }) {
  return (
    <div className="min-w-0">
      <div className={`relative aspect-square rounded-2xl bg-gradient-to-br ${l.tone}`}>
        {l.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[12px] font-semibold text-ink shadow-sm">
            {l.badge}
          </span>
        )}
        <span className="absolute right-3 top-3 text-[20px] leading-none text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" aria-hidden>
          ♡
        </span>
      </div>
      <div className="mt-2.5 flex items-start justify-between gap-2 text-[14px]">
        <p className="min-w-0 truncate font-semibold text-ink">{l.title}</p>
        <p className="shrink-0 text-ink">★ {l.rating}</p>
      </div>
      <p className="text-[14px] text-muted">{l.sub}</p>
      <p className="text-[14px] text-ink">
        <span className="font-semibold">{l.price}</span> night
      </p>
    </div>
  );
}

function Section({ title, items }: { title: string; items: Listing[] }) {
  return (
    <section className="px-10 pt-7 xl:px-20">
      <h2 className="text-[22px] font-bold tracking-[-0.01em] text-ink">{title} ›</h2>
      <div className="mt-4 grid grid-cols-4 gap-x-5 xl:grid-cols-6">
        {items.map((l, i) => (
          <div key={l.title} className={i >= 4 ? "hidden xl:block" : ""}>
            <ListingCard l={l} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function WebHomeMock({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <div className="relative hidden h-full flex-col overflow-hidden bg-white lg:flex" aria-label="Airbnb website home (mock)">
      {/* top bar */}
      <header className="flex h-20 shrink-0 items-center justify-between px-10 xl:px-20">
        <AirbnbWordmark />
        <nav className="flex gap-8 text-[15px] font-semibold" aria-label="Browse">
          {TABS.map((t, i) => (
            <span key={t} className={i === 0 ? "text-ink" : "text-muted"}>
              {t}
            </span>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-[14px] font-semibold text-ink">
          <span>Airbnb your home</span>
          <span className="grid size-9 place-items-center rounded-full bg-[#F2F2F2]" aria-hidden>
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.4">
              <circle cx="8" cy="8" r="6.2" />
              <path d="M1.8 8h12.4M8 1.8c2 2 2 10.4 0 12.4M8 1.8c-2 2-2 10.4 0 12.4" />
            </svg>
          </span>
          <span className="flex items-center gap-3 rounded-full border border-hairline py-1.5 pl-3.5 pr-1.5 shadow-sm" aria-hidden>
            <svg viewBox="0 0 16 16" className="size-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M2 4h12M2 8h12M2 12h12" />
            </svg>
            <span className="size-8 rounded-full bg-[#717171]" />
          </span>
        </div>
      </header>

      {/* search pill */}
      <div className="flex shrink-0 justify-center px-10 pb-5">
        <div className="flex h-16 w-full max-w-[820px] items-center rounded-full border border-hairline bg-white pl-8 pr-2 shadow-[0_3px_12px_rgba(0,0,0,0.1)]">
          {[
            ["Where", "Search destinations"],
            ["Check in", "Add dates"],
            ["Check out", "Add dates"],
            ["Who", "Add guests"],
          ].map(([label, value], i) => (
            <div key={label} className={`flex-1 ${i > 0 ? "border-l border-hairline pl-6" : ""}`}>
              <p className="text-[12px] font-bold text-ink">{label}</p>
              <p className="text-[14px] text-muted">{value}</p>
            </div>
          ))}
          <span className="ml-3 grid size-12 place-items-center rounded-full bg-rausch text-white" aria-hidden>
            <svg viewBox="0 0 16 16" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="7" cy="7" r="5" />
              <path d="M11 11l3.5 3.5" />
            </svg>
          </span>
        </div>
      </div>

      {/* filter strip */}
      <div className="flex shrink-0 items-center gap-8 overflow-hidden border-y border-hairline px-10 py-3 text-[12px] font-semibold text-muted xl:px-20">
        {FILTERS.map((f, i) => (
          <span key={f} className={`flex shrink-0 flex-col items-center gap-1.5 ${i === 0 ? "text-ink" : ""}`}>
            <span className={`size-6 rounded-md ${i === 0 ? "bg-ink/80" : "bg-[#D9D9D9]"}`} />
            {f}
          </span>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-hidden pb-24">
        <Section title="Popular homes in Kyoto" items={POPULAR} />
        <Section title="Available in Kyoto this weekend" items={WEEKEND} />
      </div>

      {/* reopen trigger, bottom right of the page */}
      <button
        type="button"
        onClick={onOpenChat}
        data-reopen
        className="absolute bottom-8 right-8 z-10 inline-flex items-center gap-2.5 rounded-full bg-rausch-dark py-3.5 pl-4 pr-5 text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(255,56,92,0.45)] hover:bg-[#C1083A]"
      >
        <svg viewBox="0 0 20 20" className="size-5" aria-hidden>
          <path
            fill="currentColor"
            d="M10 2c4.4 0 8 3 8 6.8 0 3.7-3.6 6.7-8 6.7-.8 0-1.6-.1-2.3-.3L4 17v-3.4C2.8 12.4 2 10.7 2 8.8 2 5 5.6 2 10 2z"
          />
        </svg>
        Plan a trip
      </button>
    </div>
  );
}
