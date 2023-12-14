import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "../src/pages/styles.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App);
app.use(createPinia());
app.use(router);

app.mount("#app");

// make "http://localhost:8000" for local frontend testing and "" for npm run build
app.provide("backend_url", "");
