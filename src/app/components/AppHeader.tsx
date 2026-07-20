import PaperPlaneIcon from './icons/PaperPlaneIcon';

/**
 * Shared app chrome — wordmark + paper plane. Use on post-onboarding screens.
 */
export default function AppHeader() {
  return (
    <header className="flex shrink-0 items-center justify-between px-4 py-3 bg-white">
      <span
        className="text-[22px] leading-tight text-gray-900"
        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
      >
        MakerPilot
      </span>
      <div className="size-[44px] flex items-center justify-center" aria-hidden>
        <div className="w-[36px] h-[32px]">
          <PaperPlaneIcon />
        </div>
      </div>
    </header>
  );
}
