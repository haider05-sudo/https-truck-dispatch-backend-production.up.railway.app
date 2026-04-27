import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg text-slate-600 mb-6">Page not found.</p>
      <Link to="/" className="bg-slate-900 text-white px-6 py-3 rounded-lg">
        Go Home
      </Link>
    </section>
  )
}
