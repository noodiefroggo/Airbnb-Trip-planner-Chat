"use client";

import { useState } from "react";
import { MachiyaArt } from "../Illustrations";
import { formatDay, type StayDetails } from "@/lib/mockReply";

/** Stay: full-width banner + emblem, boxed price, full-width Add button. */
export function StayCard({ details }: { details: StayDetails }) {
  const [added, setAdded] = useState(false);
  const d = details;
  const inDay = formatDay(d.checkIn).split(" ");
  const outDay = formatDay(d.checkOut).split(" ");

  return (
    <article data-card="stay" className="overflow-hidden rounded-2xl bg-white shadow-[0_6px_20px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
      <div className="relative aspect-[16/9] w-full">
        <MachiyaArt className="absolute inset-0 size-full" />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[12px] font-semibold text-ink shadow-sm">
          <svg viewBox="0 0 16 16" className="size-3.5 text-rausch" aria-hidden>
            <path fill="currentColor" d="M8 1.5l1.9 4 4.4.5-3.3 3 .9 4.3L8 11.1 4.1 13.3l.9-4.3-3.3-3 4.4-.5z" />
          </svg>
          {d.popularityLabel}
        </span>
        <span className="absolute bottom-3 left-3 rounded-md bg-black/55 px-2 py-0.5 text-[12px] font-medium text-white">
          Stay
        </span>
      </div>

      <div className="flex items-start gap-3 p-4 pb-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-[19px] font-bold leading-snug tracking-[-0.01em] text-ink">{d.stayName}</h3>
          <p className="mt-1 text-[13px] text-muted">
            {d.location} · {d.propertyType}
          </p>
          <p className="mt-2 text-[13px] text-ink">
            <span aria-hidden>★ </span>
            <span className="font-semibold">{d.rating.toFixed(2)}</span>
            <span className="text-muted"> · {d.reviewCount} reviews · Host {d.hostName}</span>
          </p>
        </div>

        <div className="shrink-0 rounded-xl border-2 border-rausch px-3 py-2 text-center" data-testid="price-box">
          <p className="text-[17px] font-bold leading-none text-ink">
            ${d.nightlyPriceUsd}
            <span className="text-[12px] font-medium text-muted"> /night</span>
          </p>
          <span className="mt-1.5 block text-[12px] font-semibold text-ink">{d.nights} nights</span>
          <span className="block text-[12px] text-muted">
            {inDay[1]}–{outDay[1]} {outDay[2]}
          </span>
        </div>
      </div>

      <p className="px-4 text-[13px] text-ink/80">{d.description}.</p>

      <div className="p-4 pt-3">
        <button
          type="button"
          onClick={() => setAdded((v) => !v)}
          aria-pressed={added}
          className={`flex h-11 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
            added ? "bg-ink text-white" : "bg-rausch-dark text-white hover:bg-[#C1083A]"
          }`}
        >
          {added ? "Added to trip ✓" : `Add to trip · $${d.totalUsd} total`}
          {!added && <span aria-hidden className="text-lg leading-none">+</span>}
        </button>
      </div>
    </article>
  );
}
