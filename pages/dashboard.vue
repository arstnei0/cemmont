<template>
	<div class="title">
		<h1>Your Sites:</h1>
		<NuxtLink to="/new/site">
			<VBtn icon="mdi-plus"></VBtn>
		</NuxtLink>
	</div>

	<VList lines="one">
		<VListItem v-for="site of sites" :title="site.name" :key="site.id">
		</VListItem>
	</VList>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const siteStore = useSiteStore()

const sites = ref<any[]>([])

onMounted(async () => {
	sites.value = await siteStore.fetchSites()
})
</script>

<style scoped>
	.title {
		display: flex;
		justify-content: space-between;
		padding: 1em;
	}
</style>
