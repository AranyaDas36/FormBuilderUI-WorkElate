const mongoose = require('mongoose');

const FormResponseSchema = new mongoose.Schema({
  formed: {
    type: Object, // Stores the JSON schema of the form that was submitted
    required: true,
  },
  answers: {
    type: Object, // Stores the answers submitted by the user
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('FormResponse', FormResponseSchema);