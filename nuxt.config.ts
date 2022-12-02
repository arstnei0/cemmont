export default defineNuxtConfig({
	modules: [
		"@pinia/nuxt",
		'@sidebase/nuxt-auth',
	],
	runtimeConfig: {
		db: {
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			database: process.env.DB_NAME,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
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
	auth: {
		
	}
})
