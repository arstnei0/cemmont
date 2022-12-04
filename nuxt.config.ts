export default defineNuxtConfig({
	modules: ["@sidebase/nuxt-auth", "@pinia/nuxt"],
	css: [
		"~~/styles/primevue-theme.css",
		"primevue/resources/primevue.css",
		"primeicons/primeicons.css",
		"primeflex/primeflex.css",
		"~~/styles/global.css",
	],
	build: {
		transpile: ["primevue"],
	},
	vite: {},
	auth: {
		origin:
			process.env["NODE_ENV"] === "development"
				? "http://localhost:3000/"
				: "https://cemmont.zihan.ga/",
	},
})
