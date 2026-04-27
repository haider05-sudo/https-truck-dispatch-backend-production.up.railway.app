const express = require('express')
const { createContact, getContacts, markContactRead } = require('../controllers/contactController')
const { protect, authorize } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', createContact)
router.get('/', protect, authorize('admin'), getContacts)
router.put('/:id/read', protect, authorize('admin'), markContactRead)

module.exports = router
