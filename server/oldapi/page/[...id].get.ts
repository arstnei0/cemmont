import { db } from "~~/server/db"

export default defineEventHandler(async (e) => {
	const { id: _id } = e.context.params as { id: string }
	const [site, id] = _id.split("/")
	let page = await db.getPageById(id)

	if (page.count === 0) {
		page = await db.createPage({
			id,
			site,
		})
	}

	const comments = await db.getCommentsByPage(id)

	const result = {
		comments,
	}

	return result
})
