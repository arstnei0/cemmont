<template>
	<h1>Logout successfully!</h1>
</template>

<script setup lang="ts">
const result = await useFetch("/api/auth/logout")

delay(() => useRouter().push("/dashboard"))
</script>
