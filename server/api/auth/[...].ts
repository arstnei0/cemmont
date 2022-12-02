import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import DiscordProvider from 'next-auth/providers/discord'

export default NuxtAuthHandler({
    providers: [
        (GithubProvider as any as { default: typeof GithubProvider }).default({
            clientId: import.meta.env.GITHUB_CLIENT_ID as string,
            clientSecret: import.meta.env.GITHUB_CLIENT_SECRET as string,
        }),
        (DiscordProvider as any as { default: typeof GithubProvider }).default({
            clientId: import.meta.env.DISCORD_CLIENT_ID as string,
            clientSecret: import.meta.env.DISCORD_CLIENT_SECRET as string,
        }),
    ],
    secret: import.meta.env.SECRET as string
})