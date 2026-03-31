import { useNavigate } from 'react-router-dom'

// ── Abstract background shapes ───────────────────────────────────
const BackgroundShapes = () => (
  <svg
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
    viewBox="0 0 390 844"
    fill="none"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Top-left large teal blob */}
    <ellipse cx="-30" cy="80" rx="140" ry="120" fill="#1A9E8F" opacity="0.12" />
    <ellipse cx="20" cy="60" rx="90" ry="70" fill="#1A9E8F" opacity="0.10" />

    {/* Top-right small orange accent */}
    <ellipse cx="420" cy="40" rx="80" ry="60" fill="#C2590A" opacity="0.10" />
    <ellipse cx="400" cy="100" rx="40" ry="35" fill="#C2590A" opacity="0.07" />

    {/* Mid-left teal arc */}
    <path
      d="M-60 380 Q60 320 80 440 Q100 540 -40 520Z"
      fill="#1A9E8F" opacity="0.08"
    />

    {/* Mid-right small teal dot cluster */}
    <circle cx="370" cy="360" r="50" fill="#9FE1CB" opacity="0.15" />
    <circle cx="390" cy="420" r="28" fill="#1A9E8F" opacity="0.08" />

    {/* Bottom-left teal shape */}
    <path
      d="M-80 720 Q40 680 60 780 Q80 860 -60 860Z"
      fill="#1A9E8F" opacity="0.10"
    />

    {/* Bottom-right orange accent */}
    <ellipse cx="440" cy="780" rx="100" ry="80" fill="#C2590A" opacity="0.08" />
    <ellipse cx="410" cy="820" rx="60" ry="50" fill="#EF9F27" opacity="0.07" />

    {/* Scattered small dots */}
    <circle cx="60"  cy="220" r="6"  fill="#9FE1CB" opacity="0.4" />
    <circle cx="340" cy="180" r="4"  fill="#9FE1CB" opacity="0.35" />
    <circle cx="320" cy="600" r="5"  fill="#C2590A" opacity="0.2" />
    <circle cx="50"  cy="620" r="8"  fill="#1A9E8F" opacity="0.15" />
    <circle cx="200" cy="120" r="4"  fill="#9FE1CB" opacity="0.25" />
    <circle cx="280" cy="740" r="6"  fill="#9FE1CB" opacity="0.2" />
  </svg>
)

// ── Welcome / Splash Screen ──────────────────────────────────────
export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#FAFAF8', overflow: 'hidden' }}
         className="flex flex-col">

      {/* Background shapes */}
      <BackgroundShapes />

      {/* Content — centered, above shapes */}
      <div style={{ position: 'relative', zIndex: 1 }}
           className="flex flex-col flex-1 items-center justify-between px-8 pt-20 pb-12">

        {/* ── Logo block ── */}
        <div className="flex flex-col items-center gap-6 flex-1 justify-center">
          <img
            src="/MakerPilot_Logo.png"
            alt="MakerPilot"
            style={{ height: '52px', width: 'auto', objectFit: 'contain' }}
          />

          <p className="text-center font-sans text-base text-gray-500 leading-relaxed max-w-[260px]">
            Inventory clarity for makers who sell on Etsy and at shows.
          </p>
        </div>

        {/* ── CTA buttons ── */}
        <div className="w-full flex flex-col gap-3">
          <button
            className="btn-primary"
            onClick={() => navigate('/signup')}
          >
            Get started free
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate('/signin')}
          >
            Sign in
          </button>
          <p className="text-center text-xs text-gray-400 mt-2">
            Free plan · No credit card required
          </p>
        </div>

      </div>
    </div>
  )
}
