import NextAuth from "next-auth"
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/app/utils/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: 'jwt'
    }, 
    pages: {
      signIn: '/pages/login'
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              username: { label: "Username", type: "text" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              if (!credentials.username || !credentials.password) {
                return null
              }

              const existUser = await prisma.user.findFirst({
                where: {
                  username: credentials.username
                }
              })

              if (!existUser) {
                return null
              }

              const passwordMatch = await compare(credentials.password, existUser.password)

              if (!passwordMatch) {
                return null
              }

              return {
                id: existUser.id,
                name: existUser.name,
                username: existUser.username,
                dateBirth: existUser.dateBirth,
                address: existUser.address,
                role: existUser.role
              }
            }
        })
    ], 
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id
          token.username = user.username
          token.role = user.role
        }
        return token;
      },
      async session({ session, token }) {
        if (token) {
          session.user.id = token.id
          session.user.username = token.username
          session.user.role = token.role
        }
        return session;
      }
    }
    
} 

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }