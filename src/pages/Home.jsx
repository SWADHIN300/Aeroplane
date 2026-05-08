import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCurrency } from '../context/CurrencyContext'
import api from '../services/api'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: 'easeOut' },
  }),
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

const stats = [
  { value: '500+', label: 'Airlines' },
  { value: '150+', label: 'Countries' },
  { value: '2M+', label: 'Travelers' },
  { value: '4.9', label: 'Rating', icon: 'star' },
]

function AnimatedSection({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const { formatPrice } = useCurrency()
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getDestinations()
      .then(data => setDestinations(data))
      .catch(err => console.error('Failed to load destinations:', err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 star-field opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-64 aurora-blur -rotate-12 pointer-events-none" />

        {/* Commercial Plane Image */}
        <div className="relative w-full max-w-[1440px] mx-auto px-8 lg:px-16 overflow-hidden">
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute top-8 lg:top-12 -right-8 lg:right-4 pointer-events-none opacity-30 md:opacity-80 z-0 max-h-[380px] lg:max-h-[420px] overflow-hidden"
          >
            <img
              className="w-[320px] lg:w-[480px] xl:w-[520px] h-auto object-contain drop-shadow-[0_0_40px_rgba(0,245,255,0.25)]"
              src="/commercial-plane.png"
              alt="Commercial aeroplane"
              style={{ filter: 'brightness(1.05)' }}
            />
            <div className="absolute top-1/2 right-full w-[300px] h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent blur-sm" />
          </motion.div>

          <div className="relative z-10 pt-20 lg:pt-32 pb-16">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-headline text-display text-white mb-4 max-w-2xl cyan-glow leading-[1.05]"
            >
              Your Journey <br />Begins Here
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="font-body text-body-lg text-nf-outline mb-12 max-w-lg"
            >
              Experience the pinnacle of air travel. Book direct flights to over 150 countries with NexFly's world-class service.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="glass-panel p-6 rounded-glass-lg box-glow max-w-5xl w-full flex flex-col lg:flex-row gap-4 items-end"
            >
              <div className="flex-1 w-full space-y-2">
                <label className="label-caps text-cyan-400 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]">flight_takeoff</span> FROM
                </label>
                <input
                  className="w-full bg-[#050b1a] border border-nf-outline-variant text-nf-on-surface rounded-lg focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 p-3 font-body"
                  placeholder="New York (JFK)"
                  type="text"
                />
              </div>

              <button className="bg-cyan-500/10 border border-cyan-400/30 p-3 rounded-lg text-cyan-400 hover:bg-cyan-400/20 transition-all self-center lg:mt-6 shrink-0">
                <span className="material-symbols-outlined">swap_horiz</span>
              </button>

              <div className="flex-1 w-full space-y-2">
                <label className="label-caps text-cyan-400 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]">flight_land</span> TO
                </label>
                <input
                  className="w-full bg-[#050b1a] border border-nf-outline-variant text-nf-on-surface rounded-lg focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 p-3 font-body"
                  placeholder="London (LHR)"
                  type="text"
                />
              </div>

              <div className="w-full lg:w-44 space-y-2">
                <label className="label-caps text-cyan-400 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span> DATE
                </label>
                <input
                  className="w-full bg-[#050b1a] border border-nf-outline-variant text-nf-on-surface rounded-lg focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 p-3 font-body"
                  type="date"
                />
              </div>

              <Link to="/flights" className="btn-primary whitespace-nowrap text-center w-full lg:w-auto">
                SEARCH FLIGHTS
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <AnimatedSection className="py-16 lg:py-20 px-8 lg:px-16 max-w-[1440px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={fadeInUp}
            custom={i}
            className="glass-panel p-8 rounded-glass text-center border-t-2 border-t-cyan-400 hover:box-glow transition-all duration-300"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="font-headline text-h3 text-white">{stat.value}</span>
              {stat.icon && (
                <span className="material-symbols-outlined text-cyan-400" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {stat.icon}
                </span>
              )}
            </div>
            <span className="label-caps text-nf-outline">{stat.label}</span>
          </motion.div>
        ))}
      </AnimatedSection>

      {/* Popular Destinations */}
      <section className="py-16 lg:py-20 px-8 lg:px-16 max-w-[1440px] mx-auto mb-12">
        <AnimatedSection>
          <motion.div variants={fadeInUp} className="flex justify-between items-end mb-8">
            <div>
              <span className="label-caps text-cyan-400 block mb-2">EXPLORE THE GLOBE</span>
              <h2 className="font-headline text-h2 text-white">Popular Destinations</h2>
            </div>
            <div className="hidden md:flex gap-2">
              <button className="p-2 border border-nf-outline-variant text-nf-outline hover:text-cyan-400 hover:border-cyan-400 transition-all rounded-lg">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button className="p-2 border border-nf-outline-variant text-nf-outline hover:text-cyan-400 hover:border-cyan-400 transition-all rounded-lg">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </motion.div>
        </AnimatedSection>

        <div className="flex overflow-x-auto gap-6 pb-8 no-scrollbar">
          {loading ? (
            // Shimmer loading placeholders
            [1,2,3,4].map(i => (
              <div key={i} className="min-w-[300px] lg:min-w-[320px] shrink-0">
                <div className="h-[400px] rounded-glass-lg glass-panel shimmer-bg" />
              </div>
            ))
          ) : (
            destinations.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="min-w-[300px] lg:min-w-[320px] group cursor-pointer shrink-0"
              >
                <div className="relative h-[400px] rounded-glass-lg overflow-hidden glass-panel transform group-hover:-translate-y-2 group-hover:shadow-[0_15px_30px_rgba(0,245,255,0.15)] transition-all duration-500">
                  <img
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={dest.imageUrl}
                    alt={dest.city}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050b1a] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <span className="label-caps text-cyan-400 mb-2 block">{dest.region}</span>
                    <h3 className="font-headline text-h3 text-white">{dest.city}</h3>
                    <p className="text-sm text-slate-400 mt-1 mb-3">{dest.tagline}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-nf-on-surface font-medium">Starting at</span>
                      <span className="text-cyan-400 font-bold font-mono">{formatPrice(dest.priceInr)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </motion.div>
  )
}
