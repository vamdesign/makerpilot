import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const UNITS = ['Days', 'Weeks', 'Months']

// ── Camera icon ──────────────────────────────────────────────────
const CameraIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
      stroke="#1A9E8F" strokeWidth="1.75" strokeLinecap="round"/>
    <circle cx="12" cy="13" r="4" stroke="#1A9E8F" strokeWidth="1.75"/>
  </svg>
)

// ── Small stepper (threshold) ────────────────────────────────────
function SmallStepper({ value, onChange, min = 1 }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      border: '0.5px solid #E5E7EB', borderRadius: '12px',
      background: '#FFFFFF', overflow: 'hidden', height: '48px',
    }}>
      <button onClick={() => onChange(Math.max(min, value - 1))}
        style={{ width: '44px', height: '48px', border: 'none', background: 'transparent',
          fontSize: '20px', fontWeight: 300, color: '#4B5563', cursor: 'pointer', fontFamily: 'inherit' }}>
        −
      </button>
      <div style={{ width: '0.5px', height: '26px', background: '#E5E7EB' }}/>
      <div style={{ flex: 1, textAlign: 'center', fontSize: '18px', fontWeight: 500, color: '#111827' }}>
        {value}
      </div>
      <div style={{ width: '0.5px', height: '26px', background: '#E5E7EB' }}/>
      <button onClick={() => onChange(value + 1)}
        style={{ width: '44px', height: '48px', border: 'none', background: 'transparent',
          fontSize: '20px', fontWeight: 300, color: '#4B5563', cursor: 'pointer', fontFamily: 'inherit' }}>
        +
      </button>
      <div style={{ width: '0.5px', height: '26px', background: '#E5E7EB' }}/>
      <span style={{ fontSize: '12px', color: '#9CA3AF', padding: '0 12px', whiteSpace: 'nowrap' }}>
        when below this
      </span>
    </div>
  )
}

