const Quote = require('../models/Quote')

const calculateQuotePrice = (distance, weight) => {
  const baseRate = 5000
  const perKmRate = 50
  const perTonRate = 1000

  return baseRate + Number(distance || 0) * perKmRate + Number(weight || 0) * perTonRate
}

const createQuote = async (req, res, next) => {
  try {
    const { name, email, pickupLocation, dropLocation, weight, distance } = req.body

    if (!name || !email || !pickupLocation || !dropLocation || weight === undefined || distance === undefined) {
      return res.status(400).json({ message: 'All quote fields are required' })
    }

    const estimatedPrice = calculateQuotePrice(distance, weight)

    const quote = await Quote.create({
      name,
      email,
      pickupLocation,
      dropLocation,
      weight,
      distance,
      estimatedPrice,
      createdBy: req.user?._id || null,
    })

    res.status(201).json({
      message: 'Quote created successfully',
      quote,
    })
  } catch (error) {
    next(error)
  }
}

const getQuotes = async (req, res, next) => {
  try {
    const quotes = await Quote.find().populate('createdBy', 'name email role').sort({ createdAt: -1 })
    res.json(quotes)
  } catch (error) {
    next(error)
  }
}

const updateQuoteStatus = async (req, res, next) => {
  try {
    const { status } = req.body

    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid quote status' })
    }

    const quote = await Quote.findById(req.params.id)

    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' })
    }

    quote.status = status
    const updatedQuote = await quote.save()
    res.json(updatedQuote)
  } catch (error) {
    next(error)
  }
}

module.exports = { createQuote, getQuotes, updateQuoteStatus, calculateQuotePrice }
