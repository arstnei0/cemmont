import { baseUrl } from "~~/composables/baseUrl"
import { db } from "~~/server/db"

let code = ``

const config = useRuntimeConfig()

code += `const s=document.getElementById('cemmont-script');`
// code += `const p=s.parentElement;`
code += `let f=document.createElement('iframe');`
code += `f.src="${baseUrl}iframe/<<ID>>";`
code += `f.id='cemmont-iframe';`
code += `f.style.width='100%';f.frameBorder = '0';f.scrolling = 'no';`
code += `s.insertAdjacentElement('afterend', f);`
code += `f=window.frames['cemmont-iframe'];`
code += `f.height=f.contentWindow.document.body.scrollHeight;`
code += `window.addEventListener("message",(e)=>{if(e.data='resize iframe'){f.height=f.contentWindow.document.body.scrollHeight;}});`

export default defineEventHandler(async (e) => {
	const { id } = e.context.params

	return code.replaceAll("<<ID>>", id)
})
