export type ActivityEventType =
  | 'sale'
  | 'restock'
  | 'lead_time_changed'
  | 'alert_changed'
  | 'item_added'
  | 'item_deleted'
  | 'item_copied';

export interface ActivityEvent {
  id: string;
  type: ActivityEventType;
  itemId: number;
  itemTitle: string;
  detail: string;       // e.g. "Stock 5 → 3" or "Lead time 2 → 3 wks"
  timestamp: number;    // Date.now()
}

const ACTIVITY_LOG_KEY = 'makerpilotActivityLog';
const ACTIVITY_SEED_VERSION_KEY = 'makerpilotActivitySeedVersion';
/** Bump when demo Recent activity content/order changes so localStorage refreshes. */
const ACTIVITY_SEED_VERSION = '3';
const MAX_LOG_ENTRIES = 50; // keep last 50 events in storage
const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

/**
 * Demo feed aligned with INVENTORY_DEMO_SEED:
 * Tomato (id 2) stock 3, alert 5 · Strawberry (id 4) stock 7
 * Large Hand-Carved appears only as Deleted (not in current inventory) — 4d ago.
 */
function buildActivityDemoSeed(now = Date.now()): ActivityEvent[] {
  return [
    {
      id: 'demo-1',
      type: 'sale',
      itemId: 2,
      itemTitle: 'Tomato Ceramic Mug Tumbler Handmade',
      detail: 'Stock 5 → 3',
      timestamp: now - 2 * HOUR_MS,
    },
    {
      id: 'demo-2',
      type: 'restock',
      itemId: 2,
      itemTitle: 'Tomato Ceramic Mug Tumbler Handmade',
      detail: 'Stock 2 → 5',
      timestamp: now - 5 * HOUR_MS,
    },
    {
      id: 'demo-3',
      type: 'restock',
      itemId: 2,
      itemTitle: 'Tomato Ceramic Mug Tumbler Handmade',
      detail: 'Stock 1 → 2',
      timestamp: now - 26 * HOUR_MS,
    },
    {
      id: 'demo-4',
      type: 'restock',
      itemId: 4,
      itemTitle: 'Strawberry Ceramic Mug',
      detail: 'Stock 5 → 7',
      timestamp: now - 2 * DAY_MS,
    },
    {
      id: 'demo-5',
      type: 'alert_changed',
      itemId: 2,
      itemTitle: 'Tomato Ceramic Mug Tumbler Handmade',
      detail: 'Alert at 3 → 5',
      timestamp: now - 3 * DAY_MS,
    },
    {
      id: 'demo-6',
      type: 'item_deleted',
      itemId: 28,
      itemTitle: 'Large Hand-Carved Ceramic Bowl',
      detail: 'Removed from inventory',
      timestamp: now - 4 * DAY_MS,
    },
  ];
}

/** Write (or refresh) the demo activity feed. Versioned so seed updates replace stale localStorage. */
export function seedActivityLogIfEmpty(): void {
  try {
    const version = localStorage.getItem(ACTIVITY_SEED_VERSION_KEY);
    if (version === ACTIVITY_SEED_VERSION && readActivityLog().length > 0) return;
    localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(buildActivityDemoSeed()));
    localStorage.setItem(ACTIVITY_SEED_VERSION_KEY, ACTIVITY_SEED_VERSION);
  } catch {
    /* ignore */
  }
}

export function readActivityLog(): ActivityEvent[] {
  try {
    const raw = localStorage.getItem(ACTIVITY_LOG_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ActivityEvent[];
  } catch {
    return [];
  }
}

export function appendActivityEvent(event: Omit<ActivityEvent, 'id'>): void {
  try {
    const existing = readActivityLog();
    const withNew: ActivityEvent[] = [
      { ...event, id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}` },
      ...existing,
    ].slice(0, MAX_LOG_ENTRIES);
    localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(withNew));
  } catch {
    // silently ignore storage errors
  }
}

/** Returns a short human-readable relative time string, e.g. "2h ago", "Yesterday", "3d ago" */
export function relativeTime(timestamp: number): string {
  const diffMs = Date.now() - timestamp;
  const diffMins = Math.floor(diffMs / 60_000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffHours < 48) return 'Yesterday';
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

/** Color dot for each event type — returns a Tailwind bg class */
export function eventDotColor(type: ActivityEventType): string {
  switch (type) {
    case 'sale':              return 'bg-[#1A9E8F]';   // teal — sale recorded
    case 'restock':           return 'bg-[#FF6600]';   // orange — stock added
    case 'lead_time_changed': return 'bg-[#6B7280]';   // gray — edit
    case 'alert_changed':     return 'bg-[#6B7280]';   // gray — edit
    case 'item_added':        return 'bg-[#007EA7]';   // blue — new item
    case 'item_deleted':      return 'bg-[#B91C1C]';   // red — removed
    case 'item_copied':       return 'bg-[#007EA7]';   // blue — duplicate
    default:                  return 'bg-[#6B7280]';
  }
}

/** Icon label for each event type */
export function eventLabel(type: ActivityEventType): string {
  switch (type) {
    case 'sale':              return 'Sold';
    case 'restock':           return 'Restocked';
    case 'lead_time_changed': return 'Lead time';
    case 'alert_changed':     return 'Alert';
    case 'item_added':        return 'Added';
    case 'item_deleted':      return 'Deleted';
    case 'item_copied':       return 'Copied';
    default:                  return 'Updated';
  }
}

/**
 * Second-line copy for Recent activity.
 * Sale/restock include the delta so users don't do the math: "Sold 2 · Stock 5 → 3"
 */
export function formatActivitySummary(event: ActivityEvent): string {
  const label = eventLabel(event.type);

  // RecordSale historically stored "Sold N · Stock …" in detail — avoid "Sold · Sold N …"
  if (/^(Sold|Restocked)\s+\d+\s*·/.test(event.detail)) {
    return event.detail;
  }

  if (event.type === 'sale' || event.type === 'restock') {
    const match = event.detail.match(/Stock\s+(\d+)\s*→\s*(\d+)/);
    if (match) {
      const from = Number(match[1]);
      const to = Number(match[2]);
      const qty = Math.abs(to - from);
      return `${label} ${qty} · Stock ${from} → ${to}`;
    }
  }

  return `${label} · ${event.detail}`;
}
