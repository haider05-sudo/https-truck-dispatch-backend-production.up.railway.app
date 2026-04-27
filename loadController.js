const Load = require('../models/Load')
const User = require('../models/User')
const { calculateQuotePrice } = require('./quoteController')

const createLoad = async (req, res, next) => {
  try {
    const {
      customerName,
      customerEmail,
      pickupLocation,
      dropLocation,
      weight,
      distance,
      price,
      notes,
    } = req.body

    if (!customerName || !customerEmail || !pickupLocation || !dropLocation || weight === undefined) {
      return res.status(400).json({
        message: 'Customer name, email, pickup, drop, and weight are required',
      })
    }

    const finalPrice = price !== undefined ? price : calculateQuotePrice(distance, weight)

    const customerUser = await User.findOne({
      email: customerEmail.toLowerCase(),
      role: 'customer',
    })

    const load = await Load.create({
      customer: req.user.role === 'customer' ? req.user._id : customerUser?._id || null,
      customerName,
      customerEmail,
      pickupLocation,
      dropLocation,
      weight,
      distance,
      price: finalPrice,
      notes,
    })

    res.status(201).json({
      message: 'Load created successfully',
      load,
    })
  } catch (error) {
    next(error)
  }
}

const getLoads = async (req, res, next) => {
  try {
    let filter = {}

    if (req.user.role === 'driver') {
      filter.driver = req.user._id
    }

    if (req.user.role === 'customer') {
      filter.customer = req.user._id
    }

    const loads = await Load.find(filter)
      .populate('customer', 'name email phone')
      .populate('driver', 'name email phone truckNumber licenseNumber isAvailable')
      .sort({ createdAt: -1 })

    res.json(loads)
  } catch (error) {
    next(error)
  }
}

const getLoadById = async (req, res, next) => {
  try {
    const load = await Load.findById(req.params.id)
      .populate('customer', 'name email phone')
      .populate('driver', 'name email phone truckNumber licenseNumber isAvailable')

    if (!load) {
      return res.status(404).json({ message: 'Load not found' })
    }

    if (req.user.role === 'driver' && String(load.driver?._id) !== String(req.user._id)) {
      return res.status(403).json({ message: 'You can only view your assigned loads' })
    }

    if (req.user.role === 'customer' && String(load.customer?._id) !== String(req.user._id)) {
      return res.status(403).json({ message: 'You can only view your own loads' })
    }

    res.json(load)
  } catch (error) {
    next(error)
  }
}

const assignDriver = async (req, res, next) => {
  try {
    const { driverId } = req.body

    const load = await Load.findById(req.params.id)

    if (!load) {
      return res.status(404).json({ message: 'Load not found' })
    }

    const driver = await User.findOne({ _id: driverId, role: 'driver' })

    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' })
    }

    load.driver = driver._id
    load.status = 'Assigned'
    const updatedLoad = await load.save()

    res.json({
      message: 'Driver assigned successfully',
      load: updatedLoad,
    })
  } catch (error) {
    next(error)
  }
}

const updateLoadStatus = async (req, res, next) => {
  try {
    const { status } = req.body

    if (!['Pending', 'Assigned', 'Picked Up', 'In Transit', 'Delivered', 'Cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid load status' })
    }

    const load = await Load.findById(req.params.id)

    if (!load) {
      return res.status(404).json({ message: 'Load not found' })
    }

    if (req.user.role === 'driver' && String(load.driver) !== String(req.user._id)) {
      return res.status(403).json({ message: 'You can update only your assigned load' })
    }

    load.status = status
    const updatedLoad = await load.save()

    res.json({
      message: 'Load status updated successfully',
      load: updatedLoad,
    })
  } catch (error) {
    next(error)
  }
}

const deleteLoad = async (req, res, next) => {
  try {
    const load = await Load.findById(req.params.id)

    if (!load) {
      return res.status(404).json({ message: 'Load not found' })
    }

    await load.deleteOne()
    res.json({ message: 'Load deleted successfully' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createLoad,
  getLoads,
  getLoadById,
  assignDriver,
  updateLoadStatus,
  deleteLoad,
}
