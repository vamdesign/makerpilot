import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';
import type { LeadTimeUnit } from '../data/inventoryDemo';
import PageTitle from './PageTitle';
import { cardBorderTouchable } from './cardBorder';
import {
  StepperSuffixText,
  STEPPER_BTN_CLASS,
  STEPPER_LABEL_CLASS,
  STEPPER_VALUE_CLASS,
} from './inventory/StepperControlRow';
import { appendManualTrackedItem } from '../inventory/trackedInventory';
import { appendActivityEvent } from '../data/activityLog';
import GenericItemPlaceholder from './icons/GenericItemPlaceholder';

function readDefaultLeadFromStorage(): { time: number; unit: LeadTimeUnit } {
  const raw = localStorage.getItem('defaultLeadTime');
  const n = raw ? parseInt(raw, 10) : NaN;
  if (Number.isFinite(n) && n > 0) return { time: n, unit: 'days' };
  return { time: 2, unit: 'weeks' };
}

type TimeUnit = LeadTimeUnit;

function LeadTimeUnitButton({ unit, onCycle }: { unit: TimeUnit; onCycle: () => void }) {
  const label = unit === 'days' ? 'Day' : unit === 'weeks' ? 'Wks' : 'Mnth';
  return (
    <button
      type="button"
      onClick={onCycle}
      className="flex h-9 w-full max-w-[72px] shrink-0 items-center justify-center gap-1 rounded-full border border-[#1A9E8F] bg-[#E6F4F2] px-2 py-1.5"
    >
      <span className="font-['DM_Sans:SemiBold',sans-serif] text-[12px] text-[#1A9E8F]">
        {label}
      </span>
      <div className="-space-y-1.5 flex flex-col items-center justify-center leading-none [&_svg]:block [&_svg]:shrink-0">
        <svg className="h-2.5 w-2.5 text-[#1A9E8F]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 6.414l-3.293 3.293a1 1 0 01-1.414 0z" />
        </svg>
        <svg className="h-2.5 w-2.5 text-[#1A9E8F]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 13.586l3.293-3.293a1 1 0 011.414 0z" />
        </svg>
      </div>
    </button>
  );
}

