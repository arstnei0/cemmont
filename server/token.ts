import { tokens } from "./cache"
import { hash } from "./hash"

export const generateToken = async (identifier: string, ttl = 86400000) => {
    const hashed = hash(identifier)

    tokens.set(hashed, identifier, ttl)

    return hashed
}