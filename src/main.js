import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import SearchInput from "./components/search-input.vue";
import SearchButton from "./components/search-button.vue";

import "./style.css";

const pinia = createPinia();
const app = createApp(App);

app.component("search-input", SearchInput);
app.component("search-button", SearchButton);

app.use(pinia);
app.use(router);
app.mount("#app");
