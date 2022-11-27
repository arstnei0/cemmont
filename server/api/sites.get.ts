import { db } from "../db"
import { bodyRequire } from "../utils/bodyRequire"

export default defineEventHandler(async (e) => {
	const _ = e.context.requireAuthorization(e)
	if (_) return _

	const result = await db.getSitesByOwner(e.context.email)

	return result
})
