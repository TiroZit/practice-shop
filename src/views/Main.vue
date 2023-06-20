<script>
import {defineComponent} from 'vue'
import Brand from "../components/Main/Brand.vue";
import Stats from "../components/Main/Stats.vue";

export default defineComponent({
	name: "Main",
	components: {
		Brand,
		Stats,
	}
})
</script>

<template>
	<Brand/>
	<Stats/>
</template>

<style scoped>

</style>
