import { prisma } from '@/app/utils/prisma'
import { uploadImage } from '@/app/utils/uploadImg'
import { validateCandidate } from '@/app/validations/candidateValidation'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const response = await prisma.candidate.findMany()

    return NextResponse.json({
      message: 'Successfully call candidates data',
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

export const POST = async (req) => {
  const formData = await req.formData()
  const foto = formData.get('foto') 
  const requestData = {
    name: formData.get('name'), 
    description: formData.get('description'), 
    electionId: formData.get('electionId') 
  }

  try {
    const { error, value } = validateCandidate(requestData)

    if (error) {
      return NextResponse.json({
        message: error.details
      }, {
        status: 422
      })
    }

    if (foto) {
      const destinationFolder = 'public/candidate'
      const filePath = await uploadImage(foto, destinationFolder)

      value.foto = filePath
    } else {
      console.error('No file uploaded');
    }

    const response = await prisma.candidate.create({
      data: value
    })

    return NextResponse.json({
      message: 'Successfully added new election',
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
