import { motion } from 'framer-motion'
import { useState } from 'react'

const bookings = [
  { id:'NX-7829-AF', from:'DEL', fromCity:'New Delhi', to:'BOM', toCity:'Mumbai', date:'24 Nov 2024', time:'14:20 IST', passenger:'Vikram Malhotra', class:'First Class', flightNo:'NF-802', status:'confirmed', duration:'2h 15m' },
  { id:'NX-1120-XQ', from:'DXB', fromCity:'Dubai', to:'LHR', toCity:'London', date:'12 Dec 2024', time:'09:15 GST', passenger:'Vikram Malhotra', class:'Business Executive', flightNo:'NF-104', status:'confirmed', duration:'7h 20m' },
]

export default function MyBookings() {
  const [tab, setTab] = useState('upcoming')
  const tabs = ['Upcoming','Completed','Cancelled']

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <div className="pt-28 pb-16 px-6 lg:px-16 max-w-[1440px] mx-auto min-h-screen">
        {/* Header */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-cyan-400 text-4xl">flight_takeoff</span>
            <h1 className="font-headline text-display text-nf-on-surface" style={{fontSize:'48px'}}>My Flights</h1>
          </div>
          <div className="flex glass-panel p-1 rounded-lg">
            {tabs.map(t=>(
              <button key={t} onClick={()=>setTab(t.toLowerCase())} className={`px-6 py-2 label-caps text-xs transition-all rounded ${tab===t.toLowerCase()?'text-cyan-400 border-b-2 border-cyan-400':'text-slate-500 hover:text-cyan-200'}`}>{t}</button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-12 gap-6">
          {/* Timeline Sidebar */}
          <motion.aside initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{delay:0.2}} className="col-span-12 lg:col-span-3">
            <div className="glass-panel p-6 sticky top-28 rounded-glass-lg">
              <h3 className="font-headline text-h3 mb-6" style={{fontSize:'24px'}}>Flight Journey</h3>
              <div className="relative pl-8 border-l border-white/10 space-y-10">
                <div className="relative">
                  <div className="absolute -left-[37px] top-1 w-4 h-4 bg-cyan-400 rounded-full border-4 border-nf-bg shadow-[0_0_10px_rgba(0,245,255,0.4)]"/>
                  <p className="label-caps text-cyan-400 mb-1 text-[10px]">DEPARTURE</p>
                  <p className="font-headline text-lg mb-1">New Delhi</p>
                  <p className="text-slate-400 text-sm">Indira Gandhi Intl (DEL)</p>
                  <p className="data-mono text-cyan-200 mt-2 text-xs">14:20 • NOV 24</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[37px] top-1 w-4 h-4 bg-slate-600 rounded-full border-4 border-nf-bg"/>
                  <p className="label-caps text-slate-500 mb-1 text-[10px]">DURATION</p>
                  <p className="font-headline text-lg mb-1">2h 15m</p>
                  <p className="text-slate-400 text-sm">Non-stop Flight</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[37px] top-1 w-4 h-4 bg-cyan-400 rounded-full border-4 border-nf-bg shadow-[0_0_10px_rgba(0,245,255,0.4)]"/>
                  <p className="label-caps text-cyan-400 mb-1 text-[10px]">ARRIVAL</p>
                  <p className="font-headline text-lg mb-1">Mumbai</p>
                  <p className="text-slate-400 text-sm">Chhatrapati Shivaji (BOM)</p>
                  <p className="data-mono text-cyan-200 mt-2 text-xs">16:35 • NOV 24</p>
                </div>
              </div>
              <div className="mt-10 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-cyan-400">support_agent</span>
                  <p className="font-body">Concierge Service</p>
                </div>
                <p className="text-sm text-slate-500 mb-4">24/7 personal aviation assistant.</p>
                <button className="w-full py-2 border border-cyan-400 text-cyan-400 label-caps text-xs hover:bg-cyan-400/5 transition-all rounded-lg">Chat Now</button>
              </div>
            </div>
          </motion.aside>

          {/* Bookings List */}
          <section className="col-span-12 lg:col-span-9 space-y-6">
            {bookings.map((b,i)=>(
              <motion.div key={b.id} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.3+i*0.15}} className="glass-panel overflow-hidden rounded-glass-lg hover:border-cyan-400/40 transition-all">
                <div className="p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <h4 className="font-headline text-2xl text-cyan-400">{b.from}</h4>
                        <p className="text-xs text-slate-500">{b.fromCity}</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-24 lg:w-32 h-[1px] border-t border-dashed border-cyan-400/50 relative">
                          <span className="material-symbols-outlined absolute left-1/2 -top-3 -translate-x-1/2 text-cyan-400 text-lg rotate-90">flight</span>
                        </div>
                        <span className="text-[10px] label-caps text-slate-400 tracking-[0.2em]">{b.flightNo}</span>
                      </div>
                      <div className="text-center">
                        <h4 className="font-headline text-2xl text-cyan-400">{b.to}</h4>
                        <p className="text-xs text-slate-500">{b.toCity}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="px-4 py-1 bg-green-400/10 text-green-400 text-[10px] font-bold tracking-widest border border-green-400/30 shadow-[0_0_10px_rgba(74,222,128,0.2)] rounded-sm mb-2 uppercase">CONFIRMED</span>
                      <p className="data-mono text-slate-300 text-xs">ID: {b.id}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-white/5">
                    {[['DEPARTURE DATE',b.date],['TIME',b.time],['PASSENGER',b.passenger],['CLASS',b.class]].map(([label,val])=>(
                      <div key={label}>
                        <p className="label-caps text-[10px] text-slate-500 mb-1">{label}</p>
                        <p className="font-body text-nf-on-surface">{val}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end gap-4 mt-6">
                    <button className="px-5 py-2 border border-red-400 text-red-400 label-caps text-xs hover:bg-red-400/5 transition-all rounded-lg">Cancel</button>
                    <button className="px-5 py-2 border border-cyan-400 text-cyan-400 label-caps text-xs hover:bg-cyan-400/5 transition-all rounded-lg flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">confirmation_number</span> View Ticket
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Promo Banner */}
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.6}} className="relative h-44 rounded-glass-lg overflow-hidden glass-panel flex items-center justify-center">
              <img alt="Private Jet Wing" className="absolute inset-0 w-full h-full object-cover opacity-20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArD76d_nQ3PHEuby_mY2AnAVFmvSr_83caYpjG-aYbULA419KdWpM00CaoTPNroXH6jEVRlMMdjCkyRjkqT7X8X4r-p5s6raZSelx8IVjBkd_-3TRsuC6j2pJkzTwCK364Te_qLyzx6kr_riOd9D9-eQpPo-WfE5ESqhDyMPMAubxZznkCBx_kRXnlA0eoYazTIxqXij4Lf5RBKPxx5GN7bPgTg1ElEZbZ_lUiQZ-mlnwfiTSciQt3JSP3r8L3SbjHg5tkXBFue3IB"/>
              <div className="relative z-10 text-center">
                <p className="font-headline text-h3 mb-2" style={{fontSize:'24px'}}>Exclusive Fleet Upgrade</p>
                <p className="text-slate-400 mb-4 text-sm">Upgrade to our new Ultra-Long Range G700 series.</p>
                <button className="btn-primary text-sm">Explore Fleet</button>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </motion.div>
  )
}
