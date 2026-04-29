import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useCurrency } from '../context/CurrencyContext'
import api from '../services/api'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

export default function AvailableFlights() {
  const [sortBy, setSortBy] = useState('price')
  const { formatPrice } = useCurrency()
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getFlights()
      .then(data => {
        const parsed = data.map(f => ({
          ...f,
          dep: f.departureTime, depCode: f.departureCode, depName: f.departureName,
          arr: f.arrivalTime, arrCode: f.arrivalCode, arrName: f.arrivalName,
          class: f.flightClass, priceINR: f.priceInr,
          amenities: f.amenities ? JSON.parse(f.amenities) : [],
        }))
        setFlights(parsed)
      })
      .catch(err => console.error('Failed to load flights:', err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="pt-28 pb-16 px-6 lg:px-16 max-w-[1600px] mx-auto">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mb-8 glass-panel p-6 flex flex-col lg:flex-row justify-between items-center rounded-glass-lg gap-4">
          <div className="flex items-center gap-6">
            <div className="text-left"><p className="label-caps text-cyan-400/60">Origin</p><p className="font-headline text-2xl text-cyan-400">DEL</p></div>
            <div className="flex flex-col items-center px-4"><span className="material-symbols-outlined text-cyan-400/40" style={{ fontVariationSettings: "'FILL' 1" }}>flight_takeoff</span><div className="h-[1px] w-12 bg-cyan-400/20 my-1" /></div>
            <div className="text-left"><p className="label-caps text-cyan-400/60">Destination</p><p className="font-headline text-2xl text-cyan-400">BOM</p></div>
          </div>
          <div className="flex gap-8 border-l border-cyan-400/10 pl-8">
            <div><p className="label-caps text-cyan-400/60">Departure</p><p className="font-body font-bold">24 OCT 2024</p></div>
            <div><p className="label-caps text-cyan-400/60">Passengers</p><p className="font-body font-bold">01 Adult</p></div>
          </div>
          <button className="btn-outline text-xs uppercase">Modify Search</button>
        </motion.div>

        <div className="grid grid-cols-12 gap-6">
          <motion.aside initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="col-span-12 lg:col-span-3 space-y-6">
            <div className="glass-panel p-6 rounded-glass-lg sticky top-28">
              <h3 className="font-headline text-lg mb-6 text-cyan-400">Filters</h3>
              <div className="mb-8"><div className="flex justify-between mb-3"><label className="label-caps text-cyan-400/70">Price Range</label><span className="data-mono text-cyan-400 text-xs">{formatPrice(15000)} max</span></div><input type="range" min="5000" max="50000" className="w-full h-1 bg-cyan-400/20 rounded-lg appearance-none cursor-pointer accent-cyan-400" /></div>
              <div className="mb-8"><label className="label-caps text-cyan-400/70 block mb-4">Airlines</label><div className="space-y-3">{['NexFly Orbital', 'StarLink Aero', 'Vistara Sky'].map((airline, i) => (<label key={airline} className="flex items-center gap-3 group cursor-pointer"><input type="checkbox" defaultChecked={i === 0} className="rounded-sm bg-transparent border-cyan-400/40 text-cyan-500 focus:ring-0" /><span className="text-sm font-body group-hover:text-cyan-300 transition-colors">{airline}</span></label>))}</div></div>
              <div className="mb-8"><label className="label-caps text-cyan-400/70 block mb-4">Flight Stops</label><div className="flex gap-2">{['Non-Stop', '1 Stop', '2+'].map((stop, i) => (<button key={stop} className={`flex-1 py-2 border text-xs font-headline rounded-lg transition-all ${i === 0 ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-400' : 'border-cyan-400/20 text-cyan-400/60 hover:bg-cyan-400/10'}`}>{stop}</button>))}</div></div>
              <div><label className="label-caps text-cyan-400/70 block mb-4">Max Duration</label><input type="range" min="2" max="12" className="w-full h-1 bg-cyan-400/20 rounded-lg appearance-none cursor-pointer accent-cyan-400" /><div className="flex justify-between mt-2"><span className="data-mono text-cyan-400/40 text-[10px]">2h</span><span className="data-mono text-cyan-400/40 text-[10px]">12h</span></div></div>
            </div>
            <div className="glass-panel-elevated p-6 rounded-glass-lg overflow-hidden relative"><div className="relative z-10"><h4 className="font-headline text-base text-cyan-400 mb-2">Orbital Lounge</h4><p className="text-xs text-nf-on-surface-variant mb-4">Upgrade to NexFly Prime for zero-gravity lounge access.</p><button className="text-xs data-mono uppercase text-cyan-400 border-b border-cyan-400/40 pb-1 hover:border-cyan-400 transition-all">Upgrade Now</button></div><div className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-2xl bg-cyan-400 pointer-events-none" /></div>
          </motion.aside>

          <section className="col-span-12 lg:col-span-9 space-y-6">
            <div className="flex justify-between items-center mb-2">
              <p className="data-mono text-sm text-cyan-400/60">{loading ? 'Loading flights...' : <>Showing <span className="text-cyan-400">{flights.length} flights</span></>}</p>
              <div className="flex items-center gap-3"><span className="text-xs label-caps text-cyan-400/40">Sort by:</span><select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent border-none text-sm font-bold text-cyan-400 focus:ring-0 font-body cursor-pointer"><option className="bg-nf-surface">Cheapest Price</option><option className="bg-nf-surface">Shortest Duration</option><option className="bg-nf-surface">Earliest Departure</option></select></div>
            </div>

            {flights.map((flight, i) => (
              <motion.div key={flight.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }} className="glass-panel-elevated p-6 lg:p-8 rounded-glass-lg group transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(0,212,255,0.1)]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                  <div className="flex items-center gap-4"><div className="w-12 h-12 bg-nf-surface-container rounded-lg flex items-center justify-center border border-cyan-400/20"><span className="material-symbols-outlined text-cyan-400 text-2xl">{flight.icon}</span></div><div><p className="font-headline text-lg text-cyan-400">{flight.airline}</p><p className="data-mono text-xs text-cyan-400/40 uppercase tracking-widest">{flight.type}</p></div></div>
                  <div className="text-right">{flight.confirmed && (<div className="bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded text-[10px] data-mono text-cyan-400 uppercase inline-flex items-center gap-1 mb-1"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" /> Confirmed Seat</div>)}<p className="text-xs text-cyan-400/60 data-mono uppercase">{flight.class}</p></div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4 lg:gap-8 mb-6">
                  <div className="text-left"><p className="font-headline text-2xl lg:text-3xl mb-1">{flight.dep}</p><p className="data-mono text-xs text-cyan-400 uppercase">{flight.depCode} ({flight.depName})</p></div>
                  <div className="relative flex flex-col items-center"><span className="data-mono text-[10px] text-cyan-400/40 uppercase mb-2">{flight.duration} ({flight.stops})</span><div className="w-full flight-path-line relative"><span className="material-symbols-outlined text-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-nf-surface px-2 text-lg rotate-90" style={{ fontVariationSettings: "'FILL' 1" }}>flight</span></div></div>
                  <div className="text-right"><p className="font-headline text-2xl lg:text-3xl mb-1">{flight.arr}</p><p className="data-mono text-xs text-cyan-400 uppercase">{flight.arrCode} ({flight.arrName})</p></div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-cyan-400/10 gap-4">
                  <div className="flex gap-4 lg:gap-6">{flight.amenities.map((a) => (<div key={a.text} className="flex items-center gap-1 text-cyan-400/60"><span className="material-symbols-outlined text-lg">{a.icon}</span><span className="text-xs data-mono uppercase">{a.text}</span></div>))}</div>
                  <div className="flex items-center gap-4 lg:gap-6"><div className="text-right"><p className="font-mono text-2xl lg:text-3xl text-cyan-400 font-bold">{formatPrice(flight.priceINR)}</p><p className="data-mono text-[10px] text-cyan-400/40 uppercase">Incl. taxes & fees</p></div><motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-primary text-sm">Book Now</motion.button></div>
                </div>
              </motion.div>
            ))}
          </section>
        </div>
      </div>
    </motion.div>
  )
}
