<template>
	<ClientOnly>
		<Header></Header>
	</ClientOnly>
	<main>
		<slot />
	</main>
</template>

<script setup lang="ts">
import "./setup"
</script>

<style lang="scss">
main {
	margin-left: 10%;
	margin-right: 10%;
	margin-top: 1%;
	margin-bottom: 10%;
}
</style>
