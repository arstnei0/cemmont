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
		const token = useCookie('token').value

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
				this.authorized = true

				return UserLoginResult.Success
			} else if (data.status === 400) {
				return UserLoginResult.Wrong
			} else {
				return UserLoginResult.Unknown
			}
		},
		async getUser() {
			const result = (await useFetch('/api/user')).data.value as any
			if (result?.status === 200) {
				return result?.body
			} else {
				return
			}
		}
	},
})
