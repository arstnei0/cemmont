import { getServerSession } from "#auth"
import { EventHandlerResponse, H3Event, EventHandler } from "h3"
import { User } from "~~/prisma/client"
import { prisma } from "../db"

export const requireAuthWrap = (
	handler: (e: H3Event, user: User) => EventHandlerResponse<any>
): EventHandler => {
	return async (e) => {
		const session = await getServerSession(e)

		if (!session || !session.user) {
			e.node.res.statusCode = 401
			return ""
		}

		const user = session.user

		let dbUser = await prisma.user.findUnique({
			where: {
				email: user.email as string,
			},
		})

		if (!dbUser) {
			e.node.res.statusCode = 401
			return ""
		}

		// if (!dbUser) {
		// 	dbUser = await prisma.user.create({
		// 		data: {
		// 			email: user.email as string,
		// 			name: user.name as string,
		// 			...(user.image
		// 				? {
		// 						image: user.image,
		// 				  }
		// 				: {}),
		// 		},
		// 		select: {
		// 			name: true,
		// 			email: true,
		// 			image: true
		// 		}
		// 	})
		// }

		return await handler(e, dbUser)
	}
}
