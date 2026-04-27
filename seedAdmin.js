require('dotenv').config()
const connectDB = require('../config/db')
const User = require('../models/User')

const seedAdmin = async () => {
  try {
    await connectDB()

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
    const existingAdmin = await User.findOne({ email: adminEmail })

    if (existingAdmin) {
      console.log('Admin already exists:', adminEmail)
      process.exit(0)
    }

    const admin = await User.create({
      name: process.env.ADMIN_NAME || 'Admin User',
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD || 'admin12345',
      role: 'admin',
    })

    console.log('Admin created successfully:', admin.email)
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

seedAdmin()
