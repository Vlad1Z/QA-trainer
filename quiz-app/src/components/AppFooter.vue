<template>
    <footer>
      <p>&copy; {{ currentYear }} Ваша Компания. Все права защищены.</p>
      <!-- Другие элементы футера, например, ссылки на социальные сети -->
    </footer>
  </template>
  
  <script>
  export default {
    name: 'AppFooter',
    computed: {
      currentYear() {
        return new Date().getFullYear();
      }
    }
  }
  </script>
  
  <style>
  /* Стили для компонента Footer */
  footer {
    text-align: center;
    padding: 20px;
    background-color: #f8f8f8;
  }
  </style>
  