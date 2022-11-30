<template>
	<div id="cemmont">
		<h1>Comments</h1>
		<VTextarea label="Comment" v-model="commentText"></VTextarea>
		<VBtn @click="submit()">Submit</VBtn>

		<div class="comment" v-for="comment in comments">
			{{comment.content}}
		</div>
	</div>
</template>

<style>
#cemmont {
	padding: 1em;
}
</style>

<script setup lang="ts">
import "~~/layouts/setup"
import { MyComment, Site } from "~~/composables/types"

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

switch (siteInfo.page_identification) {
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

const comments = ref<MyComment[]>([])

definePageMeta({
	layout: false,
})
const updateWindowHeight = () => {
	window.parent.postMessage("resize iframe")
}

const fetchComments =async() => {
	comments.value = (await pageStore.getPageAndComments(
		pageId as string,
		siteId as string
	)).comments
	updateWindowHeight()
}

onMounted(async () => {
	updateWindowHeight()
	await fetchComments()
})

const submit = async () => {
	await pageStore.submitComment(pageId as string, commentText.value)
	await fetchComments()
}
</script>
