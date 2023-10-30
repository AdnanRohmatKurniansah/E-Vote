import { prisma } from "@/app/utils/prisma"
import { validateUpdate } from "@/app/validations/authValidation"
import { NextResponse } from "next/server"

export const GET = async (req, {params}) => {
    const id = params.id

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!user) {
            return NextResponse.json({
                message: 'Election not found'
            }, {
                status: 404
            })
        }

        return NextResponse.json({
            message: 'Detail user',
            data: user
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

export const PUT = async (req, {params}) => {
    const id = params.id
    const requestData = await req.json()

    try {
        const { error, value } = validateUpdate(requestData)

        if (error) {
            return NextResponse.json({
                message: error.details
            }, {
                status: 422
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!user) {
            return NextResponse.json({
                message: 'User not found',
                data: response
            }, {
                status: 404
            })
        }

        const response = await prisma.user.update({
            where: {
                id: id
            }, 
            data: value
        })

        return NextResponse.json({
            message: 'Successfully updated user',
            data: response
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

export const DELETE = async (req, {params}) => {
    const id = params.id

    try {
        const response = await prisma.user.delete({
            where: {
                id: id
            }
        })
        
        return NextResponse.json({
            message: 'Successfully deleted user',
            data: response
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