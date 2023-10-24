import { createSecretToken } from "@/app/utils/jwtToken"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { verify } from 'jsonwebtoken'
import { prisma } from "@/app/utils/prisma"


export const GET = async () => {
    const cookieStore = cookies()

    const refreshToken = cookieStore.get('refreshToken')
    try {

        if (!refreshToken) {
            return NextResponse.json({
                message: 'Access denied, no token provided'
            }, {
                status: 403
            })
        }

        const refreshTokenSplit = refreshToken.value.split(' ')[1]

        const decoded = verify(refreshTokenSplit, process.env.JWT_REFRESH)

        const user = await prisma.user.findFirst({
            where: {
                username: decoded.username
            }
        })

        if (!user) {
            return NextResponse.json({
                message: 'User not found'
            })
        }

        const accessToken = createSecretToken(user.id, user.username, user.role) 

        cookieStore.set('accessToken', `Bearer ${accessToken}`, {
            httpOnly: true
        })

        return NextResponse.json({
            message: 'Refresh token successfully',
            accessToken: `Bearer ${accessToken}`
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: error
        }, {
            status: 500
        })
    }
}