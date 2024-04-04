import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import "./assets/styles/main.scss";
import "./assets/styles/index.css";
import router from "./routers";
import Vue3Lottie from "vue3-lottie";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
pinia.use(piniaPluginPersistedState);
app.use(router);
app.use(Vue3Lottie, { name: "Vue3Lottie" });
app.use(Vue3Toastify, {
  autoClose: 3000,
} as ToastContainerOptions);
app.mount("#app");
