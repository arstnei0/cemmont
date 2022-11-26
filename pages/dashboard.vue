<template>
	<div>
		<h1>{{ userStore.loggedIn }}</h1>
	</div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
</script>

<style scoped></style>
