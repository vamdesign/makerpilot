import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ── Mock data — Tory's ceramics studio ──────────────────────────
const TORY = { name: 'Tory', studio: "Tory's Studio", channel: 'Etsy', listings: 102 }

const ITEMS = [
  { id: 1, name: 'Spaniel Bowl',       stock: 5, threshold: 2, leadWeeks: 3, category: 'Ceramics',  showOnly: false, price: 48 },
  { id: 2, name: 'Tumbler · Sage',     stock: 3, threshold: 3, leadWeeks: 3, category: 'Ceramics',  showOnly: false, price: 36 },
  { id: 3, name: 'Matcha Bowl',        stock: 8, threshold: 3, leadWeeks: 3, category: 'Ceramics',  showOnly: false, price: 54 },
  { id: 4, name: 'Mushroom Dish',      stock: 4, threshold: 2, leadWeeks: 3, category: 'Shows',     showOnly: true,  price: 28 },
  { id: 5, name: 'Ring Dish · Blush',  stock: 1, threshold: 3, leadWeeks: 3, category: 'Ceramics',  showOnly: false, price: 22 },
]

// Helpers
const alertLevel = (item) => {
  if (item.stock === 0)                    return 'out'
  if (item.stock < item.threshold)         return 'critical'
  if (item.stock === item.threshold)       return 'low'
  return 'ok'
}

const lowItems   = ITEMS.filter(i => ['critical', 'out', 'low'].includes(alertLevel(i)))
const okItems    = ITEMS.filter(i => alertLevel(i) === 'ok')
const makeNext   = [...ITEMS].sort((a, b) => (a.stock / a.threshold) - (b.stock / b.threshold))[0]

// ── Palette helpers ─────────────────────────────────────────────
const ALERT_STYLES = {
  critical: { bg: '#FFF5F5', border: '#FCA5A5', dot: '#DC2626', label: 'Critical',  labelBg: '#FEE2E2', labelColor: '#DC2626' },
  low:      { bg: '#FDF0E6', border: '#FCD34D', dot: '#C2590A', label: 'Low stock', labelBg: '#FEF3C7', labelColor: '#C2590A' },
  out:      { bg: '#FFF5F5', border: '#FCA5A5', dot: '#DC2626', label: 'Out',       labelBg: '#FEE2E2', labelColor: '#DC2626' },
}

// restock date = today + leadWeeks weeks
function restockDate(weeks) {
  const d = new Date()
  d.setDate(d.getDate() + weeks * 7)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// ── Icons ───────────────────────────────────────────────────────
const BellIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
      stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const HomeIcon = ({ active }) => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
      stroke={active ? '#0F6E56' : '#9CA3AF'} strokeWidth="1.75" strokeLinecap="round"
      fill={active ? '#E0F5F2' : 'none'}/>
    <path d="M9 22V12h6v10" stroke={active ? '#0F6E56' : '#9CA3AF'} strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
)
const BoxIcon = ({ active }) => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
      stroke={active ? '#0F6E56' : '#9CA3AF'} strokeWidth="1.75"
      fill={active ? '#E0F5F2' : 'none'}/>
    <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"
      stroke={active ? '#0F6E56' : '#9CA3AF'} strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
)
const ChartIcon = ({ active }) => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
    <path d="M18 20V10M12 20V4M6 20v-6"
      stroke={active ? '#0F6E56' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round"/>
  </svg>
)
const SettingsIcon = ({ active }) => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" stroke={active ? '#0F6E56' : '#9CA3AF'} strokeWidth="1.75"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
      stroke={active ? '#0F6E56' : '#9CA3AF'} strokeWidth="1.75"/>
  </svg>
)
const PlusIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path d="M12 5v14M5 12h14" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
)
const ArrowRight = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7" stroke="#0F6E56" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const SparkleIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"
      stroke="#0F6E56" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const FlashIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
      stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// ── Alert badge ─────────────────────────────────────────────────
function AlertBadge({ level }) {
  const s = ALERT_STYLES[level]
  return (
    <span style={{
      fontSize: '10px', fontWeight: 600, padding: '2px 8px',
      borderRadius: '20px', background: s.labelBg, color: s.labelColor,
      letterSpacing: '0.02em',
    }}>
      {s.label}
    </span>
  )
}

// ── Stock bar ───────────────────────────────────────────────────
function StockBar({ stock, threshold, level }) {
  const pct = Math.min(100, (stock / Math.max(threshold * 2, 1)) * 100)
  const barColor = level === 'ok' ? '#9FE1CB'
    : level === 'low' ? '#EF9F27'
    : '#EF4444'
  return (
    <div style={{ height: '4px', borderRadius: '9999px', background: '#F3F4F6', overflow: 'hidden', flex: 1 }}>
      <div style={{ height: '100%', width: `${pct}%`, background: barColor,
        borderRadius: '9999px', transition: 'width .4s ease' }}/>
    </div>
  )
}

