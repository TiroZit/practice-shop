import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		name: "Главная",
		component: () => import('/views/Main.vue'),
	},
	{
		path: "/catalog",
		name: "Каталог",
		component: () => import('/views/Catalog.vue'),
	},
	{
		path: "/product",
		name: "Product",
		component: () => import('/views/Product.vue'),
	},
	{
		path: "/:pathMatch(.*)",
		name: "NotFound",
		component: () => import('/views/NotFound.vue'),
	}
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
