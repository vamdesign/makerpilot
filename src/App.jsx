import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Welcome from './screens/Welcome'
import Home from './screens/Home'
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'

// ── Nav icon components ──────────────────────────────────────────
const IconHome = ({ active }) => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
    <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H15v-5h-6v5H4a1 1 0 01-1-1V10.5z"
      stroke={active ? '#1A9E8F' : '#9CA3AF'} strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round"
      fill={active ? '#E0F5F2' : 'none'} />
  </svg>
)
const IconInventory = ({ active }) => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="3"
      stroke={active ? '#1A9E8F' : '#9CA3AF'} strokeWidth="1.75"
      fill={active ? '#E0F5F2' : 'none'} />
    <path d="M7 8h10M7 12h7M7 16h5"
      stroke={active ? '#1A9E8F' : '#9CA3AF'} strokeWidth="1.75" strokeLinecap="round" />
  </svg>
)
const IconRecord = ({ active }) => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9"
      stroke={active ? '#1A9E8F' : '#9CA3AF'} strokeWidth="1.75"
      fill={active ? '#1A9E8F' : 'none'} />
    <path d="M12 8v4l2.5 2.5"
      stroke={active ? '#fff' : '#9CA3AF'} strokeWidth="1.75" strokeLinecap="round" />
  </svg>
)
const IconPlan = ({ active }) => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
      stroke={active ? '#1A9E8F' : '#9CA3AF'} strokeWidth="1.75"
      fill={active ? '#E0F5F2' : 'none'} />
    <rect x="9" y="3" width="6" height="4" rx="1"
      stroke={active ? '#1A9E8F' : '#9CA3AF'} strokeWidth="1.75" fill="none" />
    <path d="M9 12h6M9 16h4"
      stroke={active ? '#1A9E8F' : '#9CA3AF'} strokeWidth="1.75" strokeLinecap="round" />
  </svg>
)
const IconSettings = ({ active }) => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3"
      stroke={active ? '#1A9E8F' : '#9CA3AF'} strokeWidth="1.75" />
    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      stroke={active ? '#1A9E8F' : '#9CA3AF'} strokeWidth="1.75" strokeLinecap="round" />
  </svg>
)

// ── Bottom nav tabs ───────────────────────────────────────────────
const NAV_TABS = [
  { path: '/home',      label: 'Home',      Icon: IconHome },
  { path: '/inventory', label: 'Inventory', Icon: IconInventory },
  { path: '/record',    label: 'Record',    Icon: IconRecord },
  { path: '/plan',      label: 'Plan',      Icon: IconPlan },
  { path: '/settings',  label: 'Settings',  Icon: IconSettings },
]

function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const hideOn = ['/', '/signin', '/signup', '/business-type', '/quiz', '/connect-etsy', '/import']
  if (hideOn.includes(location.pathname)) return null

  return (
    <nav className="bottom-nav">
      {NAV_TABS.map(({ path, label, Icon }) => {
        const active = location.pathname === path
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl
                       transition-colors min-w-[48px] min-h-[48px] justify-center"
            style={{ background: active ? '#E0F5F2' : 'transparent' }}
          >
            <Icon active={active} />
            <span className="text-[10px] font-medium"
              style={{ color: active ? '#0F6E56' : '#9CA3AF' }}>
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

// ── Placeholder screens (we'll build these next) ──────────────────
const Placeholder = ({ title }) => (
  <div className="screen-pad flex flex-col items-center justify-center min-h-[60vh]">
    <div className="text-4xl mb-4">🚧</div>
    <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
    <p className="text-gray-400 text-sm mt-2">Coming soon</p>
  </div>
)

// ── App ───────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Routes>
          <Route path="/"          element={<Welcome />} />
          <Route path="/signin"    element={<SignIn />} />
          <Route path="/signup"    element={<SignUp />} />
          <Route path="/home"      element={<Home />} />
          <Route path="/inventory" element={<Placeholder title="Inventory" />} />
          <Route path="/record"    element={<Placeholder title="Record Sale" />} />
          <Route path="/plan"      element={<Placeholder title="Plan" />} />
          <Route path="/settings"  element={<Placeholder title="Settings" />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}
