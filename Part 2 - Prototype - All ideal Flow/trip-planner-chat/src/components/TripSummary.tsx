import { GUESTS, formatDay, itemsOf, tripTotal, type Scenario } from "@/lib/mockReply";

/** The "proper" trip summary that follows the three cards. */
export function TripSummary({ scenario, budget }: { scenario: Scenario; budget: number }) {
  const { stay, exp, food } = itemsOf(scenario.items);
  const total = tripTotal(scenario.items);
  const left = budget - total;
  const over = left < 0;
  const pct = Math.min(100, Math.round((total / budget) * 100));
  const soldOut = exp.availability === "Sold out";

  const rows = [
    { label: `Stay · ${stay.nights} nights`, value: `$${stay.totalUsd}`, muted: false },
    {
      label: `${exp.shortName} · ${GUESTS} guests${soldOut ? " (sold out, waitlist)" : ""}`,
      value: `$${exp.totalUsd}`,
      muted: soldOut,
    },
    { label: `${food.restaurantName} · ${food.meal.toLowerCase()} est.`, value: `$${food.estCostUsd}`, muted: false },
  ];

  return (
    <div data-testid="trip-summary" data-scenario={scenario.id} className="text-[14px] text-ink">
      <p className="font-semibold">Your Kyoto weekend · {scenario.name}</p>
      <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[13px]">
        <dt className="text-muted">Dates</dt>
        <dd>
          {formatDay(stay.checkIn)} – {formatDay(stay.checkOut)} 2025
        </dd>
        <dt className="text-muted">Guests</dt>
        <dd>{GUESTS} adults</dd>
        <dt className="text-muted">Plan</dt>
        <dd>{scenario.plan}</dd>
      </dl>

      <div className="mt-3 rounded-xl bg-white/80 p-3">
        <ul className="space-y-1.5 text-[13px]">
          {rows.map((r) => (
            <li key={r.label} className={`flex justify-between gap-3 ${r.muted ? "text-muted" : ""}`}>
              <span className={r.muted ? "" : "text-ink/80"}>{r.label}</span>
              <span className={`shrink-0 tabular-nums ${r.muted ? "line-through decoration-muted/60" : ""}`}>{r.value}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex justify-between border-t border-hairline pt-2 font-semibold">
          <span>Total for 2</span>
          <span className="tabular-nums">
            ${total} <span className="font-normal text-muted">/ ${budget}</span>
          </span>
        </div>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-[#F0E4E6]"
          role="meter"
          aria-valuemin={0}
          aria-valuemax={budget}
          aria-valuenow={total}
          aria-label="Budget used"
        >
          <div className="h-full rounded-full bg-rausch" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-1.5 text-[12px] text-muted">
          {over ? (
            <span className="font-semibold text-[#C13515]">${-left} over budget.</span>
          ) : (
            <>
              <span className="font-semibold text-ink">${left} left</span> for trains and snacks.
            </>
          )}{" "}
          Travel to Kyoto isn&apos;t included.
        </p>
      </div>
    </div>
  );
}
