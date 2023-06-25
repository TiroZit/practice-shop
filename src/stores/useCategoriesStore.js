import { defineStore } from "pinia";
import axios from "axios";

export const useCategoriesStore = defineStore("categoriesStore", {
	state: () => ({
		categories: [],
	}),
	actions: {
		async getCategories() {
			axios.get("/api/Sexes")
				.then(response => {
					this.categories = response.data
				})
				.catch(error => {
					console.log(error)
				})
		},
	},
})
