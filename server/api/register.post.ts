import { db } from "~~/server/db"

export default defineEventHandler(async (e) => {
	const body = await readBody(e)

	if (!body.username || !body.password || !body.email) {
		const message = "username, password or email missing"
		return {
			status: 422,
			body: message,
		}
	}

	if (
		!(await db.checkIfUserExists({
			email: body.email,
		}))
	) {
		try {
			const result = await db.createUser(body)

			return {
				status: 200,
				body: result,
			}
		} catch (e) {
			const message = "server error"
			return {
				status: 500,
				body: message,
			}
		}
	} else {
		const message = "user already exists"
		return {
			status: 409,
			body: message,
		}
	}
})
