import { tokens } from "../cache"
import { db } from "../db"

export default defineEventHandler(async e => {
    if (e.context.authorized) {
        return e.context.getUser()
    }
})