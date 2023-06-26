<script>
import {defineComponent} from 'vue'
import Header from "/components/Header.vue";
import Cart from "../components/Cart.vue";

export default defineComponent({
	name: "Layout",
	components: {Header, Cart}
})
</script>

<template>
	<div class="layout" v-cloak>
		<Header/>
		<router-view v-slot="{Component}">
			<component :is="Component"/>
		</router-view>
	</div>
	<Cart/>
</template>

<style scoped>

</style>
