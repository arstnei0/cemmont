import Keyv from "keyv"
import '@keyv/redis'

const config = useRuntimeConfig()
const tokensConfig = {
	namespace: import.meta.env.NODE_ENV === 'development' ? 'Dtokens' : 'tokens'
}

export const tokens = config.db.redis ? new Keyv(config.db.redis, tokensConfig) : new Keyv(tokensConfig)

if (config.db.reset) {
	tokens.clear()
}