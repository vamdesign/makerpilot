import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { toast } from 'sonner';
import type { InventoryRow, LeadTimeUnit } from '../../data/inventoryDemo';
import { Drawer, DrawerContent, DrawerTitle } from '../ui/drawer';
import { cn } from '../ui/utils';
import TopSellerBadge from '../TopSellerBadge';
import StepperControlRow, { StepperSuffixText } from './StepperControlRow';
import { MAX_TRACKED_ITEMS, thumbnailListingIdForCopy, trackedItemCount } from '../../inventory/trackedInventory';
import { normalizeInventoryPrice } from '../../inventory/inventoryUtils';
import { appendActivityEvent } from '../../data/activityLog';
import { cardBorderStatic } from '../cardBorder';

export interface EditItemModalProps {
  open: boolean;
  item: InventoryRow | null;
  onOpenChange: (open: boolean) => void;
  onSave: (next: InventoryRow) => void;
  onDelete: (id: number) => void;
}

const LEAD_UNITS: LeadTimeUnit[] = ['days', 'weeks', 'months'];
const UNIT_LABEL: Record<LeadTimeUnit, string> = {
  days: 'Day',
  weeks: 'Wks',
  months: 'Mnth',
};

export default function EditItemModal({
  open,
  item,
  onOpenChange,
  onSave,
  onDelete,
}: EditItemModalProps) {
  const navigate = useNavigate();
  const atLimit = trackedItemCount() >= MAX_TRACKED_ITEMS;
  const [title, setTitle] = useState('');
  const [stock, setStock] = useState(0);
  const [alertThreshold, setAlertThreshold] = useState(3);
  const [leadTime, setLeadTime] = useState(1);
  const [leadUnit, setLeadUnit] = useState<LeadTimeUnit>('weeks');
  const [price, setPrice] = useState('');
  const [showPrice, setShowPrice] = useState('');
  const [showPriceEditorOpen, setShowPriceEditorOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const initialStockRef = useRef(0);

  const isSynced = item?.channel != null && item.channel !== 'manual';
  const stockChanged = stock !== initialStockRef.current;

  useEffect(() => {
    if (!item) return;
    setTitle(item.title);
    setStock(item.stock);
    initialStockRef.current = item.stock;
    setAlertThreshold(item.alertThreshold);
    setLeadTime(item.leadTime);
    setLeadUnit(item.leadTimeUnit);
    setPrice(item.price.replace(/^\$/, ''));
    setShowPrice(item.showPrice?.replace(/^\$/, '') ?? '');
    setShowPriceEditorOpen(Boolean(item.showPrice));
    setSyncing(false);
    setShowDeleteConfirm(false);
  }, [item]);

  const cycleUnit = () => {
    setLeadUnit((u) => {
      const i = LEAD_UNITS.indexOf(u);
      return LEAD_UNITS[(i + 1) % LEAD_UNITS.length];
    });
  };

  const handleSyncStock = async () => {
    if (syncing) return;
    setSyncing(true);
    toast.loading('Syncing stock…', { id: 'sync-stock', duration: 1500 });
    await new Promise((r) => setTimeout(r, 1400));
    initialStockRef.current = stock;
    setSyncing(false);
    toast.success('Stock synced', { id: 'sync-stock' });
  };

  const handleSave = () => {
    if (!item) return;
    const priceStr = normalizeInventoryPrice(price);

    const next: InventoryRow = {
      ...item,
      title: !isSynced && title.trim() ? title.trim() : item.title,
      stock: Math.max(0, stock),
      alertThreshold: Math.max(1, alertThreshold),
      leadTime: Math.max(1, leadTime),
      leadTimeUnit: leadUnit,
      price: isSynced ? item.price : priceStr,
      updatedAt: Date.now(),
    };

    if (!isSynced && showPriceEditorOpen) {
      const trimmedShow = showPrice.trim();
      if (trimmedShow === '') {
        delete next.showPrice;
      } else {
        next.showPrice = normalizeInventoryPrice(showPrice);
      }
    }

    // Log what actually changed
    if (item && stock !== item.stock) {
      appendActivityEvent({
        type: stock > item.stock ? 'restock' : 'sale',
        itemId: item.id,
        itemTitle: item.title,
        detail: `Stock ${item.stock} → ${stock}`,
        timestamp: Date.now(),
      });
    }
    if (item && leadTime !== item.leadTime) {
      appendActivityEvent({
        type: 'lead_time_changed',
        itemId: item.id,
        itemTitle: item.title,
        detail: `Lead time ${item.leadTime} → ${leadTime} ${leadUnit}`,
        timestamp: Date.now(),
      });
    }
    if (item && alertThreshold !== item.alertThreshold) {
      appendActivityEvent({
        type: 'alert_changed',
        itemId: item.id,
        itemTitle: item.title,
        detail: `Alert at ${item.alertThreshold} → ${alertThreshold}`,
        timestamp: Date.now(),
      });
    }

    onSave(next);
    onOpenChange(false);
  };

  const Thumbnail = item?.Thumbnail;

  return (
    <Drawer open={open} onOpenChange={onOpenChange} modal dismissible={false}>
      <DrawerContent
        className={cn(
          '[&>div:first-child]:hidden',
          '!fixed !bottom-0 !left-0 !right-0 z-50 !mx-auto !mt-0 !w-full !max-w-[393px]',
          '!max-h-[min(82vh,640px)] gap-0 rounded-2xl border border-gray-200 bg-white px-0 shadow-[0_-8px_40px_rgba(0,0,0,0.12)]',
        )}
      >
        <div className="flex h-full max-h-[min(82vh,640px)] flex-col overflow-hidden">

          {/* Drag handle */}
          <div className="mx-auto mt-2 h-1 w-[72px] shrink-0 rounded-full bg-[#D1D5DB]" aria-hidden />

          {item && Thumbnail && (
            <>
              <DrawerTitle className="sr-only">Edit {item.title}</DrawerTitle>

              {/* Scrollable content */}
              <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-4 pt-3">
                <div className={`rounded-2xl bg-white px-2.5 py-3 ${cardBorderStatic}`}>

                  {/* Item header: thumbnail left, title right */}
                  <div className="mb-5 flex items-start gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100 [&_svg]:size-full">
                      <Thumbnail />
                      {!isSynced && (
                        <button
                          type="button"
                          aria-label="Change photo"
                          onClick={() => toast.message('Photo upload coming soon')}
                          className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/30"
                        >
                          <Camera size={14} className="text-white" strokeWidth={2} />
                        </button>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      {!isSynced ? (
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full rounded-lg border border-gray-200 px-2 py-1 font-['DM_Sans:SemiBold',sans-serif] text-[14px] leading-snug text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A9E8F]"
                        />
                      ) : (
                        <p className="font-['DM_Sans:SemiBold',sans-serif] text-[14px] leading-snug text-gray-900 line-clamp-2">
                          {item.title}
                        </p>
                      )}
                      {item.isTopSeller && (
                        <div className="mt-1">
                          <TopSellerBadge />
                        </div>
                      )}
                    </div>
                  </div>

                  <StepperControlRow
                    label="Current stock"
                    value={stock}
                    onDecrement={() => setStock((s) => Math.max(0, s - 1))}
                    onIncrement={() => setStock((s) => s + 1)}
                    suffix={
                      isSynced && stockChanged ? (
                        <button
                          type="button"
                          disabled={syncing}
                          onClick={handleSyncStock}
                          className="flex h-9 w-full max-w-[72px] shrink-0 items-center justify-center rounded-lg bg-[#1A9E8F] px-1 font-['DM_Sans:SemiBold',sans-serif] text-[11px] leading-tight text-white disabled:opacity-60"
                        >
                          {syncing ? 'Syncing…' : 'Sync stock'}
                        </button>
                      ) : undefined
                    }
                  />

                  <StepperControlRow
                    label="Notify me when"
                    value={alertThreshold}
                    onDecrement={() => setAlertThreshold((a) => Math.max(1, a - 1))}
                    onIncrement={() => setAlertThreshold((a) => a + 1)}
                    suffix={<StepperSuffixText>In stock</StepperSuffixText>}
                  />

                  <StepperControlRow
                    label="Time to make"
                    value={leadTime}
                    onDecrement={() => setLeadTime((t) => Math.max(1, t - 1))}
                    onIncrement={() => setLeadTime((t) => t + 1)}
                    suffix={
                      <button
                        type="button"
                        onClick={cycleUnit}
                        className="flex h-9 w-full max-w-[72px] shrink-0 items-center justify-center gap-1 rounded-full border border-[#1A9E8F] bg-[#E6F4F2] px-2 py-1.5"
                      >
                        <span className="font-['DM_Sans:SemiBold',sans-serif] text-[12px] text-[#1A9E8F]">
                          {UNIT_LABEL[leadUnit]}
                        </span>
                        <div className="flex flex-col items-center -space-y-1.5 leading-none [&_svg]:block [&_svg]:shrink-0">
                          <svg className="h-2.5 w-2.5 text-[#1A9E8F]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 6.414l-3.293 3.293a1 1 0 01-1.414 0z" />
                          </svg>
                          <svg className="h-2.5 w-2.5 text-[#1A9E8F]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 13.586l3.293-3.293a1 1 0 011.414 0z" />
                          </svg>
                        </div>
                      </button>
                    }
                  />

                  {/* Delete / copy actions */}
                  <div className="relative mt-4 h-11 overflow-hidden">
                    <div
                      className={cn(
                        'flex items-center justify-between px-2 transition-opacity duration-300',
                        showDeleteConfirm && 'pointer-events-none opacity-0',
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(true)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DC2626] active:opacity-80"
                        aria-label="Delete listing"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#FFFFFF"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                          <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        disabled={atLimit}
                        onClick={() => {
                          if (!item || atLimit) return;
                          onOpenChange(false);
                          navigate('/duplicate-item', {
                            state: {
                              title: item.title,
                              stock: item.stock,
                              alertThreshold: item.alertThreshold,
                              leadTime: item.leadTime,
                              leadTimeUnit: item.leadTimeUnit,
                              price: item.price,
                              showPrice: item.showPrice,
                              isTopSeller: item.isTopSeller ?? false,
                              thumbnailListingId: thumbnailListingIdForCopy(item),
                              fromEditModal: true,
                              editItemId: item.id,
                            },
                          });
                        }}
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-full bg-[#F97316] active:opacity-80',
                          atLimit && 'cursor-default opacity-40',
                        )}
                        aria-label="Copy item"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#FFFFFF"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                        </svg>
                      </button>
                    </div>

                    <div
                      className={cn(
                        'absolute inset-y-0 left-0 right-0 flex items-center gap-3 rounded-xl bg-[#DC2626] px-3 transition-transform duration-300 ease-out',
                        showDeleteConfirm
                          ? 'translate-x-0'
                          : '-translate-x-full pointer-events-none',
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (item) {
                            onDelete(item.id);
                            onOpenChange(false);
                          }
                        }}
                        className="min-w-0 flex-1 text-left font-['DM_Sans:SemiBold',sans-serif] text-[14px] text-white active:opacity-80"
                      >
                        Confirm delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(false)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/10 active:bg-white/20"
                        aria-label="Cancel delete"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Price — manual items only */}
                  {!isSynced && (
                    <>
                      <label
                        htmlFor="edit-item-price"
                        className="mb-2 block font-['DM_Sans:SemiBold',sans-serif] text-[13px] text-gray-700"
                      >
                        Price
                      </label>
                      <input
                        id="edit-item-price"
                        type="text"
                        inputMode="decimal"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.00"
                        className="min-h-11 w-full rounded-xl border border-[#E5E7EB] px-3 py-3 font-['DM_Sans:Regular',sans-serif] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1A9E8F]"
                      />

                      {!showPriceEditorOpen ? (
                        <button
                          type="button"
                          onClick={() => setShowPriceEditorOpen(true)}
                          className="mt-3 font-['DM_Sans:SemiBold',sans-serif] text-[13px] text-[#1A9E8F]"
                        >
                          + Add show price
                        </button>
                      ) : (
                        <>
                          <label
                            htmlFor="edit-item-show-price"
                            className="mb-2 mt-4 block font-['DM_Sans:SemiBold',sans-serif] text-[13px] text-gray-700"
                          >
                            🏪 Show price
                          </label>
                          <input
                            id="edit-item-show-price"
                            type="text"
                            inputMode="decimal"
                            value={showPrice}
                            onChange={(e) => setShowPrice(e.target.value)}
                            placeholder="0.00"
                            className="min-h-11 w-full rounded-xl border border-[#E5E7EB] px-3 py-3 font-['DM_Sans:Regular',sans-serif] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1A9E8F]"
                          />
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="shrink-0 px-4 pb-6 pt-3 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleSave}
                  className="min-h-[52px] w-full rounded-2xl bg-[#1A9E8F] font-['DM_Sans:SemiBold',sans-serif] text-[15px] text-white active:bg-[#157d71]"
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="min-h-[44px] w-full font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-400 active:text-gray-600"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
