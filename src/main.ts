import { createApp } from "vue";
import App from "./App.vue";

import "./assets/styles/main.scss";
import router from "./routers";
import Vue3Lottie from "vue3-lottie";

const app = createApp(App);
app.use(router);
app.use(Vue3Lottie, { name: "Vue3Lottie" });
app.mount("#app");
