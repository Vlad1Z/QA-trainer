const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const quizRoutes = require('./routes/quizRoutes');

const app = express();

app.use(cors()); // Включаем CORS для всех запросов

mongoose.connect('mongodb://localhost:27017/qa_quiz', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.json()); // Для парсинга JSON-тел запросов

app.use('/api/questions', quizRoutes); // Используем маршруты для '/api/questions'

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