// ── Low-stock card ──────────────────────────────────────────────
function AlertCard({ item, onRecord }) {
  const level = alertLevel(item)
  const s = ALERT_STYLES[level]
  return (
    <div style={{
      background: s.bg, border: `1px solid ${s.border}`, borderRadius: '16px',
      padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: s.dot, flexShrink: 0 }}/>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827',
              fontFamily: "'DM Serif Display', Georgia, serif" }}>
              {item.name}
            </span>
          </div>
          <div style={{ fontSize: '12px', color: '#6B7280', paddingLeft: '15px' }}>
            {item.stock} in stock · alert at {item.threshold}
            {item.showOnly && <span style={{ marginLeft: '6px', fontSize: '10px',
              background: '#FEF3C7', color: '#C2590A', padding: '1px 6px', borderRadius: '10px', fontWeight: 500 }}>
              Shows only
            </span>}
          </div>
        </div>
        <AlertBadge level={level}/>
      </div>

      {/* Stock bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '15px' }}>
        <StockBar stock={item.stock} threshold={item.threshold} level={level}/>
        <span style={{ fontSize: '11px', color: '#9CA3AF', whiteSpace: 'nowrap' }}>
          Restock by {restockDate(item.leadWeeks)}
        </span>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px', paddingLeft: '15px' }}>
        <button
          onClick={() => onRecord(item)}
          style={{ flex: 1, padding: '8px', borderRadius: '10px',
            background: '#0F6E56', color: '#FFFFFF', fontSize: '12px', fontWeight: 600,
            border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
          Record restock
        </button>
        <button style={{ padding: '8px 14px', borderRadius: '10px',
          border: '1px solid #E5E7EB', background: '#FFFFFF', fontSize: '12px',
          color: '#374151', cursor: 'pointer', fontFamily: 'inherit' }}>
          Edit
        </button>
      </div>
    </div>
  )
}

// ── Make-next card ──────────────────────────────────────────────
function MakeNextCard({ item }) {
  const urgency = item.stock <= 1 ? 'Start today' : 'Plan this week'
  const qty     = Math.max(item.threshold * 2, item.threshold - item.stock + 6)
  return (
    <div style={{
      background: 'linear-gradient(135deg, #E0F5F2 0%, #F0FBF8 100%)',
      border: '1px solid #A7F3D0', borderRadius: '16px', padding: '16px',
      display: 'flex', flexDirection: 'column', gap: '12px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '28px', height: '28px', borderRadius: '8px',
          background: '#0F6E56', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SparkleIcon/>
        </div>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#0F6E56',
            textTransform: 'uppercase', letterSpacing: '0.06em' }}>Make next</div>
          <div style={{ fontSize: '12px', color: '#374151' }}>Based on stock levels + lead time</div>
        </div>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '12px 14px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#111827',
            fontFamily: "'DM Serif Display', Georgia, serif", marginBottom: '2px' }}>
            {item.name}
          </div>
          <div style={{ fontSize: '12px', color: '#6B7280' }}>
            Make ~{qty} · {item.leadWeeks}w lead time
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '11px', fontWeight: 600,
            background: item.stock <= 1 ? '#FEE2E2' : '#FEF3C7',
            color: item.stock <= 1 ? '#DC2626' : '#C2590A',
            padding: '3px 10px', borderRadius: '20px' }}>
            {urgency}
          </div>
          <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>
            {item.stock} left
          </div>
        </div>
      </div>

      <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
        background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px',
        fontWeight: 600, color: '#0F6E56', fontFamily: 'inherit', padding: '2px 0' }}>
        See full make-next plan <ArrowRight/>
      </button>
    </div>
  )
}

// ── Inventory row (mini) ────────────────────────────────────────
function InventoryRow({ item, isLast }) {
  const level = alertLevel(item)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px',
      padding: '11px 0', borderBottom: isLast ? 'none' : '0.5px solid #F3F4F6' }}>
      {/* Color dot */}
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
        background: level === 'ok' ? '#9FE1CB' : level === 'low' ? '#EF9F27' : '#EF4444' }}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '13px', fontWeight: 500, color: '#111827',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.name}
        </div>
        {item.showOnly && (
          <span style={{ fontSize: '10px', color: '#C2590A' }}>Shows only</span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <StockBar stock={item.stock} threshold={item.threshold} level={level}/>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151',
          minWidth: '28px', textAlign: 'right' }}>
          {item.stock}
        </span>
      </div>
    </div>
  )
}

