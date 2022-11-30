import postgres from "postgres"
import { MyComment, Page, Site, UserSecret } from "~~/composables/types"
import { log } from "../../composables/log"
import { reset } from "./tables"

const config = useRuntimeConfig()

export const sql = postgres({
	...config.db,
	ssl: { rejectUnauthorized: false },
} as any)

if (config.db.reset) reset()

const checkIfUserExists = async (user: { email: string }) => {
	return (
		(
			await sql`
	SELECT * FROM Users WHERE email = ${user.email}
	`
		).count > 0
	)
}

const createUser = async (user: {
	username: string
	email: string
	password: string
}): Promise<UserSecret> => {
	const result = (
		await sql`
	INSERT INTO Users ${sql(user, "username", "email", "password")} RETURNING *
	`
	)[0]

	return result as UserSecret
}

const loginUser = async (user: {
	usernameOrEmail: string
	password: string
}): Promise<boolean> => {
	const result = await sql`
	SELECT *
	FROM Users
	WHERE ((username = ${user.usernameOrEmail} OR email = ${user.usernameOrEmail}) AND password = ${user.password})
	`

	return result.count === 1
}

const getEmail = async (usernameOrEmail: string): Promise<string> =>
	(
		await sql`SELECT email
	FROM Users
	WHERE (username = ${usernameOrEmail} OR email = ${usernameOrEmail})`
	)[0]?.email

const getUserByEmail = async (email: string): Promise<UserSecret> =>
	(await sql`SELECT * FROM Users WHERE email = ${email}`)[0] as UserSecret

const createSite = async (site: Site) => {
	return await sql`
	INSERT INTO Sites ${sql(site)}
	`
}

const getSitesByOwner = async (owner: string): Promise<Site[]> => {
	return await sql`
	SELECT * FROM Sites WHERE owner = ${owner}
	`
}

const getSiteById = async (id: string) => {
	return (await sql`SELECT * FROM Sites WHERE id = ${id}`)[0]
}

const updateSiteById = async (id: string, updates: any) => {
	return await sql`UPDATE Sites
	SET ${sql(
		updates,
		"page_identification",
		"reactions_enabled",
		"comment_box_above"
	)}
	WHERE id = ${id}
	`
}

const getPageById = async (id: string) => {
	return await sql`SELECT * FROM Pages WHERE id = ${id}`
}

const createPage = async (page: Page) => {
	return await sql`INSERT INTO Pages ${sql(page, "site", "id")} RETURNING *`
}

const getCommentsByPage = async (page: string) => {
	return await sql`
	SELECT * FROM Comments WHERE page = ${page}
	`
}

const createComment = async (comment: any) => {
	return await sql`
	INSERT INTO Comments ${sql(
		comment,
		"sender_name",
		"sender_email",
		"page",
		"content"
	)}
	`
}

export const db = {
	sql,
	reset,
	checkIfUserExists,
	createUser,
	loginUser,
	getEmail,
	createSite,
	getUserByEmail,
	getSitesByOwner,
	getSiteById,
	updateSiteById,
	getPageById,
	createPage,
	getCommentsByPage,
	createComment,
}
