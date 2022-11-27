import Keyv from "keyv"

const config = useRuntimeConfig()
export const tokens = config.db.redis ? new Keyv(config.db.redis): new Keyv()