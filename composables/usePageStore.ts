import { defineStore } from "pinia"

export const usePageStore = defineStore("page", {
	state: () => {
		return {}
	},
	actions: {
		async getPageAndComments(id: string, site: string) {
			const result = await useFetch(
				`/api/page/${site}/${encodeURIComponent(id)}`
			)

			return result.data.value
		},
		async submitComment(page: string, content: string) {
			const result = await useFetch(`/api/comment/new`, {
				method: "POST",
				body: {
					page: encodeURIComponent(page),
					content,
				},
			})

			console.log(result)
		},
	},
})
