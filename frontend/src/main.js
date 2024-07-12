import { createApp } from "vue";
import "./style.css";
import "vue3-toastify/dist/index.css";
import "./primevue.css";
import "primeicons/primeicons.css";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import { createPinia } from "pinia";
const app = createApp(App);
const pinia = createPinia();
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: "p",
      darkModeSelector: "light",
      cssLayer: true,
    },
  },
});

app.use(router);

app.use(pinia);
app.mount("#app");
