import { useEffect, useState } from 'react'
import API from '../api'

export default function DriverDashboard() {
  const [user, setUser] = useState(null)
  const [assignedLoads, setAssignedLoads] = useState([])
  const [loading, setLoading] = useState(true)

  const statuses = ['Assigned', 'Picked Up', 'In Transit', 'Delivered']

  const fetchAssignedLoads = async () => {
    try {
      setLoading(true)

      const savedUser = localStorage.getItem('user')

      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }

      const res = await API.get('/loads')

      setAssignedLoads(res.data)
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to load driver dashboard')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAssignedLoads()
  }, [])
  
  const handleUpdateStatus = async (loadId, status) => {
    try {
      await API.put(`/loads/${loadId}/status`, { status })
  
      alert('Load status updated successfully')
  
      fetchAssignedLoads()
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update load status')
    }
  }

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Driver Dashboard</h1>
        <p className="text-slate-600">Loading dashboard...</p>
      </section>
    )
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Driver Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-3">Driver Info</h2>

          <p>
            <span className="font-semibold">Name:</span>{' '}
            {user?.name || 'Driver'}
          </p>

          <p>
            <span className="font-semibold">Email:</span>{' '}
            {user?.email || '-'}
          </p>

          <p>
            <span className="font-semibold">Truck Number:</span>{' '}
            {user?.truckNumber || 'Not added'}
          </p>

          <p>
            <span className="font-semibold">License Number:</span>{' '}
            {user?.licenseNumber || 'Not added'}
          </p>

          <p>
            <span className="font-semibold">Status:</span>{' '}
            {user?.isAvailable ? 'Available' : 'Not Available'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-3">Work Summary</h2>

          <p>
            <span className="font-semibold">Assigned Loads:</span>{' '}
            {assignedLoads.length}
          </p>

          <p>
            <span className="font-semibold">In Transit:</span>{' '}
            {
              assignedLoads.filter((load) => load.status === 'In Transit')
                .length
            }
          </p>

          <p>
            <span className="font-semibold">Delivered:</span>{' '}
            {
              assignedLoads.filter((load) => load.status === 'Delivered')
                .length
            }
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-5">Assigned Loads</h2>

        {assignedLoads.length === 0 ? (
          <p className="text-slate-600">
            No assigned loads yet. Admin will assign loads to you.
          </p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-3 pr-4">Pickup</th>
                <th className="py-3 pr-4">Drop</th>
                <th className="py-3 pr-4">Weight</th>
                <th className="py-3 pr-4">Distance</th>
                <th className="py-3 pr-4">Price</th>
                <th className="py-3 pr-4">Current Status</th>
                <th className="py-3 pr-4">Update Status</th>
              </tr>
            </thead>

            <tbody>
              {assignedLoads.map((load) => (
                <tr key={load._id} className="border-b last:border-b-0">
                  <td className="py-3 pr-4">{load.pickupLocation}</td>

                  <td className="py-3 pr-4">{load.dropLocation}</td>

                  <td className="py-3 pr-4">{load.weight} Ton</td>

                  <td className="py-3 pr-4">{load.distance || 0} KM</td>

                  <td className="py-3 pr-4">PKR {load.price || 0}</td>

                  <td className="py-3 pr-4">
                    <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {load.status}
                    </span>
                  </td>

                  <td className="py-3 pr-4">
                    <select
                      value={load.status}
                      onChange={(e) =>
                        handleUpdateStatus(load._id, e.target.value)
                      }
                      className="border border-slate-300 rounded-lg px-3 py-2"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
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