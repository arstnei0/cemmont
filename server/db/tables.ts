import { sql } from "./index"

export const reset = async () => {
	console.log("Reseting tables:")

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
	console.log(`Table Users reset.`)

	await sql`
	DROP TABLE IF EXISTS Sites
	`
	await sql`
	DROP TYPE IF EXISTS page_identification
	`
	await sql`
	CREATE TYPE page_identification AS ENUM (
		'urlPath',
		'fullUrl',
		'pageTitleHtmlTag',
		'pageTitleMetaOg'
	)
	`
	await sql`
	CREATE TABLE Sites (
		owner TEXT NOT NULL,
		name TEXT NOT NULL,
		id VARCHAR(50) PRIMARY KEY NOT NULL,
		page_identification PAGE_IDENTIFICATION NOT NULL,
		reactions_enabled BOOLEAN NOT NULL,
		comment_box_above BOOLEAN NOT NULL
	)
	`

	console.log(`Table Sites reset.`)
}
