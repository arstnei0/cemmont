<template>
    Site name: {{info.name}}<br>
    Site id: {{info.id}}<br>
    Site owner: {{info.owner}}<br>
</template>

<script setup lang="ts">
import { Site } from '~~/composables/types';

const { params } = useRoute()
const { id } = params

const siteStore = useSiteStore()

const info = await siteStore.getSiteById(id as string) as Site
</script>

<style scoped></style>
