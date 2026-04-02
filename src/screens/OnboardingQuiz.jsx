import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ── Background ───────────────────────────────────────────────────
const BackgroundDecor = () => (
  <>
    <img src="/cloud1.png" alt=""
      className="absolute right-0 top-8 w-32 opacity-30 pointer-events-none" />
    <img src="/cloud3.png" alt=""
      className="absolute -left-6 top-28 w-28 opacity-25 pointer-events-none" />
    <img src="/cloud2.png" alt=""
      className="absolute right-4 bottom-20 w-30 opacity-20 pointer-events-none" />
    <img src="/cloud4.png" alt=""
      className="absolute left-0 bottom-8 w-24 opacity-25 pointer-events-none" />
    <img src="/PP01.png" alt=""
      className="absolute left-6 top-14 w-11 opacity-20 pointer-events-none"
      style={{ transform: 'rotate(8deg)' }} />
    <img src="/PP04.png" alt=""
      className="absolute right-8 bottom-32 w-10 opacity-20 pointer-events-none"
      style={{ transform: 'rotate(-12deg)' }} />
  </>
)

const UNITS = [
  { id: 'days',   label: 'Days',   max: 90 },
  { id: 'weeks',  label: 'Weeks',  max: 24 },
  { id: 'months', label: 'Months', max: 12 },
]

// BUG FIX 1: getSummary uses value + unit but never resets value
function getSummary(value, unit) {
  if (unit === 'days') {
    if (value <= 3)  return `We'll alert you ${value} days before stock runs low.`
    if (value <= 14) return `We'll give you a ${value}-day heads up to start your next batch.`
    return `A ${value}-day lead time — we'll remind you well in advance.`
  }
  if (unit === 'weeks') {
    if (value === 1) return "We'll alert you a week before stock runs low."
    return `We'll give you a ${value}-week heads up — plenty of time to plan.`
  }
  return value === 1
    ? "We'll alert you a month before stock runs low."
    : `We'll alert you ${value} months out — great for long production cycles.`
}

export default function OnboardingQuiz() {
  const navigate = useNavigate()

  // BUG FIX 1: value and unit are independent — switching unit never touches value
  const [unit, setUnit]   = useState('weeks')
  const [value, setValue] = useState(2)

  const currentUnit = UNITS.find(u => u.id === unit)

  const decrement = () => setValue(v => Math.max(1, v - 1))
  const increment = () => setValue(v => Math.min(currentUnit.max, v + 1))

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
              width: i === 1 ? '24px' : '8px',
              height: '8px',
              borderRadius: '9999px',
              background: i === 1 ? '#0F6E56' : i === 0 ? '#9FE1CB' : '#D1D5DB',
              transition: 'all .3s',
            }} />
          ))}
        </div>

        {/* Back */}
        <button
          onClick={() => navigate('/business-type')}
          className="self-start p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors mb-4"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M19 12H5M5 12l7-7M5 12l7 7"
              stroke="#374151" strokeWidth="1.75"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Heading */}
        <h1 className="font-serif text-[28px] text-gray-900 leading-tight mb-2">
          How long is your average restock?
        </h1>
        <p className="text-gray-400 text-sm mb-10 leading-relaxed">
          You'll get a reminder when stock is low so you never run out.
        </p>

        {/* ── Big number stepper ── */}
        <div className="flex flex-col items-center mb-6">

          <div className="flex items-center gap-8">
            {/* Minus */}
            <button
              onClick={decrement}
              disabled={value <= 1}
              style={{
                width: '52px', height: '52px', borderRadius: '16px',
                border: '1.5px solid #E5E7EB',
                background: value <= 1 ? '#F9FAFB' : '#FFFFFF',
                color: value <= 1 ? '#D1D5DB' : '#374151',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: value <= 1 ? 'not-allowed' : 'pointer',
                transition: 'all .15s', fontSize: '24px', fontWeight: 300,
              }}
            >
              −
            </button>

            {/* Number — big and teal */}
            <div style={{
              minWidth: '90px', textAlign: 'center',
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: '80px', fontWeight: 400,
              color: '#0F6E56', lineHeight: 1,
              userSelect: 'none',
            }}>
              {value}
            </div>

            {/* Plus */}
            <button
              onClick={increment}
              disabled={value >= currentUnit.max}
              style={{
                width: '52px', height: '52px', borderRadius: '16px',
                border: '1.5px solid #E5E7EB',
                background: value >= currentUnit.max ? '#F9FAFB' : '#FFFFFF',
                color: value >= currentUnit.max ? '#D1D5DB' : '#374151',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: value >= currentUnit.max ? 'not-allowed' : 'pointer',
                transition: 'all .15s', fontSize: '24px', fontWeight: 300,
              }}
            >
              +
            </button>
          </div>

          {/* Unit pills — BUG FIX 1: only sets unit, never resets value */}
          <div className="flex gap-2 mt-6">
            {UNITS.map(u => (
              <button
                key={u.id}
                onClick={() => setUnit(u.id)}
                style={{
                  padding: '8px 20px', borderRadius: '9999px',
                  border: unit === u.id ? 'none' : '1px solid #E5E7EB',
                  background: unit === u.id ? '#0F6E56' : '#FFFFFF',
                  color: unit === u.id ? '#FFFFFF' : '#6B7280',
                  fontSize: '14px', fontWeight: unit === u.id ? 500 : 400,
                  cursor: 'pointer', transition: 'all .15s', fontFamily: 'inherit',
                }}
              >
                {u.label}
              </button>
            ))}
          </div>
        </div>

        {/* BUG FIX 2: fixed min-height so the CTA never moves */}
        <div style={{
          minHeight: '72px',
          background: '#E0F5F2', borderRadius: '14px',
          padding: '14px 16px', marginBottom: '32px',
          display: 'flex', gap: '10px', alignItems: 'flex-start',
        }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"
            style={{ flexShrink: 0, marginTop: '2px' }}>
            <circle cx="12" cy="12" r="9" stroke="#0F6E56" strokeWidth="1.75" />
            <path d="M12 8v4l2.5 2.5" stroke="#0F6E56"
              strokeWidth="1.75" strokeLinecap="round" />
          </svg>
          <p style={{ fontSize: '13px', color: '#0F6E56', lineHeight: 1.6 }}>
            {getSummary(value, unit)}
          </p>
        </div>

        {/* BUG FIX 3: Etsy card removed — already covered in BusinessType */}

        {/* Continue */}
        <button
          onClick={() => navigate('/home')}
          style={{
            width: '100%', padding: '16px', borderRadius: '16px',
            background: '#0F6E56', color: '#FFFFFF',
            fontWeight: 600, fontSize: '16px', border: 'none',
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          Take me to my dashboard
        </button>

        <button
          onClick={() => navigate('/home')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            textAlign: 'center', fontSize: '14px', color: '#9CA3AF',
            marginTop: '16px', fontFamily: 'inherit',
          }}
        >
          Skip — I'll set this up later
        </button>

      </div>
    </div>
  )
}
