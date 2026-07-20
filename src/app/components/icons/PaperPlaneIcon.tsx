import svgPaths from '../../../assets/svg/paper-plane-paths';

/** Orange paper-plane wordmark accent used in screen headers. */
export default function PaperPlaneIcon() {
  return (
    <div className="relative size-full">
      <svg
        className="absolute inset-0 block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 125.414 111.82"
      >
        <g clipPath="url(#clip0_paper_plane)">
          <path
            d={svgPaths.paabee00}
            fill="var(--fill-0, #009999)"
            fillOpacity="0.54"
          />
          <g>
            <path d={svgPaths.p244bf680} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2562180} fill="var(--fill-0, #FF6600)" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_paper_plane">
            <rect fill="white" height="111.82" width="125.414" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
