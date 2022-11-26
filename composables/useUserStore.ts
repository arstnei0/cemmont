import { defineStore } from "pinia"

export interface UserStore {
	loggedIn: boolean
	user?: User
}

export interface User {
	username: string
	email: string
}

export enum UserRegisterResult {
	Exists,
	Success,
	ServerError,
	Unknown,
	Missing,
}

export enum UserLoginResult {
	Success,
	Missing,
	Wrong,
	Unknown,
}

export const useUserStore = defineStore("user", {
	state: () =>
		({
			loggedIn: false,
			user: undefined,
		} as UserStore),
	actions: {
		async register(user: {
			username: string
			email: string
			password: string
		}) {
			const result = await useFetch("/api/register", {
				method: "POST",
				body: user,
			})

			const status = (result.data.value as any).status
			if (status === 409) {
				return UserRegisterResult.Exists
			} else if (status === 500) {
				return UserRegisterResult.ServerError
			} else if (status === 422) {
				return UserRegisterResult.Missing
			} else if (status === 200) {
				return UserRegisterResult.Success
			} else {
				return UserRegisterResult.Unknown
			}
		},
		async login(user: { usernameOrEmail?: string; password: string }) {
			if (!user.usernameOrEmail || !user.password) {
				return UserLoginResult.Missing
			}

			const result = await useFetch("api/login", {
				method: "POST",
				body: user,
			})

			const data = result.data.value as any
			if (data.status === 200) {
				this.user = {
					...(result.data.value as any).body,
				}
				this.loggedIn = true

				return UserLoginResult.Success
			} else if (data.status === 400) {
				return UserLoginResult.Wrong
			} else {
				return UserLoginResult.Unknown
			}
		},
	},
})
