import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api'

export default function Login() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'customer',
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const loginData = {
        email: form.email,
        password: form.password,
        role: form.role,
      }

      const res = await API.post('/auth/login', loginData)

      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))

      alert('Login successful!')

      if (res.data.user.role === 'admin') {
        navigate('/admin-dashboard')
      } else if (res.data.user.role === 'driver') {
        navigate('/driver-dashboard')
      } else {
        navigate('/customer-dashboard')
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed')
    }
  }

  return (
    <section className="bg-slate-50 min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Side Content */}
        <div className="hidden lg:block">
          <p className="text-cyan-600 font-semibold uppercase tracking-wide">
            Welcome Back
          </p>

          <h1 className="text-5xl font-bold text-slate-900 mt-4 leading-tight">
            Login to Your TruckDispatch Account
          </h1>

          <p className="text-slate-600 text-lg leading-8 mt-6">
            Access your dashboard to manage loads, drivers, dispatch records,
            customer requests, and delivery status in one simple platform.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <div className="text-3xl mb-4">🚚</div>
              <h3 className="font-bold text-slate-900">Dispatch Control</h3>
              <p className="text-slate-600 text-sm mt-2">
                Manage trips, loads, and driver assignments easily.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <div className="text-3xl mb-4">📦</div>
              <h3 className="font-bold text-slate-900">Load Tracking</h3>
              <p className="text-slate-600 text-sm mt-2">
                Track delivery status from pickup to drop-off.
              </p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              TD
            </div>

            <h2 className="text-3xl font-bold text-slate-900">
              Login
            </h2>

            <p className="text-slate-600 mt-2">
              Enter your details to access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 pr-20 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition"
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-cyan-600 hover:text-cyan-700"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Login As
              </label>

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition bg-white"
              >
                <option value="customer">Customer</option>
                <option value="driver">Driver</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-cyan-500/30 transition"
            >
              Login to Dashboard
            </button>

            <p className="text-center text-slate-600">
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                className="text-cyan-600 hover:text-cyan-700 font-semibold"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}