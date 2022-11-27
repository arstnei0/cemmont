import { tokens } from "../cache"

export default defineEventHandler(async (e) => {
    const _ = e.context.requireAuthorization(e)
    if (_) return _
    
    const token = getCookie(e, 'token') as string
    setCookie(e, 'token', '')
    tokens.delete(token)

    return 'logout successfully'
})