import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { CheckCircle2, CirclePlus, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import PageTitle from './PageTitle';
import CardItem from './inventory/CardItem';
import EditItemModal from './inventory/EditItemModal';
import LowStockClockIcon from './icons/LowStockClockIcon';
import { INVENTORY_DEMO_SEED, type InventoryRow } from '../data/inventoryDemo';
import {
  MAX_TRACKED_ITEMS,
  thumbnailListingIdForCopy,
  readTrackedFromStorage,
  writeTrackedToStorage,
} from '../inventory/trackedInventory';
import { appendActivityEvent } from '../data/activityLog';
import {
  type InventorySortTab,
  type InventorySortPrefs,
  sortInventoryRows,
} from '../inventory/inventoryUtils';

export default function Inventory() {
  const navigate = useNavigate();
  const location = useLocation();
  const [items, setItems] = useState<InventoryRow[]>(() => {
    const stored = readTrackedFromStorage();
    return stored && stored.length > 0 ? stored : [...INVENTORY_DEMO_SEED];
  });
  const [sortTab, setSortTab] = useState<InventorySortTab>('make_now');
  const [healthyFirst, setHealthyFirst] = useState(false);
  const [azDesc, setAzDesc] = useState(false);
  const [stockHighFirst, setStockHighFirst] = useState(true);
  const [selectedItem, setSelectedItem] = useState<InventoryRow | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [swipeRevision, setSwipeRevision] = useState(0);
  const [syncState, setSyncState] = useState<'idle' | 'syncing' | 'done'>('idle');
  const skipPersistRef = useRef(true);

  useEffect(() => {
    if (location.pathname !== '/inventory') return;
    const stored = readTrackedFromStorage();
    if (stored && stored.length > 0) {
      skipPersistRef.current = true;
      setItems(stored);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/inventory') return;
    const reopenId = (location.state as { reopenEditItemId?: number } | null)?.reopenEditItemId;
    if (reopenId == null) return;

    const row = items.find((item) => item.id === reopenId);
    if (row) {
      setSelectedItem(row);
      setSheetOpen(true);
    }
    navigate('/inventory', { replace: true, state: {} });
  }, [location.pathname, location.state, items, navigate]);

  useEffect(() => {
    if (skipPersistRef.current) {
      skipPersistRef.current = false;
      return;
    }
    writeTrackedToStorage(items);
  }, [items]);

  const sortPrefs: InventorySortPrefs = useMemo(
    () => ({
      tab: sortTab,
      azDesc,
      stockHighFirst,
      healthyFirst,
    }),
    [sortTab, azDesc, stockHighFirst, healthyFirst],
  );

  const handleSortTap = useCallback((tab: InventorySortTab) => {
    if (tab === 'make_now') {
      setSortTab('make_now');
      setHealthyFirst((prev) => (sortTab === 'make_now' ? !prev : prev));
      return;
    }
    if (tab === 'az') {
      setSortTab('az');
      setAzDesc((prev) => (sortTab === 'az' ? !prev : prev));
      return;
    }
    setSortTab('stock');
    setStockHighFirst((prev) => (sortTab === 'stock' ? !prev : prev));
  }, [sortTab]);

  const displayItems = useMemo(() => sortInventoryRows([...items], sortPrefs), [items, sortPrefs]);

  const openEdit = useCallback((item: InventoryRow) => {
    setSwipeRevision((r) => r + 1);
    setSelectedItem(item);
    setSheetOpen(true);
  }, []);

  const handleSave = (next: InventoryRow) => {
    setItems((prev) => prev.map((row) => (row.id === next.id ? next : row)));
    setSelectedItem(null);
  };

  const handleDelete = (id: number) => {
    setItems((prev) => {
      const removed = prev.find((row) => row.id === id);
      if (removed) {
        appendActivityEvent({
          type: 'item_deleted',
          itemId: removed.id,
          itemTitle: removed.title,
          detail: 'Removed from inventory',
          timestamp: Date.now(),
        });
      }
      return prev.filter((row) => row.id !== id);
    });
    setSelectedItem(null);
  };

  const handleCopy = useCallback(
    (item: InventoryRow) => {
      if (items.length >= MAX_TRACKED_ITEMS) {
        toast.error('Tracked item limit reached');
        return;
      }
      setSwipeRevision((r) => r + 1);
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
        },
      });
    },
    [items.length, navigate],
  );

  const goAddItem = () => {
    if (items.length >= MAX_TRACKED_ITEMS) return;
    navigate('/add-item');
  };

  const handleSync = async () => {
    if (syncState !== 'idle') return;
    setSyncState('syncing');
    await new Promise((r) => setTimeout(r, 1400));
    setSyncState('done');
    await new Promise((r) => setTimeout(r, 1800));
    setSyncState('idle');
  };

  const makeNowArrow = sortTab === 'make_now' ? (healthyFirst ? '↑' : '↓') : '↓';
  const qtyArrow = sortTab === 'stock' ? (stockHighFirst ? '↓' : '↑') : '↓';
  const azLabel = sortTab === 'az' ? (azDesc ? 'Z–A' : 'A–Z') : 'A–Z';
  const atTrackLimit = items.length >= MAX_TRACKED_ITEMS;

  return (
    <div className="relative isolate mx-auto flex h-full min-h-0 max-w-[430px] flex-col bg-white">
      <PageTitle title="Inventory" compact extendedFade />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <div className="flex items-center justify-between px-4 pb-1 pt-3">
          <button
            type="button"
            onClick={() => handleSync()}
            disabled={syncState !== 'idle'}
            className={`flex items-center gap-1.5 font-['DM_Sans:SemiBold',sans-serif] text-[13px] text-[#1A9E8F] ${
              syncState !== 'idle' ? 'pointer-events-none' : ''
            }`}
          >
            {syncState === 'idle' && (
              <>
                <RefreshCw size={14} strokeWidth={2.25} />
                Sync
              </>
            )}
            {syncState === 'syncing' && (
              <>
                <RefreshCw size={14} strokeWidth={2.25} className="animate-spin" />
                Syncing…
              </>
            )}
            {syncState === 'done' && (
              <>
                <CheckCircle2 size={14} strokeWidth={2.25} className="text-[#1A9E8F]" aria-hidden />
                Synced
              </>
            )}
          </button>
          <div className="flex flex-wrap items-center justify-end gap-x-1 gap-y-1">
            <button
              type="button"
              onClick={goAddItem}
              disabled={atTrackLimit}
              className={`flex min-h-[44px] items-center gap-1.5 font-['DM_Sans:SemiBold',sans-serif] text-[13px] ${
                atTrackLimit
                  ? 'cursor-default text-gray-300 [&_svg]:text-gray-300'
                  : 'text-[#1A9E8F]'
              }`}
            >
              <CirclePlus size={15} strokeWidth={2} />
              Add
            </button>
            {atTrackLimit && (
              <button
                type="button"
                onClick={() => navigate('/pricing')}
                className="font-['DM_Sans:Regular',sans-serif] text-[11px] leading-none text-[#1A9E8F] underline"
              >
                Upgrade
              </button>
            )}
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-center gap-2 border-b border-gray-100 px-4 py-4">
            <button
              type="button"
              onClick={() => handleSortTap('make_now')}
              className={`flex items-center gap-1 rounded-full border px-3 py-2 font-['DM_Sans:SemiBold',sans-serif] text-[12px] ${
                sortTab === 'make_now'
                  ? 'border-[#1A9E8F] bg-[#1A9E8F] text-white'
                  : 'border-gray-300 bg-white text-gray-600'
              }`}
            >
              <LowStockClockIcon
                className={`size-3 shrink-0 ${sortTab === 'make_now' ? 'text-white' : 'text-[#FF6600]'}`}
                aria-hidden
              />
              Make now{' '}
              <span aria-hidden>{makeNowArrow}</span>
            </button>
            <button
              type="button"
              onClick={() => handleSortTap('az')}
              className={`rounded-full border px-3 py-2 font-['DM_Sans:SemiBold',sans-serif] text-[12px] ${
                sortTab === 'az'
                  ? 'border-[#1A9E8F] bg-[#1A9E8F] text-white'
                  : 'border-gray-300 bg-white text-gray-600'
              }`}
            >
              {azLabel}
            </button>
            <button
              type="button"
              onClick={() => handleSortTap('stock')}
              className={`rounded-full border px-3 py-2 font-['DM_Sans:SemiBold',sans-serif] text-[12px] ${
                sortTab === 'stock'
                  ? 'border-[#1A9E8F] bg-[#1A9E8F] text-white'
                  : 'border-gray-300 bg-white text-gray-600'
              }`}
            >
              Qty {qtyArrow}
            </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-28">
          <div className="flex flex-col gap-3 pt-3">
            {displayItems.map((item) => (
              <CardItem
                key={item.id}
                item={item}
                swipeRevision={swipeRevision}
                onOpen={() => openEdit(item)}
                onDelete={() => handleDelete(item.id)}
                onCopy={() => handleCopy(item)}
              />
            ))}
          </div>

          {displayItems.length === 0 && (
            <p className="py-12 text-center font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-500">
              No items tracked yet.
            </p>
          )}
        </div>
      </div>

      <EditItemModal
        open={sheetOpen}
        item={selectedItem}
        onOpenChange={(open) => {
          setSheetOpen(open);
          if (!open) setSelectedItem(null);
        }}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}
