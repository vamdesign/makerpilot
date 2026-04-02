import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ── Background — clouds + paper planes (minimal) ─────────────────
const BackgroundDecor = () => (
  <>
    <img src="/cloud2.png" alt=""
      className="absolute -left-8 top-10 w-36 opacity-30 pointer-events-none" />
    <img src="/cloud4.png" alt=""
      className="absolute right-0 top-24 w-24 opacity-20 pointer-events-none" />
    <img src="/cloud1.png" alt=""
      className="absolute left-4 bottom-24 w-28 opacity-25 pointer-events-none" />
    <img src="/cloud3.png" alt=""
      className="absolute -right-4 bottom-12 w-32 opacity-20 pointer-events-none" />
    <img src="/PP03.png" alt=""
      className="absolute right-6 top-16 w-12 opacity-25 pointer-events-none"
      style={{ transform: 'rotate(-10deg)' }} />
    <img src="/PP05.png" alt=""
      className="absolute left-8 bottom-36 w-10 opacity-20 pointer-events-none"
      style={{ transform: 'rotate(15deg)' }} />
  </>
)

// ── Check icon ───────────────────────────────────────────────────
const CheckIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
    <path d="M20 6L9 17l-5-5"
      stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ── Sell channel options ─────────────────────────────────────────
const OPTIONS = [
  {
    id: 'etsy',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#F56400" opacity="0.15" />
        <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="700"
          fill="#F56400" fontFamily="Georgia, serif">E</text>
      </svg>
    ),
    label: 'Etsy shop',
    desc: 'I sell on Etsy. I want inventory that stays in sync with my listings.',
    tag: 'Sync coming soon',
    tagStyle: { background: '#EEEDFE', color: '#534AB7' },
  },
  {
    id: 'personal',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#1A9E8F" opacity="0.12" />
        <path d="M8 12h8M12 8l4 4-4 4"
          stroke="#1A9E8F" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Personal website',
    desc: "I have my own site (Squarespace, Wix, etc). I'll manage stock updates manually.",
    tag: 'Manual + nudges',
    tagStyle: { background: '#E0F5F2', color: '#0F6E56' },
  },
  {
    id: 'shows',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#C2590A" opacity="0.12" />
        <path d="M12 7v5l3 3" stroke="#C2590A" strokeWidth="1.75" strokeLinecap="round" />
        <circle cx="12" cy="12" r="5" stroke="#C2590A" strokeWidth="1.75" />
      </svg>
    ),
    label: 'Craft shows & markets',
    desc: 'I sell in person at fairs and markets. I need to record sales fast on my phone.',
    tag: 'Show mode',
    tagStyle: { background: '#FDF0E6', color: '#C2590A' },
  },
  {
    id: 'manual',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#9CA3AF" opacity="0.12" />
        <path d="M8 12h8M8 8h8M8 16h5"
          stroke="#6B7280" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
    label: "I'll add items manually",
    desc: 'No integrations yet. I just want to track my stock counts in one place.',
    tag: 'Always available',
    tagStyle: { background: '#F3F4F6', color: '#6B7280' },
  },
]

// ── BusinessType Screen ──────────────────────────────────────────
export default function BusinessType() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(new Set())

  const toggle = (id) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const canContinue = selected.size > 0

  return (
    <div
      style={{ position: 'relative', minHeight: '100vh', background: '#FAFAF8', overflow: 'hidden' }}
      className="flex flex-col"
    >
      <BackgroundDecor />

      <div style={{ position: 'relative', zIndex: 1 }}
        className="flex flex-col flex-1 px-6 pt-14 pb-10">

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-10">
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: i === 0 ? '24px' : '8px',
              height: '8px',
              borderRadius: '9999px',
              background: i === 0 ? '#0F6E56' : '#D1D5DB',
              transition: 'all .3s',
            }} />
          ))}
        </div>

        {/* Heading */}
        <h1 className="font-serif text-[28px] text-gray-900 leading-tight mb-2">
          How do you sell?
        </h1>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          Pick everything that applies — you can change this later in Settings.
        </p>

        {/* Options list */}
        <div className="flex flex-col gap-3 mb-8">
          {OPTIONS.map(opt => {
            const isOn = selected.has(opt.id)
            return (
              <button
                key={opt.id}
                onClick={() => toggle(opt.id)}
                style={{
                  border: isOn ? '1.5px solid #0F6E56' : '0.5px solid #E5E7EB',
                  borderRadius: '14px',
                  background: isOn ? '#F0FBF8' : '#FFFFFF',
                  padding: '14px 16px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all .15s',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                }}
              >
                <div style={{ marginTop: '2px', flexShrink: 0 }}>{opt.icon}</div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#111827', marginBottom: '3px' }}>
                    {opt.label}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280', lineHeight: '1.5', marginBottom: '8px' }}>
                    {opt.desc}
                  </div>
                  <span style={{
                    fontSize: '10px', fontWeight: 500, padding: '2px 8px',
                    borderRadius: '20px', display: 'inline-block', ...opt.tagStyle,
                  }}>
                    {opt.tag}
                  </span>
                </div>

                <div style={{
                  width: '22px', height: '22px', borderRadius: '6px',
                  border: isOn ? 'none' : '1.5px solid #D1D5DB',
                  background: isOn ? '#0F6E56' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: '2px', transition: 'all .15s',
                }}>
                  {isOn && <CheckIcon />}
                </div>
              </button>
            )
          })}
        </div>

        {/* Continue */}
        <button
          onClick={() => canContinue && navigate('/quiz')}
          style={{
            width: '100%', padding: '16px', borderRadius: '16px',
            background: canContinue ? '#0F6E56' : '#F3F4F6',
            color: canContinue ? '#ffffff' : '#9CA3AF',
            fontWeight: 600, fontSize: '16px', border: 'none',
            cursor: canContinue ? 'pointer' : 'not-allowed',
            transition: 'all .15s',
          }}
        >
          {canContinue
            ? `Continue${selected.size > 1 ? ` (${selected.size} selected)` : ''}`
            : 'Select at least one'}
        </button>

        <button
          onClick={() => navigate('/home')}
          className="text-center text-sm text-gray-400 mt-4 hover:text-gray-600 transition-colors"
        >
          Skip for now
        </button>

      </div>
    </div>
  )
}
