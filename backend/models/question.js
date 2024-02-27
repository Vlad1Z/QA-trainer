const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  answers: [String],
  correct_answer: String,
  difficulty_score: Number,
  // Другие поля, если они есть
});

module.exports = mongoose.model('Question', questionSchema);
