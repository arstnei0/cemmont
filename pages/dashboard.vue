<template>
	<div>
		<h1>{{ userStore.loggedIn }}</h1>
	</div>
</template>

<script setup lang="ts">
const userStore = useUserStore()


if (await userStore.login({
		username: "zihan",
		email: "me@zihan.ga",
		password: "zihan",
	}) === UserLoginResult.Exists) {
		console.log('exists')
	}

console.log(userStore.user)
</script>

<style scoped></style>
