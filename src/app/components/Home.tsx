import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import PageTitle from './PageTitle';
import { readTrackedFromStorage } from '../inventory/trackedInventory';
import { INVENTORY_DEMO_SEED } from '../data/inventoryDemo';
import type { InventoryRow } from '../data/inventoryDemo';
import { needsMaking, formatLeadLabel } from '../inventory/inventoryUtils';
import TopSellersStrip from './home/TopSellersStrip';
import { cardBorderTouchable } from './cardBorder';
import {
  readActivityLog,
  relativeTime,
  eventLabel,
} from '../data/activityLog';

function parsePriceToNumber(price: string): number {
  const n = parseFloat(price.replace(/[$,]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

function inventoryValue(items: InventoryRow[]): number {
  return items.reduce((sum, item) => sum + item.stock * parsePriceToNumber(item.price), 0);
}

function formatUsdInt(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

export default function Home() {
  const navigate = useNavigate();
  const items = readTrackedFromStorage() ?? INVENTORY_DEMO_SEED;

  const needsMakingRows = useMemo(
    () => [...items].filter(needsMaking).sort((a, b) => a.stock - b.stock),
    [items],
  );
  const topSellers = useMemo(() => items.filter((i) => i.isTopSeller), [items]);
  const inventoryTotal = useMemo(() => inventoryValue(items), [items]);
  const totalUnitsInStock = useMemo(
    () => items.reduce((sum, row) => sum + Math.max(0, row.stock), 0),
    [items],
  );
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

        {/* Section 1 — Needs Making / All good */}
        {needsMakingRows.length === 0 ? (
          <div className="mb-8">
            <p
              className="font-['DM_Serif_Display',serif] text-[20px] text-[#1A9E8F]"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Stock levels are good!
            </p>
            <p className="mt-1 font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-500">
              Nothing needs making right now
            </p>
          </div>
        ) : (
          <>
            <h2
              className="mb-3 font-['DM_Serif_Display',serif] text-[20px] text-gray-900"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Needs making
            </h2>
            <div className={`mb-8 overflow-hidden rounded-2xl bg-white ${cardBorderTouchable}`}>
              {needsMakingRows.map((item, idx) => {
                const Thumbnail = item.Thumbnail;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigate('/inventory')}
                    className={`flex w-full items-center gap-3 bg-white px-4 py-3 text-left active:bg-gray-50 ${
                      idx < needsMakingRows.length - 1 ? 'border-b border-[#E5E7EB]' : ''
                    }`}
                  >
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100 [&_svg]:size-full">
                      <Thumbnail />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-['DM_Sans:SemiBold',sans-serif] text-[13px] text-[#373737]">
                        {item.title}
                      </p>
                      <p className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-[#1A9E8F]">
                        {formatLeadLabel(item.leadTime, item.leadTimeUnit)}
                      </p>
                    </div>
                    <p className="shrink-0 font-['DM_Sans:SemiBold',sans-serif] text-[13px] text-[#FF6600]">
                      Stock: {item.stock}
                    </p>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Section 2 — Top Sellers */}
        {topSellers.length > 0 && (
          <>
            <h2
              className="mb-3 font-['DM_Serif_Display',serif] text-[20px] text-gray-900"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Top sellers
            </h2>
            <TopSellersStrip>
              {topSellers.map((item) => {
                const Thumbnail = item.Thumbnail;
                return (
                  <div
                    key={item.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate('/inventory')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate('/inventory');
                      }
                    }}
                    className={`flex w-[100px] shrink-0 flex-col items-center rounded-xl bg-white p-2 active:border-[#1A9E8F] ${cardBorderTouchable}`}
                  >
                    <div className="mb-2 h-14 w-14 overflow-hidden rounded-xl bg-gray-100 [&_svg]:size-full">
                      <Thumbnail />
                    </div>
                    <p className="line-clamp-2 text-center font-['DM_Sans:Regular',sans-serif] text-[11px] leading-tight text-gray-700">
                      {item.title}
                    </p>
                    <p className="mt-1 font-['DM_Sans:Regular',sans-serif] text-[11px] text-gray-400">
                      Stock: {item.stock}
                    </p>
                  </div>
                );
              })}
            </TopSellersStrip>
          </>
        )}

        {/* Section 3 — Inventory overview */}
        <div className="mt-6">
          <h2
            className="mb-3 font-['DM_Serif_Display',serif] text-[20px] text-gray-900"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Inventory overview
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className={`rounded-2xl bg-white px-3 py-4 ${cardBorderTouchable}`}>
              <p className="mb-2 font-['DM_Sans:Regular',sans-serif] text-[11px] text-gray-400">
                Inventory value
              </p>
              <p
                className="font-['DM_Serif_Display',serif] text-[24px] text-gray-900"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                {formatUsdInt(inventoryTotal)}
              </p>
            </div>
            <div className={`rounded-2xl bg-white px-3 py-4 ${cardBorderTouchable}`}>
              <p className="mb-2 font-['DM_Sans:Regular',sans-serif] text-[11px] text-gray-400">
                Items in stock
              </p>
              <p
                className="font-['DM_Serif_Display',serif] text-[24px] text-gray-900"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                {totalUnitsInStock}
              </p>
            </div>
          </div>
        </div>

        {/* Section 4 — Recent Activity */}
        {allActivity.length > 0 && (
          <div className="mt-6">
            <h2
              className="mb-3 font-['DM_Serif_Display',serif] text-[20px] text-gray-900"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
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

              {hasMore && !activityExpanded && (
                <div
                  className="flex w-full items-center justify-between border-t border-[#E5E7EB] bg-white px-4 py-3 active:bg-gray-50"
                  role="button"
                  tabIndex={0}
                  onClick={() => setActivityExpanded(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActivityExpanded(true);
                    }
                  }}
                >
                  <p className="font-['DM_Sans:Regular',sans-serif] text-[13px] text-[#1A9E8F]">
                    Show more
                  </p>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1A9E8F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              )}

              {hasMore && activityExpanded && (
                <div
                  className="flex w-full items-center justify-between border-t border-[#E5E7EB] bg-white px-4 py-3 active:bg-gray-50"
                  role="button"
                  tabIndex={0}
                  onClick={() => setActivityExpanded(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActivityExpanded(false);
                    }
                  }}
                >
                  <p className="font-['DM_Sans:Regular',sans-serif] text-[13px] text-[#1A9E8F]">
                    Show less
                  </p>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1A9E8F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <polyline points="6 15 12 9 18 15" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
