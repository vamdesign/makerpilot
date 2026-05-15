Here's a comprehensive Figma/design tool prompt you can use to build out the complete MakerPilot prototype:

---

## MakerPilot — Full App Prototype Prompt

**Project Overview**
MakerPilot is a mobile-first inventory management PWA (Progressive Web App) for Etsy sellers and craft show makers. It bridges the gap between mobile-native usability and maker-specific workflows (production lead times, show sale capture, low stock alerts). The target user is "Tory Chen" — a 34-year-old project manager with a side ceramics business selling on Etsy and at craft fairs.

---

**Design System**
- Primary teal: `#1A9E8F`
- Dark teal: `#0F6E56`
- Accent orange: `#C2590A`
- Alert red: use standard red for critical states
- Background: white / very light gray for cards
- Fonts: DM Sans (body, UI) + DM Serif Display (headlines)
- Mobile-first: 390px wide (iPhone 14 viewport)
- Bottom navigation bar (5 tabs), hidden on onboarding screens

---

**Screens to Build (in order)**

**1. Welcome / Splash**
Minimal. Logo (cloud + paper plane motif), tagline, two CTAs: "Sign In" and "Get Started." No heavy value prop copy.

**2. Sign In**
Email + password fields, show/hide password toggle, "Forgot password?" link, Google sign-in button, link to Sign Up.

**3. Sign Up**
Email, password, confirm password with validation, Google sign-in option, terms of service link.

**4. Business Type** *(onboarding fork)*
Three large tappable cards: "Etsy Only," "Etsy + Personal Site," "In-Person Only." Selection routes to the onboarding quiz.

**5. Onboarding Quiz**
Multi-step questionnaire. Questions include: product type (ceramics / jewelry / textile / other), typical production lead time (1 week / 2–3 weeks / 4+ weeks), sales channels, typical batch size. Progress bar at top. "Back" and "Next" buttons.

**6. Add Item (v2)**
Compact form: item thumbnail photo upload (tap to add), item name, inventory count (large tap targets: − and + buttons), lead time (pre-filled from global default, editable), optional fields: price, sales channels (Etsy / Shows / Both), show-only toggle. Save button at bottom.

**7. Home Dashboard** *(core screen)*
Top: greeting + notification bell. Alert card(s): teal/orange pill badge "LOW" or red "CRITICAL," item name, stock count, days of cover at current sales rate (e.g., "6 days of cover"), and a "View Make-List" CTA. Below alerts: "Make Next" suggestion card — teal background, item name, suggested batch quantity, lead time countdown. Recent activity row. Bottom nav active on Home.

**8. Inventory List**
Searchable, scrollable list. Each row: item thumbnail, name, stock count, alert threshold, colored status dot (green/yellow/red). Filter chips at top: All / Low Stock / Shows. Tapping a row goes to Inventory Detail. FAB (+) to add item.

**9. Inventory Detail**
Item name + photo at top. Stock count (large), alert threshold. Lead time badge. Sales velocity: "avg. X sold/week." Days of cover metric. Buttons: "Record Sale," "Restock," "Edit." Activity log at bottom (last 5 transactions). No variants in MVP.

**10. Record Sale** *(craft show screen)*
Designed for one-handed use at a busy table. Step 1: Item picker — large grid of item thumbnails with names, search bar. Step 2: Quantity — big − and + buttons, current stock shown below. Step 3: Confirm — item name, qty sold, new stock total, "Save" (prominent teal button). Optional: "Add another item" link. Toast confirmation on save. Entire flow 3 taps max.

**11. Plan / Make-List**
Prioritized list of items to produce. Each card: item name, current stock, alert threshold, suggested batch quantity, lead time, urgency label (Critical / Soon / Healthy). "Start Batch" button per card. At bottom: completed batches section (collapsed accordion).

**12. Settings**
Global lead time default (stepper). Alert threshold defaults. Notification preferences (push on/off). Account info. Log out. Pricing/upgrade prompt (free vs $7/mo paid tier callout).

---

**Navigation Structure**
Bottom nav: Home | Inventory | ＋ (center FAB, elevated) | Plan | Settings
The center FAB opens Record Sale or Add Item (context-dependent, or a choice sheet).

---

**Key UX Behaviors to Prototype**
- Alert cards on Home are the entry point to Make-List (tap flows through)
- Record Sale is a 3-step wizard, not a long form
- Inventory list uses status color dots (green/yellow/red) for instant scanning
- Days of cover metric appears on both Home alerts and Inventory Detail
- Lead time is shown everywhere an item appears, as a pill/badge
- "Shows only" items get a special teal badge (bullseye icon)

---

**Mock Data — Tory's Inventory**
| Item | Stock | Alert At | Lead Time | Status |
|---|---|---|---|---|
| Spaniel Bowl | 5 | 2 | 3 weeks | Healthy |
| Tumbler - Sage | 3 | 3 | 3 weeks | LOW |
| Matcha Bowl | 8 | 3 | 3 weeks | Healthy |
| Mushroom Dish | 4 | 2 | 3 weeks | Shows Only |
| Ring Dish - Blush | 1 | 3 | 3 weeks | CRITICAL |

---

**Tone & Style**
Warm, crafty-professional. Not corporate. Teal + white dominant, orange used sparingly for urgency only. Card-based UI. Large tap targets throughout. Generous whitespace. Feels like a tool made *by* a maker, *for* makers.

---

That should give Figma Make (or MagicPatterns, or any AI design tool) everything it needs to generate all 12 screens with consistent styling, real mock data, and proper interaction flows. If you want, I can also generate a condensed version just for one specific screen, or add user flow annotations.