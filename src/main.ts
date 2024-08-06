import { createApp } from 'vue'
import { createPinia } from "pinia";

import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import preset from './theme';

import App from './App.vue';
import router from './router';
import './style.css';
import 'primeicons/primeicons.css'

const app = createApp(App);

app.use(PrimeVue, {
    // Default theme configuration
    theme: {
        preset,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
});
app.use(ConfirmationService);

app.use(router);
app.use(createPinia());

app.mount('#app');