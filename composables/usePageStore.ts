import { defineStore } from "pinia"
import { Comment } from "./types"

export const usePageStore = defineStore("page", {
	state: () => {
		return {}
	},
	actions: {
		async getPageAndComments(id: string, site: string) {
			const result = await useFetch(
				`/api/page/${site}/${encodeURIComponent(id)}`
			)

			return result.data.value as any as { comments: Comment[] }
		},
		async submitComment(page: string, content: string) {
			const result = await useFetch(`/api/comment/new`, {
				method: "POST",
				body: {
					page: encodeURIComponent(page),
					content,
				},
			})
		},
	},
})
