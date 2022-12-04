<template>
	<h1>Login</h1>
	<Button @click="signIn('github')">Login with Github</Button>
	<Button @click="signIn('discord')">Login with Discord</Button>
	<Button @click="signIn('google')">Login with Google</Button>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
const { signIn } = await useSession({
	required: false,
})
</script>
