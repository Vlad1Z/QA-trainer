<template>
  <div>
    <Header /> <!-- Шапка сайта -->
    <Home v-if="!isTestStarted" @startTest="startTest" /> <!-- Приветственная страница -->
    <Quiz v-else :questions="questions" /> <!-- Компонент викторины -->
    <Footer /> <!-- Подвал сайта -->
  </div>
</template>

<script>
import axios from 'axios'; // Убедитесь, что axios импортирован
import Header from './components/AppHeader.vue';
import Home from './components/StartPage.vue';
import Quiz from './components/AppQuiz.vue';
import Footer from './components/AppFooter.vue';

export default {
  name: 'QuizApp',
  components: {
    Header,
    Home,
    Quiz,
    Footer
  },
  data() {
    return {
      isTestStarted: false,
      questions: [],
    };
  },
  methods: {
    async fetchQuestions() {
      try {
        const response = await axios.get('http://localhost:3000/api/questions');
        this.questions = response.data;
        this.isTestStarted = true; // Переключаем флаг только после загрузки вопросов
      } catch (error) {
        console.error("There was an error fetching the questions:", error);
      }
    },
    startTest() {
      if (this.questions.length === 0) {
        this.fetchQuestions(); // Асинхронно загружаем вопросы и начинаем тест
      } else {
        this.isTestStarted = true; // Если вопросы уже загружены, просто начинаем тест
      }
    }
  },
}
</script>
