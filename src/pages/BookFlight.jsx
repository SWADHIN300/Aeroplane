import { motion } from 'framer-motion'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCurrency } from '../context/CurrencyContext'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

export default function BookFlight() {
  const location = useLocation()
  const navigate = useNavigate()
  const { formatPrice } = useCurrency()
  const { isAuthenticated, user } = useAuth()
  const flight = location.state?.flight

  const [passengerName, setPassengerName] = useState(user?.name || '')
  const [flightDate, setFlightDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [booked, setBooked] = useState(null)
  const [error, setError] = useState(null)

  if (!flight) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex items-center justify-center pt-20">
        <div className="glass-panel p-10 rounded-glass-lg text-center max-w-md">
          <span className="material-symbols-outlined text-5xl text-red-400 mb-4">error</span>
          <h2 className="font-headline text-h3 mb-3">No Flight Selected</h2>
          <p className="text-slate-400 mb-6">Please select a flight from the flights page first.</p>
          <button onClick={() => navigate('/flights')} className="btn-primary">Browse Flights</button>
        </div>
      </motion.div>
    )
  }

  const handleBook = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { redirect: '/book', flight } })
      return
    }
    if (!passengerName.trim() || !flightDate) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const booking = await api.createBooking({
        flightId: flight.id,
        fromCode: flight.departureCode || flight.depCode,
        fromCity: flight.departureName || flight.depName,
        toCode: flight.arrivalCode || flight.arrCode,
        toCity: flight.arrivalName || flight.arrName,
        flightDate,
        flightTime: flight.departureTime || flight.dep,
        passengerName,
        flightClass: flight.flightClass || flight.class,
        flightNo: flight.airline,
        duration: flight.duration,
      })
      setBooked(booking)
    } catch (err) {
      setError(err.message || 'Booking failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Success view
  if (booked) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex items-center justify-center pt-20 px-6">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', duration: 0.6 }} className="glass-panel p-10 rounded-glass-lg max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-400/30">
            <span className="material-symbols-outlined text-green-400 text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <h2 className="font-headline text-h2 text-white mb-2">Booking Confirmed!</h2>
          <p className="text-slate-400 mb-8">Your flight has been successfully booked.</p>

          {/* Ticket Card */}
          <div className="glass-panel-elevated p-6 rounded-glass-lg text-left mb-6 border border-cyan-400/20">
            <div className="flex justify-between items-center mb-4">
              <span className="label-caps text-cyan-400 text-xs">BOOKING REF</span>
              <span className="font-mono text-lg text-cyan-400 font-bold">{booked.bookingRef}</span>
            </div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="text-center">
                <p className="font-headline text-2xl text-white">{booked.fromCode}</p>
                <p className="text-xs text-slate-400">{booked.fromCity}</p>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full h-[1px] border-t border-dashed border-cyan-400/50 relative">
                  <span className="material-symbols-outlined absolute left-1/2 -top-3 -translate-x-1/2 text-cyan-400 text-lg rotate-90" style={{ fontVariationSettings: "'FILL' 1" }}>flight</span>
                </div>
              </div>
              <div className="text-center">
                <p className="font-headline text-2xl text-white">{booked.toCode}</p>
                <p className="text-xs text-slate-400">{booked.toCity}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div><span className="label-caps text-[10px] text-slate-500">DATE</span><p className="text-sm">{booked.flightDate}</p></div>
              <div><span className="label-caps text-[10px] text-slate-500">TIME</span><p className="text-sm">{booked.flightTime}</p></div>
              <div><span className="label-caps text-[10px] text-slate-500">PASSENGER</span><p className="text-sm">{booked.passengerName}</p></div>
              <div><span className="label-caps text-[10px] text-slate-500">CLASS</span><p className="text-sm">{booked.flightClass}</p></div>
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => navigate('/bookings')} className="flex-1 btn-primary">View My Bookings</button>
            <button onClick={() => navigate('/flights')} className="flex-1 btn-outline">Book Another</button>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  // Booking form
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="pt-28 pb-16 px-6 lg:px-16 max-w-4xl mx-auto">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-4 text-sm">
            <span className="material-symbols-outlined text-lg">arrow_back</span> Back to Flights
          </button>
          <h1 className="font-headline text-h2 text-white">Confirm Your Booking</h1>
          <p className="text-slate-400 mt-2">Review your flight details and complete the booking.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Flight Summary */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="lg:col-span-3 glass-panel p-8 rounded-glass-lg">
            <h2 className="font-headline text-lg text-cyan-400 mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">flight</span> Flight Details
            </h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-nf-surface-container rounded-lg flex items-center justify-center border border-cyan-400/20">
                <span className="material-symbols-outlined text-cyan-400 text-2xl">{flight.icon}</span>
              </div>
              <div>
                <p className="font-headline text-lg">{flight.airline}</p>
                <p className="data-mono text-xs text-cyan-400/50 uppercase">{flight.type || flight.flightClass || ''}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 items-center gap-4 mb-6 py-6 border-y border-white/5">
              <div>
                <p className="font-headline text-3xl">{flight.departureTime || flight.dep}</p>
                <p className="data-mono text-xs text-cyan-400 uppercase mt-1">{flight.departureCode || flight.depCode}</p>
                <p className="text-xs text-slate-400">{flight.departureName || flight.depName}</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="data-mono text-[10px] text-cyan-400/40 uppercase mb-2">{flight.duration}</span>
                <div className="w-full h-[1px] border-t border-dashed border-cyan-400/30 relative">
                  <span className="material-symbols-outlined text-cyan-400 absolute left-1/2 -top-3 -translate-x-1/2 text-lg rotate-90" style={{ fontVariationSettings: "'FILL' 1" }}>flight</span>
                </div>
                <span className="data-mono text-[10px] text-cyan-400/40 uppercase mt-2">{flight.stops}</span>
              </div>
              <div className="text-right">
                <p className="font-headline text-3xl">{flight.arrivalTime || flight.arr}</p>
                <p className="data-mono text-xs text-cyan-400 uppercase mt-1">{flight.arrivalCode || flight.arrCode}</p>
                <p className="text-xs text-slate-400">{flight.arrivalName || flight.arrName}</p>
              </div>
            </div>

            {/* Passenger Form */}
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="label-caps text-cyan-400 text-xs">Passenger Name</label>
                <input type="text" value={passengerName} onChange={e => setPassengerName(e.target.value)} className="w-full bg-[#050b1a] border border-nf-outline-variant text-nf-on-surface rounded-lg focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 p-3 font-body" placeholder="Full name as per ID" />
              </div>
              <div className="space-y-2">
                <label className="label-caps text-cyan-400 text-xs">Travel Date</label>
                <input type="date" value={flightDate} onChange={e => setFlightDate(e.target.value)} className="w-full bg-[#050b1a] border border-nf-outline-variant text-nf-on-surface rounded-lg focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 p-3 font-body" />
              </div>
            </div>
          </motion.div>

          {/* Price Summary */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-6">
            <div className="glass-panel p-6 rounded-glass-lg">
              <h3 className="font-headline text-lg text-cyan-400 mb-4">Price Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm"><span className="text-slate-400">Base Fare</span><span>{formatPrice((flight.priceInr || flight.priceINR) * 0.85)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-400">Taxes & Fees</span><span>{formatPrice((flight.priceInr || flight.priceINR) * 0.12)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-400">Service Charge</span><span>{formatPrice((flight.priceInr || flight.priceINR) * 0.03)}</span></div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between font-bold text-lg"><span className="text-cyan-400">Total</span><span className="text-cyan-400 font-mono">{formatPrice(flight.priceInr || flight.priceINR)}</span></div>
              </div>
            </div>

            {error && <div className="bg-red-400/10 border border-red-400/30 text-red-400 text-sm p-3 rounded-lg text-center">{error}</div>}

            {!isAuthenticated && (
              <div className="bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-sm p-4 rounded-lg">
                <p className="font-bold mb-1">Login Required</p>
                <p className="text-xs text-yellow-400/70">You need to sign in to complete your booking.</p>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleBook}
              disabled={loading}
              className="w-full group relative overflow-hidden bg-cyan-400 text-[#050b1a] font-headline py-5 rounded-glass-lg hover:bg-cyan-300 text-lg disabled:opacity-50 transition-all"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {loading ? 'Processing...' : (isAuthenticated ? 'CONFIRM BOOKING' : 'LOGIN TO BOOK')}
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  {isAuthenticated ? 'check' : 'login'}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
