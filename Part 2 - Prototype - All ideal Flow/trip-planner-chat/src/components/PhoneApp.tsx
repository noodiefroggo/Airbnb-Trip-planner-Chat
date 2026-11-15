"use client";

import { useEffect, useRef, useState } from "react";
import { HomeMock } from "./HomeMock";
import { WebHomeMock } from "./WebHomeMock";
import { TripPlannerChat } from "./TripPlannerChat";

/** Full-screen on phones; a 390×844 device frame on tablets; the website with a side panel on desktop. */
export function PhoneApp() {
  const [open, setOpen] = useState(true);
  const wasOpen = useRef(true);

  // closing hands focus back to the visible "Plan a trip" button
  useEffect(() => {
    if (!open && wasOpen.current) {
      const btn = [...document.querySelectorAll<HTMLElement>("[data-reopen]")].find((b) => b.offsetParent !== null);
      btn?.focus({ preventScroll: true });
    }
    wasOpen.current = open;
  }, [open]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-white sm:h-[844px] sm:max-h-full sm:w-[390px] sm:rounded-[44px] sm:shadow-[0_30px_80px_rgba(0,0,0,0.25)] sm:ring-[10px] sm:ring-[#111] lg:h-full lg:max-h-none lg:w-full lg:rounded-none lg:shadow-none lg:ring-0">
      <div className={open ? "pointer-events-none" : ""} aria-hidden={open} inert={open}>
        <div className="absolute inset-0">
          <HomeMock onOpenChat={() => setOpen(true)} />
          <WebHomeMock onOpenChat={() => setOpen(true)} />
        </div>
      </div>
      <TripPlannerChat open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
