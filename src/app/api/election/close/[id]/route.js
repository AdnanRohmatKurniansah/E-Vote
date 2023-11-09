import { prisma } from "@/app/utils/prisma"
import { NextResponse } from "next/server"

export const PUT = async (req, {params}) => {
    const id = params.id
    try {
        await prisma.election.update({
            where: {
                id: id
            }, 
            data: {
                status: 'finished'
            }
        })

        const finishedElectionCandidates = await prisma.candidate.findMany({
            where: {
                electionId: id
            }
        })

        const candidateVotesPromises = finishedElectionCandidates.map(async (candidate) => {
            const voteCount = await prisma.vote.count({
                where: {
                    electionId: id,
                    candidateId: candidate.id
                }
            })

            return {
                candidateId: candidate.id,
                voteCount: voteCount
            }
        })

        const candidateVotes = await Promise.all(candidateVotesPromises);

        const winnerCandidate = candidateVotes.reduce((max, candidate) => 
        candidate.voteCount > max.voteCount ? candidate : max
        );

        const winner = await prisma.winner.create({
            data: {
                candidateId: winnerCandidate.candidateId,
                electionId: id
            }
        })

        return NextResponse.json({
            message: "Election closed successfully and winner created.",
            data: winner
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: error
        }, {
            status: 500
        })
    }
}
