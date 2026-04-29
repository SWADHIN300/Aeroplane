import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useCurrency } from '../context/CurrencyContext'
import api from '../services/api'

export default function AvailableCharters() {
  const { formatPrice } = useCurrency()
  const [charters, setCharters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getCharters()
      .then(data => {
        const parsed = data.map(c => ({
          ...c,
          dep: c.departureTime, depFull: c.departureFull,
          arr: c.arrivalTime, arrFull: c.arrivalFull,
          priceINR: c.priceInr,
        }))
        setCharters(parsed)
      })
      .catch(err => console.error('Failed to load charters:', err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="pt-28 pb-16 px-6 lg:px-16 max-w-[1440px] mx-auto grid grid-cols-12 gap-6">
        <motion.aside initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="col-span-12 lg:col-span-3">
          <div className="glass-panel p-6 rounded-glass-lg sticky top-28 space-y-8">
            <h3 className="font-headline text-h3 mb-2">Filters</h3>
            <div><label className="label-caps text-nf-on-surface-variant block mb-4">Price Range</label><input type="range" className="w-full accent-cyan-400 bg-nf-surface-container-highest h-1 rounded-full appearance-none cursor-pointer" /><div className="flex justify-between mt-2 data-mono text-cyan-400 text-xs"><span>{formatPrice(20000)}</span><span>{formatPrice(208000)}</span></div></div>
            <div><label className="label-caps text-nf-on-surface-variant block mb-4">Stops</label><div className="space-y-3">{['Nonstop', '1 Stop', '2+ Stops'].map((s) => (<label key={s} className="flex items-center gap-3 cursor-pointer group"><input type="checkbox" className="w-4 h-4 bg-transparent border-nf-outline-variant text-cyan-400 rounded focus:ring-cyan-400" /><span className="font-body text-nf-on-surface group-hover:text-cyan-200 transition-colors">{s}</span></label>))}</div></div>
            <div><label className="label-caps text-nf-on-surface-variant block mb-4">Airlines</label><div className="space-y-3">{['Nebula Air', 'Stellar Wings', 'Zenith Liner'].map((a, i) => (<label key={a} className="flex items-center gap-3 cursor-pointer group"><input type="checkbox" defaultChecked={i === 0} className="w-4 h-4 bg-transparent border-nf-outline-variant text-cyan-400 rounded focus:ring-cyan-400" /><span className="font-body text-nf-on-surface group-hover:text-cyan-200 transition-colors">{a}</span></label>))}</div></div>
            <div><label className="label-caps text-nf-on-surface-variant block mb-4">Max Duration</label><input type="range" className="w-full accent-cyan-400 bg-nf-surface-container-highest h-1 rounded-full appearance-none cursor-pointer" /><div className="flex justify-between mt-2 data-mono text-cyan-400 text-xs"><span>2h</span><span>18h</span></div></div>
          </div>
        </motion.aside>

        <section className="col-span-12 lg:col-span-9 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 gap-4">
            <div><h2 className="font-headline text-h2">DEL <span className="text-cyan-400 mx-2">→</span> BOM</h2><p className="font-body text-body-lg text-nf-on-surface-variant">{loading ? 'Loading charters...' : `Showing ${charters.length} available private flights`}</p></div>
            <button className="flex items-center gap-2 bg-nf-surface-container-high px-4 py-2 border border-nf-outline-variant hover:border-cyan-400/50 transition-all rounded-lg"><span className="material-symbols-outlined text-cyan-400">sort</span><span className="label-caps text-sm">Sort By: Recommended</span></button>
          </motion.div>

          {charters.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }} className="glass-panel p-6 lg:p-8 rounded-glass-lg flex flex-col lg:flex-row items-center justify-between group hover:border-cyan-400/40 transition-all duration-300 gap-6">
              <div className="flex items-center gap-6 flex-1 w-full">
                <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-cyan-400/20 transition-all shrink-0"><span className="material-symbols-outlined text-2xl text-cyan-400">{c.icon}</span></div>
                <div className="flex-1 grid grid-cols-3 gap-4 lg:gap-8 items-center">
                  <div className="text-left"><span className="font-headline text-xl lg:text-2xl block">{c.dep}</span><span className="label-caps text-nf-on-surface-variant text-[10px]">{c.depFull}</span></div>
                  <div className="flex flex-col items-center gap-2"><span className="data-mono text-xs text-nf-on-surface-variant">{c.duration} ({c.stops})</span><div className="relative w-full px-2"><div className="flight-path-line" />{c.hasStop && <div className="absolute left-1/2 -top-1 w-2 h-2 rounded-full bg-nf-on-surface" />}<span className="material-symbols-outlined text-cyan-400 absolute left-[70%] -top-3 -translate-x-1/2 text-lg">flight</span></div></div>
                  <div className="text-right"><span className="font-headline text-xl lg:text-2xl block">{c.arr}</span><span className="label-caps text-nf-on-surface-variant text-[10px]">{c.arrFull}</span></div>
                </div>
              </div>
              <div className="lg:ml-8 lg:pl-8 lg:border-l border-white/10 flex flex-col items-end gap-3 min-w-[160px] w-full lg:w-auto">
                <div className="text-right"><span className="label-caps text-nf-on-surface-variant block">starting at</span><span className="font-headline text-2xl lg:text-3xl text-cyan-400 drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]">{formatPrice(c.priceINR)}</span></div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full btn-primary flex items-center justify-center gap-2 text-sm">BOOK NOW <span className="material-symbols-outlined text-lg">arrow_forward</span></motion.button>
              </div>
            </motion.div>
          ))}
        </section>
      </div>
    </motion.div>
  )
}
