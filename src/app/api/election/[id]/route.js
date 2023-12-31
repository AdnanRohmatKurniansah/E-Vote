import { prisma } from "@/app/utils/prisma"
import { validateElection } from "@/app/validations/electionValidation"
import { NextResponse } from "next/server"

export const GET = async (req, {params}) => {
    const id = params.id
    try {
        const election = await prisma.election.findUnique({
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

        return NextResponse.json({
            message: 'Detail election',
            data: election
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