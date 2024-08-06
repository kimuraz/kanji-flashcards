import { createApp } from 'vue'

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import App from './App.vue'
import router from './router';

const app = createApp(App);

app.use(PrimeVue, {
    // Default theme configuration
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
});
app.use(router);

app.mount('#app');