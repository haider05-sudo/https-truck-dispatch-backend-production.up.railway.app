import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Your message has been submitted successfully!')
    setForm({
      name: '',
      email: '',
      phone: '',
      message: '',
    })
  }

  return (
    <section className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-cyan-600 font-semibold uppercase tracking-wide">
            Contact Us
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">
            Get in Touch with TruckDispatch
          </h1>

          <p className="text-slate-600 text-lg leading-8 mt-5">
            Have a question about truck dispatching, load management, or freight
            services? Send us a message and our team will contact you soon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center text-2xl mb-4">
                📧
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Email Address
              </h3>
              <p className="text-slate-600 mt-2">
                support@truckdispatch.com
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center text-2xl mb-4">
                📞
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Phone Number
              </h3>
              <p className="text-slate-600 mt-2">
                +92 300 1234567
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center text-2xl mb-4">
                📍
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Location
              </h3>
              <p className="text-slate-600 mt-2">
                Pakistan
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Send Us a Message
            </h2>

            <p className="text-slate-600 mb-8">
              Fill out the form below and we will get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
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
              </div>

              <div>
                <label className="block mb-2 font-semibold text-slate-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-slate-700">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition resize-none"
                  placeholder="Write your message here..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-cyan-500/30 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}