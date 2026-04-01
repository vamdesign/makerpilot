import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ── Eye icons ────────────────────────────────────────────────────
const EyeOpen = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      stroke="#9CA3AF" strokeWidth="1.75" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3"
      stroke="#9CA3AF" strokeWidth="1.75" />
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

// ── Background decoration with paper airplanes and clouds ────────
const BackgroundDecor = () => (
  <>
    {/* Clouds - scattered around */}
    <img src="/cloud1.png" alt="" 
         className="absolute -left-6 top-20 w-36 opacity-60 pointer-events-none" />
    <img src="/cloud2.png" alt="" 
         className="absolute right-2 top-12 w-24 opacity-50 pointer-events-none" />
    <img src="/cloud3.png" alt="" 
         className="absolute left-1/4 top-8 w-16 opacity-35 pointer-events-none" />
    {/* Bottom clouds - moved up and right */}
    <img src="/cloud1.png" alt="" 
         className="absolute right-12 bottom-40 w-32 opacity-45 pointer-events-none" />
    <img src="/cloud2.png" alt="" 
         className="absolute left-8 bottom-16 w-28 opacity-40 pointer-events-none" />
    <img src="/cloud3.png" alt="" 
         className="absolute right-4 bottom-12 w-24 opacity-35 pointer-events-none" />
    
    {/* Paper airplanes - top area */}
    <img src="/PP01.png" alt="" 
         className="absolute right-2 top-32 w-14 opacity-75 pointer-events-none" />
    <img src="/PP02.png" alt="" 
         className="absolute -left-2 top-36 w-12 opacity-65 pointer-events-none" />
    
    {/* Paper airplanes - bottom area */}
    <img src="/PP03.png" alt="" 
         className="absolute right-6 bottom-28 w-14 opacity-70 pointer-events-none" />
    <img src="/PP04.png" alt="" 
         className="absolute left-4 bottom-8 w-14 opacity-60 pointer-events-none" />
    <img src="/PP05.png" alt="" 
         className="absolute right-20 bottom-4 w-12 opacity-55 pointer-events-none" />
  </>
)

// ── Decorations behind the white card for depth ──────────────────
const CardBackgroundDecor = () => (
  <>
    {/* Bigger cloud on left side */}
    <img src="/cloud2.png" alt="" 
         className="absolute -left-8 top-1/4 w-24 opacity-50 pointer-events-none" />
    {/* Bigger elements on right side */}
    <img src="/cloud3.png" alt="" 
         className="absolute -right-6 top-1/3 w-20 opacity-45 pointer-events-none" />
    <img src="/PP01.png" alt="" 
         className="absolute -left-4 bottom-6 w-14 opacity-55 pointer-events-none" />
    <img src="/PP03.png" alt="" 
         className="absolute -right-4 bottom-2 w-14 opacity-50 pointer-events-none" />
  </>
)

// ── Sign In Screen ───────────────────────────────────────────────
export default function SignIn() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignIn = () => {
    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }
    // TODO: real auth — navigate to home for now
    navigate('/home')
  }

  return (
    <div style={{ position:'relative', minHeight:'100vh', background:'#FAFAF8', overflow:'hidden' }}
         className="flex flex-col">

      <BackgroundDecor />

      <div style={{ position:'relative', zIndex:1 }}
           className="flex flex-col flex-1 px-6 pt-16 pb-10">

        {/* Back arrow */}
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
          Welcome back
        </h1>
        <p className="text-gray-400 text-sm text-center mb-8">
          Sign in to your account
        </p>

        {/* White rounded card for form with background decorations */}
        <div className="relative">
          <CardBackgroundDecor />
          <div className="relative bg-white rounded-2xl shadow-sm p-6">
          {/* Form */}
          <div className="flex flex-col gap-4 mb-2">

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
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input pr-12"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  autoComplete="current-password"
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
            <p className="text-xs text-critical mb-4 text-center">{error}</p>
          )}

          {/* Sign in button */}
          <button className="btn-primary mt-4 w-full" onClick={handleSignIn}>
            Sign in
          </button>

          {/* Forgot password */}
          <button
            onClick={() => {}} // TODO: forgot password flow
            className="w-full text-center text-sm font-medium text-teal hover:text-teal-dark
                       transition-colors mt-4"
          >
            Forgot password?
          </button>
          </div>
        </div>

        {/* Sign up link */}
        <p className="text-center text-sm text-gray-400 mt-8">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-teal font-medium hover:text-teal-dark transition-colors"
          >
            Sign up free
          </button>
        </p>

      </div>
    </div>
  )
}
