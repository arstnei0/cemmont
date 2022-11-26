import { tokens } from "../cache"
import { db } from "../db"

export default defineEventHandler(async e => {
    return e.context.requireAuthorization() || {
        status: 200,
        body: await db.getUserByEmail(e.context.email)
    }
})