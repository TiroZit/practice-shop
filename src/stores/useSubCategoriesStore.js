import { defineStore } from "pinia";
import axios from "axios";

export const useSubCategoriesStore = defineStore("subCategoriesStore", {
	state: () => ({
		subCategories: [],
	}),
	actions: {
		async getSubCategory(id) {
			axios.get(`/api/SubCategories/${id}`)
				.then(response => {
					this.subCategories = response.data
				})
				.catch(error => {
					console.log(error)
				})
		},
	},
})
