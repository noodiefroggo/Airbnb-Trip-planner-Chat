"use client";

import { useState } from "react";
import { HomeMock } from "./HomeMock";
import { TripPlannerChat } from "./TripPlannerChat";

/** Full-screen on phones; a 390×844 device frame on larger screens. */
export function PhoneApp() {
  const [open, setOpen] = useState(true);

  return (
    <div className="relative h-full w-full overflow-hidden bg-white sm:h-[844px] sm:max-h-full sm:w-[390px] sm:rounded-[44px] sm:shadow-[0_30px_80px_rgba(0,0,0,0.25)] sm:ring-[10px] sm:ring-[#111]">
      <div className={open ? "pointer-events-none" : ""} aria-hidden={open} inert={open}>
        <div className="absolute inset-0">
          <HomeMock onOpenChat={() => setOpen(true)} />
        </div>
      </div>
      <TripPlannerChat open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
