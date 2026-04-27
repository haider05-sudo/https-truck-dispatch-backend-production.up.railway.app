import { Link } from 'react-router-dom'

export default function Home() {
  const features = [
    {
      title: 'Load Management',
      desc: 'Create, assign, and track loads from one clean dashboard.',
      icon: '📦',
    },
    {
      title: 'Driver Assignment',
      desc: 'Assign available drivers to shipments with a simple workflow.',
      icon: '🚚',
    },
    {
      title: 'Live Status Updates',
      desc: 'Track shipment progress from pickup to final delivery.',
      icon: '📍',
    },
  ]

  const steps = [
    {
      number: '01',
      title: 'Customer Requests Quote',
      desc: 'Customer submits pickup, drop, weight, and distance details.',
    },
    {
      number: '02',
      title: 'Admin Assigns Driver',
      desc: 'Admin reviews the request and assigns the best available driver.',
    },
    {
      number: '03',
      title: 'Driver Updates Status',
      desc: 'Driver updates shipment progress until delivery is completed.',
    },
  ]

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-slate-950 to-slate-950"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
              <p className="text-sm text-slate-300 font-medium">
                Smart Logistics & Dispatching Platform
              </p>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Professional Truck Dispatching Management System
            </h1>

            <p className="mt-6 text-lg text-slate-300 leading-8 max-w-2xl">
              Manage freight quotes, drivers, loads, delivery status, and
              dispatch operations from one modern and easy-to-use platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/quote"
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-7 py-3 rounded-xl font-semibold shadow-lg hover:shadow-cyan-500/30 transition"
              >
                Get a Quote
              </Link>

              <Link
                to="/services"
                className="bg-white/10 border border-white/20 hover:bg-white hover:text-slate-950 px-7 py-3 rounded-xl font-semibold transition"
              >
                View Services
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10 max-w-xl">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <h3 className="text-2xl font-bold text-cyan-400">24/7</h3>
                <p className="text-sm text-slate-400 mt-1">Support</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <h3 className="text-2xl font-bold text-cyan-400">Fast</h3>
                <p className="text-sm text-slate-400 mt-1">Dispatch</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <h3 className="text-2xl font-bold text-cyan-400">Easy</h3>
                <p className="text-sm text-slate-400 mt-1">Tracking</p>
              </div>
            </div>
          </div>

         {/* Right Image */}
<div className="space-y-6">
  {/* Image Box */}
  <div className="relative bg-white/10 border border-white/10 rounded-[2rem] p-3 shadow-2xl">
    <img
      src="/truck.png"
      alt="Truck Dispatching"
      className="w-full h-[420px] object-cover rounded-[1.5rem]"
    />
  </div>

  {/* Status Card Separate */}
  <div className="bg-white text-slate-900 rounded-3xl shadow-xl p-6">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="font-bold text-2xl">
          Dispatch Status
        </h3>

        <p className="text-slate-600 mt-2">
          Load assigned successfully
        </p>
      </div>

      <span className="bg-green-100 text-green-700 text-sm font-bold px-4 py-2 rounded-full">
        Active
      </span>
    </div>

    <div className="mt-6 grid grid-cols-3 gap-4 text-center">
      <div className="bg-slate-100 rounded-2xl p-4">
        <p className="text-sm text-slate-500">Loads</p>
        <h4 className="font-bold text-xl mt-1">120+</h4>
      </div>

      <div className="bg-slate-100 rounded-2xl p-4">
        <p className="text-sm text-slate-500">Drivers</p>
        <h4 className="font-bold text-xl mt-1">45+</h4>
      </div>

      <div className="bg-slate-100 rounded-2xl p-4">
        <p className="text-sm text-slate-500">Routes</p>
        <h4 className="font-bold text-xl mt-1">80+</h4>
      </div>
    </div>
  </div>
</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-cyan-600 font-semibold uppercase tracking-wide">
            Our Features
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
            Everything You Need for Better Dispatching
          </h2>

          <p className="text-slate-600 text-lg mt-4 leading-8">
            TruckDispatch helps logistics teams reduce manual work and manage
            daily operations with a clean professional workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {features.map((item) => (
            <div
              key={item.title}
              className="group bg-white rounded-3xl shadow-sm border border-slate-200 p-8 hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >
              <div className="w-16 h-16 bg-cyan-100 group-hover:bg-cyan-500 rounded-2xl flex items-center justify-center text-3xl mb-6 transition">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {item.title}
              </h3>

              <p className="text-slate-600 leading-7">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-cyan-600 font-semibold uppercase tracking-wide">
              How It Works
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
              Simple Dispatch Workflow
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-slate-50 border border-slate-200 rounded-3xl p-8"
              >
                <div className="text-5xl font-bold text-cyan-500/30 mb-5">
                  {step.number}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>

                <p className="text-slate-600 leading-7">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-slate-950 text-white rounded-[2rem] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
            <p className="text-cyan-400 font-semibold uppercase tracking-wide">
              Get Started
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Ready to simplify your dispatch operations?
            </h2>

            <p className="text-slate-300 mt-4 max-w-2xl leading-7">
              Start managing loads, drivers, quotes, and delivery status with a
              professional truck dispatching system.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/register"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-7 py-3 rounded-xl font-semibold shadow-md transition"
            >
              Create Account
            </Link>

            <Link
              to="/contact"
              className="bg-white text-slate-950 hover:bg-slate-100 px-7 py-3 rounded-xl font-semibold transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}