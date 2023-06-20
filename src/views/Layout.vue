<script>
import {defineComponent} from 'vue'
import Header from "/components/Header.vue";
import Brand from "/components/Main/Brand.vue";

export default defineComponent({
	name: "Layout",
	components: {Header, Brand}
})
</script>

<template>
	<div class="layout" v-cloak>
		<Header/>
		<router-view v-slot="{Component}">
			<component :is="Component"/>
		</router-view>
	</div>
</template>

<style scoped>

</style>
