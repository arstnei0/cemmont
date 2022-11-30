<template>
	<h1>Register</h1>
	<VTextField label="Username" v-model="user.username"></VTextField>
	<VTextField label="Email" v-model="user.email" type="email"></VTextField>
	<VTextField
		label="Password"
		v-model="user.password"
		type="password"
	></VTextField>
	<v-btn color="success" @click="register" :disabled="allowRegister">
		Register
	</v-btn>
	<p>
		Or you can
		<NuxtLink to="/login">login to an existing account</NuxtLink>.
	</p>
	<VAlert v-if="exists" type="error">
		A user with this email or username already exists!
	</VAlert>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const exists = ref(false)

const user = reactive({
	username: "",
	email: "",
	password: "",
})

const allowRegister = computed(
	() => !(user.username && user.password && user.email)
)

const register = async () => {
	const result = await userStore.register({ ...user })
	if (result === UserRegisterResult.Exists) {
		exists.value = true
	} else {
		exists.value = false
	}
}

authencatedGoToDashboard()
</script>

<style scoped></style>
