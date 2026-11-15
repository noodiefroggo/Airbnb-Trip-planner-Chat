import type { ReplyItem } from "./mockReply";

/**
 * Checks a reply before it becomes cards. Every reply goes through here,
 * the real scenarios and the broken one alike, so the failure state comes
 * from real validation, not a hard-coded error.
 *
 * A reply turns into cards only if it has exactly three items, in the order
 * stay → experience → food, each with the fields its card can't draw without.
 */

export type ParsedReply = { ok: true; items: ReplyItem[] } | { ok: false; reason: string };

const ORDER = ["stay", "experience", "food"] as const;

const REQUIRED: Record<(typeof ORDER)[number], { text: string[]; numbers: string[] }> = {
  stay: { text: ["stayName", "location", "checkIn", "checkOut"], numbers: ["nightlyPriceUsd", "nights", "totalUsd"] },
  experience: { text: ["experienceName", "date", "startTime", "placeName"], numbers: ["durationHours", "pricePerGuestUsd", "totalUsd"] },
  food: { text: ["restaurantName", "cuisine", "meal"], numbers: ["estCostUsd", "walkMinutes"] },
};

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);

export function parseReply(raw: unknown): ParsedReply {
  if (!Array.isArray(raw)) return { ok: false, reason: "reply is not a list of cards" };
  if (raw.length !== ORDER.length) return { ok: false, reason: `expected 3 cards, got ${raw.length}` };

  for (let i = 0; i < ORDER.length; i++) {
    const item = raw[i];
    const want = ORDER[i];
    if (!isObject(item)) return { ok: false, reason: `card ${i + 1} is not an object` };
    if (item.cardType !== want) return { ok: false, reason: `card ${i + 1} should be "${want}", got "${String(item.cardType)}"` };
    const d = item.details;
    if (!isObject(d)) return { ok: false, reason: `${want} card has no details` };
    const { text, numbers } = REQUIRED[want];
    const missing = text.find((k) => typeof d[k] !== "string" || d[k] === "");
    if (missing) return { ok: false, reason: `${want} card is missing ${missing}` };
    const notNumber = numbers.find((k) => typeof d[k] !== "number" || !Number.isFinite(d[k]));
    if (notNumber) return { ok: false, reason: `${want} card's ${notNumber} is not a number` };
  }

  return { ok: true, items: raw as ReplyItem[] };
}
