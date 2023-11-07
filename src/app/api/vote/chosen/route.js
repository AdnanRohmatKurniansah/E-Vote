import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { prisma } from "@/app/utils/prisma"

export const POST = async (req, res) => {
    const requestData = await req.json()
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({
                message: 'You must be logged in to vote'
            }, {
                status: 403
            })
        } else {
            const existingVote = await prisma.vote.findFirst({
                where: {
                    userId: session.user.id,
                    electionId: requestData.electionId,
                    candidateId: requestData.candidateId
                }
            })

            return NextResponse.json({
                message: 'You have already voted for this candidate in this election',
                choose: true
            }, {
                status: 200
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