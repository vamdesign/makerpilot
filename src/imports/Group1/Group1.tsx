import svgPaths from "./svg-jdonhvekse";

export default function Group() {
  return (
    <div className="relative size-full">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 122.868 108.462">
        <g clipPath="url(#clip0_27_54)" id="Group 1">
          <path d={svgPaths.p32729a0} id="Vector 2" stroke="var(--stroke-0, #009999)" strokeDasharray="1 6" strokeOpacity="0.54" strokeWidth="3" />
          <g id="Group 2">
            <g id="Vector 1">
              <path d={svgPaths.p56e5e00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3635ece0} stroke="var(--stroke-0, #FF6600)" strokeWidth="2" />
            </g>
          </g>
        </g>
        <defs>
          <clipPath id="clip0_27_54">
            <rect fill="white" height="108.462" width="122.868" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}