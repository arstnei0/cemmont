import { createPinia } from "pinia"

const nuxtApp = useNuxtApp()
const vueApp = nuxtApp.vueApp

// use pinia
const pinia = createPinia()
vueApp.use(pinia)

const userStore = useUserStore()

useRouter()?.afterEach(async () => {
	userStore.$reset()
})
