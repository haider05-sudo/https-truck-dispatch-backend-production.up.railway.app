import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                TD
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  TruckDispatch
                </h2>
                <p className="text-xs text-slate-400">
                  Smart Logistics System
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-400 text-center md:text-left">
              A simple and reliable truck dispatching management system for
              customers, dispatchers, and drivers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2 text-sm">
              <Link to="/" className="hover:text-cyan-400 transition">
                Home
              </Link>
              <Link to="/about" className="hover:text-cyan-400 transition">
                About
              </Link>
              <Link to="/services" className="hover:text-cyan-400 transition">
                Services
              </Link>
              <Link to="/quote" className="hover:text-cyan-400 transition">
                Get Quote
              </Link>
              <Link to="/contact" className="hover:text-cyan-400 transition">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h3 className="text-white font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-2 text-sm text-slate-400">
              <p>Email: support@truckdispatch.com</p>
              <p>Phone: +92 300 1234567</p>
              <p>Location: Pakistan</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>© 2026 TruckDispatch. All rights reserved.</p>
          <p>Built with React, Tailwind CSS, and clean UI.</p>
        </div>
      </div>
    </footer>
  )
}