/**
 * Fake assistant replies for the prototype.
 *
 * "Kyoto Weekend Prototype Content Pack.xlsx" has one row per option on each
 * sheet. Rows 1–3 of every sheet line up into three trip scenarios:
 *   A  Classic Gion       S1 + E1 + F1   $516
 *   B  Foodie weekend     S2 + E2 + F2   $546
 *   C  Budget + nature    S3 + E3 + F3   $355 ($279 bookable: E3 is sold out)
 * Row 4 of each sheet (S4 $612 ryokan, E4 pottery, F4 $180 kaiseki) is the
 * over-budget / incomplete set and isn't used for a scenario.
 *
 * Fields the workbook doesn't have (photos, popularity label, distance,
 * menu items, food rating, descriptions) are filled with filler and marked.
 * Shape follows the card spec: `cardType` + `details`, always in the
 * order stay → experience → food.
 */

export type StayArt = "machiya" | "riverRoom" | "cityFlat";
export type ExperienceArt = "tea" | "market" | "torii";
export type FoodArt = "ramen" | "tofu" | "skewer";
export type DishKind = "ramen" | "gyoza" | "tofu" | "tempura" | "rice" | "tamago" | "skewer" | "mochi";

export type StayDetails = {
  optionId: string;
  stayName: string;
  location: string;
  neighbourhood: string;
  propertyType: string;
  imageUrl: string;
  art: StayArt;
  popularityLabel: string;
  nightlyPriceUsd: number;
  nights: number;
  totalUsd: number;
  checkIn: string;
  checkOut: string;
  description: string;
  rating: number;
  reviewCount: number;
  hostName: string;
};

export type ExperienceDetails = {
  optionId: string;
  experienceName: string;
  shortName: string;
  category: string;
  description: string;
  moreInfo: string;
  imageUrl: string;
  art: ExperienceArt;
  durationHours: number;
  placeName: string;
  address: string;
  minutesFromStay: number;
  timeSlots: string[];
  date: string;
  startTime: string;
  pricePerGuestUsd: number;
  totalUsd: number;
  rating: number;
  hostName: string;
  availability: "Spots open" | "Sold out";
};

export type MenuItem = {
  itemName: string;
  imageUrl: string;
  dish: DishKind;
  dietLabel: "veg" | "non-veg";
  priceUsd: number;
  portion: string;
};

export type FoodDetails = {
  optionId: string;
  restaurantName: string;
  cuisine: string;
  neighbourhood: string;
  meal: "Breakfast" | "Lunch" | "Dinner" | "Snack stop";
  priceLevel: string;
  estCostUsd: number;
  walkMinutes: number;
  bookingNote: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  art: FoodArt;
  filters: string[];
  menuItems: MenuItem[];
};

export type ReplyItem =
  | { cardType: "stay"; details: StayDetails }
  | { cardType: "experience"; details: ExperienceDetails }
  | { cardType: "food"; details: FoodDetails };

export type ScenarioId = "classic" | "foodie" | "budget";

export type Scenario = {
  id: ScenarioId;
  /** Short name, used in chips and the summary heading. */
  name: string;
  /** The bookable picks, for the intro line: "Stay, tea and ramen". Sold-out picks are named separately. */
  picks: string;
  /** Words in a request that point at this scenario. */
  keywords: string[];
  /** One-line plan for the summary. */
  plan: string;
  /** Sample request that lands on this scenario. */
  samplePrompt: string;
  items: ReplyItem[];
};

export const DEFAULT_BUDGET_USD = 600;
export const GUESTS = 2;
const CHECK_IN = "2025-04-11";
const CHECK_OUT = "2025-04-13";

