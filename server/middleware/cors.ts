import cors from "cors"

const instance = cors({})

export default defineEventHandler(async (e) => {
	instance(e.node.req, e.node.res, () => {})
})
