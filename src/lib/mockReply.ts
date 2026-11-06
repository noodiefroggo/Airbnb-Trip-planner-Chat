/**
 * Fake assistant reply for the prototype.
 *
 * One row per sheet from "Kyoto Weekend Prototype Content Pack.xlsx":
 *   Stays → S1, Experiences → E1, Food → F1
 * Fields the workbook doesn't have (photos, popularity label, distance,
 * menu items, food rating) are filled with clearly-labelled filler.
 *
 * Shape follows the card spec: `cardType` + `details`, always in the
 * order stay → experience → food.
 */

export type StayDetails = {
  optionId: string;
  stayName: string;
  location: string;
  propertyType: string;
  imageUrl: string;
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
  category: string;
  description: string;
  imageUrl: string;
  durationHours: number;
  placeName: string;
  address: string;
  minutesFromStay: number;
  timeSlots: string[];
  date: string;
  pricePerGuestUsd: number;
  totalUsd: number;
  rating: number;
  hostName: string;
  availability: string;
};

export type MenuItem = {
  itemName: string;
  imageUrl: string;
  dietLabel: "veg" | "non-veg";
  priceUsd: number;
  portion: string;
};

export type FoodDetails = {
  optionId: string;
  restaurantName: string;
  cuisine: string;
  neighbourhood: string;
  meal: "Breakfast" | "Lunch" | "Dinner";
  priceLevel: string;
  estCostUsd: number;
  walkMinutes: number;
  bookingNote: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  filters: string[];
  menuItems: MenuItem[];
};

export type ReplyItem =
  | { cardType: "stay"; details: StayDetails }
  | { cardType: "experience"; details: ExperienceDetails }
  | { cardType: "food"; details: FoodDetails };

export const BUDGET_USD = 600;
export const GUESTS = 2;

export const mockReply: ReplyItem[] = [
  {
    cardType: "stay",
    details: {
      optionId: "S1",
      stayName: "Restored machiya townhouse near Gion",
      location: "Gion, Kyoto",
      propertyType: "Entire townhouse",
      imageUrl: "", // no photo rights in the content pack → illustrated placeholder
      popularityLabel: "Guest favourite", // filler: not in workbook
      nightlyPriceUsd: 168,
      nights: 2,
      totalUsd: 366,
      checkIn: "2025-04-11",
      checkOut: "2025-04-13",
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
      category: "Culture",
      description: "Whisk your own matcha with Mei, slowly, the old way.", // filler line
      imageUrl: "",
      durationHours: 2,
      placeName: "Gion-Shijo Station",
      address: "Meet outside exit 6",
      minutesFromStay: 10, // filler: not in workbook
      timeSlots: ["Sat 12 Apr · 10:30"],
      date: "2025-04-12",
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
      rating: 4.7, // filler: not in workbook
      reviewCount: 320, // filler: not in workbook
      imageUrl: "",
      filters: ["Breakfast", "Lunch", "Dinner"],
      // filler menu: workbook has no dishes
      menuItems: [
        { itemName: "Shio ramen", imageUrl: "", dietLabel: "non-veg", priceUsd: 12, portion: "1 bowl" },
        { itemName: "Shoyu ramen", imageUrl: "", dietLabel: "non-veg", priceUsd: 13, portion: "1 bowl" },
        { itemName: "Yuzu veg ramen", imageUrl: "", dietLabel: "veg", priceUsd: 11, portion: "1 bowl" },
        { itemName: "Pan gyoza", imageUrl: "", dietLabel: "non-veg", priceUsd: 6, portion: "5 pcs" },
      ],
    },
  },
];

export const SUGGESTED_PROMPT = "find me a weekend trip in tokyo for 2 people under 600 dollars";

export function tripTotal(items: ReplyItem[]) {
  return items.reduce((sum, item) => {
    if (item.cardType === "food") return sum + item.details.estCostUsd;
    return sum + item.details.totalUsd;
  }, 0);
}

const fmt = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
export const formatDay = (iso: string) => fmt.format(new Date(iso + "T00:00:00Z"));
