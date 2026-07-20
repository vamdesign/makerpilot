import type { InventoryChannel, InventoryRow, LeadTimeUnit } from '../data/inventoryDemo';
import { normalizeInventoryPrice } from './inventoryUtils';
import GenericItemPlaceholder from '../components/icons/GenericItemPlaceholder';
import { PRODUCT_THUMBNAIL_BY_ID } from '../data/productThumbnailMap';

export const TRACKED_INVENTORY_KEY = 'makerpilotTrackedInventory';
export const PRIMARY_CHANNEL_KEY = 'makerpilotPrimaryChannel';
export const MAX_TRACKED_ITEMS = 10;

export type PrimaryChannel = InventoryChannel;
export type StoreChannel = Exclude<PrimaryChannel, 'manual'>;

/** Serializable row (localStorage) — no React components. */
export interface StoredTrackedRow {
  id: number;
  title: string;
  price: string;
  showPrice?: string;
  stock: number;
  alertThreshold: number;
  leadTime: number;
  leadTimeUnit: LeadTimeUnit;
  isTopSeller?: boolean;
  channel?: InventoryChannel | null;
  updatedAt: number;
  /** Listing id backing the visual thumbnail when row `id` is synthetic (manual duplicate). */
  thumbnailListingId?: number;
}

function listingPriceById(): Map<number, string> {
  try {
    const raw = localStorage.getItem('inventoryData');
    if (!raw) return new Map();
    const arr = JSON.parse(raw) as { id: number; price: string }[];
    return new Map(arr.map((l) => [l.id, l.price]));
  } catch {
    return new Map();
  }
}

function attachThumbnail(row: StoredTrackedRow): InventoryRow {
  const thumbKey =
    row.thumbnailListingId !== undefined ? row.thumbnailListingId : row.id;
  const Thumb = PRODUCT_THUMBNAIL_BY_ID[thumbKey];
  if (Thumb) {
    return { ...row, Thumbnail: Thumb };
  }
  if (row.channel === 'manual') {
    return { ...row, Thumbnail: GenericItemPlaceholder };
  }
  return { ...row, Thumbnail: GenericItemPlaceholder };
}

export function rowsToStored(rows: InventoryRow[]): StoredTrackedRow[] {
  return rows.map(({ Thumbnail: _t, ...rest }) => rest);
}

export function storedToRows(stored: StoredTrackedRow[]): InventoryRow[] {
  return stored.map(attachThumbnail);
}

