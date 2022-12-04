import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import DiscordProvider from 'next-auth/providers/discord'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from '~~/server/db'

export default NuxtAuthHandler({
    adapter: PrismaAdapter(prisma),
    providers: [
        (GithubProvider as any as { default: typeof GithubProvider }).default({
            clientId: import.meta.env.GITHUB_CLIENT_ID as string,
            clientSecret: import.meta.env.GITHUB_CLIENT_SECRET as string,
        }),
        (DiscordProvider as any as { default: typeof GithubProvider }).default({
            clientId: import.meta.env.DISCORD_CLIENT_ID as string,
            clientSecret: import.meta.env.DISCORD_CLIENT_SECRET as string,
        }),
        (GoogleProvider as any as { default: typeof GithubProvider }).default({
            clientId: import.meta.env.GOOGLE_CLIENT_ID as string,
            clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    secret: import.meta.env.SECRET as string,
    pages: {
        signIn: '/auth/login',
    },
})