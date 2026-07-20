import { useEffect, useRef, type ReactNode } from 'react';

type TopSellersStripProps = {
  children: ReactNode;
};

export default function TopSellersStrip({ children }: TopSellersStripProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const movedRef = useRef(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // ── Mouse drag (desktop browser) ──
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.clientX;
      scrollStart.current = el.scrollLeft;
      movedRef.current = false;
      el.style.cursor = 'grabbing';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const delta = startX.current - e.clientX;
      if (Math.abs(delta) > 3) movedRef.current = true;
      el.scrollLeft = scrollStart.current + delta;
    };

    const onMouseUp = () => {
      isDragging.current = false;
      el.style.cursor = '';
    };

    const onCaptureClick = (e: MouseEvent) => {
      if (movedRef.current) {
        e.preventDefault();
        e.stopPropagation();
        movedRef.current = false;
      }
    };

    // ── Touch (real mobile) ──
    const startRef = { x: 0, y: 0 };
    let latchRef = false;
    let lastFingerX: number | null = null;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      startRef.x = e.touches[0].clientX;
      startRef.y = e.touches[0].clientY;
      lastFingerX = e.touches[0].clientX;
      latchRef = false;
      movedRef.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const dx = Math.abs(e.touches[0].clientX - startRef.x);
      const dy = Math.abs(e.touches[0].clientY - startRef.y);
      if (!latchRef && dx > 5 && dx > dy * 0.7) latchRef = true;
      if (!latchRef) { lastFingerX = e.touches[0].clientX; return; }
      e.preventDefault();
      const delta = (lastFingerX ?? e.touches[0].clientX) - e.touches[0].clientX;
      lastFingerX = e.touches[0].clientX;
      if (Math.abs(delta) > 0.5) { movedRef.current = true; el.scrollLeft += delta; }
    };

    const onTouchEnd = () => { latchRef = false; lastFingerX = null; };

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    el.addEventListener('click', onCaptureClick, true);
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('click', onCaptureClick, true);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="mb-8 flex w-full max-w-full flex-nowrap gap-3 pb-2 select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{
        overflowX: 'scroll',
        overflowY: 'hidden',
        WebkitOverflowScrolling: 'touch',
        overscrollBehaviorX: 'contain',
        cursor: 'grab',
      }}
    >
      {children}
    </div>
  );
}