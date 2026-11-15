# Kyoto trip planner: three-card stage

**Live:** https://airbnb-trip-planner-dusky.vercel.app

A chat prototype inside the Airbnb mobile app. You ask for a weekend trip, and the chat replies with **three cards**: a stay, an experience and a meal. A trip summary under the cards checks the total against your budget.

<img src="docs/three-cards.png" alt="The full chat thread. A request for a Tokyo weekend for 2 under $600 is answered with a Kyoto plan: a machiya townhouse stay, a tea ceremony, a ramen dinner, and a trip summary totalling $516 of $600." width="320">

This is a portfolio prototype. It uses Airbnb's name, logo and colours for demonstration only and isn't affiliated with Airbnb.

## Run it locally

Requires Node 20+. Run `npm install && npm run dev`, then open http://localhost:3000.

**Broken state:** add `?fail=once` to the URL (e.g. https://airbnb-trip-planner-dusky.vercel.app/?fail=once) and send any trip request. The first reply is a broken mock response the app can't turn into cards, so you get an error bubble with **Try again**.

<img src="docs/error-flow.png" alt="The ?fail=once flow in three steps. 1: the reply fails and an error bubble, Hmm, that one slipped past me, shows with a Try again button. 2: tapping Try again sends the request again and the thinking dots show. 3: the plan comes back, starting with the stay card." width="760">

<p>
<img src="docs/error-1-reply-fails.png" alt="Step 1. The reply fails: an error bubble, Hmm, that one slipped past me, with a Try again button." width="260">
<img src="docs/error-3-plan-is-back.png" alt="Step 3. The plan is back after Try again: the riverside tatami room stay card for the Foodie weekend." width="260">
</p>

## Card fields that use a filler line

The content comes from the *Kyoto Weekend Prototype Content Pack* workbook. Where the workbook has no value for a field, the card shows a filler line, marked `// filler` in `src/lib/mockReply.ts`.

| Card | Field with filler | What it shows |
|---|---|---|
| Stay | Popularity badge | "Guest favourite", "Rare find", "Great value" |
| Stay | Photo | A drawn illustration (the workbook has no cleared photos) |
| Experience | One-line description | e.g. "Whisk your own matcha with Mei, slowly, the old way." |
| Experience | **Know more** text | The longer description behind the button |
| Experience | Distance from the stay | e.g. "10 min away" |
| Experience | Photo | A drawn illustration |
| Food | Rating and review count | e.g. ★ 4.7 · 320 reviews |
| Food | Menu row (dishes, prices, portions, veg / non-veg) | e.g. Shio ramen $12 · 1 bowl |
| Food | Booking note (Sagano Yudofu-tei only) | "Walk-ins welcome at lunch" |
| Food | Photo | A drawn illustration |

Every other field (names, prices, dates, hosts, stay ratings, meeting points, walking times, availability) comes from the workbook.

## Three scenarios

The request decides which plan you get. The search is faked in `src/lib/planner.ts`: it reads the budget and theme words from your message. The chips above the message box send each sample request.

| Scenario | Try asking | Total for 2 |
|---|---|---|
| Classic Gion | "find me a weekend trip in tokyo for 2 people under 600 dollars" | $516 / $600 |
| Foodie weekend | "a foodie weekend in Kyoto for 2 people under $600" | $546 / $600 |
| Budget + nature | "Kyoto on a budget for 2, under $400, with some nature" | $279 / $400 (the sold-out walk is left out) |

Screenshots of each thread: [Classic Gion](docs/thread-1-classic-gion.png) · [Foodie weekend](docs/thread-2-foodie.png) · [Budget + nature](docs/thread-3-budget-nature.png).

## Stack

Next.js, React, TypeScript and Tailwind CSS, hosted on Vercel. There is no backend: the replies are typed mock data with simulated delays.
