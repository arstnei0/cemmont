export default defineNuxtConfig({
	modules: [
		'@sidebase/nuxt-auth',
		"@pinia/nuxt",
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
	css: [
		'~~/styles/primevue-theme.css',
		'primevue/resources/primevue.css',
		'primeicons/primeicons.css',
		'primeflex/primeflex.css',
		'~~/styles/global.css'
	],
	build: {
		transpile: ["primevue"],
	},
	vite: {
		define: {
			"process.env.DEBUG": false,
		},
	},
	ssr: false,
	auth: {
		origin: process.env['NODE_ENV'] === 'development' ? 'http://localhost:3000/' : 'https://cemmont.zihan.ga/'
	}
})
