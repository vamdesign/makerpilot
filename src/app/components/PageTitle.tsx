import type { ReactNode } from 'react';
import CornerPlaneMark from './CornerPlaneMark';
import CloudSkyHeaderBand from './CloudSkyHeaderBand';
import { screenHeaderClassName } from './screenLayout';

/**
 * Screen title block — same chrome as Choose listings / Set limits: static wordmark (top-right) +
 * centered DM Serif headline + DM Sans subtitle. Parent screen must use `relative` positioning.
 */
export default function PageTitle({
  title,
  subtitle,
  action,
  compact = false,
  extendedFade = false,
}: {
  title: string;
  subtitle?: string;
  /** e.g. teal link, right-aligned under the title */
  action?: ReactNode;
  /** Shorter header for form screens (keyboard-friendly). */
  compact?: boolean;
  /** Taller sky fade for screens with toolbar rows below the title (Inventory). */
  extendedFade?: boolean;
}) {
  const showMeta = Boolean(subtitle) || Boolean(action);

  return (
    <>
      <CornerPlaneMark />

      <CloudSkyHeaderBand compact={compact} extended={extendedFade} />

      <header
        className={`relative z-10 shrink-0 bg-transparent ${screenHeaderClassName(compact ? 'pb-2' : '')}`}
      >
        <h1
          className={`text-center text-2xl leading-tight text-gray-900 ${
            showMeta ? (compact ? 'mb-1' : 'mb-2') : ''
          }`}
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          {title}
        </h1>
        {subtitle ? (
          <p
            className={`px-1 text-center font-['DM_Sans:Regular',sans-serif] leading-snug text-gray-500 ${
              compact ? 'text-[12px]' : 'text-[14px]'
            }`}
          >
            {subtitle}
          </p>
        ) : null}
        {action ? (
          <div className="mt-1 flex justify-end px-0.5">{action}</div>
        ) : null}
      </header>
    </>
  );
}
