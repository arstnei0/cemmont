<template>
	<h1>Create a new site</h1>
	<span class="p-float-label">
		<InputText v-model="info.name" id="name"></InputText>
		<label for="name">Name</label>
    </span>
	<span class="p-float-label">
		<InputText v-model="info.id" id="id"></InputText>
		<label for="id">Id</label>
    </span>
	<Button @click="create()">Create</Button>
</template>

<script lang="ts" setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const info = reactive({
	id: "",
	name: "",
})

const siteStore = useSiteStore()
const success = ref(false)
const conflict = ref(false)
const missing = ref(false)

const create = async () => {
	if (!(info.id && info.name)) {
		return (missing.value = true)
	}

	const result = await siteStore.createSite({ ...info })
	if (result === CreateSiteResult.Missing) missing.value = true
	else if (result === CreateSiteResult.Conflict) conflict.value = true
	else if (result === CreateSiteResult.Success) {
		success.value = true
		// delay(() => useRouter().push("/dashboard"))
	}
}
</script>
