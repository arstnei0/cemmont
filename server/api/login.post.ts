import { db } from "~~/server/db"

export default defineEventHandler(async (e) => {
	console.log(
		await db.sql`
    select * from users
    `
	)
})
