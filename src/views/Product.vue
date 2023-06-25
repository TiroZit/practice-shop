<template>
	<div class="bg-white">
		<div class="pt-6">

			<!-- Image gallery -->
			<div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
<!--				<div class="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">-->
<!--					<img :src="product.images[0].src" :alt="product.images[0].alt" class="h-full w-full object-cover object-center" />-->
<!--				</div>-->
<!--				<div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">-->
<!--					<div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">-->
<!--						<img :src="product.images[1].src" :alt="product.images[1].alt" class="h-full w-full object-cover object-center" />-->
<!--					</div>-->
<!--					<div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">-->
<!--						<img :src="product.images[2].src" :alt="product.images[2].alt" class="h-full w-full object-cover object-center" />-->
<!--					</div>-->
<!--				</div>-->
				<div class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
					<img :src="productStore.products.images" :alt="productStore.products.name" class="h-full w-full object-cover object-center" />
				</div>
			</div>

			<!-- Product info -->
			<div class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
				<div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
					<h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{{ productStore.products.name }}</h1>
				</div>

				<!-- Options -->
				<div class="mt-4 lg:row-span-3 lg:mt-0">
					<h2 class="sr-only">Product information</h2>
					<p class="text-3xl tracking-tight text-gray-900">{{ productStore.products.price }} ₽</p>

					<form class="mt-10">
						<!-- Colors -->
						<div>
							<h3 class="text-sm font-medium text-gray-900">Цвет:</h3>
							<div class="mt-2 w-10 h-5" :style="`background-color: #${productStore.products.color};`"></div>
						</div>

						<!-- Sizes -->
						<div class="mt-10">
							<div class="flex items-center justify-between">
								<h3 class="text-2xl font-medium text-gray-900">Размер: {{ productStore.products.size }}</h3>
							</div>
						</div>

						<button type="submit" class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add to bag</button>
					</form>
				</div>

				<div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
					<!-- Description and details -->
					<div>
						<h3 class="sr-only">Description</h3>

						<div class="space-y-6">
							<p class="text-base text-gray-900">{{ productStore.products.description }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import { StarIcon } from '@heroicons/vue/20/solid'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import {useProductStore} from "../stores/useProductStore.js";

const props = defineProps({
	id: "",
})

const productStore = useProductStore()

onMounted(() => {
	productStore.getProduct(props.id)
})

const product = {
	name: 'Basic Tee 6-Pack',
	price: '$192',
	href: '#',
	breadcrumbs: [
		{ id: 1, name: 'Men', href: '#' },
		{ id: 2, name: 'Clothing', href: '#' },
	],
	images: [
		{
			src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
			alt: 'Two each of gray, white, and black shirts laying flat.',
		},
		{
			src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
			alt: 'Model wearing plain black basic tee.',
		},
		{
			src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
			alt: 'Model wearing plain gray basic tee.',
		},
		{
			src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
			alt: 'Model wearing plain white basic tee.',
		},
	],
	colors: [
		{ name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
		{ name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
		{ name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
	],
	sizes: [
		{ name: 'XXS', inStock: false },
		{ name: 'XS', inStock: true },
		{ name: 'S', inStock: true },
		{ name: 'M', inStock: true },
		{ name: 'L', inStock: true },
		{ name: 'XL', inStock: true },
		{ name: '2XL', inStock: true },
		{ name: '3XL', inStock: true },
	],
	description:
		'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
	highlights: [
		'Hand cut and sewn locally',
		'Dyed with our proprietary colors',
		'Pre-washed & pre-shrunk',
		'Ultra-soft 100% cotton',
	],
	details:
		'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

const selectedColor = ref(product.colors[0])
const selectedSize = ref(product.sizes[2])
</script>
