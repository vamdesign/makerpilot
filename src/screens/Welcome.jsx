import { useNavigate } from 'react-router-dom'

// ── Illustration — replace with your Figma SVG when ready ───────
const EtsyIllustration = () => (
  <svg width="100%" viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="162" width="340" height="7" rx="3.5" fill="#9FE1CB" />
    <rect x="10" y="167" width="340" height="3" rx="1.5" fill="#1A9E8F" opacity="0.3" />
    <circle cx="36" cy="148" r="12" stroke="#1A9E8F" strokeWidth="3" fill="none" />
    <circle cx="36" cy="148" r="7" stroke="#9FE1CB" strokeWidth="2" fill="white" />
    <polygon points="36,139 39,143 36,145 33,143" fill="#1A9E8F" />
    <line x1="62" y1="118" x2="62" y2="128" stroke="#0F6E56" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="62" cy="115" r="3" fill="none" stroke="#0F6E56" strokeWidth="1.5" />
    <ellipse cx="62" cy="136" rx="7" ry="10" fill="#E0F5F2" stroke="#1A9E8F" strokeWidth="1.5" />
    <ellipse cx="62" cy="136" rx="4" ry="6" fill="#9FE1CB" opacity="0.7" />
    <line x1="78" y1="118" x2="78" y2="128" stroke="#0F6E56" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="78" cy="115" r="3" fill="none" stroke="#0F6E56" strokeWidth="1.5" />
    <ellipse cx="78" cy="136" rx="7" ry="10" fill="#E0F5F2" stroke="#1A9E8F" strokeWidth="1.5" />
    <ellipse cx="78" cy="136" rx="4" ry="6" fill="#9FE1CB" opacity="0.7" />
    <path d="M118 162 Q108 150 112 132 Q116 118 130 118 Q144 118 148 132 Q152 150 142 162Z" fill="#E0F5F2" stroke="#1A9E8F" strokeWidth="1.5" />
    <rect x="124" y="112" width="12" height="8" rx="3" fill="#9FE1CB" stroke="#1A9E8F" strokeWidth="1.5" />
    <ellipse cx="130" cy="112" rx="9" ry="3.5" fill="#1A9E8F" opacity="0.5" />
    <line x1="126" y1="112" x2="120" y2="88" stroke="#0F6E56" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="130" y1="112" x2="130" y2="84" stroke="#0F6E56" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="134" y1="112" x2="140" y2="88" stroke="#0F6E56" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="120" cy="85" r="6" fill="#1A9E8F" opacity="0.8" />
    <circle cx="120" cy="85" r="3" fill="white" opacity="0.7" />
    <circle cx="130" cy="80" r="7" fill="#0F6E56" opacity="0.9" />
    <circle cx="130" cy="80" r="3.5" fill="#9FE1CB" />
    <circle cx="140" cy="85" r="5" fill="#1A9E8F" opacity="0.7" />
    <rect x="193" y="132" width="34" height="30" rx="5" fill="#E0F5F2" stroke="#1A9E8F" strokeWidth="1.5" />
    <ellipse cx="210" cy="132" rx="17" ry="5" fill="#9FE1CB" stroke="#1A9E8F" strokeWidth="1.5" />
    <rect x="196" y="90" width="5" height="40" rx="2" fill="#C2590A" opacity="0.85" />
    <path d="M196 90 Q198.5 82 201 90Z" fill="#1A9E8F" />
    <rect x="204" y="86" width="5" height="44" rx="2" fill="#0F6E56" opacity="0.9" />
    <path d="M204 86 Q206.5 78 209 86Z" fill="#C2590A" opacity="0.8" />
    <rect x="213" y="88" width="5" height="42" rx="1.5" fill="#EF9F27" opacity="0.9" />
    <polygon points="213,88 218,88 215.5,80" fill="#FDEAC0" />
    <rect x="221" y="92" width="5" height="38" rx="1.5" fill="#534AB7" opacity="0.85" />
    <polygon points="221,92 226,92 223.5,84" fill="#7F77DD" />
    <path d="M295 162 L278 100 L312 100Z" fill="#1A9E8F" />
    <ellipse cx="295" cy="162" rx="17" ry="5" fill="#0F6E56" />
    <path d="M281 130 Q295 126 309 130" stroke="#E0F5F2" strokeWidth="3" fill="none" strokeLinecap="round" />
    <circle cx="295" cy="98" r="6" fill="#C2590A" opacity="0.9" />
    <circle cx="295" cy="98" r="3.5" fill="#FDF0E6" opacity="0.8" />
    <circle cx="290" cy="148" r="2.5" fill="white" opacity="0.6" />
    <circle cx="300" cy="140" r="2" fill="white" opacity="0.5" />
    <path d="M322 112 L324 117 L329 117 L325 120 L327 125 L322 122 L317 125 L319 120 L315 117 L320 117Z" fill="#EF9F27" opacity="0.8" />
    <path d="M266 105 L268 110 L273 110 L269 113 L271 118 L266 115 L261 118 L263 113 L259 110 L264 110Z" fill="#1A9E8F" opacity="0.7" />
    <rect x="316" y="140" width="26" height="22" rx="3" fill="#E0F5F2" stroke="#1A9E8F" strokeWidth="1.5" />
    <rect x="316" y="140" width="26" height="8" rx="3" fill="#9FE1CB" stroke="#1A9E8F" strokeWidth="1.5" />
    <line x1="329" y1="140" x2="329" y2="162" stroke="#1A9E8F" strokeWidth="1.5" />
    <circle cx="329" cy="140" r="2.5" fill="#1A9E8F" />
    <rect x="150" y="74" width="76" height="20" rx="10" fill="#FDF0E6" />
    <circle cx="163" cy="84" r="4.5" fill="#C2590A" />
    <text x="172" y="88" fontFamily="DM Sans, sans-serif" fontSize="9.5" fontWeight="600" fill="#C2590A">Low stock</text>
    <text x="50" y="185" fontFamily="DM Sans, sans-serif" fontSize="8" fontWeight="500" fill="#9FE1CB" textAnchor="middle">Jewelry</text>
    <text x="130" y="185" fontFamily="DM Sans, sans-serif" fontSize="8" fontWeight="500" fill="#9FE1CB" textAnchor="middle">Home decor</text>
    <text x="210" y="185" fontFamily="DM Sans, sans-serif" fontSize="8" fontWeight="500" fill="#9FE1CB" textAnchor="middle">Craft supplies</text>
    <text x="307" y="185" fontFamily="DM Sans, sans-serif" fontSize="8" fontWeight="500" fill="#9FE1CB" textAnchor="middle">Party</text>
    <line x1="96" y1="115" x2="96" y2="162" stroke="#E0F5F2" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="168" y1="108" x2="168" y2="162" stroke="#E0F5F2" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="256" y1="108" x2="256" y2="162" stroke="#E0F5F2" strokeWidth="1" strokeDasharray="3 3" />
    <circle cx="20" cy="90" r="4" fill="#E0F5F2" />
    <circle cx="350" cy="75" r="5" fill="#E0F5F2" />
  </svg>
)

