import Group1 from '../../imports/Group1-1/Group1-27-76';

/** Orange paper-plane wordmark — sits beside the screen title, not the status bar. */
export default function CornerPlaneMark({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute right-6 top-20 z-20 h-[45px] w-[50px] ${className}`}
      aria-hidden
    >
      <Group1 />
    </div>
  );
}
