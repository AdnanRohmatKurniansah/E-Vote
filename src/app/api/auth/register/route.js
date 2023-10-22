import { prisma } from "@/app/libs/prisma"
import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { validateRegister } from "@/app/validations/authValidation"

export const POST = async (req, res) => {
    try {
        const requestData = await req.json()

        const { error, value } = validateRegister(requestData)

        if (error) {
            return NextResponse.json({
                message: error.details
            }, {
                status: 422,
            })
        }

        const existUser = await prisma.user.findFirst({
            where: {
                username: value.username
            }
        })

        if (existUser) {
            return NextResponse.json({
                message: 'User Already Exist'
            }, {
                status: 409
            })
        }

        const hashedPassword = await hash(value.password, 10)

        value.password = hashedPassword

        const response = await prisma.user.create({
            data: value
        })

        return NextResponse.json({
            message: 'Successfully added new user',
            data: response
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 500
        })
    }
}