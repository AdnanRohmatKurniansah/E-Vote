'use client'

import AdminLayout from '@/app/components/dashboard/layout'
import { Button, FormControl, FormLabel, Input, Select, Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { addElection } from '@/app/libs/api'
import { alert } from '@/app/components/Toast'
import { useRouter } from 'next/navigation'

const Create = () => {
  const { register, handleSubmit } = useForm()
  const [ isLoading, setIsLoading ] = useState(false)
  const router = useRouter()

  const addHandle = async (data) => {
    setIsLoading(true)

    const response = await addElection(data)
    if (!response.data) {
      setIsLoading(false)
      alert(response.response.data.message[0].message, 'error')
    } else {
      setIsLoading(false)
      router.push('/pages/dashboard/election')
      alert(response.data.message, 'success')
    }
  }

  return (
    <AdminLayout>
      <div className='max-w-4xl p-5 bg-white border-gray-500'>
          <h1 className='my-5 text-2xl font-semibold'>Add new users</h1>
          <form onSubmit={handleSubmit(addHandle)}>
            <FormControl>
              <FormLabel>Election Name</FormLabel>
              <Input required {...register("election_name")} name='election_name' type='text' />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea required {...register("description")} name='description'></Textarea>
            </FormControl>
            <FormControl>
              <FormLabel>End Date</FormLabel>
              <Input required {...register("end_date")} name='end_date' type='date' />
            </FormControl>
            <Button type='submit' className='p-3 mt-3 bg-blue-400 hover:bg-blue-500 text-white rounded-lg'>
            {
              isLoading ? 'Submit...' : 'Submit'
            }
            </Button>
          </form>
      </div>
    </AdminLayout>
  )
}

export default Create