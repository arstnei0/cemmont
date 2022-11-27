import { tokens } from "../cache"
import { db } from "../db"
import { responseWithStatus } from "../utils/responseWithStatus"

export default defineEventHandler(async (e) => {
	const token = getCookie(e, "token")

	if (token) {
		const email = await tokens.get(token)

		if (email) {
			e.context.authorized = true
			e.context.email = email
		} else {
			e.context.authorized = false
			setCookie(e, "token", "")
		}
	} else {
		e.context.authorized = false
	}

	e.context.requireAuthorization = () => {
		if (!e.context.authorized) {
			return responseWithStatus(e, {
				status: 401,
				body: "unauthorized",
			})
		}
	}
})
