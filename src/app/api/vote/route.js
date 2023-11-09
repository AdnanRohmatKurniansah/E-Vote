import { prisma } from "@/app/utils/prisma"
import { validateVote } from "@/app/validations/voteValidation"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"

export const GET = async (req, res) => {
    const searchParams = req.nextUrl.searchParams   
    const electionId = searchParams.get('electionId') 
    const candidateId = searchParams.get('candidateId') 
    try {
        const response = await prisma.vote.count({
            where: {
                electionId: electionId,
                candidateId: candidateId
            }
        }) 
        return NextResponse.json({
            message: 'Successfully call vote count',
            data: response
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
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({
                message: 'You must be logged in to vote'
            }, {
                status: 403
            })
        } else {
            const { error, value } = validateVote(requestData)
        
            if (error) {
                return NextResponse.json({
                    message: error.details
                }, {
                    status: 422,
                })
            }

            const election = await prisma.election.findUnique({
                where: {
                    id: value.electionId
                }
            })

            const candidate = await prisma.candidate.findUnique({
                where: {
                    id: value.candidateId
                }
            })

            if (!election && !candidate) {
                return NextResponse.json({
                    message: 'User/Election/Candidate not found'
                }, {
                    status: 404
                })
            }

            const existingVote = await prisma.vote.findFirst({
                where: {
                    userId: session.user.id,
                    electionId: value.electionId,
                    candidateId: value.candidateId
                }
            })

            if (existingVote) {
                return NextResponse.json({
                    message: 'You have already voted for this candidate in this election'
                }, {
                    status: 400
                })
            }

            const response = await prisma.vote.create({
                data: {
                    userId: session.user.id,
                    electionId: value.electionId,
                    candidateId: value.candidateId
                }
            })

            return NextResponse.json({
                message: 'Successfully giving voice',
                data: response
            }, {
                status: 200
            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: error
        }, {
            status: 500
        })
    }
}