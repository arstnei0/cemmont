import { H3Event } from 'h3'

export const responseWithStatus = (event: H3Event, res: {
    status: number
    statusText?: string
    body: any
}) => {
    event.node.res.statusCode = res.status
    if (res.statusText) event.node.res.statusMessage = res.statusText
    return res.body
}