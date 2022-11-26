<template>
	<h1>Login</h1>
	<VTextField
		label="Username or Email"
		v-model="user.usernameOrEmail"
	></VTextField>
	<VTextField
		label="Password"
		v-model="user.password"
		type="password"
	></VTextField>
	<v-btn color="success" @click="register" :disabled="allowLogin">
		Login
	</v-btn>
	<VAlert v-if="wrong" type="error">
		Username (or email) or password wrong!
	</VAlert>
</template>

<script setup lang="ts">
const userStore = useUserStore()

const wrong = ref(false)

const user = reactive({
	usernameOrEmail: "",
	password: "",
})

const allowLogin = computed(() => !(user.usernameOrEmail && user.password))

const register = async () => {
	const result = await userStore.login({ ...user })

	if (result === UserLoginResult.Wrong) {
		wrong.value = true
	} else {
		wrong.value = false
	}
}
</script>

<style scoped></style>
