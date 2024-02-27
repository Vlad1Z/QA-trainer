const express = require('express');
const router = express.Router();
const Question = require('../models/question'); // Убедитесь, что модель определена правильно

// Маршрут для получения вопросов с фильтрацией по сложности
router.get('/', async (req, res) => {
  try {
    const currentQuestionIndex = parseInt(req.query.index, 10) || 0;

    let difficultyRange;
    if (currentQuestionIndex < 5) {
      difficultyRange = { $gte: 1, $lte: 19 };
    } else if (currentQuestionIndex < 13) {
      difficultyRange = { $gte: 20, $lte: 49 };
    } else if (currentQuestionIndex < 18) {
      difficultyRange = { $gte: 50, $lte: 69 };
    } else {
      difficultyRange = { $gte: 70, $lte: 79 };
    }

    const questions = await Question.find({
      difficulty_score: difficultyRange
    }).exec();

    res.json(questions);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
