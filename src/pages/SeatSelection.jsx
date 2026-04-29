import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import api from '../services/api'

export default function SeatSelection() {
  const [selected, setSelected] = useState(null)
  const [seats, setSeats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch seats for flight 1 (default)
    api.getSeatsByFlight(1)
      .then(data => {
        setSeats(data)
        // Pre-select first available economy seat
        const firstAvailable = data.find(s => !s.isTaken && s.cabinClass === 'ECONOMY')
        if (firstAvailable) setSelected(firstAvailable.seatCode)
      })
      .catch(err => console.error('Failed to load seats:', err))
      .finally(() => setLoading(false))
  }, [])

  const takenSet = new Set(seats.filter(s => s.isTaken).map(s => s.seatCode))
  const businessSeats = seats.filter(s => s.cabinClass === 'BUSINESS')
  const economySeats = seats.filter(s => s.cabinClass === 'ECONOMY')

  // Group by row
  const businessRows = []
  const bizByRow = {}
  businessSeats.forEach(s => { if (!bizByRow[s.rowNumber]) bizByRow[s.rowNumber] = []; bizByRow[s.rowNumber].push(s.seatCode) })
  Object.values(bizByRow).forEach(row => businessRows.push(row))

  const economyRowsMap = {}
  economySeats.forEach(s => {
    if (!economyRowsMap[s.rowNumber]) economyRowsMap[s.rowNumber] = { row: s.rowNumber, seats: [], exit: s.isExitRow }
    economyRowsMap[s.rowNumber].seats.push(s.seatCode)
  })
  const economyRows = Object.values(economyRowsMap)

  const getSeatClass = (seat, biz = false) => {
    const sz = biz ? 'w-12 h-12' : 'w-9 h-9'
    const base = `flex items-center justify-center data-mono text-[10px] rounded transition-all ${sz}`
    if (seat === selected) return `${base} bg-nf-primary-container text-white font-bold shadow-[0_0_12px_rgba(0,212,255,0.5)] border border-cyan-300`
    if (takenSet.has(seat)) return `${base} seat-taken border border-nf-outline/20 text-nf-outline/40 cursor-not-allowed`
    if (biz) return `${base} border border-nf-gold-dim/60 text-nf-gold-dim hover:bg-nf-gold-dim/20 cursor-pointer`
    return `${base} border border-cyan-400/40 text-cyan-400/70 hover:bg-cyan-400/15 cursor-pointer`
  }
  const click = (s) => { if (!takenSet.has(s)) setSelected(s) }

  if (loading) {
    return (
      <motion.div initial={{opacity:0}} animate={{opacity:1}} className="pt-24 pb-12 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center"><div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4" /><p className="text-cyan-400 font-headline">Loading Seat Map...</p></div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <div className="pt-24 pb-12 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="flex justify-between items-end mb-4"><span className="font-headline text-h3 text-cyan-400">Select Your Cabin Seat</span><span className="data-mono text-nf-outline uppercase text-sm">Step 03 / 05</span></div>
          <div className="h-1 w-full bg-nf-surface-container-highest rounded-full overflow-hidden"><motion.div initial={{width:0}} animate={{width:'60%'}} transition={{duration:1,delay:0.5}} className="h-full bg-nf-primary-container shadow-[0_0_10px_rgba(0,212,255,0.8)]"/></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 flex flex-col items-center">
            <div className="relative w-full max-w-[550px] glass-panel p-8 lg:p-12 rounded-[80px_80px_32px_32px]">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-28 h-14 bg-gradient-to-b from-nf-surface-container-highest to-transparent rounded-t-full border-t border-x border-cyan-400/15"/>
              <div className="text-center mb-4"><span className="data-mono text-nf-gold-dim uppercase tracking-widest text-xs">Business Class</span><div className="h-px w-full bg-gradient-to-r from-transparent via-nf-gold-dim/40 to-transparent mt-2"/></div>
              <div className="flex flex-col gap-3 mb-6">
                {businessRows.map((row,ri)=>(
                  <div key={ri} className="flex justify-center gap-10">
                    <div className="flex gap-3">{row.slice(0,2).map(s=><button key={s} onClick={()=>click(s)} className={getSeatClass(s,true)}>{s}</button>)}</div>
                    <div className="flex gap-3">{row.slice(2).map(s=><button key={s} onClick={()=>click(s)} className={getSeatClass(s,true)}>{s}</button>)}</div>
                  </div>
                ))}
              </div>
              <div className="h-10 w-full flex items-center justify-center relative mb-4"><span className="data-mono text-[10px] text-nf-outline uppercase bg-nf-bg px-4 z-10">Galley & Restrooms</span><div className="absolute w-full h-[1px] bg-nf-outline/20"/></div>
              <div className="text-center mb-4"><span className="data-mono text-cyan-400 uppercase tracking-widest text-xs">Economy Class</span></div>
              <div className="flex flex-col gap-3">
                {economyRows.map(row=>(
                  <div key={row.row} className={`flex justify-between items-center px-4 ${row.exit?'bg-cyan-400/5 py-2 border-y border-cyan-400/10':''}`}>
                    <div className="flex gap-2">{row.seats.slice(0,3).map(s=><button key={s} onClick={()=>click(s)} className={getSeatClass(s)}>{s}</button>)}</div>
                    <div className="data-mono text-[10px] text-nf-outline/50">{row.exit?<span className="text-cyan-400/80">EXIT</span>:<span>ROW {row.row}</span>}</div>
                    <div className="flex gap-2">{row.seats.slice(3).map(s=><button key={s} onClick={()=>click(s)} className={getSeatClass(s)}>{s}</button>)}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-center"><div className="w-40 h-10 bg-gradient-to-t from-nf-surface-container-highest/50 to-transparent rounded-b-full border-b border-x border-nf-outline/10"/></div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-6 rounded-glass-lg space-y-4">
              <h2 className="font-headline text-xl text-cyan-400">Your Selection</h2>
              <div className="flex items-center gap-4 bg-nf-surface-container p-4 rounded-lg border border-nf-outline/10"><div className="w-12 h-12 rounded-lg bg-cyan-400/10 flex items-center justify-center text-cyan-400"><span className="material-symbols-outlined">airline_seat_recline_extra</span></div><div><div className="data-mono text-sm text-nf-outline uppercase">Selected Seat</div><div className="font-mono text-price text-cyan-400">{selected || '—'}</div></div></div>
              {selected && [['CABIN CLASS',selected.match(/^[12]/)?'BUSINESS':'ECONOMY'],['LEG ROOM','32 IN'],['AMENITIES','USB-C, WIFI 6E']].map(([l,v])=>(<div key={l} className="flex justify-between data-mono text-sm"><span className="text-nf-outline">{l}</span><span>{v}</span></div>))}
            </div>
            <div className="glass-panel p-6 rounded-glass-lg">
              <h3 className="data-mono text-xs text-nf-outline uppercase mb-4 tracking-widest">Legend</h3>
              {[['border border-cyan-400/40','AVAILABLE'],['bg-nf-primary-container','SELECTED'],['seat-taken border border-nf-outline/20','UNAVAILABLE'],['border border-nf-gold-dim','BUSINESS']].map(([c,l])=>(<div key={l} className="flex items-center gap-3 mb-2"><div className={`w-4 h-4 rounded ${c}`}/><span className="data-mono text-xs">{l}</span></div>))}
            </div>
            <button className="w-full group relative overflow-hidden bg-nf-primary-container text-white font-headline py-5 rounded-glass-lg hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] text-lg"><div className="relative z-10 flex items-center justify-center gap-2">CONTINUE TO PAYMENT<span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span></div><div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"/></button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