export function readTrackedFromStorage(): InventoryRow[] | null {
  try {
    const raw = localStorage.getItem(TRACKED_INVENTORY_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredTrackedRow[];
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    return storedToRows(parsed);
  } catch {
    return null;
  }
}

export function writeTrackedToStorage(rows: InventoryRow[]): void {
  localStorage.setItem(TRACKED_INVENTORY_KEY, JSON.stringify(rowsToStored(rows)));
}

export function readPrimaryChannel(): PrimaryChannel {
  try {
    const raw = localStorage.getItem(PRIMARY_CHANNEL_KEY);
    if (
      raw === 'etsy' ||
      raw === 'shopify' ||
      raw === 'wix' ||
      raw === 'square' ||
      raw === 'manual'
    ) {
      return raw;
    }
    const channels = JSON.parse(localStorage.getItem('salesChannels') || '[]') as string[];
    if (channels.includes('etsy')) return 'etsy';
    if (channels.includes('own-shop')) return 'shopify';
  } catch {
    /* ignore */
  }
  return 'manual';
}

export function writePrimaryChannel(channel: PrimaryChannel): void {
  localStorage.setItem(PRIMARY_CHANNEL_KEY, channel);
}

/** Connected store import channel — stays available even when primary is manual (craft shows). */
export function readStoreChannel(): StoreChannel | null {
  const primary = readPrimaryChannel();
  if (primary !== 'manual') return primary;

  try {
    const channels = JSON.parse(localStorage.getItem('salesChannels') || '[]') as string[];
    if (channels.includes('etsy')) return 'etsy';
    if (channels.includes('own-shop')) return 'shopify';
  } catch {
    /* ignore */
  }
  return null;
}

export function trackedItemCount(): number {
  return readTrackedFromStorage()?.length ?? 0;
}

/** Listing id to use when copying a tracked row onto a synthetic manual id (preserves thumbnail). */
export function thumbnailListingIdForCopy(
  item: Pick<InventoryRow, 'id' | 'thumbnailListingId'>,
): number | undefined {
  const key = item.thumbnailListingId ?? item.id;
  return PRODUCT_THUMBNAIL_BY_ID[key] ? key : undefined;
}

function nextManualItemId(existing: InventoryRow[]): number {
  const maxId = existing.reduce((m, r) => Math.max(m, r.id), 0);
  return Math.max(maxId + 1, 900001);
}

export interface OnboardingSelectedItem {
  id: number;
  title: string;
  quantity: number;
  isTopSeller?: boolean;
}

export interface ItemLimitsSlice {
  alertThreshold: number;
  leadTime: number;
  leadTimeUnit: LeadTimeUnit;
}

function buildStoredRows(
  selectedItems: OnboardingSelectedItem[],
  itemLimits: { [key: number]: ItemLimitsSlice },
  channel: InventoryChannel,
): StoredTrackedRow[] {
  const prices = listingPriceById();
  const now = Date.now();
  return selectedItems.map((item) => {
    const lim = itemLimits[item.id];
    return {
      id: item.id,
      title: item.title,
      price: prices.get(item.id) ?? '$0.00',
      stock: item.quantity,
      alertThreshold: lim?.alertThreshold ?? 3,
      leadTime: lim?.leadTime ?? 2,
      leadTimeUnit: lim?.leadTimeUnit ?? 'weeks',
      isTopSeller: item.isTopSeller,
      channel,
      updatedAt: now,
    };
  });
}

/** Call when user finishes Set Limits — replaces or appends tracked list. */
export function persistOnboardingInventory(
  selectedItems: OnboardingSelectedItem[],
  itemLimits: { [key: number]: ItemLimitsSlice },
  options?: { append?: boolean; channel?: InventoryChannel },
): void {
  const channel = options?.channel ?? readPrimaryChannel();
  const newRows = buildStoredRows(selectedItems, itemLimits, channel);

  if (options?.append) {
    const existing = readTrackedFromStorage() ?? [];
    const existingIds = new Set(existing.map((r) => r.id));
    const merged = [
      ...existing,
      ...newRows.filter((r) => !existingIds.has(r.id)),
    ].slice(0, MAX_TRACKED_ITEMS);
    localStorage.setItem(TRACKED_INVENTORY_KEY, JSON.stringify(merged));
    return;
  }

  localStorage.setItem(TRACKED_INVENTORY_KEY, JSON.stringify(newRows));
}

export interface ManualItemInput {
  title: string;
  stock: number;
  alertThreshold: number;
  leadTime: number;
  leadTimeUnit: LeadTimeUnit;
  price?: string;
  showPrice?: string;
  isTopSeller?: boolean;
  thumbnailListingId?: number;
}

/** Append a manually entered item to tracked inventory. Returns null if at limit.
 * When nothing is in storage, pass **fallbackRowsWhenNothingInStorage** (e.g. current Inventory screen rows)
 * so demo / in-memory lists are not wiped and thumbnails stay keyed by listing id. */
export function appendManualTrackedItem(
  input: ManualItemInput,
  fallbackRowsWhenNothingInStorage?: InventoryRow[],
): InventoryRow | null {
  const storedRows = readTrackedFromStorage();
  let existingStored: StoredTrackedRow[];
  if (storedRows && storedRows.length > 0) {
    existingStored = rowsToStored(storedRows);
  } else if (fallbackRowsWhenNothingInStorage && fallbackRowsWhenNothingInStorage.length > 0) {
    existingStored = rowsToStored(fallbackRowsWhenNothingInStorage);
  } else {
    existingStored = [];
  }

  if (existingStored.length >= MAX_TRACKED_ITEMS) return null;

  const existingForId = storedToRows(existingStored);
  const priceStr = normalizeInventoryPrice(input.price ?? '');

  const trimmedShow = input.showPrice?.trim() ?? '';
  const showPriceStr =
    trimmedShow === '' ? undefined : normalizeInventoryPrice(input.showPrice ?? '');

  const row: StoredTrackedRow = {
    id: nextManualItemId(existingForId),
    title: input.title.trim(),
    price: priceStr,
    stock: Math.max(0, input.stock),
    alertThreshold: Math.max(0, input.alertThreshold),
    leadTime: Math.max(1, input.leadTime),
    leadTimeUnit: input.leadTimeUnit,
    channel: 'manual',
    updatedAt: Date.now(),
    ...(typeof input.isTopSeller === 'boolean' ? { isTopSeller: input.isTopSeller } : {}),
    ...(showPriceStr ? { showPrice: showPriceStr } : {}),
    ...(input.thumbnailListingId !== undefined
      ? { thumbnailListingId: input.thumbnailListingId }
      : {}),
  };

  const merged = [...existingStored, row];
  localStorage.setItem(TRACKED_INVENTORY_KEY, JSON.stringify(merged));
  return attachThumbnail(row);
}
