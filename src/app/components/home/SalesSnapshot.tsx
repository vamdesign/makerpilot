import { useMemo } from 'react';
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

  if (records.length === 0) return null;

  const maxMonth = Math.max(1, ...months.map((m) => m.gross));
  const channelTotal = Math.max(1, channels.etsy.gross + channels.pos.gross);
  const etsyPct = Math.round((channels.etsy.gross / channelTotal) * 100);
  const posPct = 100 - etsyPct;

  const momPositive = mom >= 0;

  return (
    <div className="mt-6">
      <h2
        className="mb-3 font-['DM_Serif_Display',serif] text-[20px] text-gray-900"
        style={serif}
      >
        Sales
      </h2>

      {/* Revenue + units */}
      <div className="mb-3 grid grid-cols-2 gap-3">
        <div className={`rounded-2xl bg-white px-3 py-4 ${cardBorderTouchable}`}>
          <p className="mb-2 font-['DM_Sans:Regular',sans-serif] text-[11px] text-gray-400">
            Revenue (30d)
          </p>
          <p
            className="font-['DM_Serif_Display',serif] text-[24px] text-gray-900"
            style={serif}
          >
            {formatUsdInt(last30.gross)}
          </p>
          <p
            className={`mt-1 font-['DM_Sans:SemiBold',sans-serif] text-[12px] ${
              momPositive ? 'text-[#1A9E8F]' : 'text-[#FF6600]'
            }`}
          >
            {momPositive ? '▲' : '▼'} {Math.abs(mom)}% vs prior 30d
          </p>
        </div>
        <div className={`rounded-2xl bg-white px-3 py-4 ${cardBorderTouchable}`}>
          <p className="mb-2 font-['DM_Sans:Regular',sans-serif] text-[11px] text-gray-400">
            Units sold (30d)
          </p>
          <p
            className="font-['DM_Serif_Display',serif] text-[24px] text-gray-900"
            style={serif}
          >
            {last30.units}
          </p>
          <p className="mt-1 font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-400">
            across all channels
          </p>
        </div>
      </div>

      {/* 6-month trend */}
      <div className={`mb-3 rounded-2xl bg-white px-4 py-4 ${cardBorderTouchable}`}>
        <p className="mb-3 font-['DM_Sans:Regular',sans-serif] text-[11px] text-gray-400">
          Revenue · last 6 months
        </p>
        <div className="flex h-24 items-end justify-between gap-2">
          {months.map((m, idx) => {
            const heightPct = Math.max(6, Math.round((m.gross / maxMonth) * 100));
            const isLast = idx === months.length - 1;
            return (
              <div key={`${m.label}-${idx}`} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex h-20 w-full items-end justify-center">
                  <div
                    className={`w-full max-w-[22px] rounded-t-md ${
                      isLast ? 'bg-[#1A9E8F]' : 'bg-[#B9E3DD]'
                    }`}
                    style={{ height: `${heightPct}%` }}
                    title={formatUsdInt(m.gross)}
                  />
                </div>
                <span className="font-['DM_Sans:Regular',sans-serif] text-[10px] text-gray-400">
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Channel split */}
      <div className={`rounded-2xl bg-white px-4 py-4 ${cardBorderTouchable}`}>
        <p className="mb-3 font-['DM_Sans:Regular',sans-serif] text-[11px] text-gray-400">
          Channel split (30d)
        </p>
        <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div className="h-full bg-[#1A9E8F]" style={{ width: `${etsyPct}%` }} />
          <div className="h-full bg-[#FF6600]" style={{ width: `${posPct}%` }} />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#1A9E8F]" />
            <span className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-[#373737]">
              Etsy · {formatUsdInt(channels.etsy.gross)} ({etsyPct}%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF6600]" />
            <span className="font-['DM_Sans:Regular',sans-serif] text-[12px] text-[#373737]">
              In person · {formatUsdInt(channels.pos.gross)} ({posPct}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
