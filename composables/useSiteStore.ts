import { defineStore } from "pinia"

export enum CreateSiteResult {
	Success,
	Conflict,
	Missing,
	Unknown,
}

export const useSiteStore = defineStore("site", {
	state: () => {
		return {
			sites: [],
		}
	},
	actions: {
		async fetchSites() {
			const result = await useFetch("/api/sites", {
				method: "GET",
			})

			if (result.error.value) return []

			return result.data.value
		},
		async createSite(site: { name: string; id: string }) {
			const userStore = useUserStore()

			const result = await useFetch("/api/site", {
				method: "POST",
				body: site,
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
	},
})
