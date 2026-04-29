import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register, loading, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(name, email, password)
      navigate('/bookings')
    } catch (err) { /* error is set in context */ }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen flex items-center justify-center px-6 pt-20">
      <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="glass-panel p-10 rounded-glass-lg w-full max-w-md">
        <div className="text-center mb-8">
          <span className="material-symbols-outlined text-cyan-400 text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>flight</span>
          <h1 className="font-headline text-h3 text-white">Join NexFly</h1>
          <p className="text-nf-outline text-sm mt-2">Create your elite aviation account</p>
        </div>

        {error && <div className="bg-red-400/10 border border-red-400/30 text-red-400 text-sm p-3 rounded-lg mb-6 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="label-caps text-cyan-400 text-xs">Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-[#050b1a] border border-nf-outline-variant text-nf-on-surface rounded-lg focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 p-3 font-body" placeholder="Vikram Malhotra" />
          </div>
          <div className="space-y-2">
            <label className="label-caps text-cyan-400 text-xs">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-[#050b1a] border border-nf-outline-variant text-nf-on-surface rounded-lg focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 p-3 font-body" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <label className="label-caps text-cyan-400 text-xs">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} className="w-full bg-[#050b1a] border border-nf-outline-variant text-nf-on-surface rounded-lg focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 p-3 font-body" placeholder="••••••••" />
          </div>
          <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={loading} className="w-full btn-primary py-4 text-center disabled:opacity-50">
            {loading ? 'Creating account...' : 'CREATE ACCOUNT'}
          </motion.button>
        </form>

        <p className="text-center text-sm text-nf-outline mt-6">
          Already have an account? <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-bold">Sign in</Link>
        </p>
      </motion.div>
    </motion.div>
  )
}
