import { db } from "~~/server/db"
import { bodyRequire } from "~~/server/utils/bodyRequire"

export default defineEventHandler(async (e) => {
	const { id } = e.context.params

	const _ = e.context.requireAuthorization(e)
	if (_) return _

	const [body, res] = await bodyRequire(e, [
		"comment_box_above",
		"reactions_enabled",
		"id",
		"page_identification",
	])
	if (res) return res

	const result = await db.updateSiteById(id, body)
})
