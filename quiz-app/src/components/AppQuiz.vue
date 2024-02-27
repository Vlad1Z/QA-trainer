<template>
  <div class="quiz" v-if="currentQuestion">
    <h2>Вопрос {{ currentQuestionNumber }} из {{ totalQuestions }}</h2>
    <h3>{{ currentQuestion.question }}</h3>
    <ul>
      <li v-for="(answer, index) in shuffledAnswers" 
          :key="index" 
          :class="{ correct: isAnswerSelected && answer === currentQuestion.correct_answer, wrong: isAnswerSelected && selectedAnswer === answer && selectedAnswer !== currentQuestion.correct_answer }"
          @click="selectAnswer(answer)"
          :disabled="isAnswerSelected">
        {{ answer }}
      </li>
    </ul>
    <p v-if="isAnswerSelected">{{ resultMessage }}</p>
    <button v-if="isAnswerSelected && currentQuestionIndex < questions.length - 1" @click="nextQuestion">Следующий вопрос</button>
  </div>
  <div v-else>
    <p>Загрузка вопросов...</p>
    <!-- Можно добавить индикатор загрузки -->
  </div>
</template>

<script>
export default {
  name: 'AppQuiz',
  props: {
    questions: {
      type: Array,
      required: true
    }
  },
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
    };
  },
  watch: {
    questions: {
      immediate: true,
      handler(newQuestions) {
        if (newQuestions && newQuestions.length > 0) {
          this.currentQuestion = newQuestions[this.currentQuestionIndex];
          this.shuffleAnswers(); // Перемешивание ответов
        }
      }
    }
  },
  methods: {
    shuffleAnswers() {
      if (this.currentQuestion && this.currentQuestion.answers) {
        this.shuffledAnswers = this.shuffleArray(this.currentQuestion.answers);
      }
    },
    shuffleArray(array) {
      let currentIndex = array.length, randomIndex, temporaryValue;

      // Пока остаются элементы для перемешивания...
      while (currentIndex !== 0) {
        // Выбираем случайный оставшийся элемент...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // И меняем его местами с текущим элементом.
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
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.currentQuestionNumber++;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        this.shuffleAnswers();
        this.resetAnswer();
      }
    },
    resetAnswer() {
      this.isAnswerSelected = false;
      this.selectedAnswer = '';
      this.isAnswerCorrect = false;
    }
  },
  // ... другие существующие опции
}
</script>

<style>
  /* Существующие стили */
</style>
