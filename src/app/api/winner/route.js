import { prisma } from "@/app/utils/prisma"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
      const response = await prisma.winner.findMany()
  
      return NextResponse.json({
        message: 'Successfully call winners data',
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