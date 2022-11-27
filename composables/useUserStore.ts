import { defineStore } from "pinia"
import { goToLogin } from "./goToLogin"

export interface UserStore {
	authorized: boolean
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
	state: () => {
		let authorized = false
		const token = useCookie("token").value

		if (token) {
			authorized = true
		}

		return {
			token,
			authorized,
		}
	},
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

			if (result.error.value) {
				const status = result.error.value.status
				if (status === 409) {
					return UserRegisterResult.Exists
				} else if (status === 500) {
					return UserRegisterResult.ServerError
				} else if (status === 422) {
					return UserRegisterResult.Missing
				} else {
					return UserRegisterResult.Unknown
				}
			} else {
				return UserRegisterResult.Success
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

			if (result.error.value) {
				const status = result.error.value.status
				if (status === 400) {
					return UserLoginResult.Wrong
				} else {
					return UserLoginResult.Unknown
				}
			} else {
				this.authorized = true

				return UserLoginResult.Success
			}
		},
	},
	getters: {
		async user() {
			if (this.authorized) {
				const result = await useFetch("/api/user")
				if (!result.error.value) {
					return result.data.value
				} else {
					return
				}
			} else {
				return
			}
		}
	}
})