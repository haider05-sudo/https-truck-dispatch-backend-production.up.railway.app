const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const quoteRoutes = require('./routes/quoteRoutes')
const contactRoutes = require('./routes/contactRoutes')
const loadRoutes = require('./routes/loadRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => {
  res.json({
    message: 'Truck Dispatching Management System API is running',
    routes: {
      auth: '/api/auth',
      users: '/api/users',
      quotes: '/api/quotes',
      contacts: '/api/contacts',
      loads: '/api/loads',
    },
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/quotes', quoteRoutes)
app.use('/api/contacts', contactRoutes)
app.use('/api/loads', loadRoutes)

app.use(notFound)
app.use(errorHandler)

module.exports = app
