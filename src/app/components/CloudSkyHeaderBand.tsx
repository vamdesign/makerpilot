import baseGradient from '../../assets/base-gradient.png';

/** Where the background ends — measured from screen top */
const COMPACT_BAND_HEIGHT = '11.75rem'; // Home, Account (~188px)
const EXTENDED_BAND_HEIGHT = '14.75rem'; // Inventory — sync + sort rows (~236px)
const FULL_BAND_HEIGHT = '16.25rem'; // form / onboarding screens

/**
 * Pre-rendered sky + gradient background (`base-gradient.png`).
 * Sits at z-0 — above the page fill, below all UI (z-10+).
 */
export default function CloudSkyHeaderBand({
  compact = false,
  extended = false,
}: {
  compact?: boolean;
  extended?: boolean;
}) {
  const bandHeight = !compact
    ? FULL_BAND_HEIGHT
    : extended
      ? EXTENDED_BAND_HEIGHT
      : COMPACT_BAND_HEIGHT;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-0 bg-white"
      style={{
        height: bandHeight,
        backgroundImage: `url(${baseGradient})`,
        backgroundSize: '100% auto',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
}
