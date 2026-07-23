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
    id: 2,
    title: 'Tomato Ceramic Mug Tumbler Handmade',
    price: '$42.00',
    stock: 3,
    alertThreshold: 5,
    leadTime: 1,
    leadTimeUnit: 'weeks',
    isTopSeller: true,
    channel: 'etsy',
    updatedAt: Date.now() - 86400000 * 4,
    Thumbnail: PRODUCT_THUMBNAIL_BY_ID[2],
  },
  {
    id: 4,
    title: 'Strawberry Ceramic Mug',
    price: '$42.00',
    stock: 7,
    alertThreshold: 5,
    leadTime: 1,
    leadTimeUnit: 'weeks',
    isTopSeller: true,
    channel: 'etsy',
    updatedAt: Date.now() - 86400000 * 3,
    Thumbnail: PRODUCT_THUMBNAIL_BY_ID[4],
  },
  {
    id: 5,
    title: 'Blueberry Ceramic Mug',
    price: '$42.00',
    stock: 4,
    alertThreshold: 5,
    leadTime: 2,
    leadTimeUnit: 'weeks',
    channel: 'etsy',
    updatedAt: Date.now() - 86400000 * 2,
    Thumbnail: PRODUCT_THUMBNAIL_BY_ID[5],
  },
  {
    id: 10,
    title: '5.5 inch Ceramic Cat Slow Feeder',
    price: '$39.89',
    stock: 12,
    alertThreshold: 3,
    leadTime: 2,
    leadTimeUnit: 'weeks',
    channel: 'etsy',
    updatedAt: Date.now() - 86400000 * 6,
    Thumbnail: PRODUCT_THUMBNAIL_BY_ID[10],
  },
  {
    id: 20,
    title: 'Blue and Green Ceramic Bird Feeder',
    price: '$36.00',
    stock: 7,
    alertThreshold: 4,
    leadTime: 1,
    leadTimeUnit: 'weeks',
    channel: 'etsy',
    updatedAt: Date.now() - 86400000 * 7,
    Thumbnail: PRODUCT_THUMBNAIL_BY_ID[20],
  },
  {
    id: 31,
    title: '4 Cup Spaniel Feeder Ocean Glaze',
    price: '$50.00',
    stock: 10,
    alertThreshold: 5,
    leadTime: 3,
    leadTimeUnit: 'weeks',
    channel: 'manual',
    updatedAt: Date.now() - 86400000 * 1,
    Thumbnail: PRODUCT_THUMBNAIL_BY_ID[31],
  },
];
