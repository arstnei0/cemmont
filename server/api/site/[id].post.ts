import { prisma } from "~~/server/db"
import { requireAuthWrap } from "~~/server/utils/auth"

export default defineEventHandler(requireAuthWrap(async (e, user) => {
    const body = await readBody(e)
	const id = e.context.params.id
	const site = await prisma.site.findUnique({
		where: {
			id,
		}
	})

	if (user.id !== site?.ownerId) {
		e.node.res.statusCode = 401

		return 'no permission'
	}

	const result = await prisma.site.update({
		where: {
			id,
		},
        data: {
            ...body
        },
	})

	return result
}))
