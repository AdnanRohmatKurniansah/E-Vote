import { prisma } from "@/app/utils/prisma"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const user = await prisma.user.count()
        const candidate = await prisma.candidate.count()
        const election = await prisma.election.count()
        const winner = await prisma.winner.count()

        return NextResponse.json({
            message: 'Success call data',
            user: user,
            candidate: candidate,
            election: election,
            winner: winner
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