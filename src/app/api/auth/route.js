import { NextResponse } from "next/server"
import { prisma } from "../../utils/prisma"

export const GET = async () => {
    try {
        const response = await prisma.user.findMany({
            where: {
                role: {
                    not: 'admin'
                }
            }
        })

        return NextResponse.json({
            message: 'Success call data',
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