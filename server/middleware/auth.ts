import { tokens } from "../cache"
import { db } from "../db"

export default defineEventHandler(async (e) => {
    const token = getCookie(e, 'token')
    
    if (token) {
        const email = await tokens.get(token)

        if (email) {
            e.context.authorized = true
            e.context.email = email
            e.context.getUser = async () => await db.getUserByEmail(email)
        } else {
            e.context.authorized = false
            setCookie(e, 'token', '')
        }
    } else {
        e.context.authorized = false
    }

    e.context.requireAuthorization = () => {
        if (!e.context.authorized) {
            return {
                status: 401,
                body: 'unauthorized'
            }
        }
    }
})
