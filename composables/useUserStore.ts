import { defineStore } from "pinia"

export interface UserStore {
	loggedIn: boolean
	user?: User
}

export interface User {
	username: string
	email: string
}

export enum UserLoginResult {
	Exists,
	Success,
	ServerError,
	Unknown,
	Missing,
}

export const useUserStore = defineStore("user", {
	state: () =>
		({
			loggedIn: false,
			user: undefined,
		} as UserStore),
	actions: {
		async login(props: {
			username: string
			email: string
			password: string
		}) {
			const result = await useFetch("/api/register", {
				method: "POST",
				body: JSON.stringify({
					...props,
				}),
			})

			const status = (result.data.value as any).status
			if (status === 409) {
				return UserLoginResult.Exists
			} else if (status === 500) {
				return UserLoginResult.ServerError
			} else if (status === 422) {
				return UserLoginResult.Missing
			} else if (status === 200) {
				this.user = {
					...(result.data.value as any).body,
				}
				this.loggedIn = true

				return UserLoginResult.Success
			} else {
				return UserLoginResult.Unknown
			}
		},
	},
})
