import { DEFAULT_BUDGET_USD, SCENARIOS, itemsOf, tripTotal, type Scenario } from "./mockReply";

/**
 * Fake "search": reads the request and picks one of the three scenarios.
 *
 * 1. Budget: the first dollar amount in the request ("under 400 dollars",
 *    "$450", "500 usd"); otherwise the $600 reference budget.
 * 2. Theme: the scenario whose keywords match the request most.
 * 3. No theme: the best plan that fits the budget (classic first).
 * 4. Theme over budget: the cheapest plan that fits, and the intro says why.
 */

export type Plan = {
  scenario: Scenario;
  budget: number;
  total: number;
  intro: string;
};

const MONEY = [
  /\$\s*(\d{2,5})/,
  /(\d{2,5})\s*(?:dollars?|usd|bucks)\b/,
  /(?:under|below|less than|max(?:imum)?|budget(?: of)?|within|upto|up to)\s*(\d{2,5})\b/,
];

export function parseBudget(text: string) {
  for (const re of MONEY) {
    const m = text.match(re);
    if (m) return Number(m[1]);
  }
  return DEFAULT_BUDGET_USD;
}

function themeScores(text: string) {
  return SCENARIOS.map((s) => ({ s, score: s.keywords.filter((k) => new RegExp(`\\b${k}\\b`).test(text)).length }));
}

export function planTrip(prompt: string): Plan {
  const text = prompt.toLowerCase();
  const budget = parseBudget(text);
  const fits = (s: Scenario) => tripTotal(s.items) <= budget;
  const cheapest = [...SCENARIOS].sort((a, b) => tripTotal(a.items) - tripTotal(b.items))[0];

  const ranked = themeScores(text).filter((x) => x.score > 0).sort((a, b) => b.score - a.score);
  const wanted = ranked[0]?.s;

  let scenario: Scenario;
  let swapNote = "";
  if (wanted && fits(wanted)) {
    scenario = wanted;
  } else if (wanted) {
    scenario = SCENARIOS.find(fits) ?? cheapest;
    swapNote = `The ${wanted.name.toLowerCase()} plan comes to $${tripTotal(wanted.items)}, over your $${budget}, so here's one that fits. `;
  } else {
    scenario = SCENARIOS.find(fits) ?? cheapest;
  }

  const total = tripTotal(scenario.items);
  const { exp } = itemsOf(scenario.items);

  const tokyo = text.includes("tokyo") && !text.includes("kyoto");
  const where = tokyo
    ? `Tokyo is booked past $${budget} for 2 that weekend, so I planned Kyoto instead, 2h15 away by bullet train. `
    : "";
  const fit = total <= budget ? `under your $${budget}` : `still over your $${budget}, the lowest I could find`;
  const soldOut =
    exp.availability === "Sold out"
      ? ` The ${exp.shortName} is the best fit but it's sold out, so it's not in the total. Join the waitlist on the card.`
      : "";

  const intro = `${where}${swapNote}${scenario.picks} come to $${total}, ${fit}.${soldOut}`;
  return { scenario, budget, total, intro };
}
