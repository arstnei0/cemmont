import { H3Event } from "h3"
import { responseWithStatus } from "./responseWithStatus"

export const bodyRequire = async (
	e: H3Event,
	requires: string[]
): Promise<[any, any]> => {
	const body = await readBody(e)

	for (let require of requires) {
		if (!body[require]) {
			return [
				body,
				responseWithStatus(e, {
					status: 422,
					body: `${require} missing`,
				}),
			]
		}
	}

	return [body, null]
}
