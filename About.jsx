export default function About() {
  return (
    <section className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-cyan-600 font-semibold uppercase tracking-wide">
            About Us
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">
            Smart Truck Dispatching Management System
          </h1>
          <p className="text-slate-600 text-lg leading-8 mt-5">
            TruckDispatch is a modern logistics platform designed to help
            transport companies manage loads, drivers, customers, and delivery
            operations from one simple dashboard.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Left Content */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-5">
              We Make Dispatching Simple
            </h2>

            <p className="text-slate-700 text-lg leading-8">
              Our system helps admins assign loads, drivers update delivery
              status, and customers request transportation services easily.
              It reduces manual work and improves communication between all users.
            </p>

            <p className="text-slate-700 text-lg leading-8 mt-4">
              The platform is designed for customers, dispatchers, admins, and
              drivers so the complete dispatch workflow becomes faster, cleaner,
              and easier to manage.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg">
                  Easy Management
                </h3>
                <p className="text-slate-600 text-sm mt-2">
                  Manage loads, drivers, and delivery status in one place.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg">
                  Real-Time Updates
                </h3>
                <p className="text-slate-600 text-sm mt-2">
                  Drivers can update delivery progress for better tracking.
                </p>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">
              Why Choose TruckDispatch?
            </h2>

            <div className="space-y-5">
              <div>
                <h3 className="font-semibold text-cyan-400">
                  Customer Request System
                </h3>
                <p className="text-slate-300 text-sm mt-1">
                  Customers can submit load or quote requests easily.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-cyan-400">
                  Admin Dashboard
                </h3>
                <p className="text-slate-300 text-sm mt-1">
                  Admins can manage users, drivers, loads, and dispatch records.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-cyan-400">
                  Driver Workflow
                </h3>
                <p className="text-slate-300 text-sm mt-1">
                  Drivers can view assigned loads and update shipment status.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-cyan-400">
                  Clean User Interface
                </h3>
                <p className="text-slate-300 text-sm mt-1">
                  Simple React and Tailwind CSS design for easy user experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-3xl font-bold text-cyan-600">24/7</h3>
            <p className="text-slate-600 mt-2">Dispatch Support</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-3xl font-bold text-cyan-600">Fast</h3>
            <p className="text-slate-600 mt-2">Load Management</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-3xl font-bold text-cyan-600">Simple</h3>
            <p className="text-slate-600 mt-2">User Dashboard</p>
          </div>
        </div>
      </div>
    </section>
  )
}