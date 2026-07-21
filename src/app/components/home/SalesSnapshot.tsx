import { useMemo, useState } from 'react';
import { cardBorderTouchable } from '../cardBorder';
import {
  readSalesHistory,
  salesInRange,
  momChange,
  salesByMonth,
  salesByChannel,
} from '../../data/salesHistory';

const serif = { fontFamily: "'DM Serif Display', Georgia, serif" } as const;

function formatUsdInt(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

export default function SalesSnapshot() {
  const records = useMemo(() => readSalesHistory(), []);
  const last30 = useMemo(() => salesInRange(30, records), [records]);
  const mom = useMemo(() => momChange(records), [records]);
  const months = useMemo(() => salesByMonth(6, records), [records]);
  const channels = useMemo(() => salesByChannel(30, records), [records]);
  const [trendOpen, setTrendOpen] = useState(false);

  if (records.length === 0) return null;

  const maxMonth = Math.max(1, ...months.map((m) => m.gross));
  const channelTotal = Math.max(1, channels.etsy.gross + channels.pos.gross);
  const etsyPct = Math.round((channels.etsy.gross / channelTotal) * 100);
  const posPct = 100 - etsyPct;
  const momPositive = mom >= 0;

  return (
    <div className="mt-6">
      <h2 className="mb-3 font-['DM_Serif_Display',serif] text-[20px] text-gray-900" style={serif}>
        Sales
      </h2>

      <div className={`rounded-2xl bg-white px-4 py-4 ${cardBorderTouchable}`}>
        {/* Hero */}
        <p className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-400">
          Sales last 30 days
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-['DM_Serif_Display',serif] text-[32px] text-gray-900" style={serif}>
            {formatUsdInt(last30.gross)}
          </span>
          <span
            className={`font-['DM_Sans:SemiBold',sans-serif] text-[13px] ${
              momPositive ? 'text-[#1A9E8F]' : 'text-[#FF6600]'
            }`}
          >
            {momPositive ? '↑' : '↓'} {Math.abs(mom)}% vs last month
          </span>
        </div>

        {/* View trend toggle */}
        <button
          type="button"
          onClick={() => setTrendOpen((o) => !o)}
          className="mt-3 flex items-center gap-1 font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-500"
        >
          {trendOpen ? 'Hide trend' : 'View trend'}
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            style={{ transform: trendOpen ? 'rotate(180deg)' : 'none' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Accordion body: 6-month bars */}
        {trendOpen && (
          <div className="mt-3">
            <div className="flex h-24 items-end justify-between gap-2">
              {months.map((m, idx) => {
                const heightPct = Math.max(6, Math.round((m.gross / maxMonth) * 100));
                const isLast = idx === months.length - 1;
                return (
                  <div key={`${m.label}-${idx}`} className="flex flex-1 flex-col items-center gap-1">
                    <div className="flex h-20 w-full items-end justify-center">
                      <div
                        className={`flex w-full max-w-[26px] items-start justify-center rounded-t-md ${
                          isLast ? 'bg-[#1A9E8F]' : 'bg-[#B9E3DD]'
                        }`}
                        style={{ height: `${heightPct}%` }}
                      >
                        <span
                          className={`mt-0.5 font-['DM_Sans:SemiBold',sans-serif] text-[8px] ${
                            isLast ? 'text-white' : 'text-[#0F6E56]'
                          }`}
                        >
                          {formatUsdInt(m.gross)}
                        </span>
                      </div>
                    </div>
                    <span className="font-['DM_Sans:Regular',sans-serif] text-[10px] text-gray-400">
                      {m.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Channel split — always visible */}
        <div className="mt-4 flex gap-3">
          <div className="flex-1 rounded-xl bg-[#E1F5EE] px-3 py-3">
            <p className="mb-1 font-['DM_Sans:SemiBold',sans-serif] text-[12px] text-[#0F6E56]">Etsy</p>
            <p className="font-['DM_Sans:SemiBold',sans-serif] text-[18px] text-[#04342C]">
              {formatUsdInt(channels.etsy.gross)}
            </p>
            <p className="mt-0.5 font-['DM_Sans:Regular',sans-serif] text-[11px] text-[#0F6E56]">
              {channels.etsy.units} sold · {etsyPct}%
            </p>
          </div>
          <div className="flex-1 rounded-xl bg-[#EDEBFB] px-3 py-3">
            <p className="mb-1 font-['DM_Sans:SemiBold',sans-serif] text-[12px] text-[#3C3489]">POS</p>
            <p className="font-['DM_Sans:SemiBold',sans-serif] text-[18px] text-[#26215C]">
              {formatUsdInt(channels.pos.gross)}
            </p>
            <p className="mt-0.5 font-['DM_Sans:Regular',sans-serif] text-[11px] text-[#3C3489]">
              {channels.pos.units} sold · {posPct}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
