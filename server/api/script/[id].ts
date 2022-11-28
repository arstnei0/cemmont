import { baseUrl } from "~~/composables/baseUrl"
import { db } from "~~/server/db"

let code = ``

const config = useRuntimeConfig()

code += `const s=document.getElementById('cemmont-script');`
// code += `const p=s.parentElement;`
code += `const f=document.createElement('iframe');`
code += `f.src="${baseUrl}iframe/<<ID>>";`
code += `f.id='cemmont-iframe';`
code += `f.style.width = '100%';f.frameBorder = '0';f.scrolling = 'no';`
code += `s.insertAdjacentElement('afterend', f);`
code += `console.log(f);`

export default defineEventHandler(async (e) => {
	const { id } = e.context.params

    return code.replaceAll('<<ID>>', id)
})
