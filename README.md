# Airbnb Trip-planner Chat

A working prototype of a chat that plans a whole weekend in one reply: **a place to stay, something to do and somewhere to eat**, all inside the Airbnb app.

**Live prototype:** https://airbnb-trip-planner-dusky.vercel.app. The chat app and its README are in [`trip-planner-chat/`](<Part 2 - Prototype - All ideal Flow/trip-planner-chat>).

This is a portfolio project done for Zero (Lesson 1). It uses Airbnb's name, logo and colours for demonstration only. It is not affiliated with Airbnb and is not a commercial product.

## What's in this repo

| Folder / file | What it is |
|---|---|
| [`Meeting-Notes.md`](Meeting-Notes.md) | The problem, the expected outcome and the build process, as agreed at kickoff |
| [`Part 1 - Sketching, Problem statement and solution/`](<Part 1 - Sketching, Problem statement and solution>) | Hand sketches, the card and error-state spec, and its PDF source (see [Process](#process)) |
| [`Trip-Planner-Card-Spec.pdf`](Trip-Planner-Card-Spec.pdf) | A 6-page illustrated PDF of the Part 1 spec |
| [`Part 2 - Prototype - All ideal Flow/`](<Part 2 - Prototype - All ideal Flow>) | The content pack, plus **the app** in [`trip-planner-chat/`](<Part 2 - Prototype - All ideal Flow/trip-planner-chat>) |
| [`Decisions/`](Decisions) | The decision log: one file per task with what we chose, the alternatives and why |

---

## The problem

- Guests leave before they ever see a listing. Search filters make them build a trip piece by piece, on their own.
- Nothing in the app plans a whole weekend in one place: stay, activity and food each live in a different tab.
- Leaders want to judge the idea by **using** it, not by reading a deck. Eight test guests are booked with UX Research to try it.

## The solution

The guest types a request into a **Trip-planner** chat, for example:

> find me a weekend trip in tokyo for 2 people under 600 dollars

The assistant answers with three cards, a stay, an experience and a meal, plus a short trip summary that checks the plan against the budget. There's no login, it works on mobile and web, and the chat is never left blank.

## The chat flow

1. **Home → chat.** The chat opens as a sheet over a mock of the Airbnb mobile home screen. The navbar shows the Bélo on the left, and the **Trip-planner** name with a close (✕) button on the right. Closing returns to the home screen, and the red **Plan a trip** button reopens the chat with the thread intact.
2. **Send.** The message box is pre-filled with the sample prompt. When you send, the input and send button **lock**.
3. **Thinking.** A reply bubble shows the thinking animation: four dots **stretch → squash → move in a wave → gather and morph into the Airbnb logo**, then the loop repeats. It's built on the Web Animations API and falls back to a gentle pulse under `prefers-reduced-motion`.
4. **Skeletons.** Grey placeholders shaped like each of the three cards hold the layout while the results "load".
5. **Reply**, in this order:
   - a one-line **summary** at the top;
   - three cards stacked vertically: **Stay → Experience → Food**;
   - a **trip summary**: dates, guests, a mini plan, the cost breakdown and a budget meter against $600.
6. The input **unlocks** for the next message.

Agent bubbles are a very light red with an Airbnb-red (`#FF385C`) border. Guest bubbles are grey.

### About Tokyo vs Kyoto

The sample prompt asks for **Tokyo**, but the prototype content pack covers a **Kyoto** weekend. The assistant handles this openly: it says Tokyo is over budget for that weekend and offers the Kyoto plan instead, about 2h15 away by bullet train. Ask for Kyoto and it just answers.

## The three cards

Each card is its own component, so the layouts stay clearly different.

| Card | Component | Layout |
|---|---|---|
| **Stay** | `src/components/cards/StayCard.tsx` | Full-width banner with a *Guest favourite* emblem. The name is the biggest text. The price sits in a **red-bordered box** with nights and dates (`$168 /night · 2 nights · 11–13 Apr`), above a full-width **Add to trip** button. |
| **Experience** | `src/components/cards/ExperienceCard.tsx` | Inset rounded image with a **duration chip**. Under it, a catchy one-liner and a **nested location card** (meeting point plus a "10 min away" pill). It ends with a split footer: **Know more** / **Pick time**. |
| **Food** | `src/components/cards/FoodCard.tsx` | Small **square photo** beside the name, with no banner. **Breakfast / Lunch / Dinner** chips sit above a **sideways-scrolling menu row**, and each dish carries a **veg / non-veg dot**. |

### Where the content comes from

*Kyoto Weekend Prototype Content Pack.xlsx* lines up into **three scenarios**: rows 1–3 of each sheet. The search in `src/lib/planner.ts` picks one from the request's budget and theme. See the [app README](<Part 2 - Prototype - All ideal Flow/trip-planner-chat/README.md>) for the routing rules and a screenshot of each thread.

| Scenario | Stay | Experience | Food | Total for 2 |
|---|---|---|---|---|
| 1 · Classic Gion | **S1** Machiya townhouse, Gion · $366 | **E1** Tea ceremony · $116 | **F1** Menya Inoichi ramen · $34 | $516 / $600 |
| 2 · Foodie weekend | **S2** Tatami room by the Kamo River · $312 | **E2** Nishiki Market tasting walk · $170 | **F2** Sagano Yudofu-tei · $64 | $546 / $600 |
| 3 · Budget + nature | **S3** Flat off Sanjo Street · $249 | **E3** Dawn Fushimi Inari walk · $76, *sold out* | **F3** Nishiki tamago & skewer stall · $30 | $279 / $400 |

Row 4 of each sheet (S4 $612 ryokan, E4 pottery with no host, F4 $180 kaiseki) is the over-budget or incomplete set and isn't used for a scenario.

The workbook has no photos (image rights aren't cleared), no popularity label, no walking distance for the experience, no menu and no restaurant rating. Those spots use illustrated placeholders and filler values, each marked with a `// filler` comment in `mockReply.ts`. The reply keeps the spec's shape: an ordered list of `{ cardType, details }`.

## Error states

The thread never ends on a blank screen. Every error comes with a button that brings the three cards back.

| State | How to trigger it | What you see |
|---|---|---|
| **A: request failed** | Open the page with **`?fail=once`** (e.g. `http://localhost:3000/?fail=once`) and send any trip request | After the thinking animation, an error bubble appears: *"Sorry, I couldn't put your Kyoto weekend together just now…"* with **Try again**. Tapping it reruns the request, and the cards appear. Only the first request fails. |
| **B: can't be planned** | Ask for two places at once, e.g. `plan japan and korea in 2 days` | A suggestion bubble: *"I can only plan one place at a time. Want me to build a weekend in Kyoto?"* with **Go with Kyoto**, which sends the Kyoto request. |

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4**, with Airbnb tokens in `src/app/globals.css` (`rausch`, `rausch-tint`, `ink`, `muted`, `hairline`)
- **Nunito Sans** (`next/font`) as a stand-in for Airbnb Cereal
- No backend: the reply is a typed mock with simulated delays (`THINKING_MS`, `LOADING_MS` in `TripPlannerChat.tsx`)
- Built to deploy on **Vercel**

```
src/
  app/            layout, page, global tokens
  components/
    PhoneApp.tsx          phone frame (full screen on mobile)
    HomeMock.tsx          static Airbnb home under the chat
    TripPlannerChat.tsx   sheet, thread, composer, flow + error states
    ThinkingDots.tsx      dots → Bélo animation
    CardSkeletons.tsx     card-shaped loading placeholders
    TripSummary.tsx       dates, guests, cost vs budget
    cards/                StayCard, ExperienceCard, FoodCard
  lib/mockReply.ts        typed mock reply from the content pack
```

## Run it locally

Requires Node 20+. The app lives in `Part 2 - Prototype - All ideal Flow/trip-planner-chat/`, and code paths in this README are relative to that folder.

```bash
cd "Part 2 - Prototype - All ideal Flow/trip-planner-chat"
npm install
npm run dev
```

Open <http://localhost:3000>. On a desktop browser the app shows inside a phone frame. On a phone, or below 640px, it fills the screen.

```bash
npm run build && npm start   # production build
```

## Deploy

The app is deployed as the Vercel project **airbnb-trip-planner** at https://airbnb-trip-planner-dusky.vercel.app, from the `trip-planner-chat/` folder with the CLI (`vercel deploy --prod`). `vercel.json` pins the framework to Next.js. No environment variables are needed. To deploy from Git instead, import the repo and set **Root Directory** to `Part 2 - Prototype - All ideal Flow/trip-planner-chat`.

## Process

### Part 1: Sketching, problem statement and solution

1. **Problem:** [Meeting-Notes.md](Meeting-Notes.md) sets out why guests drop off and what leaders want to see.
2. **Hand sketches:** one per card plus the error flow, in [`sKETCHES/`](<Part 1 - Sketching, Problem statement and solution/sKETCHES>):

   | Stay | Experience | Food | Error states |
   |---|---|---|---|
   | [sketch-stay.jpeg](<Part 1 - Sketching, Problem statement and solution/sKETCHES/sketch-stay.jpeg>) | [sketch-experience.jpeg](<Part 1 - Sketching, Problem statement and solution/sKETCHES/sketch-experience.jpeg>) | [sketch-food.jpeg](<Part 1 - Sketching, Problem statement and solution/sKETCHES/sketch-food.jpeg>) | [sketch-error.jpeg](<Part 1 - Sketching, Problem statement and solution/sKETCHES/sketch-error.jpeg>) |

   The originals are phone photos taken sideways. Upright copies used in the PDF are in [`pdf-build/`](<Part 1 - Sketching, Problem statement and solution/pdf-build>).
3. **Spec:** [Trip-Planner-Card-Spec.md](<Part 1 - Sketching, Problem statement and solution/Trip-Planner-Card-Spec.md>) holds a text-box sketch and field table for each card, the mock-response shape and the error states. It is also an illustrated [PDF](Trip-Planner-Card-Spec.pdf), built from [`pdf-build/spec.html`](<Part 1 - Sketching, Problem statement and solution/pdf-build/spec.html>). The team's starting brief is [Kyoto Weekend Card Spec](<Part 1 - Sketching, Problem statement and solution/Trip-Planner Chat – Kyoto Weekend Card Spec (Stay, Experience, Food).md>).

### Part 2: Prototype, ideal flow

- **Content:** [Kyoto Weekend Prototype Content Pack.xlsx](<Part 2 - Prototype - All ideal Flow/Kyoto Weekend Prototype Content Pack.xlsx>), rows 1–3 of each sheet as three scenarios (see [Where the content comes from](#where-the-content-comes-from)).
- **App:** [`trip-planner-chat/`](<Part 2 - Prototype - All ideal Flow/trip-planner-chat>).

### Decision log

Every decision is recorded with its alternatives and the reasoning, one file per task, in [`Decisions/`](Decisions/README.md):
- [Task 01: Card and error-state spec](Decisions/Task-01-Card-and-Error-Spec.md)
- [Task 02: Prototype, ideal flow](Decisions/Task-02-Prototype-Ideal-Flow.md)
