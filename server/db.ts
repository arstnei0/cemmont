import postgres from "postgres"
import { Site, UserSecret } from "~~/composables/types"
import { log } from "../composables/log"

const config = useRuntimeConfig()

const sql = postgres({
	...config.db,
	ssl: { rejectUnauthorized: false },
} as any)

const reset = async () => {
	log("Reseting tables:")

	await sql`
	DROP TABLE IF EXISTS Users
	`
	await sql`
	CREATE TABLE Users (
		username TEXT NOT NULL,
		email TEXT PRIMARY KEY NOT NULL,
		password TEXT NOT NULL
	)
	`
	log(`Table Users reset.`)

	await sql`
	DROP TABLE IF EXISTS Sites
	`
	await sql`
	CREATE TABLE Sites (
		owner TEXT NOT NULL,
		name TEXT NOT NULL,
		id VARCHAR(50) PRIMARY KEY NOT NULL
	)
	`

	log(`Table Sites reset.`)
}

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
}
