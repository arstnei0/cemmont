import { prisma } from "../db"
import { requireAuthWrap } from "../utils/auth"

export default defineEventHandler(requireAuthWrap(async (e, user) => {
    const result = await prisma.site.findMany({
        where: {
            ownerId: user.id
        }
    })

    return result
}))