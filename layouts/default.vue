<template>
	<VLayout>
		<Header></Header>
		<VMain>
			<main>
				<slot />
			</main>
		</VMain>
	</VLayout>
</template>

<script setup lang="ts">
import { createPinia } from "pinia"

const nuxtApp = useNuxtApp()
const vueApp = nuxtApp.vueApp

// use pinia
const pinia = createPinia()
vueApp.use(pinia)

const userStore = useUserStore()

useRouter().afterEach(async () => {
	userStore.$reset()
})
</script>

<style lang="scss">
main {
	margin-left: 10%;
	margin-right: 10%;
	margin-top: 1%;
	margin-bottom: 10%;
}
</style>
