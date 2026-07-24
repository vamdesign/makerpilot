/**
 * Portfolio demo vs free-form testing.
 *
 * DEMO (active): /demo seeds inventory and opens Welcome. Choose Listings
 * pre-selects 6 items. This is the portfolio / Lab embed path.
 *
 * FREE-FORM (PINNED — do not delete): set makerpilotDemoMode to '0' via
 * disableDemoMode(), then start from Welcome. Choose Listings starts empty
 * and Continue stays inactive until the user picks listings.
 * Re-wire Welcome/SignIn later when free-form testing resumes.
 */

export const DEMO_MODE_KEY = 'makerpilotDemoMode';

/**
 * Listing ids pre-checked on Choose Listings in demo mode.
 * Must match the Etsy rows in INVENTORY_DEMO_SEED (no extras — Citrus is not in the seed).
 * POS Spaniel (id 31) is seeded separately and is not an Etsy listing.
 */
export const DEMO_CHOOSE_LISTING_IDS: readonly number[] = [2, 4, 5, 10, 20];

/** Demo is the default so portfolio / onboarding walkthroughs stay polished. */
export function isDemoMode(): boolean {
  try {
    return localStorage.getItem(DEMO_MODE_KEY) !== '0';
  } catch {
    return true;
  }
}

export function enableDemoMode(): void {
  localStorage.setItem(DEMO_MODE_KEY, '1');
}

/** PINNED free-form entry — call when re-enabling free-form testing. */
export function disableDemoMode(): void {
  localStorage.setItem(DEMO_MODE_KEY, '0');
}