export const SCENARIOS: Scenario[] = [
  {
    id: "classic",
    name: "Classic Gion",
    picks: "Stay, tea and ramen",
    keywords: ["culture", "cultural", "tea", "temple", "traditional", "classic", "history", "gion", "romantic", "machiya", "geisha", "zen"],
    plan: "Fri check-in, Gion · Sat 10:30 tea ceremony · Sat dinner at Menya Inoichi",
    samplePrompt: "a classic Kyoto weekend for 2 with tea and temples, under $600",
    items: [
      {
        cardType: "stay",
        details: {
          optionId: "S1",
          stayName: "Restored machiya townhouse near Gion",
          location: "Gion, Kyoto",
          neighbourhood: "Gion",
          propertyType: "Entire townhouse",
          imageUrl: "", // no photo rights in the content pack → illustrated placeholder
          art: "machiya",
          popularityLabel: "Guest favourite", // filler
          nightlyPriceUsd: 168,
          nights: 2,
          totalUsd: 366,
          checkIn: CHECK_IN,
          checkOut: CHECK_OUT,
          description: "Private garden and cedar soaking tub",
          rating: 4.92,
          reviewCount: 214,
          hostName: "Kenji",
        },
      },
      {
        cardType: "experience",
        details: {
          optionId: "E1",
          experienceName: "Tea ceremony in a 100-year-old machiya",
          shortName: "Tea ceremony",
          category: "Culture",
          description: "Whisk your own matcha with Mei, slowly, the old way.", // filler
          moreInfo: "Kneel on tatami, learn the bow, whisk and sip. Tea sweets included.", // filler
          imageUrl: "",
          art: "tea",
          durationHours: 2,
          placeName: "Gion-Shijo Station",
          address: "Meet outside exit 6",
          minutesFromStay: 10, // filler
          timeSlots: ["Sat 12 Apr · 10:30"],
          date: "2025-04-12",
          startTime: "10:30",
          pricePerGuestUsd: 58,
          totalUsd: 116,
          rating: 4.96,
          hostName: "Mei",
          availability: "Spots open",
        },
      },
      {
        cardType: "food",
        details: {
          optionId: "F1",
          restaurantName: "Menya Inoichi",
          cuisine: "Ramen",
          neighbourhood: "Gion",
          meal: "Dinner",
          priceLevel: "$",
          estCostUsd: 34,
          walkMinutes: 8,
          bookingNote: "No reservations - arrive before 18:00",
          rating: 4.7, // filler
          reviewCount: 320, // filler
          imageUrl: "",
          art: "ramen",
          filters: ["Breakfast", "Lunch", "Dinner"],
          // filler menu: workbook has no dishes
          menuItems: [
            { itemName: "Shio ramen", imageUrl: "", dish: "ramen", dietLabel: "non-veg", priceUsd: 12, portion: "1 bowl" },
            { itemName: "Shoyu ramen", imageUrl: "", dish: "ramen", dietLabel: "non-veg", priceUsd: 13, portion: "1 bowl" },
            { itemName: "Yuzu veg ramen", imageUrl: "", dish: "ramen", dietLabel: "veg", priceUsd: 11, portion: "1 bowl" },
            { itemName: "Pan gyoza", imageUrl: "", dish: "gyoza", dietLabel: "non-veg", priceUsd: 6, portion: "5 pcs" },
          ],
        },
      },
    ],
  },
  {
    id: "foodie",
    name: "Foodie weekend",
    picks: "A riverside room, a market tasting walk and a tofu lunch",
    keywords: ["food", "foodie", "eat", "eating", "market", "cook", "cooking", "taste", "tasting", "cuisine", "local", "river", "nishiki", "street"],
    plan: "Fri check-in, Shimogyo · Sat 11:00 Nishiki tasting walk · Sun lunch at Sagano Yudofu-tei",
    samplePrompt: "a foodie weekend in Kyoto for 2 people under $600",
    items: [
      {
        cardType: "stay",
        details: {
          optionId: "S2",
          stayName: "Quiet tatami room by the Kamo River",
          location: "Shimogyo, Kyoto",
          neighbourhood: "Shimogyo",
          propertyType: "Private room in home",
          imageUrl: "",
          art: "riverRoom",
          popularityLabel: "Rare find", // filler
          nightlyPriceUsd: 142,
          nights: 2,
          totalUsd: 312,
          checkIn: CHECK_IN,
          checkOut: CHECK_OUT,
          description: "Riverside walk to Pontocho in 10 minutes",
          rating: 4.88,
          reviewCount: 163,
          hostName: "Yumi",
        },
      },
      {
        cardType: "experience",
        details: {
          optionId: "E2",
          experienceName: "Nishiki Market tasting walk with a local cook",
          shortName: "Nishiki tasting walk",
          category: "Food & drink",
          description: "Twelve stalls, one cook, and everything you'd never order alone.", // filler
          moreInfo: "Pickles, dashi, grilled mochi and fresh yuba. Come hungry; it counts as Saturday lunch.", // filler
          imageUrl: "",
          art: "market",
          durationHours: 3,
          placeName: "Nishiki Market",
          address: "Teramachi entrance",
          minutesFromStay: 12, // filler
          timeSlots: ["Sat 12 Apr · 11:00"],
          date: "2025-04-12",
          startTime: "11:00",
          pricePerGuestUsd: 85,
          totalUsd: 170,
          rating: 4.91,
          hostName: "Takumi",
          availability: "Spots open",
        },
      },
      {
        cardType: "food",
        details: {
          optionId: "F2",
          restaurantName: "Sagano Yudofu-tei",
          cuisine: "Tofu",
          neighbourhood: "Arashiyama",
          meal: "Lunch",
          priceLevel: "$$",
          estCostUsd: 64,
          walkMinutes: 25,
          bookingNote: "Walk-ins welcome at lunch", // filler: workbook booking note is blank
          rating: 4.6, // filler
          reviewCount: 188, // filler
          imageUrl: "",
          art: "tofu",
          filters: ["Breakfast", "Lunch", "Dinner"],
          menuItems: [
            { itemName: "Yudofu set", imageUrl: "", dish: "tofu", dietLabel: "veg", priceUsd: 24, portion: "1 pot" },
            { itemName: "Veg tempura", imageUrl: "", dish: "tempura", dietLabel: "veg", priceUsd: 9, portion: "6 pcs" },
            { itemName: "Sesame tofu", imageUrl: "", dish: "tofu", dietLabel: "veg", priceUsd: 7, portion: "1 plate" },
            { itemName: "Takikomi rice", imageUrl: "", dish: "rice", dietLabel: "non-veg", priceUsd: 6, portion: "1 bowl" },
          ],
        },
      },
    ],
  },
  {
    id: "budget",
    name: "Budget + nature",
    picks: "A central flat and market street food",
    keywords: ["budget", "cheap", "affordable", "save", "saving", "student", "backpack", "nature", "hike", "hiking", "outdoor", "shrine", "sunrise", "dawn", "fushimi", "inari", "walk"],
    plan: "Fri check-in, Nakagyo · Sat 06:00 Fushimi Inari walk (waitlist) · Sat snacks at Nishiki",
    samplePrompt: "Kyoto on a budget for 2, under $400, with some nature",
    items: [
      {
        cardType: "stay",
        details: {
          optionId: "S3",
          stayName: "Bright two-room flat off Sanjo Street",
          location: "Nakagyo, Kyoto",
          neighbourhood: "Nakagyo",
          propertyType: "Entire apartment",
          imageUrl: "",
          art: "cityFlat",
          popularityLabel: "Great value", // filler
          nightlyPriceUsd: 112,
          nights: 2,
          totalUsd: 249,
          checkIn: CHECK_IN,
          checkOut: CHECK_OUT,
          description: "Two blocks from Nishiki Market",
          rating: 4.71,
          reviewCount: 412,
          hostName: "Haruto",
        },
      },
      {
        cardType: "experience",
        details: {
          optionId: "E3",
          experienceName: "Dawn walk through Fushimi Inari's upper gates",
          shortName: "Fushimi Inari walk",
          category: "Nature",
          description: "Ten thousand torii and no crowds, if you're up before the sun.", // filler
          moreInfo: "A steady 2.5-hour climb to the summit loop with Ren. Wear shoes with grip; the steps are uneven.", // filler
          imageUrl: "",
          art: "torii",
          durationHours: 2.5,
          placeName: "Fushimi Inari Taisha",
          address: "Main torii gate",
          minutesFromStay: 25, // filler
          timeSlots: ["Sat 12 Apr · 06:00"],
          date: "2025-04-12",
          startTime: "06:00",
          pricePerGuestUsd: 38,
          totalUsd: 76,
          rating: 4.99,
          hostName: "Ren",
          availability: "Sold out",
        },
      },
      {
        cardType: "food",
        details: {
          optionId: "F3",
          restaurantName: "Nishiki Tamago & Skewer Stall",
          cuisine: "Market street food",
          neighbourhood: "Nishiki Market",
          meal: "Snack stop",
          priceLevel: "$",
          estCostUsd: 30,
          walkMinutes: 14,
          bookingNote: "Cash only - most stalls close by 17:00",
          rating: 4.5, // filler
          reviewCount: 540, // filler
          imageUrl: "",
          art: "skewer",
          filters: ["Breakfast", "Lunch", "Snack stop"],
          menuItems: [
            { itemName: "Tamagoyaki stick", imageUrl: "", dish: "tamago", dietLabel: "veg", priceUsd: 3, portion: "1 stick" },
            { itemName: "Grilled octopus", imageUrl: "", dish: "skewer", dietLabel: "non-veg", priceUsd: 5, portion: "1 skewer" },
            { itemName: "Soy mochi", imageUrl: "", dish: "mochi", dietLabel: "veg", priceUsd: 3, portion: "2 pcs" },
            { itemName: "Chicken yakitori", imageUrl: "", dish: "skewer", dietLabel: "non-veg", priceUsd: 4, portion: "1 skewer" },
          ],
        },
      },
    ],
  },
];

/** First scenario, kept for anything that needs a default reply. */
export const mockReply = SCENARIOS[0].items;

export const SUGGESTED_PROMPT = "find me a weekend trip in tokyo for 2 people under 600 dollars";

/** Bookable cost: anything sold out is left out of the total. */
export function tripTotal(items: ReplyItem[]) {
  return items.reduce((sum, item) => {
    if (item.cardType === "food") return sum + item.details.estCostUsd;
    if (item.cardType === "experience" && item.details.availability === "Sold out") return sum;
    return sum + item.details.totalUsd;
  }, 0);
}

export function itemsOf(items: ReplyItem[]) {
  const pick = <T extends ReplyItem["cardType"]>(t: T) =>
    items.find((i) => i.cardType === t)!.details as Extract<ReplyItem, { cardType: T }>["details"];
  return { stay: pick("stay"), exp: pick("experience"), food: pick("food") };
}

const fmt = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
export const formatDay = (iso: string) => fmt.format(new Date(iso + "T00:00:00Z"));