// ── Stat pill ────────────────────────────────────────────────────
const StatPill = ({ value, label }) => (
  <div className="flex flex-col items-center px-4 py-3 rounded-2xl bg-teal-light flex-1">
    <span className="text-2xl font-semibold text-teal-dark font-mono">{value}</span>
    <span className="text-xs text-teal mt-0.5 font-medium text-center">{label}</span>
  </div>
)

// ── Feature row ──────────────────────────────────────────────────
const Feature = ({ icon, title, desc }) => (
  <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
    <div className="w-9 h-9 rounded-xl bg-teal-light flex items-center
                    justify-center flex-shrink-0 mt-0.5">
      <span className="text-lg">{icon}</span>
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-800">{title}</p>
      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
    </div>
  </div>
)

// ── Welcome Screen ───────────────────────────────────────────────
export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 pt-12 pb-2">

        {/* Logo — PNG from public folder */}
        <img
          src="/MakerPilot_Logo.png"
          alt="MakerPilot"
          className="h-8 w-auto object-contain"
        />

        <button
          onClick={() => navigate('/home')}
          className="text-sm font-medium text-teal px-4 py-2 rounded-full
                     border border-teal/20 hover:bg-teal-light transition-colors"
        >
          Sign in
        </button>
      </div>

      {/* ── Illustration — swap with Figma SVG when ready ── */}
      <div className="px-2 pt-2 pb-1">
        <EtsyIllustration />
      </div>

      {/* ── Hero copy ── */}
      <div className="px-5 pt-1 pb-4">
        <h1 className="font-serif text-[28px] leading-tight text-gray-900 mb-3">
          Don't fly blind on{' '}
          <span className="text-teal italic">your inventory.</span>
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Made for Etsy sellers and craft show makers. Know what's running low,
          what to make next, and keep every channel in sync — in under 5 minutes a week.
        </p>
      </div>

      {/* ── Stats ── */}
      <div className="px-5 pb-5">
        <div className="flex gap-3">
          <StatPill value="−60%" label="Fewer stockouts" />
          <StatPill value="30s" label="Show sale capture" />
          <StatPill value="5 min" label="Per week" />
        </div>
      </div>

      {/* ── Features ── */}
      <div className="px-5 pb-5">
        <div className="card">
          <Feature
            icon="🔔"
            title="Know before you run out"
            desc="Alerts fire before stockouts happen, not after a customer finds out first."
          />
          <Feature
            icon="⚡"
            title="Record show sales in 30 seconds"
            desc="Three taps at the booth. Inventory updates automatically."
          />
          <Feature
            icon="🔀"
            title="Etsy + personal site, one pool"
            desc="One shared inventory count. We nudge you when your other channels need updating."
          />
          <Feature
            icon="📋"
            title="Make-next plan, no spreadsheets"
            desc="Batch suggestions based on your real lead times and sales velocity."
          />
        </div>
      </div>

      {/* ── CTAs ── */}
      <div className="px-5 pb-10 flex flex-col gap-3 mt-auto">
        <button
          className="btn-primary"
          onClick={() => navigate('/home')}
        >
          Get started — it's free
        </button>
        <button
          className="btn-secondary"
          onClick={() => navigate('/home')}
        >
          Sign in to your account
        </button>
        <p className="text-center text-xs text-gray-400 mt-1">
          Free plan includes 10 items. No credit card required.
        </p>
      </div>

    </div>
  )
}