export default function AddItem({ defaultLeadTime = 3, defaultLeadUnit = 'Weeks', userChannels = ['Etsy', 'Personal site'] }) {
  const navigate  = useNavigate()
  const fileRef   = useRef()

  const [photo, setPhoto]           = useState(null)
  const [name, setName]             = useState('')
  const [desc, setDesc]             = useState('')
  const [stock, setStock]           = useState(0)
  const [threshold, setThreshold]   = useState(2)
  const [leadNum, setLeadNum]       = useState(defaultLeadTime)
  const [leadUnit, setLeadUnit]     = useState(defaultLeadUnit)
  const [showOptional, setShowOptional] = useState(false)
  const [price, setPrice]           = useState('')
  const [channels, setChannels]     = useState(new Set(userChannels))
  const [showOnly, setShowOnly]     = useState(false)
  const [error, setError]           = useState('')

  const handlePhoto = (e) => {
    const file = e.target.files?.[0]
    if (file) setPhoto(URL.createObjectURL(file))
  }

  const toggleChannel = (ch) => {
    setChannels(prev => {
      const next = new Set(prev)
      next.has(ch) ? next.delete(ch) : next.add(ch)
      return next
    })
  }

  const allChannels = [...new Set([...userChannels, 'Shows only'])]

  const handleSave = (addAnother = false) => {
    if (!name.trim()) { setError('Item name is required.'); return }
    // TODO: persist to localStorage / state
    if (addAnother) {
      setPhoto(null); setName(''); setDesc(''); setStock(0)
      setThreshold(2); setShowOnly(false); setPrice(''); setError('')
    } else {
      navigate('/home')
    }
  }

  const labelStyle = { fontSize: '12px', fontWeight: 500, color: '#4B5563',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }
  const inputStyle = { width: '100%', border: '0.5px solid #E5E7EB', borderRadius: '12px',
    padding: '11px 14px', fontSize: '14px', color: '#111827', fontFamily: 'inherit',
    outline: 'none', background: '#FFFFFF' }

  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '52px 22px 36px' }}>

        {/* Progress dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{
              height: '8px', borderRadius: '9999px',
              width: i === 4 ? '24px' : '8px',
              background: i < 4 ? '#9FE1CB' : i === 4 ? '#0F6E56' : '#E5E7EB',
            }}/>
          ))}
        </div>

        {/* Back */}
        <button onClick={() => navigate('/quiz')}
          style={{ alignSelf: 'flex-start', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M19 12H5M5 12l7-7M5 12l7 7"
              stroke="#374151" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Title */}
        <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: '26px', color: '#111827', lineHeight: 1.2 }}>
          Add item
        </h1>

        {/* ── Photo thumbnail + name row ── */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>

          {/* Thumbnail */}
          <input ref={fileRef} type="file" accept="image/*" capture="environment"
            onChange={handlePhoto} style={{ display: 'none' }}/>
          <button onClick={() => fileRef.current?.click()}
            style={{
              width: '80px', height: '80px', borderRadius: '14px', flexShrink: 0,
              border: photo ? 'none' : '1.5px dashed #E5E7EB',
              background: photo ? 'transparent' : '#FFFFFF',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: '4px', cursor: 'pointer', overflow: 'hidden', padding: 0,
            }}>
            {photo
              ? <img src={photo} alt="Item" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
              : <>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#E0F5F2',
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CameraIcon/>
                  </div>
                  <span style={{ fontSize: '9px', color: '#9CA3AF' }}>Add photo</span>
                </>
            }
          </button>

          {/* Name */}
          <div style={{ flex: 1 }}>
            <div style={labelStyle}>Item name</div>
            <input
              style={{ ...inputStyle, borderColor: error && !name ? '#A32D2D' : '#E5E7EB',
                borderWidth: error && !name ? '1.5px' : '0.5px' }}
              placeholder="e.g. Spaniel Bowl"
              value={name} onChange={e => { setName(e.target.value); setError('') }}
            />
            {error && !name && (
              <p style={{ fontSize: '11px', color: '#A32D2D', marginTop: '4px' }}>{error}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <div style={labelStyle}>
            Description
            <span style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: 400 }}>optional</span>
          </div>
          <textarea
            style={{ ...inputStyle, resize: 'none', height: '60px', lineHeight: 1.5 }}
            placeholder="e.g. 4 cup capacity, teal glaze — long-eared dog bowl"
            value={desc} onChange={e => setDesc(e.target.value)}
          />
        </div>

        {/* Current inventory — tap to type */}
        <div>
          <div style={labelStyle}>Current inventory</div>
          <div style={{ border: '0.5px solid #E5E7EB', borderRadius: '12px', background: '#FFFFFF',
            display: 'flex', alignItems: 'center', overflow: 'hidden', height: '52px' }}>
            <input
              type="number" min="0" value={stock}
              onChange={e => setStock(Math.max(0, parseInt(e.target.value) || 0))}
              style={{ flex: 1, textAlign: 'center', fontSize: '28px', fontWeight: 500,
                color: '#0F6E56', border: 'none', background: 'transparent', fontFamily: "'DM Serif Display', Georgia, serif",
                outline: 'none', width: '100%' }}
            />
            <span style={{ fontSize: '13px', color: '#9CA3AF', paddingRight: '14px' }}>in stock</span>
          </div>
        </div>

        {/* Low stock alert — auto ON, stepper only */}
        <div>
          <div style={labelStyle}>Set low inventory alert</div>
          <SmallStepper value={threshold} onChange={setThreshold}/>
        </div>

        {/* Lead time — compact */}
        <div>
          <div style={labelStyle}>Lead time to restock</div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="number" min="1" max="99" value={leadNum}
              onChange={e => setLeadNum(Math.max(1, parseInt(e.target.value) || 1))}
              style={{ width: '56px', height: '44px', border: '0.5px solid #E5E7EB', borderRadius: '10px',
                textAlign: 'center', fontSize: '18px', fontWeight: 500, color: '#0F6E56',
                fontFamily: "'DM Serif Display', Georgia, serif", background: '#FFFFFF', outline: 'none' }}
            />
            {UNITS.map(u => (
              <button key={u} onClick={() => setLeadUnit(u)}
                style={{
                  padding: '8px 14px', borderRadius: '9999px',
                  border: leadUnit === u ? 'none' : '0.5px solid #E5E7EB',
                  background: leadUnit === u ? '#0F6E56' : '#FFFFFF',
                  color: leadUnit === u ? '#FFFFFF' : '#6B7280',
                  fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s',
                }}>
                {u}
              </button>
            ))}
          </div>
        </div>

        {/* Optional section toggle */}
        <button
          onClick={() => setShowOptional(s => !s)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none',
            border: 'none', cursor: 'pointer', fontSize: '12px', color: '#1A9E8F',
            padding: 0, fontFamily: 'inherit' }}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" stroke="#1A9E8F" strokeWidth="1.75"/>
            <path d={showOptional ? 'M8 12h8' : 'M12 8v8M8 12h8'}
              stroke="#1A9E8F" strokeWidth="1.75" strokeLinecap="round"/>
          </svg>
          {showOptional ? 'Hide extra options' : 'Add price, channels & more'}
        </button>

        {/* Optional: price + channels + show-only */}
        {showOptional && (
          <div style={{ border: '0.5px solid #E5E7EB', borderRadius: '12px',
            background: '#FFFFFF', padding: '14px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

            {/* Price */}
            <div>
              <div style={labelStyle}>
                Price
                <span style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: 400 }}>optional</span>
              </div>
              <input type="number" min="0" step="0.01"
                style={{ ...inputStyle, height: '44px' }}
                placeholder="$0.00"
                value={price} onChange={e => setPrice(e.target.value)}
              />
            </div>

            {/* Channels */}
            <div>
              <div style={{ ...labelStyle, marginBottom: '8px' }}>Sells on</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {allChannels.map(ch => (
                  <button key={ch} onClick={() => toggleChannel(ch)}
                    style={{
                      padding: '5px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 500,
                      border: channels.has(ch) ? 'none' : '0.5px solid #E5E7EB',
                      background: channels.has(ch) ? '#E0F5F2' : '#FFFFFF',
                      color: channels.has(ch) ? '#0F6E56' : '#6B7280',
                      cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s',
                    }}>
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            {/* In-person only toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>In-person only</div>
                <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>
                  Won't appear in online channel nudges
                </div>
              </div>
              <button
                onClick={() => setShowOnly(s => !s)}
                style={{ width: '34px', height: '19px', borderRadius: '9999px',
                  background: showOnly ? '#0F6E56' : '#D1D5DB', border: 'none',
                  cursor: 'pointer', position: 'relative', flexShrink: 0, transition: 'background .2s' }}>
                <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: '#FFFFFF',
                  position: 'absolute', top: '2px', left: showOnly ? '17px' : '2px', transition: 'left .2s' }}/>
              </button>
            </div>
          </div>
        )}

        {/* Save */}
        <button onClick={() => handleSave(false)}
          style={{ width: '100%', padding: '15px', borderRadius: '16px', background: '#0F6E56',
            color: '#FFFFFF', fontSize: '15px', fontWeight: 600, border: 'none',
            cursor: 'pointer', fontFamily: 'inherit' }}>
          Save item
        </button>
        <button onClick={() => handleSave(true)}
          style={{ width: '100%', padding: '10px', background: 'none', border: 'none',
            fontSize: '13px', color: '#9CA3AF', cursor: 'pointer', fontFamily: 'inherit' }}>
          Save &amp; add another
        </button>

      </div>
    </div>
  )
}
