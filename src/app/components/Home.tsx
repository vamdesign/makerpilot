import { useEffect, useMemo, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import PageTitle from './PageTitle';
import { readTrackedFromStorage, writeTrackedToStorage } from '../inventory/trackedInventory';
import { INVENTORY_DEMO_SEED, type InventoryRow } from '../data/inventoryDemo';
import { needsMaking, formatLeadLabel } from '../inventory/inventoryUtils';
import { upcomingHolidays } from '../data/holidays';
import SalesSnapshot from './home/SalesSnapshot';
import { salesForItem } from '../data/salesHistory';
import { cardBorderTouchable } from './cardBorder';
import EditItemModal from './inventory/EditItemModal';
import {
  readActivityLog,
  relativeTime,
  eventLabel,
  appendActivityEvent,
} from '../data/activityLog';

const serif = { fontFamily: "'DM Serif Display', Georgia, serif" } as const;

const INSIGHTS: Record<number, { trend: string; guidance: string; cooling?: boolean }> = {
  2: {
    trend: 'Selling faster than you can restock. Sold 10 last week, 4 in stock.',
    guidance: 'Recent batches ran 3 wks, not 2. Consider making more and updating lead times.',
  },
  5: {
    trend: 'Cooling off. Sold 3 last week, down from 8. You have 3 in stock.',
    guidance: 'Enough stock for now. No need to make more right now.',
    cooling: true,
  },
};

function Sparkline({ cooling }: { cooling?: boolean }) {
  const up = 'M2 16 L10 12 L18 13 L26 5';
  const down = 'M2 5 L10 8 L18 7 L26 15';
  return (
    <svg width="30" height="20" viewBox="0 0 30 20" fill="none" aria-hidden>
      <path
        d={cooling ? down : up}
        stroke={cooling ? '#9CA3AF' : '#FF6600'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {!cooling && (
        <path d="M20 5 L26 5 L26 11" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {cooling && (
        <path d="M20 15 L26 15 L26 9" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export default function Home() {
  const [items, setItems] = useState<InventoryRow[]>(() => {
    const stored = readTrackedFromStorage();
    return stored && stored.length > 0 ? stored : [...INVENTORY_DEMO_SEED];
  });

  useEffect(() => {
    writeTrackedToStorage(items);
  }, [items]);

  const [selectedItem, setSelectedItem] = useState<InventoryRow | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const holidays = upcomingHolidays();
  const [holidayOpen, setHolidayOpen] = useState(false);

  // Auto-dismiss the holiday countdown after a few seconds; user can tap the icon to reopen/close.
  useEffect(() => {
    if (!holidayOpen) return;
    const t = setTimeout(() => setHolidayOpen(false), 5000);
    return () => clearTimeout(t);
  }, [holidayOpen]);

  const openEdit = (item: InventoryRow) => {
    setSelectedItem(item);
    setSheetOpen(true);
  };

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

  const needsMakingRows = useMemo(
    () => [...items].filter(needsMaking).sort((a, b) => a.stock - b.stock),
    [items],
  );
  const topSellers = useMemo(() => items.filter((i) => i.isTopSeller), [items]);

  const [openId, setOpenId] = useState<number | null>(null);
  const [activityExpanded, setActivityExpanded] = useState(false);
  const allActivity = useMemo(() => readActivityLog(), [items]);
  const visibleActivity = useMemo(
    () => (activityExpanded ? allActivity : allActivity.slice(0, 5)),
    [allActivity, activityExpanded],
  );
  const hasMore = allActivity.length > 5;

  return (
    <div className="relative isolate mx-auto flex h-full min-h-0 max-w-[393px] flex-col bg-white">
      <PageTitle title="Home" compact={true} />

      <div className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-24 pt-12">

        {/* Top toolbar — holiday countdown (same placement/style as Inventory's Add button) */}
        {holidays.length > 0 && (
          <div className="relative z-30 mb-2 flex items-center justify-end">
            <button
              type="button"
              onClick={() => setHolidayOpen((o) => !o)}
              aria-label="Upcoming holidays"
              className="flex min-h-[44px] items-center gap-1.5 font-['DM_Sans:SemiBold',sans-serif] text-[13px] text-[#1A9E8F]"
            >
              <CalendarDays size={18} strokeWidth={2} />
            </button>
            {holidayOpen && (
              <div className="absolute left-0 right-0 top-full mt-1 rounded-xl bg-[#3333CC] px-4 py-3 text-white shadow-lg">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-['DM_Sans:SemiBold',sans-serif] text-[13px]">
                    {holidays.length === 1 ? 'Upcoming holiday' : 'Upcoming holidays'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setHolidayOpen(false)}
                    aria-label="Dismiss"
                    className="-mr-1 -mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 active:bg-white/30"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="mt-2 flex flex-col divide-y divide-white/15">
                  {holidays.map((h) => (
                    <div key={h.name} className="flex items-center justify-between gap-4 py-1.5 first:pt-0 last:pb-0">
                      <span className="font-['DM_Sans:Regular',sans-serif] text-[13px]">{h.name}</span>
                      <span className="shrink-0 font-['DM_Sans:SemiBold',sans-serif] text-[13px]">
                        {h.days === 0 ? 'Today' : h.days === 1 ? '1 day' : `${h.days} days`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Needs making */}
        {needsMakingRows.length === 0 ? (
          <div className="mb-8">
            <p className="font-['DM_Serif_Display',serif] text-[20px] text-[#1A9E8F]" style={serif}>
              Stock levels are good!
            </p>
            <p className="mt-1 font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-500">
              Nothing needs making right now
            </p>
          </div>
        ) : (
          <>
            <h2 className="mb-3 font-['DM_Serif_Display',serif] text-[20px] text-gray-900" style={serif}>
              Needs making
            </h2>
            <div className={`mb-8 overflow-hidden rounded-2xl bg-white ${cardBorderTouchable}`}>
              {needsMakingRows.map((item, idx) => {
                const insight = INSIGHTS[item.id];
                const isOpen = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className={idx < needsMakingRows.length - 1 ? 'border-b border-[#E5E7EB]' : ''}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="flex w-full items-center gap-3 bg-white px-4 py-3 text-left active:bg-gray-50"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-['DM_Sans:SemiBold',sans-serif] text-[14px] text-[#373737]">
                          {item.title}
                        </p>
                        <p className="mt-0.5 font-['DM_Sans:Regular',sans-serif] text-[12px] text-[#1A9E8F]">
                          {formatLeadLabel(item.leadTime, item.leadTimeUnit)} ·{' '}
                          <span className="text-[#FF6600]">Stock {item.stock}</span>
                        </p>
                      </div>
                      <Sparkline cooling={insight?.cooling} />
                      <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="border-t border-[#E5E7EB] px-4 py-3">
                        {insight && (
                          <>
                            <p className="font-['DM_Sans:Regular',sans-serif] text-[12px] leading-relaxed text-gray-600">
                              {insight.trend}
                            </p>
                            <p className="mt-2 font-['DM_Sans:Regular',sans-serif] text-[12px] leading-relaxed text-gray-600">
                              {insight.guidance}
                            </p>
                          </>
                        )}
                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          className="mt-3 w-full rounded-xl bg-[#1A9E8F] py-3 font-['DM_Sans:SemiBold',sans-serif] text-[14px] text-white active:bg-[#157d71]"
                        >
                          Update inventory
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Sales */}
        <SalesSnapshot />

        {/* Top sellers — glance-only rows */}
        {topSellers.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 font-['DM_Serif_Display',serif] text-[20px] text-gray-900" style={serif}>
              Trending
            </h2>
            <div className={`mb-8 overflow-hidden rounded-2xl bg-white ${cardBorderTouchable}`}>
              {topSellers.map((item, idx) => {
                const Thumbnail = item.Thumbnail;
                const sold30 = salesForItem(item.id, 30);
                const insight = INSIGHTS[item.id];
                const cooling = insight?.cooling;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 bg-white px-4 py-3 ${
                      idx < topSellers.length - 1 ? 'border-b border-[#E5E7EB]' : ''
                    }`}
                  >
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100 [&_svg]:size-full [&_img]:size-full [&_img]:object-cover">
                      <Thumbnail />
                    </div>
                    <p className="min-w-0 flex-1 truncate font-['DM_Sans:Regular',sans-serif] text-[13px] text-[#373737]">
                      {item.title}
                    </p>
                    <span
                      className={`font-['DM_Sans:Regular',sans-serif] text-[11px] ${
                        cooling ? 'text-gray-400' : 'text-[#FF6600]'
                      }`}
                    >
                      {cooling ? '↘ cooling' : '↗ up'}
                    </span>
                    <span className="w-7 text-right font-['DM_Sans:SemiBold',sans-serif] text-[14px] text-[#373737]">
                      {sold30}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Recent activity */}
        {allActivity.length > 0 && (
          <div className="mt-6">
            <h2 className="mb-3 font-['DM_Serif_Display',serif] text-[20px] text-gray-900" style={serif}>
              Recent activity
            </h2>
            <div className={`overflow-hidden rounded-2xl bg-white ${cardBorderTouchable}`}>
              {visibleActivity.map((event, idx) => (
                <div
                  key={event.id}
                  className={`flex w-full items-center gap-3 bg-white px-4 py-3 ${
                    idx < visibleActivity.length - 1 ? 'border-b border-[#E5E7EB]' : ''
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-['DM_Sans:SemiBold',sans-serif] text-[13px] text-[#373737]">
                      {event.itemTitle}
                    </p>
                    <p className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-500">
                      {eventLabel(event.type)} · {event.detail}
                    </p>
                  </div>
                  <p className="shrink-0 font-['DM_Sans:Regular',sans-serif] text-[11px] text-gray-400">
                    {relativeTime(event.timestamp)}
                  </p>
                </div>
              ))}

              {hasMore && (
                <div
                  className="flex w-full items-center justify-between border-t border-[#E5E7EB] bg-white px-4 py-3 active:bg-gray-50"
                  role="button"
                  tabIndex={0}
                  onClick={() => setActivityExpanded((v) => !v)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActivityExpanded((v) => !v);
                    }
                  }}
                >
                  <p className="font-['DM_Sans:Regular',sans-serif] text-[13px] text-[#1A9E8F]">
                    {activityExpanded ? 'Show less' : 'Show more'}
                  </p>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A9E8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ transform: activityExpanded ? 'rotate(180deg)' : 'none' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        )}

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
