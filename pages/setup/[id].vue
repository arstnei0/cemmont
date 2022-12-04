<template>
	<h1>Insert this code into your website:</h1>
	<h2>Put it at where you want your comments to be.</h2>

	<p>{{ code }}</p>

	<div id="script-place"></div>

	<div id="script">
		
	</div>
</template>

<script setup lang="ts">
import { Site } from "~~/composables/types"

// requireAuth()

const { params } = useRoute()
const { id } = params

const siteStore = useSiteStore()

const info = (await siteStore.getSiteById(id as string)) as Site
const config = useRuntimeConfig()

const url = `${baseUrl}api/script/${id}`
const code =
	`<script id="cemmont-script" src="${url}" defer>` + "</" + "script>"

onMounted(() => {
	const scriptEl = document.createElement("script")
	scriptEl.src = `/api/script/${id}`
	scriptEl.defer = true
	scriptEl.id = "cemmont-script"
	document.getElementById("script-place")?.appendChild(scriptEl)
})
</script>
