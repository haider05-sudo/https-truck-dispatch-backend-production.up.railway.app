import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api'

export default function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      alert('Password and confirm password do not match!')
      return
    }

    try {
      const userData = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      }

      await API.post('/auth/register', userData)

      alert('Registration successful! Please login now.')

      setForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'customer',
      })

      navigate('/login')
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <section className="bg-slate-50 min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="hidden lg:block">
          <p className="text-cyan-600 font-semibold uppercase tracking-wide">
            Create Account
          </p>

          <h1 className="text-5xl font-bold text-slate-900 mt-4 leading-tight">
            Join TruckDispatch Today
          </h1>

          <p className="text-slate-600 text-lg leading-8 mt-6">
            Create your account to request freight quotes, manage dispatch
            records, track loads, and access your dashboard easily.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <div className="text-3xl mb-4">👤</div>
              <h3 className="font-bold text-slate-900">
                Customer Account
              </h3>
              <p className="text-slate-600 text-sm mt-2">
                Request quotes and track your shipment status.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <div className="text-3xl mb-4">🚚</div>
              <h3 className="font-bold text-slate-900">
                Driver Account
              </h3>
              <p className="text-slate-600 text-sm mt-2">
                View assigned loads and update delivery progress.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              TD
            </div>

            <h2 className="text-3xl font-bold text-slate-900">
              Register
            </h2>

            <p className="text-slate-600 mt-2">
              Fill in your details to create a new account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition"
                placeholder="Enter your full name"
                required
              />
            </div>

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
                  placeholder="Create password"
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
                Confirm Password
              </label>

              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition"
                placeholder="Confirm password"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Register As
              </label>

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition bg-white"
              >
                <option value="customer">Customer</option>
                <option value="driver">Driver</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-cyan-500/30 transition"
            >
              Create Account
            </button>

            <p className="text-center text-slate-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-cyan-600 hover:text-cyan-700 font-semibold"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}