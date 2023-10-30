'use client'

import AdminLayout from '@/app/components/dashboard/layout'
import { Button, FormControl, FormLabel, Input, Select, Textarea } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { detailElection, updateElection } from '@/app/libs/api'
import { alert } from '@/app/components/Toast'
import { useParams, useRouter } from 'next/navigation'

const Edit = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()
  const { register, handleSubmit, setValue, control } = useForm()
  const router = useRouter()

  useEffect(() => {
    showElection()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    if (!isNaN(date)) {
      return date.toISOString().split('T')[0]
    }
    return ''
  }

  const showElection = async () => {
    const response = await detailElection(id)

    if (response.data) {
      const election = response.data.data
      setValue('election_name', election.election_name)
      setValue('description', election.description)
      setValue('end_date', formatDate(election.end_date))
      setValue('status', election.status)
    } else {
      console.log(response.response.data.message)
    }
  }

  const editElection = async (data) => {
    setIsLoading(true)

    const response = await updateElection(id, data)
    if (!response.data) {
      setIsLoading(false)
      alert(response.response.data.message, 'error')
    } else {
      setIsLoading(false)
      router.push('/pages/dashboard/election')
      alert(response.data.message, 'success')
    }
  }

  return (
    <AdminLayout>
      <div className='max-w-4xl p-5 bg-white border-gray-500'>
        <h1 className='my-5 text-2xl font-semibold'>Edit election</h1>
        <form onSubmit={handleSubmit(editElection)}>
          <FormControl>
            <FormLabel>Election Name</FormLabel>
            <Input required {...register('election_name')} name='election_name' type='text' />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea required {...register("description")} name='description'></Textarea>
          </FormControl>
          <FormControl>
            <FormLabel>End Date</FormLabel>
            <Input required {...register('end_date')} name='end_date' type='date' />
          </FormControl>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select required {...register('status')} name='status' control={control} placeholder='Select status'>
              <option value='notFinished'>Not Finished</option>
              <option value='finished'>Finished</option>
            </Select>
          </FormControl>
          <Button type='submit' className='p-3 mt-3 bg-blue-400 hover-bg-blue-500 text-white rounded-lg'>
            {isLoading ? 'Submit...' : 'Submit'}
          </Button>
        </form>
      </div>
    </AdminLayout>
  )
}

export default Edit
