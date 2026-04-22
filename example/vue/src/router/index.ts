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
			name: "error",
			component: () => import("@/views/error.vue")
		},
		{
			path: "/action",
			name: "action",
			component: () => import("@/views/action.vue")
		},
		{
			path: "/api",
			name: "api",
			component: () => import("@/views/api.vue")
		}
	]
});

export default router;
