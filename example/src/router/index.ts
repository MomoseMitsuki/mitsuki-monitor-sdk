import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			redirect: "/error"
		},
		{
			path: "/error",
			name: "JsError",
			component: () => import("@/views/error.vue")
		}
	]
});

export default router;
