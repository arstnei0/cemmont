<template>
	<VLayout>
		<ClientOnly>
			<Header></Header>
		</ClientOnly>
		<VMain>
			<main>
				<slot />
			</main>
		</VMain>
	</VLayout>
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
