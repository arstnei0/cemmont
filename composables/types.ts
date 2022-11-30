export interface Site {
	name: string
	owner: string
	id: string
	page_identification: PageIdentification
	reactions_enabled: boolean
	comment_box_above: boolean
}

export enum PageIdentification {
	urlPath = "urlPath",
	fullUrl = "fullUrl",
	pageTitleHtmlTag = "pageTitleHtmlTag",
	pageTitleMetaOg = "pageTitleMetaOg",
}

export type User = {
	username: string
	email: string
}

export type UserSecret = User & {
	password: string
}

export interface Page {
	site: string
	id: string
}

export interface MyComment {
	sender_name?: string
	sender_email?: string
	page: string
	id: number
	content: string
}
