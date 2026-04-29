import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AvailableFlights from './pages/AvailableFlights'
import AvailableCharters from './pages/AvailableCharters'
import SeatSelection from './pages/SeatSelection'
import MyBookings from './pages/MyBookings'
import BookFlight from './pages/BookFlight'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const location = useLocation()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/flights" element={<AvailableFlights />} />
            <Route path="/charters" element={<AvailableCharters />} />
            <Route path="/seat-select" element={<SeatSelection />} />
            <Route path="/bookings" element={<MyBookings />} />
            <Route path="/book" element={<BookFlight />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App
