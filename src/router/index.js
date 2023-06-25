import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		name: "Main",
		component: () => import('/views/Main.vue'),
	},
	{
		path: "/catalog/:id",
		name: "Catalog",
		component: () => import('/views/Catalog.vue'),
		props: true,
	},
	{
		path: "/product/:id",
		name: "Product",
		component: () => import('/views/Product.vue'),
		props: true,
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
