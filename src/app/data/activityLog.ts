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
const MAX_LOG_ENTRIES = 50; // keep last 50 events in storage

const ACTIVITY_DEMO_SEED: ActivityEvent[] = [
  {
    id: 'demo-1',
    type: 'sale',
    itemId: 2,
    itemTitle: 'Tomato Ceramic Mug Tumbler Handmade',
    detail: 'Stock 5 → 3',
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
  },
  {
    id: 'demo-2',
    type: 'restock',
    itemId: 6,
    itemTitle: 'Citrus Ceramic Mug Tumbler Handmade',
    detail: 'Stock 8 → 12',
    timestamp: Date.now() - 5 * 60 * 60 * 1000,
  },
  {
    id: 'demo-3',
    type: 'sale',
    itemId: 6,
    itemTitle: 'Citrus Ceramic Mug Tumbler Handmade',
    detail: 'Stock 10 → 8',
    timestamp: Date.now() - 26 * 60 * 60 * 1000,
  },
  {
    id: 'demo-4',
    type: 'lead_time_changed',
    itemId: 28,
    itemTitle: 'Large Hand-Carved Ceramic Bowl',
    detail: 'Lead time 2 → 3 wks',
    timestamp: Date.now() - 48 * 60 * 60 * 1000,
  },
  {
    id: 'demo-5',
    type: 'alert_changed',
    itemId: 2,
    itemTitle: 'Tomato Ceramic Mug Tumbler Handmade',
    detail: 'Alert at 3 → 5',
    timestamp: Date.now() - 72 * 60 * 60 * 1000,
  },
  {
    id: 'demo-6',
    type: 'item_added',
    itemId: 28,
    itemTitle: 'Large Hand-Carved Ceramic Bowl',
    detail: 'Added to inventory',
    timestamp: Date.now() - 96 * 60 * 60 * 1000,
  },
];

/** Seed demo activity when localStorage is empty (first launch / portfolio demo). */
export function seedActivityLogIfEmpty(): void {
  if (readActivityLog().length > 0) return;
  try {
    localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(ACTIVITY_DEMO_SEED));
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
