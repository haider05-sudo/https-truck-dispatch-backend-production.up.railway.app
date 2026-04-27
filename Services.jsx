export default function Services() {
  const services = [
    {
      title: 'Truck Dispatching',
      icon: '🚚',
      desc: 'Manage truck dispatch operations with a clean and simple workflow.',
    },
    {
      title: 'Load Assignment',
      icon: '📦',
      desc: 'Assign loads to drivers and manage shipment details easily.',
    },
    {
      title: 'Route Monitoring',
      icon: '🗺️',
      desc: 'Monitor routes and keep track of delivery movement.',
    },
    {
      title: 'Driver Management',
      icon: '👨‍✈️',
      desc: 'Manage driver profiles, availability, and assigned loads.',
    },
    {
      title: 'Freight Quote Generation',
      icon: '💰',
      desc: 'Generate freight quotes for customers quickly and professionally.',
    },
    {
      title: 'Delivery Status Tracking',
      icon: '✅',
      desc: 'Track delivery status from pickup to final drop-off.',
    },
  ]

  return (
    <section className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-cyan-600 font-semibold uppercase tracking-wide">
            Our Services
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">
            Complete Truck Dispatching Solutions
          </h1>

          <p className="text-slate-600 text-lg leading-8 mt-5">
            TruckDispatch provides smart and reliable tools to manage loads,
            drivers, routes, quotes, and delivery tracking from one platform.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-white rounded-3xl shadow-sm hover:shadow-xl border border-slate-200 p-7 transition duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center text-3xl mb-6 group-hover:bg-cyan-500 transition">
                <span className="group-hover:scale-110 transition">
                  {service.icon}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-3">
                {service.title}
              </h2>

              <p className="text-slate-600 leading-7 text-sm">
                {service.desc}
              </p>

              <div className="mt-6">
                <button className="text-cyan-600 font-semibold text-sm hover:text-cyan-700">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-slate-950 text-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Need a Reliable Dispatching System?
            </h2>
            <p className="text-slate-300 mt-3 max-w-2xl">
              Get started with TruckDispatch and manage your logistics workflow
              in a simple and professional way.
            </p>
          </div>

          <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition">
            Get a Quote
          </button>
        </div>
      </div>
    </section>
  )
}