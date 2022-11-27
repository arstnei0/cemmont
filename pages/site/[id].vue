<template>
    <h1>Site info: </h1>
    <p>
        Site name: {{info.name}}<br>
        Site id: {{info.id}}<br>
        Site owner: {{info.owner}}<br>
    </p>

    <div class="bar">
        <h1>Site settings: </h1>
        <VBtn color="primary" @click="update()">Save</VBtn>
    </div>

    <h2>Identification of page</h2>
    <VRadioGroup v-model="info.page_identification">
        <VRadio label="URL Path" value="urlPath"></VRadio>
        <VRadio label="Full URL" value="fullUrl"></VRadio>
        <VRadio label="Page Title in HTML <title>" value="pageTitleHtmlTag"></VRadio>
        <VRadio label="Page Title in the meta `og:title`" value="pageTitleMetaOg"></VRadio>
    </VRadioGroup>

    <h2>Other options</h2>
    <VSwitch label="Enable reactions" v-model="info.reactions_enabled"></VSwitch>
    <VSwitch label="Place the comment box above the comments" v-model="info.comment_box_above"></VSwitch>
</template>

<script setup lang="ts">
import { Site } from '~~/composables/types';

requireAuth()

const { params } = useRoute()
const { id } = params

const siteStore = useSiteStore()

const fetchedInfo = await siteStore.getSiteById(id as string) as Site
const info = reactive(fetchedInfo)

const update = async () => {
    siteStore.updateSiteById(info.id, info)
}
</script>

<style scoped></style>
