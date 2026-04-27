import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      setUser(null)
    }
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  const getDashboardLink = () => {
    if (!user) return '/login'

    if (user.role === 'admin') return '/admin-dashboard'
    if (user.role === 'driver') return '/driver-dashboard'

    return '/customer-dashboard'
  }

  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          TruckDispatch
        </Link>

        <nav className="flex flex-wrap items-center gap-3 text-sm md:text-base">
          <Link to="/" className="hover:text-cyan-300">
            Home
          </Link>

          <Link to="/about" className="hover:text-cyan-300">
            About
          </Link>

          <Link to="/services" className="hover:text-cyan-300">
            Services
          </Link>

          <Link to="/contact" className="hover:text-cyan-300">
            Contact
          </Link>

          <Link to="/quote" className="hover:text-cyan-300">
            Quote
          </Link>

          {user ? (
            <>
              <Link
                to={getDashboardLink()}
                className="hover:text-cyan-300 font-semibold"
              >
                Dashboard
              </Link>

              <span className="bg-slate-800 px-4 py-2 rounded-lg">
                Hi, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-cyan-300">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg font-semibold"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}