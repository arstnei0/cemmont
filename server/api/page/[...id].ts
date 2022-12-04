import { prisma } from "~~/server/db"
import { Comment } from "~~/composables/types"

export default defineEventHandler(async (e) => {
	const { id: _id } = e.context.params as { id: string }
	const [site, id] = _id.split("/")

	let page = await prisma.page.findUnique({
		where: {
			id,
		},
		include: {
			comments: {
				orderBy: {
					timeCreated: "desc",
				},
				include: {
					sender: true
				}
			},
		},
	})

	if (!page) {
		page = await prisma.page.create({
			data: {
				siteId: site,
				id,
			},
			include: {
				comments: {
					orderBy: {
						timeCreated: "desc",
					},
					include: {
						sender: true
					}
				},
			},
		})
	}

	return page
})
