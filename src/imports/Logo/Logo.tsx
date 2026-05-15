import svgPaths from "./svg-vizpy7i6zu";

function Group() {
  return (
    <div className="h-[34.641px] relative w-[44.83px]">
      <div className="absolute inset-[-2.91%_-2.75%_-3.06%_-3.37%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47.5767 36.7092">
          <g id="Group 2">
            <g id="Vector 1">
              <path d={svgPaths.p31e18f00} fill="var(--fill-0, white)" />
              <path d={svgPaths.pe503a00} stroke="var(--stroke-0, #FF6600)" strokeWidth="1.28085" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function Logo() {
  return (
    <div className="relative size-full" data-name="Logo">
      <div className="absolute h-[37.145px] left-[228.31px] top-[32.32px] w-[45.15px]">
        <div className="absolute inset-[-0.73%_-2.04%_-2.52%_-0.49%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46.2939 38.3515">
            <path d={svgPaths.p259dd680} id="Vector 2" stroke="var(--stroke-0, #009999)" strokeDasharray="0.64 3.84" strokeOpacity="0.54" strokeWidth="1.92128" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Gayathri:Regular',sans-serif] leading-[0] left-0 not-italic text-[#399] text-[0px] top-[32.64px] whitespace-nowrap">
        <span className="leading-[normal] text-[51.234px]">M</span>
        <span className="leading-[normal] text-[48.672px]">aker</span>
        <span className="leading-[normal] text-[51.234px]">P</span>
        <span className="leading-[normal] text-[48.672px]">ilot</span>
      </p>
      <div className="absolute flex h-[42.278px] items-center justify-center left-[256.58px] top-0 w-[50.424px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[-10.57deg]">
          <Group />
        </div>
      </div>
    </div>
  );
}