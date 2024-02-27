const express = require('express');
const router = express.Router();
const Question = require('../models/question'); // Предполагается, что у вас есть файл модели Question

// Получение всех вопросов
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Маршрут для получения вопросов с фильтрацией по сложности
router.get('/filtered-questions', async (req, res) => {
  try {
    // Получение параметров из строки запроса
    const { minDifficulty, maxDifficulty } = req.query;

    // Поиск вопросов с использованием фильтра сложности
    const questions = await Question.find({
      difficulty_score: {
        $gte: parseInt(minDifficulty, 10), // $gte - greater than or equal
        $lte: parseInt(maxDifficulty, 10)  // $lte - less than or equal
      }
    });

    res.json(questions);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
