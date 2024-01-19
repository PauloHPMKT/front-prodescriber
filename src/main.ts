import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import "./assets/styles/main.scss";
import router from "./routers";
import Vue3Lottie from "vue3-lottie";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
pinia.use(piniaPluginPersistedState);
app.use(router);
app.use(Vue3Lottie, { name: "Vue3Lottie" });
app.mount("#app");
