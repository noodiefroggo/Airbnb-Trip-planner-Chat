"use client";

import { useState } from "react";
import { DishArt, RamenArt } from "../Illustrations";
import type { FoodDetails } from "@/lib/mockReply";

/** Food: square photo beside the name, meal chips, sideways dish row with diet dots. */
export function FoodCard({ details }: { details: FoodDetails }) {
  const d = details;
  const [meal, setMeal] = useState<string>(d.meal);
  const serves = meal === d.meal;

  return (
    <article data-card="food" className="rounded-2xl border-l-4 border-[#E07A1F] bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
      <div className="flex gap-3">
        <div className="size-[76px] shrink-0 overflow-hidden rounded-xl">
          <RamenArt className="size-full" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-[#B65A0E]">
            {d.cuisine} · {d.priceLevel}
          </p>
          <h3 className="text-[19px] font-bold leading-tight tracking-[-0.01em] text-ink">{d.restaurantName}</h3>
          <p className="mt-0.5 text-[12px] text-muted">
            ★ {d.rating} · {d.reviewCount} reviews · {d.walkMinutes} min walk
          </p>
          <p className="mt-1 text-[12px] text-muted">≈ ${d.estCostUsd} for 2</p>
        </div>
      </div>

      <div className="mt-3 flex gap-1.5" role="group" aria-label="Meal time">
        {d.filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setMeal(f)}
            aria-pressed={meal === f}
            className={`rounded-full border px-3 py-1 text-[12px] font-medium transition-colors ${
              meal === f ? "border-[#E07A1F] bg-[#FFF3E8] text-[#8A4308]" : "border-hairline text-muted"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {serves ? (
        <ul className="-mr-4 mt-3 flex snap-x gap-3 overflow-x-auto pr-4 pb-1 [scrollbar-width:none]" aria-label="Sample menu">
          {d.menuItems.map((m, i) => (
            <li key={m.itemName} className="w-[96px] shrink-0 snap-start">
              <div className="relative size-[96px] overflow-hidden rounded-xl">
                <DishArt index={i} className="size-full" />
                <span
                  title={m.dietLabel === "veg" ? "Vegetarian" : "Non-vegetarian"}
                  className={`absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-[3px] border-2 bg-white ${
                    m.dietLabel === "veg" ? "border-[#2E7D32]" : "border-[#C62828]"
                  }`}
                >
                  <span className={`size-1.5 rounded-full ${m.dietLabel === "veg" ? "bg-[#2E7D32]" : "bg-[#C62828]"}`} />
                  <span className="sr-only">{m.dietLabel}</span>
                </span>
              </div>
              <p className="mt-1.5 truncate text-[13px] font-medium text-ink">{m.itemName}</p>
              <p className="text-[12px] text-muted">
                ${m.priceUsd} · {m.portion}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 rounded-xl bg-[#F7F7F7] p-3 text-[13px] text-muted">
          {d.restaurantName} only serves {d.meal.toLowerCase()}. Switch back to see the menu.
        </p>
      )}

      <p className="mt-3 flex items-center gap-1.5 text-[12px] text-ink/80">
        <svg viewBox="0 0 16 16" className="size-3.5 shrink-0 text-[#B65A0E]" aria-hidden>
          <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 4.5v4M8 10.8v.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        {d.bookingNote.replace(" - ", ": ")}
      </p>
    </article>
  );
}
