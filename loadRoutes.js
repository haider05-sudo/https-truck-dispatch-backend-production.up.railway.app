const express = require('express')
const {
  createLoad,
  getLoads,
  getLoadById,
  assignDriver,
  updateLoadStatus,
  deleteLoad,
} = require('../controllers/loadController')
const { protect, authorize } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(protect, authorize('customer', 'admin'), createLoad).get(protect, getLoads)
router.get('/:id', protect, getLoadById)
router.put('/:id/assign', protect, authorize('admin'), assignDriver)
router.put('/:id/status', protect, authorize('admin', 'driver'), updateLoadStatus)
router.delete('/:id', protect, authorize('admin'), deleteLoad)

module.exports = router
