import postgres from "postgres"
import { log } from "../composables/log"

const config = useRuntimeConfig()

const sql = postgres({
	...config.db,
	ssl: { rejectUnauthorized: false },
})

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
}

if (config.db.reset) reset()

const checkIfUserExists = async (user: { email: string }) => {
	return (
		await sql`
	SELECT * FROM Users WHERE email = ${user.email}
	`
	)[0]
}

const createUser = async (user: {
	username: string
	email: string
	password: string
}) => {
	const result = await sql`
	INSERT INTO Users ${sql(user, "username", "email", "password")} RETURNING *
	`

	return result[0]
}

export const db = {
	sql,
	reset,
	checkIfUserExists,
	createUser,
}
