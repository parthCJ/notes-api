const { validationResult } = require('express-validator');
const Note = require('../models/Note');

// Create a new note
const createNote = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, content } = req.body;

    const note = new Note({
      title,
      content,
      userId: req.user._id
    });

    await note.save();

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: {
        note
      }
    });
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating note'
    });
  }
};

// Get all notes for the current user
const getNotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const query = req.query.query;

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Build search criteria
    let searchCriteria = { userId: req.user._id };
    
    // Add text search if query parameter is provided
    if (query) {
      searchCriteria.$text = { $search: query };
    }

    // Get notes with pagination
    const notes = await Note.find(searchCriteria)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination info
    const totalNotes = await Note.countDocuments(searchCriteria);
    const totalPages = Math.ceil(totalNotes / limit);

    res.json({
      success: true,
      data: {
        notes,
        pagination: {
          currentPage: page,
          totalPages,
          totalNotes,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching notes'
    });
  }
};

// Get a single note by ID
const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOne({ 
      _id: id, 
      userId: req.user._id 
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    res.json({
      success: true,
      data: {
        note
      }
    });
  } catch (error) {
    console.error('Get note by ID error:', error);
    
    // Handle invalid MongoDB ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid note ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching note'
    });
  }
};

// Update a note
const updateNote = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const { title, content } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { title, content },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    res.json({
      success: true,
      message: 'Note updated successfully',
      data: {
        note
      }
    });
  } catch (error) {
    console.error('Update note error:', error);
    
    // Handle invalid MongoDB ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid note ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating note'
    });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOneAndDelete({ 
      _id: id, 
      userId: req.user._id 
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    res.json({
      success: true,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    console.error('Delete note error:', error);
    
    // Handle invalid MongoDB ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid note ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while deleting note'
    });
  }
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
};