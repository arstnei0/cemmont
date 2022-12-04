<template>
	<div id="cemmont">
		<h1>Comments</h1>
		<Textarea
			v-model="commentText"
			:autoResize="true"
			class="comment-input"
		>
		</Textarea>
		<Button @click="submit()">Submit</Button>

		<div id="comments">
			<AComment v-for="comment in page.comments" :comment="comment">
			</AComment>
		</div>
	</div>
</template>

<style>
#cemmont {
	padding: 1em;
}
</style>

<script setup lang="ts">
import Textarea from "primevue/textarea"
import "~~/layouts/setup"
import { Site } from "~~/composables/types"
import Button from "primevue/button"

const PageIdentification = {
	urlPath: "urlPath",
	fullUrl: "fullUrl",
	pageTitleHtmlTag: "pageTitleHtmlTag",
	pageTitleMetaOg: "pageTitleMetaOg",
}

useHead({
	meta: [
		{
			property: "og:title",
			content: "setup",
		},
	],
})

const { params } = useRoute()
const { id: siteId } = params
const siteStore = useSiteStore()
const pageStore = usePageStore()
const commentText = ref("")

const siteInfo = (await siteStore.getSiteById(siteId as string)) as Site

let pageId: string | null | undefined
const route = useRoute()

switch (siteInfo.pageIdentification) {
	case PageIdentification.fullUrl:
		pageId = location.href
		break
	case PageIdentification.pageTitleHtmlTag:
		pageId = document?.title
		break
	case PageIdentification.pageTitleMetaOg:
		pageId = document
			.querySelector('meta[property="og:title"]')
			?.getAttribute("content")
		break
	case PageIdentification.urlPath:
		pageId = route.path
		break
}

const page = ref<any>(await pageStore.getPageAndComments(
		pageId as string,
		siteId as string
	)
)

definePageMeta({
	layout: false,
})

const updateWindowHeight = () => {
	window.parent.postMessage("resize iframe")
}

const fetchComments = async () => {
	page.value = await pageStore.getPageAndComments(
		pageId as string,
		siteId as string
	)

	updateWindowHeight()
}

onMounted(async () => {
	updateWindowHeight()
})

const submit = async () => {
	await pageStore.submitComment(pageId as string, commentText.value)
	await fetchComments()
}

watch(commentText, () => {
	updateWindowHeight()
})

import.meta.hot?.on("vite:beforeUpdate", () => {
	setTimeout(updateWindowHeight, 200)
})
</script>

<style>
.comment-input {
	width: 100%;
}

#comments {
	margin: 1em;
}

#comments > * {
	margin: 0.5em;
}
</style>
