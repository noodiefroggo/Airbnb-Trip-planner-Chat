import { BUDGET_USD, GUESTS, formatDay, tripTotal, type ReplyItem } from "@/lib/mockReply";

/** The "proper" trip summary that follows the three cards. */
export function TripSummary({ items }: { items: ReplyItem[] }) {
  const stay = items.find((i) => i.cardType === "stay")!.details as Extract<ReplyItem, { cardType: "stay" }>["details"];
  const exp = items.find((i) => i.cardType === "experience")!.details as Extract<ReplyItem, { cardType: "experience" }>["details"];
  const food = items.find((i) => i.cardType === "food")!.details as Extract<ReplyItem, { cardType: "food" }>["details"];
  const total = tripTotal(items);
  const left = BUDGET_USD - total;
  const pct = Math.min(100, Math.round((total / BUDGET_USD) * 100));

  const rows = [
    { label: `Stay · ${stay.nights} nights`, value: stay.totalUsd },
    { label: `Tea ceremony · ${GUESTS} guests`, value: exp.totalUsd },
    { label: `${food.restaurantName} · ${food.meal.toLowerCase()} est.`, value: food.estCostUsd },
  ];

  return (
    <div data-testid="trip-summary" className="text-[14px] text-ink">
      <p className="font-semibold">Your Kyoto weekend</p>
      <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[13px]">
        <dt className="text-muted">Dates</dt>
        <dd>
          {formatDay(stay.checkIn)} – {formatDay(stay.checkOut)} 2025
        </dd>
        <dt className="text-muted">Guests</dt>
        <dd>{GUESTS} adults</dd>
        <dt className="text-muted">Plan</dt>
        <dd>
          Fri check-in, Gion · Sat {exp.timeSlots[0].split("· ")[1]} tea · Sat dinner at {food.restaurantName}
        </dd>
      </dl>

      <div className="mt-3 rounded-xl bg-white/80 p-3">
        <ul className="space-y-1.5 text-[13px]">
          {rows.map((r) => (
            <li key={r.label} className="flex justify-between gap-3">
              <span className="text-ink/80">{r.label}</span>
              <span className="tabular-nums">${r.value}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex justify-between border-t border-hairline pt-2 font-semibold">
          <span>Total for 2</span>
          <span className="tabular-nums">
            ${total} <span className="font-normal text-muted">/ ${BUDGET_USD}</span>
          </span>
        </div>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-[#F0E4E6]"
          role="meter"
          aria-valuemin={0}
          aria-valuemax={BUDGET_USD}
          aria-valuenow={total}
          aria-label="Budget used"
        >
          <div className="h-full rounded-full bg-rausch" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-1.5 text-[12px] text-muted">
          <span className="font-semibold text-ink">${left} left</span> for trains and snacks. Travel to Kyoto isn&apos;t included.
        </p>
      </div>
    </div>
  );
}
