import { createRefreshToken, createSecretToken } from "@/app/utils/jwtToken"
import { validateLogin } from "@/app/validations/authValidation"
import { compare } from "bcrypt"
import { NextResponse } from "next/server"
import { cookies } from 'next/headers'
import { prisma } from "@/app/utils/prisma"

export const POST = async (req, res) => {
    const cookieStore = cookies()

    const requestData = await req.json()
    try {

        const { error, value } = validateLogin(requestData)

        if (error) {
            return NextResponse.json({
                message: error.details
            }, {
                status: 422
            })
        }

        const user = await prisma.user.findFirst({
            where: {
                username: value.username
            }
        })

        if (!user) {
            return NextResponse.json({
                message: 'User not found'
            })
        }

        const auth = await compare(value.password, user.password)
        if (auth) {
            const accessToken = createSecretToken(user.id, user.username, user.role)
            const refreshToken = createRefreshToken(user.id, user.username, user.role)

            cookieStore.set('accessToken', `Bearer ${accessToken}`, {
                httpOnly: true
            })

            cookieStore.set('refreshToken', `Bearer ${refreshToken}`, {
                httpOnly: true
            })
            
            return NextResponse.json({
                message: 'Login successfully',
                accessToken: `Bearer ${accessToken}`,
                refreshToken: `Bearer ${refreshToken}`
            }, {
                status: 200
            })
        } else {
            return NextResponse.json({
                message: 'Invalid credentials'
            }, {
                status: 401
            })
        }
    } catch (error) {
        return NextResponse.json({
            message: error
        }, {
            status: 500
        })
    }
}