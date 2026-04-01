import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ── Eye icons ────────────────────────────────────────────────────
const EyeOpen = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      stroke="#9CA3AF" strokeWidth="1.75" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" stroke="#9CA3AF" strokeWidth="1.75" />
  </svg>
)
const EyeClosed = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"
      stroke="#9CA3AF" strokeWidth="1.75" strokeLinecap="round" />
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"
      stroke="#9CA3AF" strokeWidth="1.75" strokeLinecap="round" />
    <path d="M1 1l22 22" stroke="#9CA3AF" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
)

// ── Background accent ────────────────────────────────────────────
const Accent = () => (
  <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:0 }}
       viewBox="0 0 390 844" fill="none" preserveAspectRatio="xMidYMid slice">
    <ellipse cx="420" cy="80" rx="120" ry="100" fill="#1A9E8F" opacity="0.08" />
    <ellipse cx="-20" cy="780" rx="110" ry="90" fill="#C2590A" opacity="0.07" />
    <circle cx="40"  cy="140" r="40" fill="#9FE1CB" opacity="0.12" />
    <circle cx="350" cy="700" r="30" fill="#9FE1CB" opacity="0.10" />
  </svg>
)

// ── Sign Up Screen ───────────────────────────────────────────────
export default function SignUp() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignUp = () => {
    if (!name || !email || !password) {
      setError('Please fill in all fields.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    // TODO: real auth — navigate to business type for now
    navigate('/business-type')
  }

  return (
    <div style={{ position:'relative', minHeight:'100vh', background:'#FAFAF8', overflow:'hidden' }}
         className="flex flex-col">

      <Accent />

      <div style={{ position:'relative', zIndex:1 }}
           className="flex flex-col flex-1 px-6 pt-16 pb-10">

        {/* Back */}
        <button
          onClick={() => navigate('/')}
          className="self-start p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors mb-8"
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <path d="M19 12H5M5 12l7-7M5 12l7 7"
              stroke="#374151" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/MakerPilot_Logo.png" alt="MakerPilot"
               style={{ height:'40px', width:'auto', objectFit:'contain' }} />
        </div>

        {/* Heading */}
        <h1 className="font-serif text-3xl text-gray-900 text-center mb-1">
          Create account
        </h1>
        <p className="text-gray-400 text-sm text-center mb-8">
          Free plan · No credit card needed
        </p>

        {/* Form */}
        <div className="flex flex-col gap-4 mb-2">

          {/* Name */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">
              Your name
            </label>
            <input
              type="text"
              className="input"
              placeholder="Tory Haylor"
              value={name}
              onChange={e => { setName(e.target.value); setError('') }}
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">
              Email address
            </label>
            <input
              type="email"
              className="input"
              placeholder="you@example.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setError('') }}
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">
              Password
              <span className="text-gray-400 font-normal ml-1">(min. 8 characters)</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="input pr-12"
                placeholder="••••••••"
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1
                           rounded-lg hover:bg-gray-100 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeClosed /> : <EyeOpen />}
              </button>
            </div>
          </div>

        </div>

        {/* Error */}
        {error && (
          <p className="text-xs text-critical mb-2 text-center">{error}</p>
        )}

        {/* Create account */}
        <button className="btn-primary mt-4" onClick={handleSignUp}>
          Create account
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Google */}
        <button
          className="btn-secondary flex items-center justify-center gap-2"
          onClick={() => navigate('/business-type')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {/* Terms */}
        <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
          By creating an account you agree to our{' '}
          <button className="text-teal hover:text-teal-dark transition-colors">Terms</button>
          {' '}and{' '}
          <button className="text-teal hover:text-teal-dark transition-colors">Privacy Policy</button>
        </p>

        {/* Sign in link */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/signin')}
            className="text-teal font-medium hover:text-teal-dark transition-colors"
          >
            Sign in
          </button>
        </p>

      </div>
    </div>
  )
}
