const User = require('../models/User')
const generateToken = require('../utils/generateToken')

const safeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone,
  truckNumber: user.truckNumber,
  licenseNumber: user.licenseNumber,
  isAvailable: user.isAvailable,
})

const register = async (req, res, next) => {
  try {
    const { name, email, password, role, phone, truckNumber, licenseNumber } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' })
    }

    const normalizedRole = role || 'customer'

    if (!['customer', 'driver'].includes(normalizedRole)) {
      return res.status(400).json({ message: 'Only customer or driver registration is allowed' })
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' })
    }

    const user = await User.create({
      name,
      email,
      password,
      role: normalizedRole,
      phone,
      truckNumber,
      licenseNumber,
    })

    res.status(201).json({
      message: 'Registration successful',
      user: safeUser(user),
      token: generateToken(user._id),
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    if (role && user.role !== role) {
      return res.status(403).json({ message: `This account is not registered as ${role}` })
    }

    res.json({
      message: 'Login successful',
      user: safeUser(user),
      token: generateToken(user._id),
    })
  } catch (error) {
    next(error)
  }
}

const getMe = async (req, res) => {
  res.json({ user: req.user })
}

module.exports = { register, login, getMe }
