import type { ComponentType } from 'react';
import { PRODUCT_THUMBNAIL_BY_ID } from './productThumbnailMap';

export type LeadTimeUnit = 'days' | 'weeks' | 'months';

export type InventoryChannel = 'etsy' | 'manual' | 'shopify' | 'wix' | 'square';

export interface InventoryRow {
  id: number;
  title: string;
  price: string;
  /** Optional stall / display price shown to customers */
  showPrice?: string;
  stock: number;
  alertThreshold: number;
  leadTime: number;
  leadTimeUnit: LeadTimeUnit;
  isTopSeller?: boolean;
  /** Sales channel source — defaults to manual in UI when omitted */
  channel?: InventoryChannel | null;
  /** ms epoch — for "Recently updated" sort */
  updatedAt: number;
  /** When set (e.g. manual copy of a synced listing), thumbnail resolves from this listing id. */
  thumbnailListingId?: number;
  Thumbnail: ComponentType;
}

/**
 * Fallback when user opens Inventory without finishing onboarding —
 * all “healthy” for v1 (no sold-out / low-stock edge cases until real data).
 */
export const INVENTORY_DEMO_SEED: InventoryRow[] = [
  {
    id: 28,
    title: 'Large Hand-Carved Ceramic Bowl',
    price: '$100.00',
    stock: 12,
    alertThreshold: 4,
    leadTime: 2,
    leadTimeUnit: 'weeks',
    channel: 'manual',
    updatedAt: Date.now() - 86400000 * 5,
    Thumbnail: PRODUCT_THUMBNAIL_BY_ID[28],
  },
  {
    id: 6,
    title: 'Citrus Ceramic Mug Tumbler Handmade',
    price: '$36.00',
    stock: 12,
    alertThreshold: 5,
    leadTime: 2,
    leadTimeUnit: 'weeks',
    isTopSeller: true,
    channel: 'etsy',
    updatedAt: Date.now() - 86400000 * 2,
    Thumbnail: PRODUCT_THUMBNAIL_BY_ID[6],
  },
  {
    id: 2,
    title: 'Tomato Ceramic Mug Tumbler Handmade',
    price: '$36.00',
    stock: 10,
    alertThreshold: 5,
    leadTime: 2,
    leadTimeUnit: 'weeks',
    isTopSeller: true,
    channel: 'etsy',
    updatedAt: Date.now() - 86400000 * 4,
    Thumbnail: PRODUCT_THUMBNAIL_BY_ID[2],
  },
];
