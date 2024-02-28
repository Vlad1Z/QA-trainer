// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css'; // Bootstrap CSS
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'; // BootstrapVue CSS
import BootstrapVue3 from 'bootstrap-vue-3'; // Импорт BootstrapVue3
import './assets/global.css'; // Ваши глобальные стили

const app = createApp(App);
app.use(BootstrapVue3); // Использование BootstrapVue3 в приложении
app.mount('#app'); // Монтирование приложения
