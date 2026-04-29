import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full border-t border-cyan-900/50 bg-[#050b1a]">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 lg:px-16 py-12 w-full max-w-[1440px] mx-auto">
        <div className="mb-8 md:mb-0 text-center md:text-left">
          <Link to="/" className="text-xl font-black text-cyan-400 uppercase font-headline mb-2 block tracking-tight">
            NexFly
          </Link>
          <p className="font-headline text-sm tracking-wide text-slate-500">
            © 2024 NexFly. The Future of Flight.
          </p>
        </div>

        <div className="flex gap-8 lg:gap-12 mb-8 md:mb-0">
          {['About', 'Contact', 'Privacy', 'Terms'].map((item) => (
            <a
              key={item}
              href="#"
              className="font-headline text-sm tracking-wide text-slate-500 hover:text-cyan-400 hover:drop-shadow-[0_0_5px_rgba(0,245,255,0.6)] transition-all"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex gap-3">
          {['share', 'language'].map((icon) => (
            <button
              key={icon}
              className="w-10 h-10 flex items-center justify-center border border-nf-outline-variant rounded-full text-nf-outline hover:text-cyan-400 hover:border-cyan-400 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">{icon}</span>
            </button>
          ))}
        </div>
      </div>
    </footer>
  )
}