export default function AddItem() {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState('');
  const [stock, setStock] = useState(0);
  const [leadInit] = useState(readDefaultLeadFromStorage);
  const [leadTime, setLeadTime] = useState(leadInit.time);
  const [leadUnit, setLeadUnit] = useState<LeadTimeUnit>(leadInit.unit);
  const [price, setPrice] = useState('');
  const [threshold, setThreshold] = useState(3);
  const [showsOnly, setShowsOnly] = useState(false);

  const cycleLeadUnit = () => {
    const units: TimeUnit[] = ['days', 'weeks', 'months'];
    const idx = units.indexOf(leadUnit);
    setLeadUnit(units[(idx + 1) % units.length]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = itemName.trim();
    if (!title) {
      toast.error('Enter an item name');
      return;
    }

    const saved = appendManualTrackedItem({
      title,
      stock,
      alertThreshold: threshold,
      leadTime,
      leadTimeUnit: leadUnit,
      price,
    });

    if (!saved) {
      toast('10-item limit reached for this MVP.', {
        description: 'Remove an item to add another.',
      });
      return;
    }

    appendActivityEvent({
      type: 'item_added',
      itemId: saved.id,
      itemTitle: saved.title,
      detail: `Stock ${stock}`,
      timestamp: Date.now(),
    });

    toast.success('Item added successfully!');
    navigate('/inventory');
  };

  return (
    <div className="relative isolate mx-auto flex h-full min-h-0 max-w-[393px] flex-col bg-white">
      <div className="shrink-0">
        <PageTitle compact title="Add item" subtitle="Enter details for a new listing." />
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 pb-28 pt-3"
      >
        {/* Item name */}
        <div className="mb-4">
          <label
            htmlFor="itemName"
            className="mb-2 block font-['DM_Sans:SemiBold',sans-serif] text-[13px] text-gray-700"
          >
            Item name
          </label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="min-h-11 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 font-['DM_Sans:Regular',sans-serif] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1A9E8F]"
            placeholder="Describe your item"
            required
          />
        </div>

        {/* Stock + limits — same row pattern as Set limits */}
        <div className={`mb-4 rounded-2xl bg-white p-4 ${cardBorderTouchable}`}>
          <div className="mb-3 flex items-center gap-3">
            <span className={STEPPER_LABEL_CLASS}>Current stock</span>
            <button
              type="button"
              className={STEPPER_BTN_CLASS}
              onClick={() => setStock(Math.max(0, stock - 1))}
            >
              <Minus size={16} className="text-gray-600" />
            </button>
            <span className={STEPPER_VALUE_CLASS}>{stock}</span>
            <button type="button" className={STEPPER_BTN_CLASS} onClick={() => setStock(stock + 1)}>
              <Plus size={16} className="text-gray-600" />
            </button>
          </div>
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className={STEPPER_LABEL_CLASS}>Notify me when</span>
            <button
              type="button"
              className={STEPPER_BTN_CLASS}
              onClick={() => setThreshold((t) => Math.max(0, t - 1))}
            >
              <Minus size={16} className="text-gray-600" />
            </button>
            <span className={STEPPER_VALUE_CLASS}>{threshold}</span>
            <button type="button" className={STEPPER_BTN_CLASS} onClick={() => setThreshold((t) => t + 1)}>
              <Plus size={16} className="text-gray-600" />
            </button>
            <StepperSuffixText>In stock</StepperSuffixText>
          </div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className={STEPPER_LABEL_CLASS}>Time to make</span>
            <button
              type="button"
              className={STEPPER_BTN_CLASS}
              onClick={() => setLeadTime(Math.max(1, leadTime - 1))}
            >
              <Minus size={16} className="text-gray-600" />
            </button>
            <span className={STEPPER_VALUE_CLASS}>{leadTime}</span>
            <button type="button" className={STEPPER_BTN_CLASS} onClick={() => setLeadTime(leadTime + 1)}>
              <Plus size={16} className="text-gray-600" />
            </button>
            <LeadTimeUnitButton unit={leadUnit} onCycle={cycleLeadUnit} />
          </div>

          <label
            htmlFor="price"
            className="mb-2 block font-['DM_Sans:SemiBold',sans-serif] text-[13px] text-gray-700"
          >
            Price (optional)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-500">
              $
            </span>
            <input
              type="text"
              inputMode="decimal"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="min-h-11 w-full rounded-xl border border-[#E5E7EB] py-3 pl-8 pr-4 font-['DM_Sans:Regular',sans-serif] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1A9E8F]"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Shows only toggle */}
        <div className={`mb-4 flex items-center justify-between rounded-2xl bg-white p-4 ${cardBorderTouchable}`}>
          <div>
            <p className="font-['DM_Sans:SemiBold',sans-serif] text-[14px] text-gray-900">Shows only</p>
            <p className="mt-0.5 font-['DM_Sans:Regular',sans-serif] text-[12px] text-gray-500">
              Only sold at craft shows/markets
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowsOnly(!showsOnly)}
            className={`relative h-8 w-14 rounded-full ${showsOnly ? 'bg-[#1A9E8F]' : 'bg-gray-300'}`}
            style={{ zIndex: 0 }}
          >
            <div
              className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-transform ${
                showsOnly ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Photo upload — last, optional; default is paper-plane placeholder */}
        <div className="mb-6">
          <label className="mb-2 block font-['DM_Sans:SemiBold',sans-serif] text-[13px] text-gray-700">
            Item photo (optional)
          </label>
          <button
            type="button"
            className="flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-[#E5E7EB] bg-white py-6"
            onClick={() => toast.message('Photo upload coming soon')}
          >
            <div className="h-24 w-24 overflow-hidden rounded-xl [&_img]:size-full [&_img]:object-contain [&_svg]:size-full">
              <GenericItemPlaceholder />
            </div>
            <span className="rounded-xl bg-white/70 px-3 py-2 font-['DM_Sans:Regular',sans-serif] text-[13px] text-gray-600">
              Tap to add photo
            </span>
          </button>
        </div>

        <button
          type="submit"
          className="mb-3 w-full rounded-xl bg-[#1A9E8F] py-4 font-['DM_Sans:SemiBold',sans-serif] text-[14px] text-white"
        >
          Save item
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 min-h-[44px] w-full font-['DM_Sans:Regular',sans-serif] text-[14px] text-gray-400 active:text-gray-600"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
