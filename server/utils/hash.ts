import { createHash } from "node:crypto"

export const hash = (data: string, algorithm = "sha256") => {
	const h = createHash(algorithm)
	h.update(data)
	return h.digest("hex")
}
