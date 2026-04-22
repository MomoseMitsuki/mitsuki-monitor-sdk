import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import monitor from "@mitsuki-monitor-sdk/core";
import vueMonitor from "@mitsuki-monitor-sdk/vue";
import "@/assets/main.css";

const app = createApp(App);

app.use(router);

app.mount("#app");

monitor.init({
	appId: "example-vue-demo",
	reportUrl: "http://localhost:3001/report"
});
monitor.pageChange();
monitor.pageStayTime();

vueMonitor({
	vue: app,
	router
});
