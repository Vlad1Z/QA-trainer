<template>
    <div class="StartPage">
      <h1>Тренажер для тестировщиков ПО</h1>
      <p>Добро пожаловать в тренажер для тренировки теоретических знаний, предназначенный для специальности "Тестировщик ПО".</p>
      <button @click="startTest">Начать тест</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeScreen',
    emits: ['startTest'],
    methods: {
      startTest() {
        this.$emit('startTest');
      }
    }
  }
  </script>
  
  <style>
  /* Ваши стили для HomeScreen.vue */
  .home-screen {
    text-align: center;
    padding: 20px;
  }
  
  .home-screen h1 {
    margin-bottom: 15px;
  }
  
  .home-screen p {
    margin-bottom: 20px;
  }
  
  .home-screen button {
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  