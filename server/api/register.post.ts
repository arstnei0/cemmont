import { db } from "~~/server/db"
import { responseWithStatus } from "../utils/responseWithStatus"

export default defineEventHandler(async (e) => {
	const body = await readBody(e)

	if (!body.username || !body.password || !body.email) {
		const message = "username, password or email missing"
		return responseWithStatus(e, {
			status: 422,
			statusText: message,
			body: message,
		})
	}

	if (
		await db.checkIfUserExists({
			email: body.email,
		})
	) {
		const message = "user already exists"
		return responseWithStatus(e, {
			status: 409,
			body: message,
		})
	}

	try {
		const result = await db.createUser(body)

		return responseWithStatus(e, {
			status: 200,
			body: result,
		})
	} catch (err) {
		const message = "server error"
		return responseWithStatus(e, {
			status: 500,
			body: message,
		})
	}
})
