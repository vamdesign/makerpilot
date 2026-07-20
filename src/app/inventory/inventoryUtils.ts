import type { InventoryRow, LeadTimeUnit } from '../data/inventoryDemo';

/** Active filter tab on the inventory screen — matches onboarding listing pills style. */
export type InventorySortTab = 'make_now' | 'az' | 'stock';

export interface InventorySortPrefs {
  tab: InventorySortTab;
  /** Alphabetical descending (Z→A). */
  azDesc: boolean;
  /** Stock high-to-low first (Qty ↓). */
  stockHighFirst: boolean;
  /**
   * For “Make now”: when false, needs-making rows first (↑ urgency at top of list).
   * When true, healthy rows first, then needs-making (↑ least urgent toward bottom within that group).
   */
  healthyFirst: boolean;
}

/** Single status: stock is at or below the notify threshold (including zero). */
export function needsMaking(item: InventoryRow): boolean {
  return item.stock <= item.alertThreshold;
}

export function urgencyRank(item: InventoryRow): number {
  if (needsMaking(item)) return 0;
  return 1;
}

/**
 * Normalizes user-entered price (with or without `$`) to a string like `$34.00`.
 * Empty or invalid input → `$0.00`.
 */
export function normalizeInventoryPrice(input: string): string {
  const raw = input.trim().replace(/^\$/, '').replace(/,/g, '');
  if (raw === '') return '$0.00';
  const n = Number.parseFloat(raw);
  if (!Number.isFinite(n)) return '$0.00';
  return `$${Math.max(0, n).toFixed(2)}`;
}

export function formatLeadLabel(leadTime: number, unit: LeadTimeUnit): string {
  const u =
    unit === 'days'
      ? leadTime === 1
        ? 'day'
        : 'days'
      : unit === 'weeks'
        ? leadTime === 1
          ? 'wk'
          : 'wks'
        : leadTime === 1
          ? 'mo'
          : 'mos';
  return `Lead: ${leadTime} ${u}`;
}

export function sortInventoryRows(items: InventoryRow[], prefs: InventorySortPrefs): InventoryRow[] {
  const copy = [...items];

  const { tab, azDesc, stockHighFirst, healthyFirst } = prefs;

  if (tab === 'az') {
    copy.sort((a, b) => {
      const c = a.title.localeCompare(b.title);
      return azDesc ? -c : c;
    });
    return copy;
  }

  if (tab === 'stock') {
    copy.sort((a, b) => {
      if (stockHighFirst) return b.stock - a.stock;
      return a.stock - b.stock;
    });
    return copy;
  }

  /* make_now tab */
  copy.sort((a, b) => {
    const ra = urgencyRank(a);
    const rb = urgencyRank(b);
    if (!healthyFirst) {
      if (ra !== rb) return ra - rb;
      if (ra === 0) return a.stock - b.stock;
      return a.id - b.id;
    }
    if (ra !== rb) return rb - ra;
    if (ra === 0) return b.stock - a.stock;
    return a.id - b.id;
  });
  return copy;
}
