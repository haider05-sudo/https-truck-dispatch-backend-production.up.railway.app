const Contact = require('../models/Contact')

const createContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' })
    }

    const contact = await Contact.create({ name, email, message })

    res.status(201).json({
      message: 'Message sent successfully',
      contact,
    })
  } catch (error) {
    next(error)
  }
}

const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.json(contacts)
  } catch (error) {
    next(error)
  }
}

const markContactRead = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id)

    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' })
    }

    contact.isRead = true
    const updatedContact = await contact.save()
    res.json(updatedContact)
  } catch (error) {
    next(error)
  }
}

module.exports = { createContact, getContacts, markContactRead }
