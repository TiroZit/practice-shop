<script setup>

const props = defineProps({
	product: {},
})

</script>

<template>
	<router-link :to="{name: 'Product', params: { id: product.id }}" class="group">
		<div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
			<img :src="product.images" :alt="product.name" class="h-full w-full object-cover object-center group-hover:opacity-75" />
		</div>
		<h3 class="mt-4 text-sm text-gray-700">{{ product.name }}</h3>
		<p class="mt-1 text-lg font-medium text-gray-900">{{ product.price }} ₽</p>
	</router-link>
</template>

<style scoped>

</style>
