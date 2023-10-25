import { prisma } from "@/app/utils/prisma"
import { validateElection } from "@/app/validations/electionValidation"
import { PrismaClientValidationError } from "@prisma/client/runtime/library"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const response = await prisma.election.findMany()

        return NextResponse.json({
            message: 'Success call elections data',
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

export const POST = async (req, res) => {
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
        
        const response = await prisma.election.create({
            data: value
        })

        return NextResponse.json({
            message: 'Successfully added new election',
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