// ── Record Sale sheet (bottom sheet, simplified) ─────────────────
function RecordSaleSheet({ item, onClose, onSave }) {
  const [qty, setQty] = useState(1)
  if (!item) return null
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', flexDirection: 'column',
      justifyContent: 'flex-end' }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }}/>
      {/* Sheet */}
      <div style={{ position: 'relative', background: '#FAFAF8', borderRadius: '24px 24px 0 0',
        padding: '20px 24px 40px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Handle */}
        <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: '#E5E7EB',
          alignSelf: 'center', marginBottom: '4px' }}/>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#9CA3AF',
            textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Record restock</div>
          <div style={{ fontSize: '20px', fontWeight: 600, color: '#111827',
            fontFamily: "'DM Serif Display', Georgia, serif" }}>{item.name}</div>
          <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>
            Currently {item.stock} in stock
          </div>
        </div>

        <div>
          <div style={{ fontSize: '12px', fontWeight: 500, color: '#4B5563', marginBottom: '8px' }}>
            Units restocked
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0',
            border: '0.5px solid #E5E7EB', borderRadius: '14px',
            background: '#FFFFFF', overflow: 'hidden', height: '56px' }}>
            <button onClick={() => setQty(q => Math.max(1, q - 1))}
              style={{ width: '56px', height: '56px', border: 'none', background: 'transparent',
                fontSize: '24px', fontWeight: 300, color: '#4B5563', cursor: 'pointer', fontFamily: 'inherit' }}>
              −
            </button>
            <div style={{ width: '0.5px', height: '30px', background: '#E5E7EB' }}/>
            <div style={{ flex: 1, textAlign: 'center', fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: '32px', fontWeight: 400, color: '#0F6E56' }}>
              {qty}
            </div>
            <div style={{ width: '0.5px', height: '30px', background: '#E5E7EB' }}/>
            <button onClick={() => setQty(q => q + 1)}
              style={{ width: '56px', height: '56px', border: 'none', background: 'transparent',
                fontSize: '24px', fontWeight: 300, color: '#4B5563', cursor: 'pointer', fontFamily: 'inherit' }}>
              +
            </button>
          </div>
          <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '8px', textAlign: 'center' }}>
            New total: {item.stock + qty} in stock
          </div>
        </div>

        <button onClick={() => onSave(item, qty)}
          style={{ width: '100%', padding: '15px', borderRadius: '16px', background: '#0F6E56',
            color: '#FFFFFF', fontSize: '15px', fontWeight: 600, border: 'none',
            cursor: 'pointer', fontFamily: 'inherit' }}>
          Save restock
        </button>
        <button onClick={onClose}
          style={{ background: 'none', border: 'none', fontSize: '13px',
            color: '#9CA3AF', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center' }}>
          Cancel
        </button>
      </div>
    </div>
  )
}

// ── Bottom Nav ──────────────────────────────────────────────────
function BottomNav({ active = 'home' }) {
  const tabs = [
    { id: 'home',      label: 'Home',      Icon: HomeIcon },
    { id: 'inventory', label: 'Inventory', Icon: BoxIcon },
    { id: 'insights',  label: 'Insights',  Icon: ChartIcon },
    { id: 'settings',  label: 'Settings',  Icon: SettingsIcon },
  ]
  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#FFFFFF', borderTop: '0.5px solid #F3F4F6',
      display: 'flex', padding: '8px 0 20px', zIndex: 50 }}>
      {tabs.map(t => (
        <button key={t.id}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '4px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}>
          <t.Icon active={t.id === active}/>
          <span style={{ fontSize: '10px', fontWeight: t.id === active ? 600 : 400,
            color: t.id === active ? '#0F6E56' : '#9CA3AF' }}>{t.label}</span>
        </button>
      ))}
    </div>
  )
}

