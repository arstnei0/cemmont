import { defineStore } from "pinia"
import { PageIdentification, Site } from "./types"

export enum CreateSiteResult {
	Success,
	Conflict,
	Missing,
	Unknown,
}

export const useSiteStore = defineStore("site", {
	state: () => {
		return {
			sites: [] as Site[],
		}
	},
	actions: {
		async fetchSites() {
			const result = await useFetch("/api/sites", {
				method: "GET",
			})

			if (result.error.value) return []

			this.sites = result.data.value
		},
		async createSite(site: { name: string; id: string }) {
			const userStore = useUserStore()

			const result = await useFetch("/api/site", {
				method: "POST",
				body: {
					page_identification: PageIdentification.urlPath,
					reactions_enabled: true,
					comment_box_above: true,
					...site,
				},
			})

			if (result.error.value) {
				const status = result.error.value?.status as number

				if (status === 409) {
					return CreateSiteResult.Conflict
				} else if (status === 422) {
					return CreateSiteResult.Missing
				}

				return CreateSiteResult.Unknown
			}

			return CreateSiteResult.Success
		},
		async getSiteById(id: Site["id"]) {
			const result = await useFetch("/api/site/" + id)

			return result.data.value
		},
		async updateSiteById(id: Site["id"], updates: any) {
			const result = await useFetch(`/api/site/${id}`, {
				method: "POST",
				body: updates,
			})

			console.log(result)

			return result
		},
	},
})
