<template>
  <div class="quiz-question">
    <h2>{{ question.question }}</h2>
    <ul>
      <li v-for="(answer, index) in question.answers" :key="index">
        {{ answer }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'QuizQuestion',
  props: {
    question: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.question {
  margin-bottom: 20px;
}
</style>
