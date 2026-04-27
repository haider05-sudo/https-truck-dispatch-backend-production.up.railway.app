import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../api'

export default function CustomerDashboard() {
  const [user, setUser] = useState(null)
  const [loads, setLoads] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCustomerData = async () => {
    try {
      setLoading(true)

      const savedUser = localStorage.getItem('user')

      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }

      const loadsRes = await API.get('/loads')
      setLoads(loadsRes.data)
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to load customer dashboard')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomerData()
  
    const interval = setInterval(() => {
      fetchCustomerData()
    }, 10000)
  
    return () => clearInterval(interval)
  }, [])


  const stats = [
    { title: 'My Loads', value: loads.length },
    {
      title: 'Assigned Loads',
      value: loads.filter((load) => load.status === 'Assigned').length,
    },
    {
      title: 'In Transit',
      value: loads.filter((load) => load.status === 'In Transit').length,
    },
    {
      title: 'Delivered',
      value: loads.filter((load) => load.status === 'Delivered').length,
    },
  ]

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Customer Dashboard</h1>
        <p className="text-slate-600">Loading dashboard...</p>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold">Customer Dashboard</h1>
          <p className="text-slate-600 mt-2">
            Welcome back, {user?.name || 'Customer'}.
          </p>
        </div>

        <Link
          to="/quote"
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-3 rounded-lg font-semibold text-center"
        >
          Request New Quote
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item) => (
          <div key={item.title} className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-slate-500">{item.title}</p>
            <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-2">My Shipments</h2>
        <p className="text-slate-600 mb-5">
          Admin jab aapke quote se load create karke driver assign karega, details yahan show hongi.
        </p>

        {loads.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <p className="text-slate-700 font-semibold">No shipment assigned yet.</p>
            <p className="text-slate-600 mt-2">
              Pehle quote request bhejo. Admin quote approve karke load create karega, phir driver assign hoga.
            </p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-3 pr-4">Pickup</th>
                <th className="py-3 pr-4">Drop</th>
                <th className="py-3 pr-4">Weight</th>
                <th className="py-3 pr-4">Distance</th>
                <th className="py-3 pr-4">Price</th>
                <th className="py-3 pr-4">Driver Details</th>
                <th className="py-3 pr-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {loads.map((load) => (
                <tr key={load._id} className="border-b last:border-b-0 align-top">
                  <td className="py-4 pr-4">{load.pickupLocation}</td>

                  <td className="py-4 pr-4">{load.dropLocation}</td>

                  <td className="py-4 pr-4">{load.weight} Ton</td>

                  <td className="py-4 pr-4">{load.distance || 0} KM</td>

                  <td className="py-4 pr-4">PKR {load.price || 0}</td>

                  <td className="py-4 pr-4">
                    {load.driver ? (
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 min-w-56">
                        <p className="font-bold text-slate-900">
                          {load.driver.name}
                        </p>

                        <p className="text-sm text-slate-600">
                          Email: {load.driver.email || '-'}
                        </p>

                        <p className="text-sm text-slate-600">
                          Phone: {load.driver.phone || '-'}
                        </p>

                        <p className="text-sm text-slate-600">
                          Truck No: {load.driver.truckNumber || 'Not added'}
                        </p>

                        <p className="text-sm text-slate-600">
                          License No: {load.driver.licenseNumber || 'Not added'}
                        </p>
                      </div>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Driver not assigned yet
                      </span>
                    )}
                  </td>

                  <td className="py-4 pr-4">
                  <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-semibold">
  {load.status}
</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}