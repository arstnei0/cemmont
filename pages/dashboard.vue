<template>
	<h1>Your Sites:</h1>
	<Button @click="navigateTo('/new/site')">Add a new site</Button>

	<!-- <VList lines="one">
		<VListItem v-for="site of siteStore.sites" :key="site.id">
			<VListItemTitle
				><NuxtLink :to="`/site/${site.id}`">{{
					site.name
				}}</NuxtLink></VListItemTitle
			>
		</VListItem>
	</VList> -->
	<div class="flex">
		<Card v-for="site of siteStore.sites" :key="site.id">
			<template #title>
				<NuxtLink :to="`/site/${site.id}`">{{site.name}}</NuxtLink>
			</template>
		</Card>
	</div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'

useSession({
	required: true
})

const siteStore = useSiteStore()

onMounted(async () => {
	await siteStore.fetchSites()
})
</script>

<style scoped>
.title {
	display: flex;
	justify-content: space-between;
	padding: 1em;
}
</style>
