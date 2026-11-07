# Task 02: Working prototype, ideal chat flow

**Date:** 2026-11-06

**Inputs:**
- [Task 01 card spec](<../Part 1 - Sketching, Problem statement and solution/Trip-Planner-Card-Spec.md>)
- the sketches in `Part 1 - …/sKETCHES/`
- [Meeting-Notes.md](../Meeting-Notes.md)
- [Kyoto Weekend Prototype Content Pack.xlsx](<../Part 2 - Prototype - All ideal Flow/Kyoto Weekend Prototype Content Pack.xlsx>)
- the user's flow brief: home → chat pop-up, bubbles, thinking animation, skeletons, 3 cards and summary, Tokyo prompt

**Outputs:**
- the Next.js app in [`Part 2 - Prototype - All ideal Flow/trip-planner-chat/`](<../Part 2 - Prototype - All ideal Flow/trip-planner-chat>)
- the [root README](../README.md)
- the GitHub repo [noodiefroggo/Airbnb-Trip-planner-Chat](https://github.com/noodiefroggo/Airbnb-Trip-planner-Chat)

## Goal

Build a clickable prototype of the *ideal* chat flow that leaders and the 8 UX-research guests can use:
- ask for a weekend trip;
- watch the assistant think;
- get a stay, an experience and a meal as three clearly different cards;
- see a summary that checks the plan against the budget.

## Decisions

### D1. Stack: Next.js 16 + React 19 + TypeScript + Tailwind v4, no backend
- **Chose:**
  - `create-next-app` with the App Router, a `src/` dir and Tailwind v4.
  - The reply is a typed mock in `src/lib/mockReply.ts`, with simulated delays.
- **Alternatives:**
  - plain HTML/JS;
  - Vite + React;
  - a real LLM or API call behind a route handler.
- **Why:** the meeting notes fixed TypeScript, Next.js, React, Tailwind, GitHub and Vercel. A mock keeps the demo deterministic for research sessions, with no API keys, costs or flaky answers.
- **Impact / trade-off:** the chat always answers with the same Kyoto plan whatever you type, and only two error paths react to the input. That's fine for an "ideal flow" demo but not for open-ended testing.

### D2. Repo layout: the whole project folder is the repo, the app lives in Part 2
- **Chose:** the repo root is `Air BNB trip planner/`.
  - Part 1 (spec, PDF, sketches), the content pack, `Decisions/` and the meeting notes stay where the user keeps them.
  - The app sits in `Part 2 - Prototype - All ideal Flow/trip-planner-chat/`.
  - Vercel must set **Root Directory** to that folder.
- **Alternatives:** keep the app at the repo root and copy earlier work into `docs/`.
- **Why:** copying would make two copies of every spec and decision file, and they would drift. The decision log is meant to be the single source of truth. With this layout the folder on disk *is* the repo.
- **Impact / trade-off:**
  - Vercel needs one extra setting.
  - The folder names have spaces, which look a little clunky in URLs.
  - The duplicate root `Trip-Planner-Card-Spec.md` was removed. It was byte-identical to the Part 1 copy with the same timestamp, so the Part 1 copy was kept.
  - The WhatsApp sketch files were renamed `sketch-stay/experience/food/error.jpeg`.

### D3. Content pack: one row per sheet, S1 + E1 + F1
- **Chose:**
  - **Stays S1:** restored machiya near Gion, $366 for 2 nights.
  - **Experiences E1:** tea ceremony in a 100-year-old machiya, $116 for 2.
  - **Food F1:** Menya Inoichi ramen in Gion, about $34 for 2.
  - Total **$516** against the $600 budget, so **$84** is left.
- **Alternatives:**
  - **S4 ryokan** ($612): over budget on its own.
  - **E2 market walk** ($170): it overlaps with food.
  - **E3 Fushimi Inari** at dawn: sold out.
  - **E4 pottery:** no host name, which is an empty field.
  - **F4 kaiseki** ($180): it would push the total to $662.
- **Why:**
  - S1 has the strongest trust signal (4.92 ★ across 214 reviews).
  - All three picks sit in or near Gion, so the walks are short and the trip story hangs together.
  - E1 has spots open.
  - The total leaves room under budget, which demos the budget meter well.
- **Impact:** the card copy and the summary maths all come from real workbook values.

### D4. Filler for fields the workbook doesn't have
- **Chose:**
  - illustrated SVG placeholders instead of photos, because the workbook says image rights aren't cleared;
  - filler values for the popularity label, experience distance, food rating and reviews, and the menu items;
  - every filler value carries a `// filler` comment.
- **Alternatives:**
  - stock photos;
  - leave the fields empty;
  - drop those UI elements.
- **Why:** the brief said "filler text for empty fields". The spec's layouts depend on those elements (emblem, distance chip, dish row), so dropping them would erase what makes the cards different.
- **Impact:** a researcher can't mistake the filler for real data, because the code marks it. The stay total uses the workbook's $366, which is not 2 × $168 = $336, presumably because it includes fees.

### D5. Tokyo prompt vs Kyoto content: say so and redirect
- **Chose:** the reply's first line says Tokyo is over $600 for 2 that weekend and offers Kyoto instead, about 2h15 by bullet train. The summary notes that travel to Kyoto isn't included. A Kyoto prompt gets a plain answer.
- **Alternatives:**
  - change the sample prompt to Kyoto;
  - silently answer with Kyoto;
  - fake Tokyo content.
- **Why:**
  - The user fixed the prompt as Tokyo, and the content pack is Kyoto.
  - Silently swapping cities would read as a bug in research.
  - Faking Tokyo would mean inventing data.
  - Naming the swap looks like a helpful planner.
- **Impact:** this models the error-B behaviour (suggest an alternative) inside the happy path.

### D6. Branding and type
- **Chose:**
  - Rausch `#FF385C` for the brand.
  - `#E00B41` behind any white button text, for AA contrast.
  - ink `#222` and muted `#6A6A6A`.
  - The Bélo is drawn as one inline SVG stroke path.
  - Font: **Nunito Sans** via `next/font`, standing in for Airbnb Cereal.
- **Alternatives:**
  - the real Cereal font, which can't be licensed;
  - Inter.
- **Why:** the user confirmed Airbnb branding is fine for a non-commercial portfolio piece. Nunito Sans has a similar rounded geometric warmth.
- **Impact:** it reads as Airbnb at a glance, and no brand asset files are shipped.

### D7. App frame: Airbnb home mock with the chat as a bottom sheet
- **Chose:**
  - The page is a static mock of the Airbnb mobile home: search pill, tabs, listing rows and tab bar.
  - The chat opens as a sheet over it, with a dimmed backdrop.
  - Navbar: the Bélo on the left, and **Trip-planner** with a close ✕ on the right.
  - Closing it shows a floating **Plan a trip** button that reopens it. The thread is kept.
  - The app is full-screen on phones and sits in a 390×844 phone frame on desktop.
- **Alternatives:**
  - a full-page chat;
  - a modal dialog.
- **Why:** the brief asked for a pop-up "on top of the Airbnb home page". The sheet keeps the guest anchored in the app, and the reopen button proves close isn't a dead end.
- **Impact:** the composer is a full-width pill with a round send button. The input is pre-filled with the sample prompt, so testers can just hit send.

### D8. Thinking animation: the Web Animations API, one 3.2s loop
- **Chose:**
  - Four Rausch dots **stretch → squash → wave → gather to the centre**, while the Bélo scales in, then the loop repeats.
  - Each dot gets its own keyframes and stagger through `element.animate()`.
  - Under `prefers-reduced-motion` it becomes a simple opacity pulse.
- **Alternatives:**
  - CSS keyframes, which can't easily give per-dot offsets;
  - GSAP or Lottie, which would add dependencies;
  - a true path morph from dots to logo.
- **Why:**
  - WAAPI gives per-element timing with no library.
  - It can be paused and seeked from tests. That matters because `requestAnimationFrame` freezes in a background browser pane.
  - A cross-fade and scale reads as a "morph" at this size for a fraction of the effort.
- **Impact:** the thinking time was set to **3.3s**, so one full loop, including the logo reveal, plays before the skeletons. It was 2.6s at first, which cut the logo off.

### D9. Loading sequence: thinking for 3.3s, then card-shaped skeletons for 1.8s
- **Chose:**
  - First, the thinking bubble.
  - Then the bubble is replaced by a skeleton intro line and three skeletons, each shaped like its card: banner and price box, inset image and location row, square thumbnail and dish row.
  - Then the reply.
  - The input and send button stay locked from send until the reply lands.
- **Alternatives:**
  - one generic skeleton;
  - a spinner;
  - streaming cards one by one.
- **Why:** the skeletons preview the three distinct layouts, which is the point of the product. Locking the input stops double-sends during research.
- **Impact:** the whole wait is about 5 seconds. That's long enough to feel the animation and short enough not to frustrate.

### D10. Reply structure: intro line → 3 cards → trip summary
- **Chose:**
  - a one-line intro bubble;
  - the Stay, Experience and Food cards stacked vertically;
  - a summary bubble with dates (Fri 11 – Sun 13 Apr 2025), 2 adults, a mini plan, a cost breakdown, the total against $600 and a budget meter, with **$84 left** in bold.
  - When the reply lands, the thread scrolls to the *top* of the reply, not the bottom.
- **Alternatives:**
  - put the summary first;
  - auto-scroll to the bottom.
- **Why:** this order was the user's brief. Scrolling to the bottom would skip past the cards, which are the main event.
- **Impact:** the budget question ("under $600?") gets a direct, visual answer.

### D11. Card layouts follow the Task 01 spec, three separate components
- **Chose:**
  - **StayCard:** a 16:9 banner with a *Guest favourite* emblem, the name as the biggest text, a bordered price box with nights and dates, and a full-width **Add to trip · $366** toggle.
  - **ExperienceCard:** an off-white card with an inset image, a category tag and a duration chip; an italic one-liner; a nested location card with a "10 min away" pill; and a split **Know more** / **Pick time** footer. Know more opens details, and Pick time shows the 10:30 slot.
  - **FoodCard:** an orange left accent, a 76px square photo beside the name, meal chips with Dinner active, a sideways dish row with veg/non-veg dots, and the booking note.
- **Alternatives:** one card with variants.
- **Why:** this is Task 01 D2, and the meeting notes say "build each card as its own component".
- **Impact:** the three cards differ in structure, image treatment, accent and buttons, not just in colour.

### D12. Error states kept from the spec
- **Chose:**
  - **A:** `?fail=once` makes the first request fail. An error bubble appears with **Try again**, and retrying brings back the skeletons, then the cards.
  - **B:** naming two cities or two countries (e.g. "japan and korea") brings up "I can only plan one place at a time. Want me to build a weekend in Kyoto?" with a **Go with Kyoto** button.
- **Alternatives:** skip the error states, since the task was the ideal flow.
- **Why:** they were cheap to add, and they meet the "zero blank chat moments" rule.
- **Impact:** in error B the suggestion is Kyoto instead of the spec's Tokyo, because the content pack only covers Kyoto.

### D13. Design-check findings: what was applied and what was skipped
- **Applied (must-fix):**
  - Removed the em dashes from the UI copy. The booking note now reads "No reservations: arrive before 18:00".
  - White-on-Rausch buttons now use `#E00B41`, about 4.9:1. Plain `#FF385C` was about 3.6:1, which fails AA.
  - Raised the 11px card text to a 12px minimum.
- **Applied (suggest):**
  - fixed the stray separator when the Stay rating row wraps;
  - made "$84 left" bold in the summary.
- **Skipped (suggest):**
  - **44px chip tap targets:** a prototype, viewed mostly on desktop.
  - **Neutral price-box border:** the red box is the spec's signature element (Task 01).
  - **Narrower `aria-live` region and a composer fade:** deferred.
- **Why:** low-risk, in-scope fixes were made now. Anything that would change a spec decision was left.

### D14. Hand-off: chat-stage link, thread screenshot, and its own Vercel project
- **Chose:**
  - The PM asked for the trip-planner chat at the Kyoto three-card stage, not the whole project repo. The hand-off link points straight at the `trip-planner-chat/` folder, pinned to the commit.
  - That folder's README now stands on its own: the live link, the thread screenshot, the flow, the three card layouts, the content source and the error states.
  - The screenshot is committed at `docs/thread-kyoto-three-cards.png`. It shows the full reply at 390px mobile width, captured with headless Chrome after a real send.
  - The app is deployed as a new Vercel project, `airbnb-trip-planner`, under the Arpan Debnath team. The public URL is https://airbnb-trip-planner-dusky.vercel.app.
- **Alternatives:**
  - a separate repo holding only the chat;
  - a Vercel project created by connecting the Git repo.
- **Why:** a folder link keeps one repo as the single source of truth while still landing the reviewer on the chat. CLI deploy was quickest. `vercel.json` pins `framework: nextjs` because the project was first created with no framework preset, and that first build failed with "Output Directory public is empty".
- **Impact:** the reviewer gets a live link plus a static screenshot of the exact stage. The project isn't Git-connected yet, so pushes don't auto-deploy.

## Feedback received and how it changed things
- **Review:** "Ship after must-fixes" → the three must-fixes in D13 were applied.
- **User:** add all earlier work to the same repo → D2 (whole folder as the repo, duplicate removed, sketches renamed).
- **User:** log every decision → this file.
- **PM, via the user:** "Send me the link to the trip-planner chat in the Kyoto three-card stage, with the README and the thread screenshot committed" → D14.
- **User:** publish as a new Vercel project → D14.

## Open questions / follow-ups
- ~~Deploy to Vercel~~ Done (D14). Connecting the Vercel project to the GitHub repo would turn on auto-deploy, which isn't set up yet.
- Should the sample prompt become Kyoto, or Tokyo content be added? (D5)
- The Stay detail screen (spec §1) and a full Experience page aren't built. Know more and Pick time open inline instead.
- The dates are April 2025, which is in the past (Task 01 D5).

## Portfolio notes
- **The Tokyo/Kyoto mismatch was turned into a feature.** The assistant names the swap and gives a reason (budget, a 2h15 train). That shows how an AI planner should handle a request it can't meet exactly.
- **Cards that differ in structure, not skin.** Each card's signature element (price box, location sub-card, dish row) comes straight from a hand sketch, through the spec, into its own component.
- **The waiting moment is designed:** the dots turn into the logo, then skeletons shaped like the real cards appear. Because everything is mocked, every research session sees the same flow.
