<template>
	<div class="bg-white">
		<div>
			<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
					<h1 class="text-4xl font-bold tracking-tight text-gray-900">{{subCategoriesStore.subCategories.name}}</h1>

					<div class="flex items-center">
						<Menu as="div" class="relative inline-block text-left">
							<div>
								<MenuButton class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
									Sort
									<ChevronDownIcon class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
								</MenuButton>
							</div>

							<transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
								<MenuItems class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
									<div class="py-1">
										<MenuItem v-for="option in sortOptions" :key="option.name" v-slot="{ active }">
											<a :href="option.href" :class="[option.current ? 'font-medium text-gray-900' : 'text-gray-500', active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm']">{{ option.name }}</a>
										</MenuItem>
									</div>
								</MenuItems>
							</transition>
						</Menu>

						<button type="button" class="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
							<span class="sr-only">View grid</span>
							<Squares2X2Icon class="h-5 w-5" aria-hidden="true" />
						</button>
						<button type="button" class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden" @click="mobileFiltersOpen = true">
							<span class="sr-only">Filters</span>
							<FunnelIcon class="h-5 w-5" aria-hidden="true" />
						</button>
					</div>
				</div>

				<section aria-labelledby="products-heading" class="pb-24 pt-6">
					<h2 id="products-heading" class="sr-only">Products</h2>

					<div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
						<!-- Filters -->
						<form class="hidden lg:block">
							<h3 class="sr-only">Categories</h3>
							<ul role="list" class="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
								<li v-for="category in subCategories" :key="category.name">
									<a :href="category.href">{{ category.name }}</a>
								</li>
							</ul>

							<Disclosure as="div" v-for="section in filters" :key="section.id" class="border-b border-gray-200 py-6" v-slot="{ open }">
								<h3 class="-my-3 flow-root">
									<DisclosureButton class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
										<span class="font-medium text-gray-900">{{ section.name }}</span>
										<span class="ml-6 flex items-center">
                      <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true" />
                      <MinusIcon v-else class="h-5 w-5" aria-hidden="true" />
                    </span>
									</DisclosureButton>
								</h3>
								<DisclosurePanel class="pt-6">
									<div class="space-y-4">
										<div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
											<input :id="`filter-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value" type="checkbox" :checked="option.checked" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
											<label :for="`filter-${section.id}-${optionIdx}`" class="ml-3 text-sm text-gray-600">{{ option.label }}</label>
										</div>
									</div>
								</DisclosurePanel>
							</Disclosure>
						</form>

						<!-- Product grid -->
						<div class="lg:col-span-3">
							<div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
								<Product v-for="product in subCategoriesStore.subCategories.products" :key="product.id" :product="product"/>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	</div>
</template>

<script setup>
import {onMounted, onUpdated, ref} from 'vue'
import {
	Dialog,
	DialogPanel,
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
	TransitionChild,
	TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/vue/20/solid'
import {useSubCategoriesStore} from "../stores/useSubCategoriesStore.js";
import Product from "../components/Product.vue";

const props = defineProps({
	id: "",
})

const subCategoriesStore = useSubCategoriesStore()

onMounted(() => {
	subCategoriesStore.getSubCategory(props.id)
})

onUpdated(() => {
	subCategoriesStore.getSubCategory(props.id)
})

const sortOptions = [
	{ name: 'Most Popular', href: '#', current: true },
	{ name: 'Best Rating', href: '#', current: false },
	{ name: 'Newest', href: '#', current: false },
	{ name: 'Price: Low to High', href: '#', current: false },
	{ name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
	{ name: 'Totes', href: '#' },
	{ name: 'Backpacks', href: '#' },
	{ name: 'Travel Bags', href: '#' },
	{ name: 'Hip Bags', href: '#' },
	{ name: 'Laptop Sleeves', href: '#' },
]
const filters = [
	{
		id: 'color',
		name: 'Color',
		options: [
			{ value: 'white', label: 'White', checked: false },
			{ value: 'beige', label: 'Beige', checked: false },
			{ value: 'blue', label: 'Blue', checked: true },
			{ value: 'brown', label: 'Brown', checked: false },
			{ value: 'green', label: 'Green', checked: false },
			{ value: 'purple', label: 'Purple', checked: false },
		],
	},
	{
		id: 'category',
		name: 'Category',
		options: [
			{ value: 'new-arrivals', label: 'New Arrivals', checked: false },
			{ value: 'sale', label: 'Sale', checked: false },
			{ value: 'travel', label: 'Travel', checked: true },
			{ value: 'organization', label: 'Organization', checked: false },
			{ value: 'accessories', label: 'Accessories', checked: false },
		],
	},
	{
		id: 'size',
		name: 'Size',
		options: [
			{ value: '2l', label: '2L', checked: false },
			{ value: '6l', label: '6L', checked: false },
			{ value: '12l', label: '12L', checked: false },
			{ value: '18l', label: '18L', checked: false },
			{ value: '20l', label: '20L', checked: false },
			{ value: '40l', label: '40L', checked: true },
		],
	},
]

const products = [
	{
		id: 1,
		name: 'Earthen Bottle',
		href: '#',
		price: '$48',
		imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
		imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
	},
	{
		id: 2,
		name: 'Nomad Tumbler',
		href: '#',
		price: '$35',
		imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
		imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
	},
	{
		id: 3,
		name: 'Focus Paper Refill',
		href: '#',
		price: '$89',
		imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
		imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
	},
	{
		id: 4,
		name: 'Machined Mechanical Pencil',
		href: '#',
		price: '$35',
		imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
		imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
	},
	// More products...
]

const mobileFiltersOpen = ref(false)
</script>
