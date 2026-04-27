import { useEffect, useState } from 'react'
import API from '../api'

export default function AdminDashboard() {
  const [drivers, setDrivers] = useState([])
  const [loads, setLoads] = useState([])
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)

  const loadStatuses = [
    'Pending',
    'Assigned',
    'Picked Up',
    'In Transit',
    'Delivered',
    'Cancelled',
  ]

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      const [driversRes, loadsRes, quotesRes] = await Promise.all([
        API.get('/users/drivers'),
        API.get('/loads'),
        API.get('/quotes'),
      ])

      setDrivers(driversRes.data)
      setLoads(loadsRes.data)
      setQuotes(quotesRes.data)
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to load admin dashboard')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  
    const interval = setInterval(() => {
      fetchDashboardData()
    }, 10000)
  
    return () => clearInterval(interval)
  }, [])
  
  const handleAssignDriver = async (loadId, driverId) => {
    if (!driverId) return

    try {
      await API.put(`/loads/${loadId}/assign`, { driverId })
      alert('Driver assigned successfully')
      fetchDashboardData()
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to assign driver')
    }
  }

  const handleUpdateLoadStatus = async (loadId, status) => {
    try {
      await API.put(`/loads/${loadId}/status`, { status })
      alert('Load status updated')
      fetchDashboardData()
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update load status')
    }
  }

  const handleUpdateQuoteStatus = async (quoteId, status) => {
    try {
      await API.put(`/quotes/${quoteId}/status`, { status })
      alert('Quote status updated')
      fetchDashboardData()
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update quote status')
    }
  }

  const quoteHasLoad = (quote) => {
    return loads.some(
      (load) =>
        load.customerEmail === quote.email &&
        load.pickupLocation === quote.pickupLocation &&
        load.dropLocation === quote.dropLocation &&
        Number(load.weight) === Number(quote.weight)
    )
  }

  const handleCreateLoadFromQuote = async (quote) => {
    if (quoteHasLoad(quote)) {
      alert('Load already created from this quote')
      return
    }

    try {
      await API.post('/loads', {
        customerName: quote.name,
        customerEmail: quote.email,
        pickupLocation: quote.pickupLocation,
        dropLocation: quote.dropLocation,
        weight: quote.weight,
        distance: quote.distance,
        price: quote.estimatedPrice,
        notes: 'Load created from customer quote request',
      })

      await API.put(`/quotes/${quote._id}/status`, { status: 'Approved' })

      alert('Load created successfully. Now assign a driver from Recent Loads.')

      fetchDashboardData()
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create load from quote')
    }
  }

  const handleDeleteLoad = async (loadId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this load?')

    if (!confirmDelete) return

    try {
      await API.delete(`/loads/${loadId}`)
      alert('Load deleted successfully')
      fetchDashboardData()
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete load')
    }
  }

  const stats = [
    { title: 'Total Drivers', value: drivers.length },
    {
      title: 'Available Drivers',
      value: drivers.filter((driver) => driver.isAvailable).length,
    },
    { title: 'Total Loads', value: loads.length },
    {
      title: 'Pending Quotes',
      value: quotes.filter((quote) => quote.status === 'Pending').length,
    },
    {
      title: 'Assigned Loads',
      value: loads.filter((load) => load.status === 'Assigned').length,
    },
    {
      title: 'Delivered Loads',
      value: loads.filter((load) => load.status === 'Delivered').length,
    },
  ]

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        <p className="text-slate-600">Loading dashboard...</p>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-slate-600 mt-2">
          Manage customer quote requests, create loads, assign drivers, and track delivery status.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((item) => (
          <div key={item.title} className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-slate-500">{item.title}</p>
            <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto mb-10">
        <h2 className="text-2xl font-bold mb-2">Quote Requests</h2>
        <p className="text-slate-600 mb-5">
          Customer quote requests yahan show hongi. Create Load par click karo, phir driver assign karo.
        </p>

        {quotes.length === 0 ? (
          <p className="text-slate-600">No quote requests found yet.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-3 pr-4">Customer</th>
                <th className="py-3 pr-4">Email</th>
                <th className="py-3 pr-4">Pickup</th>
                <th className="py-3 pr-4">Drop</th>
                <th className="py-3 pr-4">Weight</th>
                <th className="py-3 pr-4">Distance</th>
                <th className="py-3 pr-4">Price</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {quotes.map((quote) => {
                const alreadyCreated = quoteHasLoad(quote)

                return (
                  <tr key={quote._id} className="border-b last:border-b-0">
                    <td className="py-3 pr-4">{quote.name}</td>
                    <td className="py-3 pr-4">{quote.email}</td>
                    <td className="py-3 pr-4">{quote.pickupLocation}</td>
                    <td className="py-3 pr-4">{quote.dropLocation}</td>
                    <td className="py-3 pr-4">{quote.weight} Ton</td>
                    <td className="py-3 pr-4">{quote.distance} KM</td>
                    <td className="py-3 pr-4">PKR {quote.estimatedPrice}</td>

                    <td className="py-3 pr-4">
                      <select
                        value={quote.status}
                        onChange={(e) =>
                          handleUpdateQuoteStatus(quote._id, e.target.value)
                        }
                        className="border border-slate-300 rounded-lg px-3 py-2"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>

                    <td className="py-3 pr-4">
                      {alreadyCreated ? (
                        <span className="bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-semibold">
                          Load Created
                        </span>
                      ) : quote.status === 'Rejected' ? (
                        <span className="bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm font-semibold">
                          Rejected
                        </span>
                      ) : (
                        <button
                          onClick={() => handleCreateLoadFromQuote(quote)}
                          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-semibold"
                        >
                          Create Load
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto mb-10">
        <h2 className="text-2xl font-bold mb-2">Recent Loads</h2>
        <p className="text-slate-600 mb-5">
          Quote se load create hone ke baad yahan show hoga. Yahin se driver assign karo.
        </p>

        {loads.length === 0 ? (
          <p className="text-slate-600">No loads found yet.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-3 pr-4">Customer</th>
                <th className="py-3 pr-4">Pickup</th>
                <th className="py-3 pr-4">Drop</th>
                <th className="py-3 pr-4">Weight</th>
                <th className="py-3 pr-4">Price</th>
                <th className="py-3 pr-4">Driver</th>
                <th className="py-3 pr-4">Assign Driver</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Delete</th>
              </tr>
            </thead>

            <tbody>
              {loads.map((load) => (
                <tr key={load._id} className="border-b last:border-b-0">
                  <td className="py-3 pr-4">
                    <div className="font-semibold">{load.customerName}</div>
                    <div className="text-sm text-slate-500">{load.customerEmail}</div>
                  </td>

                  <td className="py-3 pr-4">{load.pickupLocation}</td>
                  <td className="py-3 pr-4">{load.dropLocation}</td>
                  <td className="py-3 pr-4">{load.weight} Ton</td>
                  <td className="py-3 pr-4">PKR {load.price || 0}</td>

                  <td className="py-3 pr-4">
                    {load.driver?.name || 'Not assigned'}
                  </td>

                  <td className="py-3 pr-4">
                    <select
                      className="border border-slate-300 rounded-lg px-3 py-2"
                      value={load.driver?._id || ''}
                      onChange={(e) =>
                        handleAssignDriver(load._id, e.target.value)
                      }
                    >
                      <option value="">Select Driver</option>

                      {drivers.map((driver) => (
                        <option key={driver._id} value={driver._id}>
                          {driver.name} {driver.isAvailable ? '(Available)' : ''}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-3 pr-4">
                    <select
                      value={load.status}
                      onChange={(e) =>
                        handleUpdateLoadStatus(load._id, e.target.value)
                      }
                      className="border border-slate-300 rounded-lg px-3 py-2"
                    >
                      {loadStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-3 pr-4">
                    <button
                      onClick={() => handleDeleteLoad(load._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-5">Drivers</h2>

        {drivers.length === 0 ? (
          <p className="text-slate-600">
            No drivers found yet. Driver ko register page se driver role select karke create karo.
          </p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">Email</th>
                <th className="py-3 pr-4">Truck No</th>
                <th className="py-3 pr-4">License No</th>
                <th className="py-3 pr-4">Available</th>
              </tr>
            </thead>

            <tbody>
              {drivers.map((driver) => (
                <tr key={driver._id} className="border-b last:border-b-0">
                  <td className="py-3 pr-4">{driver.name}</td>
                  <td className="py-3 pr-4">{driver.email}</td>
                  <td className="py-3 pr-4">{driver.truckNumber || '-'}</td>
                  <td className="py-3 pr-4">{driver.licenseNumber || '-'}</td>
                  <td className="py-3 pr-4">
                    {driver.isAvailable ? 'Yes' : 'No'}
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