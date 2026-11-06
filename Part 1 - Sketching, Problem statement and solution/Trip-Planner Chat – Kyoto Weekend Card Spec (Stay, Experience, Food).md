Card and error-state spec for the trip-planner chat's Kyoto weekend request. It uses the same layout as the Host Inbox Assistant "Upcoming reservation" card spec: sketch, fields, what makes the card look different, and mock response. All three cards use one fixed two-night weekend in Kyoto: check-in Fri 11 Apr 2025, check-out Sun 13 Apr 2025.

## Stay card

### Sketch

```
+===============================================+  <- coral top border
|                                               |
|        [ image placeholder: wide banner ]     |
|                                               |
+-----------------------------------------------+
|  11 Apr, 13 Apr 2025 · 2 nights              |  <- biggest text
|  Machiya townhouse near Gion · Kyoto, Japan   |
|  $185 USD / night                             |
|  Quiet wooden house, 5 min walk to Yasaka.    |
+-----------------------------------------------+
```

### Fields

| Field | Example value |
|---|---|
| Destination | Kyoto, Japan |
| Listing title | Machiya townhouse near Gion |
| Check-in | 11 Apr 2025 |
| Check-out | 13 Apr 2025 |
| Nightly price | $185 USD |
| Short description | Quiet wooden house, 5 min walk to Yasaka Shrine. |

### What makes this card look different

- Image placeholder: a wide banner across the top. This is a grey box standing in for a photo.
- Biggest text: the travel dates.
- Accent color: coral, used as a top border.

## Experience card

### Sketch

```
+--------+--------------------------------------+
|        |  Arashiyama Bamboo & Tea Walk        |  <- biggest text
| image  |  3 hours                             |
| (tall  |  [SAT] Bamboo grove, Tenryu-ji, tea  |  <- purple day labels
| strip) |  [SUN] Fushimi Inari at sunrise      |
|        |                                      |
+--------+--------------------------------------+
```

### Fields

| Field | Example value |
|---|---|
| Activity name | Arashiyama Bamboo & Tea Walk |
| Duration | 3 hours |
| Day plan, Sat 12 Apr | Bamboo grove, Tenryu-ji garden, matcha tasting |
| Day plan, Sun 13 Apr | Fushimi Inari gates at sunrise, then checkout |

### What makes this card look different

- Image placeholder: a tall strip down the left side.
- Biggest text: the activity name.
- Accent color: purple, used on the day labels.

## Food card

### Sketch

```
+-----------------------------------------------+
|  Nishiki Market Kaiseki Bar          ( img )  |  <- biggest text; round image, right
|  Dinner · $$$                                 |  <- amber price label
|  Seasonal small plates at a 10-seat counter.  |
+-----------------------------------------------+
```

### Fields

| Field | Example value |
|---|---|
| Restaurant name | Nishiki Market Kaiseki Bar |
| Meal type | Dinner |
| Price range | $$$ |
| Short description | Seasonal small plates at a 10-seat counter. |

### What makes this card look different

- Image placeholder: a small round thumbnail at the top right.
- Biggest text: the restaurant name.
- Accent color: amber, used on the meal type and price label.

## Mock response shape

A mock response is fake sample data that stands in for the assistant's real answer. It is written in JSON (JavaScript Object Notation), a plain text format for data. The `cardType` value tells the chat which card to draw. The items always come in this order: stay, Experience, food.

```json
[
  { "cardType": "stay", "details": {
      "destination": "Kyoto, Japan", "listingTitle": "Machiya townhouse near Gion",
      "checkIn": "2025-04-11", "checkOut": "2025-04-13",
      "nightlyPriceUsd": 185, "description": "Quiet wooden house, 5 min walk to Yasaka Shrine." } },
  { "cardType": "experience", "details": {
      "activityName": "Arashiyama Bamboo & Tea Walk", "duration": "3 hours",
      "dayPlan": [
        { "day": "Sat 12 Apr", "plan": "Bamboo grove, Tenryu-ji garden, matcha tasting" },
        { "day": "Sun 13 Apr", "plan": "Fushimi Inari gates at sunrise, then checkout" } ] } },
  { "cardType": "food", "details": {
      "restaurantName": "Nishiki Market Kaiseki Bar", "mealType": "Dinner",
      "priceRange": "$$$", "description": "Seasonal small plates at a 10-seat counter." } }
]
```

## Error bubble

```
Assistant
+-----------------------------------------------+
|  Sorry, I couldn't put your Kyoto weekend     |
|  together just now. Let's give it another go. |
|                                [ Try again ]  |
+-----------------------------------------------+
```

| Part | Value |
|---|---|
| Message | Sorry, I couldn't put your Kyoto weekend together just now. Let's give it another go. |
| Button label | Try again |
| Button position | Inside the assistant's chat bubble, bottom right. The thread is never empty. |
| What the button does | Sends the same trip request again. The chat then shows the three cards. |
| Forced-failure trigger | The page address ends with `?fail=once`. The first request then gets a broken mock response. Every request after that works normally. |

### Steps to fire the trigger

1. Open the live link with `?fail=once` added to the end of the address.
2. Type "Plan a weekend in Kyoto for two" and press Send.
3. The thinking animation plays. Then the error bubble appears.
4. Tap **Try again**. The stay, Experience and food cards appear in that order.