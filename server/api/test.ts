import { responseWithStatus } from "../utils/responseWithStatus"

export default defineEventHandler((e) => {
	return responseWithStatus(e, {
		status: 407,
		statusText: "eee",
		body: "aslkkn",
	})
})
