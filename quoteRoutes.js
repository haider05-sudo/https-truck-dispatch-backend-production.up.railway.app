const express = require('express')
const { createQuote, getQuotes, updateQuoteStatus } = require('../controllers/quoteController')
const { protect, authorize } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', createQuote)
router.get('/', protect, authorize('admin'), getQuotes)
router.put('/:id/status', protect, authorize('admin'), updateQuoteStatus)

module.exports = router
