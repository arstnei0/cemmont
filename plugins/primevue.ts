import PrimeVue from 'primevue/config'
import Ripple from 'primevue/ripple';


export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true })
})