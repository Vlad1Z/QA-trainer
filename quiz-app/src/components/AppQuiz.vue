<template>
  <div class="quiz" v-if="currentQuestion">
    <h2>Вопрос {{ currentQuestionNumber }} из {{ totalQuestions }}</h2>
    <h3>{{ currentQuestion.question }}</h3>
    <ul>
      <li v-for="(answer, index) in shuffledAnswers" 
          :key="index" 
          :class="{ correct: isAnswerSelected && answer === currentQuestion.correct_answer, wrong: isAnswerSelected && selectedAnswer === answer && selectedAnswer !== currentQuestion.correct_answer }"
          @click="isAnswerSelected ? null : selectAnswer(answer)"
          :disabled="isAnswerSelected">
        {{ answer }}
      </li>
    </ul>
    <p v-if="isAnswerSelected">{{ resultMessage }}</p>
    <button v-if="isAnswerSelected && currentQuestionIndex < totalQuestions - 1" @click="nextQuestion">Следующий вопрос</button>
  </div>
  <div v-else>
    <p>Загрузка вопросов...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AppQuiz',
  data() {
    return {
      currentQuestion: null,
      currentQuestionIndex: 0,
      currentQuestionNumber: 1,
      totalQuestions: 20,
      shuffledAnswers: [],
      selectedAnswer: '',
      isAnswerCorrect: false,
      isAnswerSelected: false,
      questions: []
    };
  },
  methods: {
    async fetchQuestions() {
      try {
        const response = await axios.get(`http://localhost:3000/api/questions`, {
          params: { index: this.currentQuestionIndex }
        });
        if (response.data.length > 0) {
          this.questions = response.data;
          this.setQuestion();
        } else {
          console.error("No questions found for the current difficulty range.");
        }
      } catch (error) {
        console.error("There was an error fetching the questions:", error);
      }
    },
    setQuestion() {
      if (this.questions.length > 0) {
        const randomIndex = Math.floor(Math.random() * this.questions.length);
        this.currentQuestion = this.questions[randomIndex];
        this.shuffleAnswers();
        this.resetAnswer();
      }
    },
    shuffleAnswers() {
      if (this.currentQuestion && this.currentQuestion.answers) {
        this.shuffledAnswers = this.shuffleArray(this.currentQuestion.answers);
      }
    },
    shuffleArray(array) {
      let currentIndex = array.length, randomIndex, temporaryValue;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    },
    selectAnswer(answer) {
      this.selectedAnswer = answer;
      this.isAnswerCorrect = answer === this.currentQuestion.correct_answer;
      this.isAnswerSelected = true;
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.totalQuestions - 1) {
        this.currentQuestionIndex++;
        this.currentQuestionNumber++;
        this.fetchQuestions();
      }
    },
    resetAnswer() {
      this.isAnswerSelected = false;
      this.selectedAnswer = '';
      this.isAnswerCorrect = false;
    }
  },
  mounted() {
    this.fetchQuestions();
  }
}
</script>

<style>
  /* Ваши стили */
</style>
