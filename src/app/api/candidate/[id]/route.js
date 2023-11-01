import { prisma } from "@/app/utils/prisma"
import { uploadImage } from "@/app/utils/uploadImg"
import { validateCandidate } from "@/app/validations/candidateValidation"
import { unlink } from "fs/promises"
import { NextResponse } from "next/server"

export const GET = async (req, {params}) => {
    const id = params.id
    try {
        const candidate = await prisma.candidate.findUnique({
            where: {
                id: id
            }
        })

        if (!candidate) {
            return NextResponse.json({
                message: 'Candidate not found'
            }, {
                status: 404
            })
        }

        return NextResponse.json({
            message: 'Detail candidate',
            data: candidate
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

export const PUT = async (req, { params }) => {
    const formData = await req.formData()
    const foto = formData.get('foto') 
    const requestData = {
      name: formData.get('name'), 
      description: formData.get('description'), 
      electionId: formData.get('electionId') 
    }
    const id = params.id

    try {
        const { error, value } = validateCandidate(requestData)

        if (error) {
            return NextResponse.json({
                message: error.details
            }, {
                status: 422
            })
        }

        const candidate = await prisma.candidate.findFirst({
            where: {
                id: id
            }
        })

        if (!candidate) {
            return NextResponse.json({
                message: 'Election not found'
            }, {
                status: 404
            })
        }

        if (foto) {
            const destinationFolder = 'public/candidate'
            if (candidate.foto) {
                await unlink(`public/${candidate.foto}`);
            }
            const filePath = await uploadImage(foto, destinationFolder)
        
            value.foto = filePath
        }

        const response = await prisma.candidate.update({
            where: {
                id
            }, 
            data: value
        })

        return NextResponse.json({
            message: 'Successfully updated candidate',
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

export const DELETE = async (req, {params}) => {
    const id = params.id

    try {
        const candidate = await prisma.candidate.findFirst({
            where: {
                id: id
            }
        })

        if (candidate.foto) {
            await unlink(`public/${candidate.foto}`)
        }

        const response = await prisma.candidate.delete({
            where: {
                id: id
            }
        })
        
        return NextResponse.json({
            message: 'Successfully deleted candidate',
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