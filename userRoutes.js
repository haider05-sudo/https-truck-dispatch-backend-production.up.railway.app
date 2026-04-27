const express = require('express')
const {
  getUsers,
  getDrivers,
  createDriver,
  updateDriver,
  updateMyAvailability,
  deleteDriver,
} = require('../controllers/userController')
const { protect, authorize } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', protect, authorize('admin'), getUsers)
router.get('/drivers', protect, authorize('admin'), getDrivers)
router.post('/drivers', protect, authorize('admin'), createDriver)
router.put('/drivers/:id', protect, authorize('admin'), updateDriver)
router.delete('/drivers/:id', protect, authorize('admin'), deleteDriver)
router.put('/driver/availability', protect, authorize('driver'), updateMyAvailability)

module.exports = router
