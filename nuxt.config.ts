// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [],
	runtimeConfig: {
		db: {
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			database: process.env.DB_NAME,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			reset: process.env.DB_RESET === "true",
		},
	},
})
