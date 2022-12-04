import { H3Event } from "h3"

export const bodyRequire = async (
	e: H3Event,
	requires: string[]
): Promise<[any, any]> => {
	const body = await readBody(e)

	for (let require of requires) {
		if (body[require] === undefined && body[require] === null) {
			e.node.res.statusCode = 422
			return [
				body,
				`${require} missing`
			]
		}
	}

	return [body, null]
}
