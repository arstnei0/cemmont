import { getServerSession } from "#auth"
import { prisma } from "~~/server/db"
import { bodyRequire } from "~~/server/utils/bodyRequire"
import { PageIdentification } from "~~/composables/types"
import { requireAuthWrap } from "~~/server/utils/auth"

export default defineEventHandler(requireAuthWrap(async (e, user) => {
	const [body, res] = await bodyRequire(e, ["name", "id"])
	if (res) return res

	const result = await prisma.site.create({
		data: {
			pageIdentification: PageIdentification.urlPath,
			reactionsEnabled: true,
			commentBoxAbove: true,
			id: body.id,
			name: body.name,
			ownerId: user.id
		},
	})

	return "sucess"
}))