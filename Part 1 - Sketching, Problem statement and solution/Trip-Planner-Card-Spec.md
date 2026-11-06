# Trip-Planner Chat: Card and Error-State Spec

This is the one-page spec for the trip-planner chat prototype. It is drawn from the hand sketches in `sKETCHES/` and the problem in `Meeting-Notes.md`. It follows the layout of the host reservation card spec: a sketch, the fields, what makes the card look different, then the mock response.

**The flow:** the guest asks "Plan me a weekend in Kyoto". The assistant shows a typing bubble, then answers with three cards in this order: **Stay, Experience, Food**. There is no login, the page works on mobile and web, and the chat is never blank. If something fails, an error bubble with a button that brings the cards back appears in place of the cards.

Each card is its own component (`StayCard`, `ExperienceCard`, `FoodCard`) so the three layouts stay truly different.

---

## 1. Stay card

### Sketch

```
+-----------------------------------------------+   card BG: white
|                                 [ Guest fav ] |   <- popularity emblem, top right
|                                               |
|        [ image placeholder: full width ]      |
|                                               |
+-----------------------------------------------+
|  Stay Name                    +-------------+ |   <- biggest text
|  Location (light grey)        | $185 /night | |   <- price boxed in
|                               | 2 nights    | |      accent border
|                               | 11-13 Apr   | |   <- stay dates
|                               +-------------+ |
|  [            Add to trip  +             ]    |   <- primary button, full width
+-----------------------------------------------+
```

Tapping the card opens the **Stay detail screen** (slightly grey page BG, sticky bottom bar):

```
+-----------------------------------------------+
| (<)                          [ Recommended ]  |   <- white label on photo
|            [ photo, full bleed ]              |
+-----------------------------------------------+
|  STAY NAME                                    |   <- biggest text
|  Short description, mid size.                 |
|  * 4.9  |  Guest favourite  |  128 reviews    |   <- trust labels
|  Location                                     |
+===============================================+   <- sticky bar
|  $370 total                   [  Add  +   ]   |
|  2 nights · 11-13 Apr                         |
+-----------------------------------------------+
```

### Fields

| Field | Type | Shown as |
|---|---|---|
| `stayName` | text | Biggest text |
| `location` | text | Small, light grey |
| `imageUrl` | text | Full-width image placeholder |
| `popularityLabel` | text | Emblem on the image, top right |
| `nightlyPriceUsd` | number | Inside the boxed price |
| `nights` | number | Under the price |
| `checkIn` / `checkOut` | date | Under the nights in the price box, and in the sticky bar |
| `description` | text | Detail screen, mid size |
| `rating` / `reviewCount` | number | Detail screen trust labels |

**The Kyoto weekend:** check-in Fri 11 Apr 2025, check-out Sun 13 Apr 2025 (2 nights). These are the same dates as the team's Kyoto weekend spec. The card shows them as "11-13 Apr" under "2 nights", and the sticky bar shows "2 nights · 11-13 Apr".

### What makes this card look different

- **Image:** a wide banner across the full top, with a popularity emblem on it.
- **Biggest text:** the stay name.
- **Signature element:** the price sits in a box with an accent border, and a full-width primary **Add to trip +** button sits below it.

---

## 2. Experience card

### Sketch

```
+-----------------------------------------------+
| +-------------------------------------------+ |
| |      [ image placeholder: inset ]         | |
| |                              ( 2.0 hr )   | |   <- duration chip on image
| +-------------------------------------------+ |
|  Experience Name                              |   <- biggest text
|  A catchy line on why you should join.        |
|  +-----------------------------------------+  |   <- nested location card
|  | (pin) Place name           ( 10 min  ) |  |      (opens map / place info)
|  |       Address               ( away   ) |  |
|  +-----------------------------------------+  |
|  [   Know more   ] | [   Pick time    ]       |   <- split two-button footer
+-----------------------------------------------+
```

- **Know more** opens a full card on its own experience page.
- **Pick time** opens a time-slot picker. It could later become an "Add to plan" button.

### Fields

| Field | Type | Shown as |
|---|---|---|
| `experienceName` | text | Biggest text |
| `description` | text | One catchy line under the name |
| `imageUrl` | text | Inset image placeholder |
| `durationHours` | number | Chip on the image, bottom right |
| `placeName` | text | Location sub-card, first line |
| `address` | text | Location sub-card, second line |
| `minutesFromStay` | number | "10 min away" chip |
| `timeSlots` | list of text | Pick time sheet |

### What makes this card look different

- **Image:** an inset picture with rounded corners, with the duration chip on top of it.
- **Biggest text:** the experience name.
- **Signature element:** a small location card inside the card shows how far it is from the stay, and two side-by-side buttons sit at the bottom.

---

## 3. Food card

### Sketch

