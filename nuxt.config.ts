import { reset } from "./server/db/tables"

const ifResetDB = process.env.DB_RESET === "true"

export default defineNuxtConfig({
	modules: [],
	runtimeConfig: {
		db: {
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			database: process.env.DB_NAME,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			reset: ifResetDB,
			redis: process.env.DB_REDIS,
		},
	},
	css: ["vuetify/lib/styles/main.sass", "/styles/global.css"],
	build: {
		transpile: ["vuetify"],
	},
	vite: {
		define: {
			"process.env.DEBUG": false,
		},
	},
	ssr: false,
	hooks: {
		"build:done"() {
			if (ifResetDB) reset()
		},
	},
})
