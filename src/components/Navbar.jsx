import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useCurrency } from '../context/CurrencyContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { currencyCode, setCurrencyCode, currencies } = useCurrency()
  const { user, isAuthenticated, logout } = useAuth()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/flights', label: 'Flights' },
    { to: '/bookings', label: 'My Bookings' },
    { to: '/charters', label: 'Charters' },
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 w-full z-50 bg-[#050b1a]/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_0_20px_rgba(0,212,255,0.08)]"
    >
      <div className="flex justify-between items-center w-full px-6 lg:px-16 py-4 max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="material-symbols-outlined text-cyan-400 text-2xl group-hover:drop-shadow-[0_0_12px_rgba(0,245,255,0.8)] transition-all" style={{ fontVariationSettings: "'FILL' 1" }}>
            flight
          </span>
          <span className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(0,245,255,0.5)] font-headline tracking-tight">
            NexFly
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={isActive(link.to) ? 'nav-link-active' : 'nav-link'}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Currency Switcher */}
          <select
            value={currencyCode}
            onChange={(e) => setCurrencyCode(e.target.value)}
            className="hidden sm:block bg-transparent border border-cyan-400/30 text-cyan-400 text-xs font-mono px-2 py-1.5 rounded-lg cursor-pointer focus:ring-1 focus:ring-cyan-400 focus:outline-none hover:border-cyan-400/60 transition-all"
          >
            {Object.keys(currencies).map((code) => (
              <option key={code} value={code} className="bg-nf-surface text-nf-on-surface">
                {currencies[code].symbol} {code}
              </option>
            ))}
          </select>
          {isAuthenticated ? (
            <>
              <span className="hidden sm:block text-sm text-cyan-300 font-body">Hi, {user.name}</span>
              <button onClick={logout} className="px-5 py-2 border border-red-400/50 text-red-400 font-headline font-bold hover:bg-red-400/10 transition-all active:scale-95 rounded-lg text-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost hidden sm:block">Login</Link>
              <Link to="/register" className="px-5 py-2 bg-cyan-400 text-[#050b1a] font-headline font-bold hover:bg-cyan-300 transition-all active:scale-95 rounded-lg text-sm">
                Register
              </Link>
            </>
          )}
          {/* Mobile hamburger */}
          <button
            className="md:hidden text-cyan-400 p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#050b1a]/95 backdrop-blur-xl border-t border-cyan-500/10 px-6 pb-6"
        >
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 border-b border-cyan-900/30 ${
                isActive(link.to) ? 'text-cyan-400 font-bold' : 'text-slate-300'
              } font-headline`}
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.header>
  )
}
