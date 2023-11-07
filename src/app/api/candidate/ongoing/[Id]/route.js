import { prisma } from "@/app/utils/prisma"
import { NextResponse } from "next/server"

export const GET = async (req, {params}) => {
    const electionId = params.electionId
    try {
        const response = await prisma.candidate.findMany({
            where: {
                electionId: electionId
            }
        })

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