import { db } from "~~/server/db"
import { tokens } from "../cache"
import { generateToken } from "../token"

export default defineEventHandler(async (e) => {
	const body = await readBody(e)
	const success = await db.loginUser(body)

	if (success) {
		setCookie(e, 'token', await generateToken(await db.getEmail(body.usernameOrEmail)), {
			maxAge: 86400000
		})
		
		return {
			status: 200,
			body: "login successfully",
		}
	} else {
		return {
			status: 400,
			body: "username(or email) or password wrong",
		}
	}

	return {
		status: 500,
		body: 'unknown error'
	}
})
