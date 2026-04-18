import type { App } from "vue";
import type { Router } from "vue-router";
import errHandler from "./errorHandler";
import routerChange from "./routerChange";

const vueMonitor = (options: { vue?: App; router?: Router } = {}) => {
	if (options.vue) {
		options.vue.config.errorHandler = errHandler;
	}
	if (options.router) {
		options.router.beforeEach(routerChange);
	}
};

export default vueMonitor;
