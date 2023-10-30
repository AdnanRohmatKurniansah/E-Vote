'use client'

import AdminLayout from '@/app/components/dashboard/layout'
import { Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { registerUser } from '@/app/libs/api'
import { alert } from '@/app/components/Toast'
import { useRouter } from 'next/navigation'

const Create = () => {
  const { register, handleSubmit } = useForm()
  const [ isLoading, setIsLoading ] = useState(false)
  const router = useRouter()

  const addUser = async (data) => {
    setIsLoading(true)

    const response = await registerUser(data)
    if (!response.data) {
      setIsLoading(false)
      alert(response.response.data.message, 'error')
    } else {
      setIsLoading(false)
      router.push('/pages/dashboard/user')
      alert(response.data.message, 'success')
    }
  }

  return (
    <AdminLayout>
      <div className='max-w-4xl p-5 bg-white border-gray-500'>
          <h1 className='my-5 text-2xl font-semibold'>Add new users</h1>
          <form onSubmit={handleSubmit(addUser)}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input required {...register("name")} name='name' type='text' />
            </FormControl>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input required {...register("username")} name='username' type='text' />
            </FormControl>
            <FormControl>
              <FormLabel>Date Birth</FormLabel>
              <Input required {...register("dateBirth")} name='dateBirth' type='date' />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input required {...register("address")} name='address' type='text' />
            </FormControl>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Select required {...register("role")} placeholder='Select role'>
                <option value='voter'>Voter</option>
                <option value='admin'>Admin</option>
              </Select>
            </FormControl>
            <FormControl className='mt-3'>
              <FormLabel>Password</FormLabel>
              <Input required {...register("password")} name='password' type='password' />
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