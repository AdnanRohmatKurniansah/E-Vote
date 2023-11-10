import { prisma } from "@/app/utils/prisma"
import { NextResponse } from "next/server"

export const GET = async (req, {params}) => {
    const electionId = params.electionId
    try {
      const response = await prisma.winner.findFirst({
        where: {
            electionId: electionId
        }
      })
  
      return NextResponse.json({
        message: 'Winners election',
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