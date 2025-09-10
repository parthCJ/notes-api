const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    maxlength: [5000, 'Content cannot be more than 5000 characters']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

noteSchema.index({userId: 1, createdAt: -1});

noteSchema.index({
    title: 'text',
    content: 'text'
});

module.exports = mongoose.model("Note", noteSchema);