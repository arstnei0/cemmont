<template>
	<slot />
</template>

<script setup lang="ts">
import { createPinia } from "pinia"

const nuxtApp = useNuxtApp()
const vueApp = nuxtApp.vueApp

// use pinia
const pinia = createPinia()
vueApp.use(pinia)
</script>
