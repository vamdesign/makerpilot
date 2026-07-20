import { useCallback, useEffect, useRef, useState } from 'react';
import { Copy, Trash2 } from 'lucide-react';
import type { InventoryRow } from '../../data/inventoryDemo';
import { readPrimaryChannel } from '../../inventory/trackedInventory';
import TopSellerBadge from '../TopSellerBadge';
import LowStockClockIcon from '../icons/LowStockClockIcon';
import { formatLeadLabel, needsMaking } from '../../inventory/inventoryUtils';
import { cardBorderStatic } from '../cardBorder';

const COPY_W = 80;
const DELETE_W = 80;
const ACTION_TRACK_W = COPY_W + DELETE_W;
/** Hidden under closed card — fills wedge next to rounded corner so orange reads as one solid slab */
const SWIPE_UNDERLAP_PX = 28;
const SWIPE_THRESH = 40;
const DRAG_SLOP = 6;

const PRIMARY_LABELS: Record<string, string> = {
  etsy: 'Etsy',
  shopify: 'Shopify',
  wix: 'Wix',
  square: 'Square',
  manual: 'Manual',
};

/** One sync channel per user — manual adds show Manual; synced items show the primary channel. */
function ChannelLabel({ item }: { item: InventoryRow }) {
  const primary = readPrimaryChannel();
  const text =
    item.channel === 'manual' ? 'Manual' : PRIMARY_LABELS[primary] ?? null;
  if (!text) return null;

  return (
    <span className="text-center font-['DM_Sans:Regular',sans-serif] text-[10px] leading-none text-[#9CA3AF]">
      {text}
    </span>
  );
}

export interface CardItemProps {
  item: InventoryRow;
  onOpen: () => void;
  onDelete: () => void;
  onCopy: () => void;
  /** Increment to close all open swipes (e.g. when opening the edit sheet). */
  swipeRevision: number;
}

export default function CardItem({ item, onOpen, onDelete, onCopy, swipeRevision }: CardItemProps) {
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ x: number; startOffset: number } | null>(null);
  const didDragRef = useRef(false);
  const Thumbnail = item.Thumbnail;

  const makeMore = needsMaking(item);
  const isDeleteOpen = offset <= -SWIPE_THRESH;

  useEffect(() => {
    setOffset(0);
  }, [swipeRevision]);

  const clampOffset = useCallback((o: number) => Math.max(-ACTION_TRACK_W, Math.min(0, o)), []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (isDeleteOpen) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
    didDragRef.current = false;
    dragStart.current = { x: e.clientX, startOffset: offset };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    if (Math.abs(dx) > DRAG_SLOP) didDragRef.current = true;
    const next = clampOffset(dragStart.current.startOffset + dx);
    setOffset(next);
  };

  const onPointerEnd = (e: React.PointerEvent) => {
    if (!dragStart.current) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* pointer was not captured */
    }
    dragStart.current = null;
    setDragging(false);
    setOffset((o) => (o < -SWIPE_THRESH ? -ACTION_TRACK_W : 0));
  };

  const closeDelete = () => setOffset(0);

  const onCardClick = () => {
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }
    if (isDeleteOpen) {
      closeDelete();
      return;
    }
    onOpen();
  };

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Solid base fills the curved clip so swipe colors stay fully under the card */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl bg-white" aria-hidden />

      {/* Full-height orange pad + Copy/Delete: straight column under the sliding row (swipe reveal width unchanged) */}
      <div
        className="absolute inset-y-0 right-0 z-0 flex h-full shrink-0 overflow-hidden rounded-r-2xl"
        style={{ width: ACTION_TRACK_W + SWIPE_UNDERLAP_PX }}
      >
        <div className="h-full shrink-0 bg-[#FF6600]" style={{ width: SWIPE_UNDERLAP_PX }} aria-hidden />
        <div className="flex h-full w-[160px] min-w-[160px] shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeDelete();
              onCopy();
            }}
            className="flex min-h-full w-[80px] flex-col items-center justify-center gap-1 bg-[#FF6600] font-['DM_Sans:SemiBold',sans-serif] text-[12px] text-white"
          >
            <Copy size={14} strokeWidth={2.25} aria-hidden />
            Copy
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeDelete();
              onDelete();
            }}
            className="flex min-h-full w-[80px] flex-col items-center justify-center gap-1 bg-[#B91C1C] font-['DM_Sans:SemiBold',sans-serif] text-[12px] text-white"
          >
            <Trash2 size={14} strokeWidth={2.25} aria-hidden />
            Delete
          </button>
        </div>
      </div>

      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (isDeleteOpen) closeDelete();
            else onOpen();
          }
        }}
        onClick={onCardClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        className={`relative z-[1] isolate flex select-none gap-3 bg-white p-3 touch-pan-y ${cardBorderStatic} ${
          offset === 0 ? 'rounded-2xl shadow-sm' : 'rounded-none rounded-l-2xl border-r-0 shadow-none'
        }`}
        style={{
          transform: `translate3d(${offset}px, 0, 0)`,
          transition: dragging ? 'none' : 'transform 0.2s ease-out',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        <div className="flex w-10 shrink-0 flex-col items-center gap-1">
          <div className="h-10 w-10 overflow-hidden rounded-lg bg-gray-100 [&_img]:size-full [&_img]:object-contain [&_svg]:size-full">
            <Thumbnail />
          </div>
          <ChannelLabel item={item} />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="line-clamp-2 font-['DM_Sans:SemiBold',sans-serif] text-[14px] leading-snug text-gray-900">
            {item.title}
          </p>
          {item.isTopSeller && <TopSellerBadge />}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-1 text-right">
          <p className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-500">{item.price}</p>
          {item.showPrice ? (
            <p className="font-['DM_Sans:Regular',sans-serif] text-[11px] text-[#1A9E8F]">
              🏪 {item.showPrice}
            </p>
          ) : null}
          <div className="flex flex-col items-end gap-0.5">
            <div className="flex items-center gap-1.5">
              {makeMore && (
                <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-[#FFF0E5] shadow-sm ring-2 ring-[#FF6600]/30">
                  <LowStockClockIcon className="size-[14px] text-[#FF6600]" aria-label="Needs making" />
                </span>
              )}
              <span
                className={`rounded-lg bg-gray-100 px-2 py-0.5 font-['DM_Sans:Regular',sans-serif] text-[12px] ${
                  makeMore ? 'text-[#FF6600]' : 'text-gray-700'
                }`}
              >
                Stock: {item.stock}
              </span>
            </div>
            <p className="font-['DM_Sans:SemiBold',sans-serif] text-[11px] text-gray-500">
              Make more @ {item.alertThreshold}
            </p>
          </div>
          <p className="max-w-[100px] font-['DM_Sans:SemiBold',sans-serif] text-[12px] text-[#1A9E8F]">
            {formatLeadLabel(item.leadTime, item.leadTimeUnit)}
          </p>
        </div>
      </div>
    </div>
  );
}
