<template>
	<div class="bar">
		<h1>Site info:</h1>
		<NuxtLink :to="`/setup/${id}`"><Button>Setup on your website</Button></NuxtLink
		>
	</div>
	<p>
		Site name: {{ info.name }}<br />
		Site id: {{ info.id }}<br />
		Site owner: {{ info.ownerId }}<br />
	</p>

	<div class="bar">
		<h1>Site settings:</h1>
		<div><Button @click="update()">Save</Button></div>
	</div>

	<h2>Identification of page</h2>
	<div class="field-radiobutton">
		<RadioButton
			v-model="info.pageIdentification"
			inputId="urlPath"
			name="urlPath"
			value="urlPath"
		/>
		<label for="urlPath">URL Path</label>
	</div>
	<div class="field-radiobutton">
		<RadioButton
			v-model="info.pageIdentification"
			inputId="fullUrl"
			name="fullUrl"
			value="fullUrl"
		/>
		<label for="fullUrl">Full URL</label>
	</div>
	<div class="field-radiobutton">
		<RadioButton
			v-model="info.pageIdentification"
			inputId="pageTitleHtmlTag"
			name="pageTitleHtmlTag"
			value="pageTitleHtmlTag"
		/>
		<label for="pageTitleHtmlTag">Page Title in HTML &lt;title&gt;</label>
	</div>
	<div class="field-radiobutton">
		<RadioButton
			v-model="info.pageIdentification"
			inputId="pageTitleMetaOg"
			name="pageTitleMetaOg"
			value="pageTitleMetaOg"
		/>
		<label for="pageTitleMetaOg">Page Title in the meta `og:title`</label>
	</div>

	<h2>Other options</h2>
	Enable reactions: <InputSwitch v-model="info.reactionsEnabled"></InputSwitch><br />
	Place the comment box above the comments:
	<InputSwitch v-model="info.commentBoxAbove"></InputSwitch>
</template>

<script setup lang="ts">
import InputSwitch from "primevue/inputswitch"
import RadioButton from "primevue/radiobutton"
import Button from "primevue/button"
import { Site } from "~~/composables/types"

useSession({ required: true })

const { params } = useRoute()
const { id } = params

const siteStore = useSiteStore()

const fetchedInfo = (await siteStore.getSiteById(id as string)) as Site
const info = reactive(fetchedInfo)

const update = async () => {
	await siteStore.updateSiteById(info.id, info)
}
</script>

<style scoped></style>
