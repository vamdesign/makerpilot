export type SalesChannel = 'etsy' | 'pos';

export interface SaleRecord {
  id: string;
  itemId: number;
  itemTitle: string;
  channel: SalesChannel;
  quantity: number;
  unitPrice: number;
  timestamp: number;
}

const SALES_HISTORY_KEY = 'makerpilotSalesHistory';
const MONTH_MS = 30 * 24 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

const SALES_MODEL: {
  itemId: number;
  itemTitle: string;
  channel: SalesChannel;
  unitPrice: number;
  monthlyUnits: [number, number, number, number, number, number];
}[] = [
  { itemId: 2,  itemTitle: 'Tomato Ceramic Mug Tumbler Handmade', channel: 'etsy', unitPrice: 42,    monthlyUnits: [39, 41, 47, 44, 52, 56] },
  { itemId: 4,  itemTitle: 'Strawberry Ceramic Mug',              channel: 'etsy', unitPrice: 42,    monthlyUnits: [20, 19, 23, 21, 24, 27] },
  { itemId: 5,  itemTitle: 'Blueberry Ceramic Mug',               channel: 'etsy', unitPrice: 42,    monthlyUnits: [31, 27, 21, 16, 11, 7] },
  { itemId: 10, itemTitle: '5.5 inch Ceramic Cat Slow Feeder',    channel: 'etsy', unitPrice: 39.89, monthlyUnits: [9, 11, 10, 12, 11, 13] },
  { itemId: 20, itemTitle: 'Blue and Green Ceramic Bird Feeder',  channel: 'etsy', unitPrice: 36,    monthlyUnits: [5, 7, 6, 7, 7, 8] },
  { itemId: 31, itemTitle: '4 Cup Spaniel Feeder Ocean Glaze',    channel: 'pos',  unitPrice: 50,    monthlyUnits: [15, 17, 16, 20, 19, 23] },
];

function seededRandom(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generateSalesHistory(now: number = Date.now()): SaleRecord[] {
  const rand = seededRandom(20260721);
  const records: SaleRecord[] = [];
  let uid = 0;
  for (const model of SALES_MODEL) {
    model.monthlyUnits.forEach((units, mIdx) => {
      const monthsAgo = 5 - mIdx;
      for (let u = 0; u < units; u++) {
        const jitter = rand() * MONTH_MS;
        const ts = Math.round(now - monthsAgo * MONTH_MS - jitter);
        records.push({
          id: `s${uid++}`,
          itemId: model.itemId,
          itemTitle: model.itemTitle,
          channel: model.channel,
          quantity: 1,
          unitPrice: model.unitPrice,
          timestamp: ts,
        });
      }
    });
  }
  return records;
}

export function seedSalesHistory(now: number = Date.now()): void {
  try {
    localStorage.setItem(SALES_HISTORY_KEY, JSON.stringify(generateSalesHistory(now)));
  } catch {
    /* ignore */
  }
}

export function readSalesHistory(): SaleRecord[] {
  try {
    const raw = localStorage.getItem(SALES_HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SaleRecord[];
  } catch {
    return [];
  }
}

function grossOf(records: SaleRecord[]): number {
  return records.reduce((s, r) => s + r.quantity * r.unitPrice, 0);
}
function unitsOf(records: SaleRecord[]): number {
  return records.reduce((s, r) => s + r.quantity, 0);
}

export interface RangeTotals {
  gross: number;
  units: number;
}

export function salesInRange(days: number, records = readSalesHistory(), now = Date.now()): RangeTotals {
  const cutoff = now - days * DAY_MS;
  const inRange = records.filter((r) => r.timestamp >= cutoff);
  return { gross: grossOf(inRange), units: unitsOf(inRange) };
}

export function momChange(records = readSalesHistory(), now = Date.now()): number {
  const last30 = records.filter((r) => r.timestamp >= now - 30 * DAY_MS);
  const prior30 = records.filter((r) => r.timestamp < now - 30 * DAY_MS && r.timestamp >= now - 60 * DAY_MS);
  const a = grossOf(last30);
  const b = grossOf(prior30);
  if (b === 0) return 0;
  return Math.round(((a - b) / b) * 100);
}

export interface ChannelSplit {
  etsy: RangeTotals;
  pos: RangeTotals;
}

export function salesByChannel(days: number, records = readSalesHistory(), now = Date.now()): ChannelSplit {
  const cutoff = now - days * DAY_MS;
  const inRange = records.filter((r) => r.timestamp >= cutoff);
  const etsy = inRange.filter((r) => r.channel === 'etsy');
  const pos = inRange.filter((r) => r.channel === 'pos');
  return {
    etsy: { gross: grossOf(etsy), units: unitsOf(etsy) },
    pos: { gross: grossOf(pos), units: unitsOf(pos) },
  };
}

export interface MonthBucket {
  label: string;
  gross: number;
}

export function salesByMonth(months: number, records = readSalesHistory(), now = Date.now()): MonthBucket[] {
  const out: MonthBucket[] = [];
  const fmt = (d: number) => new Date(d).toLocaleDateString('en-US', { month: 'short' });
  for (let m = months - 1; m >= 0; m--) {
    const end = now - m * MONTH_MS;
    const start = end - MONTH_MS;
    const seg = records.filter((r) => r.timestamp < end && r.timestamp >= start);
    out.push({ label: fmt(end), gross: grossOf(seg) });
  }
  return out;
}

export function salesForItem(itemId: number, days: number, records = readSalesHistory(), now = Date.now()): number {
  const cutoff = now - days * DAY_MS;
  return unitsOf(records.filter((r) => r.itemId === itemId && r.timestamp >= cutoff));
}
