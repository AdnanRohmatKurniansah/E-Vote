import { prisma } from "@/app/utils/prisma"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const response = await prisma.election.findFirst()

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