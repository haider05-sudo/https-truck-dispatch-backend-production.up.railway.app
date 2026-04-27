import { useEffect, useState } from 'react'
import API from '../api'

export default function Quote() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    pickupLocation: '',
    dropLocation: '',
    weight: '',
    distance: '',
    truckType: '',
  })

  const [price, setPrice] = useState(null)
  const [breakdown, setBreakdown] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')

    if (savedUser) {
      const user = JSON.parse(savedUser)

      setForm((prev) => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
      }))
    }
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const calculateLocalPrice = () => {
    const baseRate = 5000
    const perKmRate = 50
    const perTonRate = 1000

    const distanceCost = Number(form.distance || 0) * perKmRate
    const weightCost = Number(form.weight || 0) * perTonRate
    const total = baseRate + distanceCost + weightCost

    return {
      total,
      breakdown: {
        baseRate,
        distanceCost,
        weightCost,
      },
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const localQuote = calculateLocalPrice()

      const res = await API.post('/quotes', {
        name: form.name,
        email: form.email,
        pickupLocation: form.pickupLocation,
        dropLocation: form.dropLocation,
        weight: form.weight,
        distance: form.distance,
        truckType: form.truckType,
      })

      const backendPrice = res.data.quote?.estimatedPrice || localQuote.total

      setPrice(backendPrice)
      setBreakdown(localQuote.breakdown)

      alert('Quote request sent successfully! Admin will review it.')

      setForm({
        name: form.name,
        email: form.email,
        pickupLocation: '',
        dropLocation: '',
        weight: '',
        distance: '',
        truckType: '',
      })
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to send quote request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-cyan-600 font-semibold uppercase tracking-wide">
            Freight Quote
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">
            Get an Instant Trucking Quote
          </h1>

          <p className="text-slate-600 text-lg leading-8 mt-5">
            Enter shipment details and send your quote request to admin for
            review.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Shipment Details
            </h2>

            <p className="text-slate-600 mb-8">
              Fill out the form below. Your request will be saved in MongoDB and
              shown to admin.
            </p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  placeholder="Enter your name"
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
                  Pickup Location
                </label>
                <input
                  type="text"
                  name="pickupLocation"
                  value={form.pickupLocation}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition"
                  placeholder="Example: Lahore"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-slate-700">
                  Drop Location
                </label>
                <input
                  type="text"
                  name="dropLocation"
                  value={form.dropLocation}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition"
                  placeholder="Example: Karachi"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-slate-700">
                  Weight
                </label>
                <input
                  type="number"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition"
                  placeholder="Weight in tons"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-slate-700">
                  Distance
                </label>
                <input
                  type="number"
                  name="distance"
                  value={form.distance}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition"
                  placeholder="Distance in KM"
                  min="1"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 font-semibold text-slate-700">
                  Truck Type
                </label>
                <select
                  name="truckType"
                  value={form.truckType}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition"
                  required
                >
                  <option value="">Select truck type</option>
                  <option value="small">Small Truck</option>
                  <option value="medium">Medium Truck</option>
                  <option value="heavy">Heavy Truck</option>
                  <option value="container">Container Truck</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-400 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-cyan-500/30 transition"
                >
                  {loading ? 'Sending...' : 'Send Quote Request'}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-slate-950 text-white rounded-3xl shadow-xl p-6 md:p-8 h-fit">
            <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center text-3xl mb-6">
              💰
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Quote Summary
            </h2>

            <p className="text-slate-300 text-sm leading-6 mb-6">
              Your estimated price will appear here after you submit shipment
              details.
            </p>

            {price !== null ? (
              <div className="space-y-4">
                <div className="bg-white/10 rounded-2xl p-5">
                  <p className="text-slate-300 text-sm">
                    Estimated Price
                  </p>
                  <h3 className="text-3xl font-bold text-cyan-400 mt-2">
                    PKR {price.toLocaleString()}
                  </h3>
                </div>

                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex justify-between border-b border-slate-700 pb-2">
                    <span>Base Rate</span>
                    <span>PKR {breakdown?.baseRate.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between border-b border-slate-700 pb-2">
                    <span>Distance Cost</span>
                    <span>PKR {breakdown?.distanceCost.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between border-b border-slate-700 pb-2">
                    <span>Weight Cost</span>
                    <span>PKR {breakdown?.weightCost.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 text-green-300 rounded-2xl p-4 text-sm">
                  Quote request sent to admin. Final price may change after
                  admin confirmation.
                </div>
              </div>
            ) : (
              <div className="bg-white/10 rounded-2xl p-5 text-slate-300 text-sm">
                No quote calculated yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}