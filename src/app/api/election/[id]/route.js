import { prisma } from "@/app/utils/prisma"
import { validateElection } from "@/app/validations/electionValidation"
import { PrismaClientValidationError } from "@prisma/client/runtime/library"
import { NextResponse } from "next/server"

export const PUT = async (req) => {
    const url = new URL(req.url)

    const segments = url.pathname.split('/')
    const id = segments[segments.length - 1] || 0

    const requestData = await req.json()
    
    try {
        const { error, value } = validateElection(requestData) 

        if (error) {
            return NextResponse.json({
                message: error.details
            }, {
                status: 422,
            })
        }

        const election = await prisma.election.findFirst({
            where: {
                id: id
            }
        })

        if (!election) {
            return NextResponse.json({
                message: 'Election not found'
            }, {
                status: 404
            })
        }

        const response = await prisma.election.update({
            where: {
                id
            }, 
            data: value
        })

        return NextResponse.json({
            message: 'Successfully updated election',
            data: response
        }, {
            status: 200
        })
    } catch (error) {
        if (error instanceof PrismaClientValidationError) {
            console.error(error)
            return NextResponse.json({
                message: error
            }, {
                status: 500
            })
        }
    }
}

export const DELETE = async (req) => {
    const url = new URL(req.url)
    const segments = url.pathname.split('/')
    const id = segments[segments.length - 1] || 0

    try {
        const response = await prisma.election.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json({
            message: 'Successfully deleted election',
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