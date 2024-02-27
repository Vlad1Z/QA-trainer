const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  // Определите схему вопроса здесь
});

module.exports = mongoose.model('Question', questionSchema);
