# MakerPilot

Mobile-first inventory prototype for independent makers — track stock across Etsy, online stores (Shopify / Wix / Square), and in-person sales.

**Active project folder:** `/Users/VAMbot/Documents/makerpilot_current`

---

## Quick start

```bash
cd /Users/VAMbot/Documents/makerpilot_current
npm install
npm run dev -- --port 5175
```

Open: **http://localhost:5175/makerpilot/**

Build for production:

```bash
npm run build
npm run preview
```

The app uses Vite `base: '/makerpilot/'` — always include `/makerpilot/` in the URL.

---

## Tech stack

- **Vite 6** + **React** + **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **React Router** (`BrowserRouter` basename `/makerpilot`)
- **lucide-react** icons, **sonner** toasts
- Demo data in **localStorage** (no backend)

---

## Routes & screens

Defined in `src/app/App.tsx`.

| Route | Component | Bottom nav | Purpose |
|-------|-----------|------------|---------|
| `/` | Welcome | — | Landing, Get Started / Sign In |
| `/signin` | SignIn | — | Sign in |
| `/signup` | SignUp | — | Sign up |
| `/business-type` | BusinessType | — | “Where do you sell?” channel picker |
| `/sync-etsy` | EtsySync | — | Connect Etsy |
| `/sync-online-shop` | OnlineShopSync | — | Connect Shopify / Wix / Square |
| `/sync-manual` | ManualSync | — | Craft shows & markets setup |
| `/choose-listings` | ChooseListings | — | Pick listings to track |
| `/set-limits` | SetLimits | — | Stock alerts & lead times |
| `/pricing` | Pricing | — | Plans & upgrade |
| `/home` | Home | ✓ | Dashboard — needs making, activity, top sellers |
| `/inventory` | Inventory | ✓ | Full inventory list, swipe actions |
| `/add-item` | AddItemsHub | ✓ | Add item entry point |
| `/add-item/manual` | AddItem | ✓ | Manual item form |
| `/duplicate-item` | DuplicateItem | ✓ | Copy existing item |
| `/record-sale` | RecordSale | — | Record a sale |
| `/account` | Settings | ✓ | Account settings |
| `/settings` | → `/account` | — | Redirect |

**Main app tabs:** Home · Inventory · Account (`src/app/components/BottomNav.tsx`)

---

## User flows

### Onboarding
Welcome → Sign up → Business type → Sync channel(s) → Choose listings → Set limits → Home

### Day-to-day
Home (what to make) · Inventory (manage stock) · Record sale · Account

---

## Project structure

```
makerpilot_current/
├── src/
│   ├── app/
│   │   ├── App.tsx              # Routes, demo seed, phone-frame cursor
│   │   ├── components/          # Screens & shared UI
│   │   │   ├── Home.tsx
│   │   │   ├── Settings.tsx     # Account screen
│   │   │   ├── Inventory.tsx
│   │   │   ├── PageTitle.tsx    # Shared header + cloud band
│   │   │   ├── CloudSkyHeaderBand.tsx
│   │   │   ├── BottomNav.tsx
│   │   │   ├── inventory/       # CardItem, EditItemModal, etc.
│   │   │   └── icons/
│   │   ├── data/                # Demo seed, thumbnails, activity log
│   │   └── inventory/           # trackedInventory, inventoryUtils
│   ├── assets/                  # PNGs, SVGs, product photos, logos
│   ├── imports/                 # Figma-derived components (Base, logos)
│   └── styles/                  # theme.css, index.css (phone frame)
├── vite.config.ts               # base: '/makerpilot/'
└── package.json
```

---

## Design system

| Token | Value | Use |
|-------|-------|-----|
| Teal | `#1A9E8F` | Primary actions, active nav |
| Orange | `#FF6600` | Swipe copy, accents, upsell |
| Body text | `#373737` | Headlines & body |
| Destructive | `#B91C1C` | Delete, log out |
| Title font | DM Serif Display | Screen titles |
| Body font | DM Sans | UI copy |

**Layout:** 393×852 phone frame (`#root` in `src/styles/index.css`), cloud header with bottom white gradient fade, corner paper-plane mark.

**UX rules:** Mobile-native — no hover states, no browser `alert()` for in-app actions. Use toasts (`sonner`) for feedback.

---

## Data & localStorage

| Key | Written by | Contents |
|-----|------------|----------|
| `salesChannels` | BusinessType | `["etsy","own-shop","craft-shows"]` (onboarding picks) |
| `makerpilotPrimaryChannel` | Sync screens | `etsy` \| `shopify` \| `wix` \| `square` \| `manual` |
| `makerpilotTrackedInventory` | Inventory flows | Tracked items (no React components) |
| `inventoryData` | ChooseListings | Listing catalog for onboarding |
| `makerpilotActivityLog` | Record sale, demo seed | Recent activity on Home |

**Item model** (`src/app/data/inventoryDemo.ts`): each row has `stock`, `alertThreshold`, `leadTime`, optional `channel` (`etsy` \| `shopify` \| `wix` \| `square` \| `manual`).

**Helpers:** `readTrackedFromStorage()`, `readPrimaryChannel()` in `src/app/inventory/trackedInventory.ts`.

Demo seed loads automatically on first visit (`App.tsx` → `INVENTORY_DEMO_SEED`).

---

## Assets

Raster and SVG files live in `src/assets/`. See `src/assets/README.md` for the file map.

Product thumbnails: `src/app/data/productThumbnailMap.tsx`  
Backgrounds: `clouds-bkg.png`, `base-gradient.png`, `welcome-bkg.svg`

---

## Sharing with Claude / other AI

1. Open this folder in Cursor: **File → Open Folder → `makerpilot_current`**
2. Point at key files: `@App.tsx`, `@Settings.tsx`, `@Home.tsx`
3. Or paste this README + the route table above
4. Attach screenshots of Home, Inventory, Account for UI work
5. Optional: push to GitHub (`vamdesign/makerpilot`) and share the repo URL

**Do not confuse with other folders on your Mac:**

| Folder | Notes |
|--------|-------|
| `makerpilot_current/` | **Use this** — active app |
| `makerpilot/`, `makerpilot_SESSION7_BACKUP/` | Older copies |
| `GitHub/vamdesign-deploy/` | Portfolio site (separate project) |
| `MakerPilot_use_case/` | SSOT / case-study HTML docs |

---

## Git

```bash
git remote -v   # typically github.com/vamdesign/makerpilot
```

Commit from this directory when ready. Push requires GitHub auth (PAT or SSH).