// ── Home Screen ─────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate()
  const [items, setItems]           = useState(ITEMS)
  const [sheetItem, setSheetItem]   = useState(null)
  const [toast, setToast]           = useState(null)

  const low    = items.filter(i => ['critical', 'out', 'low'].includes(alertLevel(i)))
  const ok     = items.filter(i => alertLevel(i) === 'ok')
  const next   = [...items].sort((a, b) => (a.stock / a.threshold) - (b.stock / b.threshold))[0]

  const hour   = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const handleRestock = (item, qty) => {
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, stock: i.stock + qty } : i))
    setSheetItem(null)
    setToast(`${item.name} updated — ${item.stock + qty} in stock`)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh', paddingBottom: '90px' }}>

      {/* ── Toast ── */}
      {toast && (
        <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
          background: '#111827', color: '#FFFFFF', fontSize: '13px', fontWeight: 500,
          padding: '10px 18px', borderRadius: '12px', zIndex: 200, whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transition: 'all .3s' }}>
          ✓ {toast}
        </div>
      )}

      {/* ── Header ── */}
      <div style={{ padding: '52px 22px 0', display: 'flex', alignItems: 'flex-start',
        justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#9CA3AF',
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
            {greeting}
          </p>
          <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: '26px',
            color: '#111827', lineHeight: 1.2 }}>
            {TORY.studio}
          </h1>
          <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '3px' }}>
            {TORY.listings} Etsy listings · {items.length} tracked
          </p>
        </div>
        <button onClick={() => navigate('/add-item')}
          style={{ width: '40px', height: '40px', borderRadius: '12px',
            background: '#E0F5F2', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" stroke="#0F6E56" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* ── Summary pills ── */}
      <div style={{ display: 'flex', gap: '8px', padding: '16px 22px 0' }}>
        <div style={{ flex: 1, background: low.length > 0 ? '#FEE2E2' : '#E0F5F2',
          borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
          <div style={{ fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: '28px', fontWeight: 400,
            color: low.length > 0 ? '#DC2626' : '#0F6E56', lineHeight: 1 }}>
            {low.length}
          </div>
          <div style={{ fontSize: '11px', color: low.length > 0 ? '#DC2626' : '#0F6E56',
            fontWeight: 500, marginTop: '3px' }}>
            {low.length === 1 ? 'alert' : 'alerts'}
          </div>
        </div>
        <div style={{ flex: 1, background: '#F3F4F6', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
          <div style={{ fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: '28px', fontWeight: 400, color: '#374151', lineHeight: 1 }}>
            {ok.length}
          </div>
          <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: 500, marginTop: '3px' }}>
            healthy
          </div>
        </div>
        <div style={{ flex: 1, background: '#E0F5F2', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
          <div style={{ fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: '28px', fontWeight: 400, color: '#0F6E56', lineHeight: 1 }}>
            {items.length}
          </div>
          <div style={{ fontSize: '11px', color: '#0F6E56', fontWeight: 500, marginTop: '3px' }}>
            total items
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px 22px 0' }}>

        {/* ── Alerts section ── */}
        {low.length > 0 && (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <BellIcon size={16} color="#DC2626"/>
              <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#111827',
                textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Needs attention · {low.length}
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {low.map(item => (
                <AlertCard key={item.id} item={item} onRecord={setSheetItem}/>
              ))}
            </div>
          </section>
        )}

        {/* ── Make next ── */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <SparkleIcon/>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#111827',
              textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Make next
            </h2>
          </div>
          <MakeNextCard item={next}/>
        </section>

        {/* ── All inventory ── */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '12px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#111827',
              textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              All inventory
            </h2>
            <button style={{ fontSize: '12px', color: '#1A9E8F', fontWeight: 500,
              background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', gap: '4px' }}>
              View all <ArrowRight/>
            </button>
          </div>
          <div style={{ background: '#FFFFFF', border: '0.5px solid #E5E7EB',
            borderRadius: '16px', padding: '0 16px' }}>
            {items.map((item, idx) => (
              <InventoryRow key={item.id} item={item} isLast={idx === items.length - 1}/>
            ))}
          </div>
        </section>

        {/* ── Channel nudge ── */}
        <div style={{ background: '#FDF0E6', border: '1px solid #FCD34D',
          borderRadius: '14px', padding: '14px 16px',
          display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '18px', flexShrink: 0 }}>🔀</span>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827', marginBottom: '3px' }}>
              Update your Etsy listings
            </div>
            <div style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.5 }}>
              Ring Dish · Blush is low (1 in stock). Pause or adjust your Etsy listing to avoid overselling.
            </div>
            <button style={{ marginTop: '8px', fontSize: '12px', fontWeight: 600,
              color: '#C2590A', background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', padding: 0 }}>
              Open Etsy →
            </button>
          </div>
        </div>

      </div>

      {/* ── FAB — Record sale ── */}
      <button
        onClick={() => setSheetItem(items[0])}
        style={{
          position: 'fixed', bottom: '90px', right: '22px',
          width: '56px', height: '56px', borderRadius: '18px',
          background: '#0F6E56', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(15,110,86,0.35)', zIndex: 50,
          transition: 'transform .15s, box-shadow .15s',
        }}>
        <FlashIcon/>
      </button>

      {/* ── Record sale sheet ── */}
      <RecordSaleSheet
        item={sheetItem}
        onClose={() => setSheetItem(null)}
        onSave={handleRestock}
      />

      {/* ── Bottom Nav ── */}
      <BottomNav active="home"/>

    </div>
  )
}
