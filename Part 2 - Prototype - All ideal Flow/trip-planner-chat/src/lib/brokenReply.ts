/**
 * A deliberately broken mock reply, for the forced-failure state.
 *
 * It looks like a real reply from the planner, but the app can't turn it
 * into the three cards:
 *   - the stay has no name, and its total is text, not a number;
 *   - the second item is an "activity", which isn't one of the three card types;
 *   - the food card is missing, so only two items come back.
 *
 * Typed as `unknown` on purpose: it's what a bad response from a real
 * service would look like before `parseReply` checks it.
 * Fired by opening the app with `?fail=once` (see README).
 */
export const BROKEN_REPLY: unknown = [
  {
    cardType: "stay",
    details: {
      optionId: "S1",
      location: "Gion, Kyoto",
      nightlyPriceUsd: 168,
      nights: 2,
      totalUsd: "three hundred",
      checkIn: "2025-04-11",
      checkOut: "2025-04-13",
    },
  },
  {
    cardType: "activity",
    details: {
      optionId: "E1",
      experienceName: "Tea ceremony in a 100-year-old machiya",
      pricePerGuestUsd: 58,
    },
  },
];
