import { db } from "~~/server/db"
import { bodyRequire } from "~~/server/utils/bodyRequire"

export default defineEventHandler(async (e) => {
	const _ = e.context.requireAuthorization(e)
	if (_) return _

	const [body, res] = await bodyRequire(e, ["page", "content"])
	if (res) return res

	const comment = {
		sender_email: e.context.email,
		sender_name: (await db.getUserByEmail(e.context.email)).username,
		page: body.page,
		content: body.content,
	}

	const result = await db.createComment(comment)

	return "success"
})
