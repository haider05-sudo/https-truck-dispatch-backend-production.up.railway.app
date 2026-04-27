const User = require('../models/User')

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json(users)
  } catch (error) {
    next(error)
  }
}

const getDrivers = async (req, res, next) => {
  try {
    const drivers = await User.find({ role: 'driver' }).select('-password').sort({ createdAt: -1 })
    res.json(drivers)
  } catch (error) {
    next(error)
  }
}

const createDriver = async (req, res, next) => {
  try {
    const { name, email, password, phone, truckNumber, licenseNumber, isAvailable } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' })
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' })
    }

    const driver = await User.create({
      name,
      email,
      password,
      phone,
      truckNumber,
      licenseNumber,
      isAvailable,
      role: 'driver',
    })

    res.status(201).json({
      _id: driver._id,
      name: driver.name,
      email: driver.email,
      role: driver.role,
      phone: driver.phone,
      truckNumber: driver.truckNumber,
      licenseNumber: driver.licenseNumber,
      isAvailable: driver.isAvailable,
    })
  } catch (error) {
    next(error)
  }
}

const updateDriver = async (req, res, next) => {
  try {
    const driver = await User.findOne({ _id: req.params.id, role: 'driver' })

    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' })
    }

    const allowedFields = ['name', 'phone', 'truckNumber', 'licenseNumber', 'isAvailable']
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) driver[field] = req.body[field]
    })

    const updatedDriver = await driver.save()
    res.json(updatedDriver)
  } catch (error) {
    next(error)
  }
}

const updateMyAvailability = async (req, res, next) => {
  try {
    if (req.user.role !== 'driver') {
      return res.status(403).json({ message: 'Only drivers can update availability' })
    }

    const driver = await User.findById(req.user._id)
    driver.isAvailable = Boolean(req.body.isAvailable)
    const updatedDriver = await driver.save()

    res.json({
      message: 'Availability updated',
      isAvailable: updatedDriver.isAvailable,
    })
  } catch (error) {
    next(error)
  }
}

const deleteDriver = async (req, res, next) => {
  try {
    const driver = await User.findOne({ _id: req.params.id, role: 'driver' })

    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' })
    }

    await driver.deleteOne()
    res.json({ message: 'Driver deleted successfully' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUsers,
  getDrivers,
  createDriver,
  updateDriver,
  updateMyAvailability,
  deleteDriver,
}
