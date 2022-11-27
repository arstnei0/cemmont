export interface Site {
	name: string
	owner: string
	id: string
}

export type User = {
    username: string
    email: string
}

export type UserSecret = User & {
    password: string
}