```
+-----------------------------------------------+
| +---------+  Restaurant Name                  |   <- biggest text
| | kitchen |  * 4.7 · 320 reviews              |   <- very small
| |  photo  |                                   |
| +---------+                                   |
|  ( Breakfast ) ( Lunch ) ( Dinner )           |   <- small filter chips
|                                               |
|  +-------+  +-------+  +-------+  +---->      |   <- menu items, scroll
|  | img  o|  | img  o|  | img  o|  |           |      sideways
|  +-------+  +-------+  +-------+  |           |      o = veg / non-veg dot
|  Item 1     Item 2     Item 3                 |
|  $12        $9         $15                    |
+-----------------------------------------------+
```

The chips filter the menu. They can also be veg / non-veg or halal / non-halal. The item list is drawn scrolling sideways, but a vertical list also works:

```
|  +-----+  Item name               (o)         |
|  | img |  $12 · 1 plate                       |
|  +-----+                                      |
```

### Fields

| Field | Type | Shown as |
|---|---|---|
| `restaurantName` | text | Biggest text |
| `rating` / `reviewCount` | number | Very small, under the name |
| `imageUrl` | text | Square kitchen / table photo, left |
| `filters` | list of text | Small chips |
| `menuItems[].itemName` | text | Under each item image |
| `menuItems[].imageUrl` | text | Item thumbnail |
| `menuItems[].dietLabel` | text | Veg / non-veg dot on the thumbnail |
| `menuItems[].priceUsd` | number | Under the item name |
| `menuItems[].portion` | text | Next to the price (optional) |

### What makes this card look different

- **Image:** a small square photo on the left, beside the name, so there is no banner.
- **Biggest text:** the restaurant name.
- **Signature element:** filter chips, then a row of dish thumbnails that scrolls sideways, each with a veg / non-veg dot.

---

## 4. Mock response

The mock response is fake data that stands in for the assistant's real answer while the prototype is built. `cardType` tells the chat which component to draw. **The items always come in this order: stay, experience, food.** The values are left blank on purpose, apart from the stay dates and nights, which are fixed for the Kyoto weekend. This is the shape; the rest of the content gets filled in later.

```json
[
  {
    "cardType": "stay",
    "details": {
      "stayName": "",
      "location": "",
      "imageUrl": "",
      "popularityLabel": "",
      "nightlyPriceUsd": null,
      "nights": 2,
      "checkIn": "2025-04-11",
      "checkOut": "2025-04-13",
      "description": "",
      "rating": null,
      "reviewCount": null
    }
  },
  {
    "cardType": "experience",
    "details": {
      "experienceName": "",
      "description": "",
      "imageUrl": "",
      "durationHours": null,
      "placeName": "",
      "address": "",
      "minutesFromStay": null,
      "timeSlots": []
    }
  },
  {
    "cardType": "food",
    "details": {
      "restaurantName": "",
      "rating": null,
      "reviewCount": null,
      "imageUrl": "",
      "filters": [],
      "menuItems": [
        { "itemName": "", "imageUrl": "", "dietLabel": "", "priceUsd": null, "portion": "" }
      ]
    }
  }
]
```

---

## 5. Chat window and error states

### Chat window with the loading state

```
+-----------------------------------------------+
|  Arpan                                   (X)  |   <- close chat
+-----------------------------------------------+
|                 +---------------------------+ |
|                 | Plan me a weekend in Kyoto| |   <- guest bubble
|                 +---------------------------+ |
|  +-------+                                    |
|  |  ...  |                                    |   <- typing bubble (loading)
|  +-------+                                    |
|  [ Stay card ]  [ Experience card ]  [ Food ] |   <- replaces the typing bubble
+-----------------------------------------------+
|  Something else...                       (>)  |   <- input + send
+-----------------------------------------------+
```

### Error A: the request failed

```
+-----------------------------------------------+   <- bubble uses the error
| (!) Sorry, I couldn't put your Kyoto weekend  |      accent colour
|     together just now. Let's try again.       |
|                               [ Try again ]   |
+-----------------------------------------------+
```

| Part | Value |
|---|---|
| Message | Sorry, I couldn't put your Kyoto weekend together just now. Let's try again. |
| Button | **Try again**, inside the bubble, bottom right |
| What it does | Sends the same request again. The three cards then appear in order. |
| Forced-failure trigger | Add `?fail=once` to the page address. The first request fails and every request after it works. |

### Error B: the request can't be planned (for example "Japan and Korea in 2 days")

```
+-----------------------------------------------+
| (!) I can only plan one place at a time.      |
|     Want me to build a weekend in Tokyo?      |
|                         [ Go with Tokyo ]     |
+-----------------------------------------------+
```

| Part | Value |
|---|---|
| Message | I can only plan one place at a time. Want me to build a weekend in Tokyo? |
| Button | **Go with [suggestion]**, inside the bubble, bottom right |
| What it does | Sends the suggested request instead. The three cards then appear in order. |

**Rule for both:** the thread is never blank. An error always comes with a button that brings the three cards back.

### Steps to fire the forced failure

1. Open the live link with `?fail=once` on the end.
2. Type "Plan me a weekend in Kyoto" and press Send.
3. The typing bubble shows, then Error A appears.
4. Tap **Try again**. The Stay, Experience and Food cards appear, in that order.
