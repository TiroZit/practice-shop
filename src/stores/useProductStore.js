import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("productStore", {
	state: () => ({
		products: [],
	}),
	actions: {
		async getProduct(id) {
			axios.get(`/api/Products/${id}`)
				.then(response => {
					this.products = response.data
				})
				.catch(error => {
					console.log(error)
				})
		},
	},
})
