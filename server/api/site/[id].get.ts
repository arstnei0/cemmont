import { db } from "~~/server/db"

export default defineEventHandler(async (e) => {
	const { id } = e.context.params

    const result = await db.getSiteById(id)

    return result
})
