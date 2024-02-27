<!-- App.vue -->
<template>
  <div>
    <Header />
    <Home v-if="!isTestStarted" @startTest="startTest" />
    <Quiz v-else />
    <Footer />
  </div>
</template>

<script>
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
      isTestStarted: false
    };
  },
  methods: {
    startTest() {
      this.isTestStarted = true;
    }
  }
}
</script>