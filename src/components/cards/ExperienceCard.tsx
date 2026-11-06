"use client";

import { useState } from "react";
import { TeaArt } from "../Illustrations";
import type { ExperienceDetails } from "@/lib/mockReply";

/** Experience: inset image + duration chip, nested location card, split footer. */
export function ExperienceCard({ details }: { details: ExperienceDetails }) {
  const d = details;
  const [panel, setPanel] = useState<"none" | "more" | "time">("none");
  const [slot, setSlot] = useState<string | null>(null);

  return (
    <article data-card="experience" className="rounded-[22px] border border-hairline bg-[#FAFAF7] p-3">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
        <TeaArt className="absolute inset-0 size-full" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[12px] font-semibold uppercase tracking-wide text-[#3B5A2A]">
          {d.category}
        </span>
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1 text-[12px] font-semibold text-white">
          <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
            <circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M8 4.5V8l2.4 1.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          </svg>
          {d.durationHours.toFixed(1)} hr
        </span>
      </div>

      <div className="px-1 pt-3">
        <h3 className="text-[19px] font-bold leading-snug tracking-[-0.01em] text-ink">{d.experienceName}</h3>
        <p className="mt-1 text-[13px] italic text-ink/75">{d.description}</p>
        <p className="mt-1.5 text-[12px] text-muted">
          ★ {d.rating.toFixed(2)} · ${d.pricePerGuestUsd} / guest · <span className="font-medium text-[#2E7D32]">{d.availability}</span>
        </p>
      </div>

      {/* nested location card */}
      <div className="mt-3 flex items-center gap-3 rounded-xl border border-hairline bg-white p-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-rausch-tint text-rausch">
          <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
            <path fill="currentColor" d="M8 1a5 5 0 0 0-5 5c0 3.6 5 9 5 9s5-5.4 5-9a5 5 0 0 0-5-5zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-semibold text-ink">{d.placeName}</p>
          <p className="truncate text-[12px] text-muted">{d.address}</p>
        </div>
        <span className="shrink-0 rounded-full bg-[#EEF4E8] px-2.5 py-1 text-center text-[12px] font-semibold leading-tight text-[#3B5A2A]">
          {d.minutesFromStay} min
          <br />
          away
        </span>
      </div>

      {panel === "more" && (
        <p className="mt-3 rounded-xl bg-white p-3 text-[13px] text-ink/80">
          Hosted by {d.hostName}. Sat 12 Apr, starts {d.timeSlots[0].split("· ")[1]}. ${d.totalUsd} for 2 guests. Kneel on tatami,
          learn the bow, whisk and sip. Tea sweets included.
        </p>
      )}
      {panel === "time" && (
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Time slots">
          {d.timeSlots.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSlot(t)}
              aria-pressed={slot === t}
              className={`rounded-full border px-3 py-1.5 text-[13px] font-medium ${
                slot === t ? "border-ink bg-ink text-white" : "border-hairline bg-white text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setPanel(panel === "more" ? "none" : "more")}
          aria-expanded={panel === "more"}
          className="h-11 rounded-xl border border-ink bg-white text-[14px] font-semibold text-ink"
        >
          Know more
        </button>
        <button
          type="button"
          onClick={() => setPanel(panel === "time" ? "none" : "time")}
          aria-expanded={panel === "time"}
          className="h-11 rounded-xl bg-ink text-[14px] font-semibold text-white"
        >
          {slot ? "10:30 picked ✓" : "Pick time"}
        </button>
      </div>
    </article>
  );
}
