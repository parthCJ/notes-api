const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
} = require('../controllers/notesController');

const router = express.Router();

// Validation rules
const noteValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title is required and must be between 1-100 characters'),
  body('content')
    .trim()
    .isLength({ min: 1, max: 5000 })
    .withMessage('Content is required and must be between 1-5000 characters')
];

// Apply authentication middleware to all routes
router.use(auth);

// Routes
router.post('/', noteValidation, createNote);
router.get('/', getNotes);
router.get('/:id', getNoteById);
router.put('/:id', noteValidation, updateNote);
router.delete('/:id', deleteNote);

module.exports = router;