# Task 01: Card and error-state spec

**Date:** 2026-11-06
**Inputs:**
- [Meeting-Notes.md](../Meeting-Notes.md)
- [Kyoto Weekend Card Spec](<../Part 1 - Sketching, Problem statement and solution/Trip-Planner Chat – Kyoto Weekend Card Spec (Stay, Experience, Food).md>)
- 4 hand sketches in `Part 1 - Sketching, Problem statement and solution/sKETCHES/` (renamed `sketch-stay/experience/food/error.jpeg` in Task 2)

**Outputs:**
- [Trip-Planner-Card-Spec.md](<../Part 1 - Sketching, Problem statement and solution/Trip-Planner-Card-Spec.md>)
- [Trip-Planner-Card-Spec.pdf](../Trip-Planner-Card-Spec.pdf), a 6-page PDF built from `pdf-build/spec.html`

## Goal

Turn the rough sketches into a one-page card and error-state spec that a build can follow. It covers three things:
- what each card (Stay, Experience, Food) shows;
- the shape of the mock response;
- what the chat does when a request fails.

## Decisions

### D1. Spec as Markdown with text-box (ASCII) sketches per card
- **Chose:** one Markdown file. Each card gets a text-box sketch, a field table (field → where it shows) and a short "what makes it different" note.
- **Alternatives:** a design-tool file only, or prose descriptions.
- **Why:** the brief asked for a text-box sketch and a field list per card. Markdown lives next to the code, diffs cleanly in git, and Claude Code can read it directly when building.
- **Impact:** the spec doubles as the build checklist for Task 2.

### D2. Three cards must look structurally different, not just recoloured
- **Chose:** a distinct layout for each card, taken from the sketches:
  - **Stay:** popularity emblem, boxed price, Add button. Tapping opens a detail screen with a sticky bar.
  - **Experience:** duration chip, a location sub-card ("10 min away"), and Know more / Pick time buttons.
  - **Food:** a square kitchen photo, Breakfast/Lunch/Dinner chips, and a sideways menu row with veg/non-veg dots.
- **Alternatives:** one generic card with a type badge.
- **Why:** the meeting notes say "build each card as its own component so layouts stay truly different". Guests should tell stay, do and eat apart at a glance.
- **Impact:** three components (`StayCard`, `ExperienceCard`, `FoodCard`) instead of one card with variants.

### D3. Mock response shape: ordered list of `{ cardType, details }` with blank values
- **Chose:** 3 items, always in the order stay → experience → food. Each has `cardType` plus a `details` object. Every value is blank (`""`, `null`, `[]`), except the stay dates and nights (see D5). Food carries a `menuItems` array with one blank object.
- **Alternatives:** filled sample data, or separate arrays per type.
- **Why:** the brief asked for field names with blank values, so the spec defines the contract and not the content. Real content comes from the content pack in Task 2. A fixed order keeps the reply predictable.
- **Impact:** the prototype can swap in any one row per sheet without changing the shape.

### D4. Two error states driven by `?fail=once`
- **Chose:**
  - **Error A:** a red error bubble with **Try again**. Retrying brings the three cards back.
  - **Error B:** a suggestion bubble ("do you want me to build a trip in Tokyo?") with **Go suggested**.
  - Both are forced in testing with the `?fail=once` URL flag.
- **Alternatives:** a generic toast, or a blank retry screen.
- **Why:** the meeting notes require a visible error that prompts a retry, that Try again always restores the cards, and that there are zero blank chat moments. A URL flag lets testers and leaders trigger the error on demand without breaking the normal flow.
- **Impact:** the error states are demoable in a live session.

### D5. Real Kyoto weekend dates on the Stay card: Fri 11 – Sun 13 Apr 2025
- **Chose:** check-in Fri 11 Apr 2025, check-out Sun 13 Apr 2025, 2 nights.
  - The dates show under the boxed price on the main card, like the "2 nights" line.
  - They are repeated in the detail screen's sticky bar.
  - The stay JSON carries `nights: 2`, `checkIn: "2025-04-11"` and `checkOut: "2025-04-13"`.
- **Alternatives:**
  - leave a "dates" placeholder;
  - move the dates to a future 2026/27 weekend, since April 2025 is in the past relative to the build date.
- **Why:** the Kyoto spec already set this weekend, and the reviewer's feedback asked for one concrete Friday–Sunday on the card. The user chose to keep April 2025 even though it's past, to stay consistent with the source spec.
- **Impact:** the card, the stay table, the sticky bar and the JSON all agree.

### D6. PDF built from HTML/CSS with headless Chrome
- **Chose:** a hand-built `spec.html` with 6 A4 `.page` sections, printed with headless Chrome `--print-to-pdf`. The pages are:
  1. overview and flow diagram;
  2. Stay mockup, field table and sketch;
  3. Experience mockup, field table and sketch;
  4. Food mockup, field table and sketch;
  5. chat and error mockups;
  6. mock JSON and checklist.
- **Alternatives:** converting the Markdown straight to PDF, or a design tool.
- **Why:** the user asked for diagrams and images. HTML gives exact control over card mockups, callouts and layout, and it's still plain text in git, so it's easy to regenerate after edits.
- **Impact:** a date change was a few HTML edits and a re-print, not a redesign.

### D7. Sketch photos rotated and copied, originals untouched
- **Chose:** upright copies in `pdf-build/` (`sketch-stay.jpg` and so on). The WhatsApp originals stay as they are.
- **Why:** the phone photos were sideways. Keeping the originals preserves the raw process artefacts for the portfolio.

## Feedback received and how it changed things
- "Stay card says 2 nights, but check-in/check-out only show as a 'dates' placeholder… put it under the boxed price… check the stay table and the sticky bar still match." → This led to D5. It updated the MD, the PDF and the JSON.
- "Keep April 2025" → kept the past date on purpose (D5).

## Open questions / follow-ups
- The Task 2 prompt asks for a **Tokyo** weekend, but the content pack is **Kyoto**. How to handle this is decided and logged in Task 2.

## Portfolio notes
- Sketch → spec → build: the spec is the contract between rough ideas and a working prototype.
- The three cards are deliberately different layouts, each designed around what the guest needs to decide: where to sleep, what to do, what to eat.
- The error design rule is "zero blank chat moments". There's always a next action (Try again, or Go suggested).
