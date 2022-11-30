import { tokens } from "../../cache"
import { db } from "../../db"
import { responseWithStatus } from "../../utils/responseWithStatus"

export default defineEventHandler(async (e) => {
	return (
		e.context.requireAuthorization() ||
		responseWithStatus(e, {
			status: 200,
			body: {
				...(await db.getUserByEmail(e.context.email)),
				password: undefined,
			},
		})
	)
})
