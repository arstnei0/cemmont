<template>
	<div class="title">
		<h1>Your Sites:</h1>
		<NuxtLink to="/new/site">
			<VBtn icon="mdi-plus"></VBtn>
		</NuxtLink>
	</div>

	<VList lines="one">
		<VListItem v-for="site of siteStore.sites" :key="site.id">
			<VListItemTitle><NuxtLink :to="`/site/${site.id}`">{{site.name}}</NuxtLink></VListItemTitle>
		</VListItem>
	</VList>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const siteStore = useSiteStore()

onMounted(async () => {
	await siteStore.fetchSites()
})

await requireAuth()
</script>

<style scoped>
	.title {
		display: flex;
		justify-content: space-between;
		padding: 1em;
	}
</style>
