<template>
    <h1>Create a new site</h1>

    <VTextField label="Id" v-model="info.id"></VTextField>
    <VTextField label="Name" v-model="info.name"></VTextField>

    <VBtn color="primary" @click="create()">Create</VBtn>

    <VSnackbar v-model="success" color="success">Site created successfully!</VSnackbar>
    <VSnackbar v-model="conflict" color="error">A site with this id already exists!</VSnackbar>
    <VSnackbar v-model="missing" color="warning">Please fill in all the fields!</VSnackbar>
</template>

<script lang="ts" setup>
const info = reactive({
    id: '',
    name: '',
})

const siteStore = useSiteStore()
const success = ref(false)
const conflict = ref(false)
const missing = ref(false)

const create = async () => {
    if (!(info.id && info.name)) {
        return missing.value = true
    }

    const result = await siteStore.createSite({ ...info })
    if (result === CreateSiteResult.Missing) missing.value = true
    else if (result === CreateSiteResult.Conflict) conflict.value = true
    else if (result === CreateSiteResult.Success) success.value = true
}
</script>