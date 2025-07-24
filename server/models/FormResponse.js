const mongoose = require('mongoose');

const FormResponseSchema = new mongoose.Schema({
  formed: {
    type: Object, 
    required: true,
  },
  answers: {
    type: Object, 
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('FormResponse', FormResponseSchema);