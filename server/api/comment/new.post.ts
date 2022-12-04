import { prisma } from "~~/server/db"
import { requireAuthWrap } from "~~/server/utils/auth"
import { bodyRequire } from "~~/server/utils/bodyRequire"

export default defineEventHandler(requireAuthWrap(async (e, user) => {
    const [body, res] = await bodyRequire(e, ['page', 'content'])
    if (res) return res

    const result = await prisma.comment.create({
        data: {
            pageId: body.page as string,
            content: body.content,
            senderId: user.id,
            timeCreated: new Date()
        },
    })

    return 'success'
}))