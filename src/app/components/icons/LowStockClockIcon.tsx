import { twMerge } from 'tailwind-merge';

type Props = { className?: string; 'aria-label'?: string };

/** Minimal line-art clock for low-stock affordance — CSS/SVG only, no emoji. */
export default function LowStockClockIcon({ className, 'aria-label': ariaLabel }: Props) {
  return (
    <svg
      className={twMerge('h-4 w-4 shrink-0 text-current', className)}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaLabel ? undefined : true}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
    >
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 4.75v3.25l2.5 1.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
