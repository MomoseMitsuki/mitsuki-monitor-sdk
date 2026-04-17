import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import monitor from "@mitsuki-monitor-sdk/core";
import "@/assets/main.css";

const app = createApp(App);

app.use(router);

app.mount("#app");

monitor.init({
	vue: {
		Vue: app,
		router
	}
});
