import type { ReactNode } from 'react';
import { Minus, Plus } from 'lucide-react';

export const STEPPER_LABEL_CLASS =
  "w-[6.5rem] shrink-0 whitespace-nowrap font-['DM_Sans:Regular',sans-serif] text-[13px] text-gray-700";

export const STEPPER_AFTER_PLUS_GAP = 'gap-2';

export const STEPPER_SUFFIX_SLOT_CLASS =
  'flex w-[72px] shrink-0 items-center justify-center';

export const STEPPER_BTN_CLASS =
  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100';

export const STEPPER_VALUE_CLASS =
  "w-8 shrink-0 text-center font-['DM_Sans:SemiBold',sans-serif] text-[16px] tabular-nums text-gray-900";

const BTN_CLASS = STEPPER_BTN_CLASS;
const VALUE_CLASS = STEPPER_VALUE_CLASS;

export interface StepperControlRowProps {
  label: string;
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
  suffix?: ReactNode;
  className?: string;
}

export default function StepperControlRow({
  label,
  value,
  onDecrement,
  onIncrement,
  suffix,
  className = 'mb-3',
}: StepperControlRowProps) {
  return (
    <div className={`flex w-full items-center gap-1.5 ${className}`}>
      <span className={STEPPER_LABEL_CLASS}>{label}</span>
      <div className={`flex min-w-0 flex-1 items-center ${STEPPER_AFTER_PLUS_GAP}`}>
        <div className="flex shrink-0 items-center gap-1.5">
          <button type="button" className={BTN_CLASS} onClick={onDecrement}>
            <Minus size={16} className="text-gray-600" />
          </button>
          <span className={VALUE_CLASS}>{value}</span>
          <button type="button" className={BTN_CLASS} onClick={onIncrement}>
            <Plus size={16} className="text-gray-600" />
          </button>
        </div>
        {suffix != null && (
          <div className={STEPPER_SUFFIX_SLOT_CLASS}>{suffix}</div>
        )}
      </div>
    </div>
  );
}

export function StepperSuffixText({ children }: { children: ReactNode }) {
  return (
    <span className="text-center font-['DM_Sans:Regular',sans-serif] text-[13px] text-gray-700">
      {children}
    </span>
  );
}