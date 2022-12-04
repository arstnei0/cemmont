import {prisma} from '~~/server/db'

export default defineEventHandler(async (e) => {
    const id = e.context.params.id
    const result = prisma.site.findUnique({
        where: {
            id,
        }
    })

    return result
})