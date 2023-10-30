'use client'

import AdminLayout from '@/app/components/dashboard/layout'
import { Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { detailUser, updateUser } from '@/app/libs/api'
import { alert } from '@/app/components/Toast'
import { useParams, useRouter } from 'next/navigation'

const Edit = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()
  const { register, handleSubmit, setValue, control } = useForm()
  const router = useRouter()

  useEffect(() => {
    showUser()
  }, [])

  const showUser = async () => {
    const response = await detailUser(id)

    if (response.data) {
      const userData = response.data.data
      setValue('name', userData.name)
      setValue('username', userData.username)
      setValue('address', userData.address)
      setValue('role', userData.role)
      setValue('password', userData.password)
      if (userData.dateBirth) {
        const dateOfBirth = new Date(userData.dateBirth)
        if (!isNaN(dateOfBirth)) {
          const formattedDate = dateOfBirth.toISOString().split('T')[0]
          setValue('dateBirth', formattedDate)
        } else {
          console.log("Invalid date format")
        }
      }
    } else {
      console.log(response.response.data.message)
    }
  }

  const editUser = async (data) => {
    setIsLoading(true)

    const response = await updateUser(id, data)
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
        <h1 className='my-5 text-2xl font-semibold'>Edit users</h1>
        <form onSubmit={handleSubmit(editUser)}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input required {...register('name')} name='name' type='text' />
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input required {...register('username')} name='username' type='text' />
          </FormControl>
          <FormControl>
            <FormLabel>Date Birth</FormLabel>
            <Input required {...register('dateBirth')} name='dateBirth' type='date' />
          </FormControl>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input required {...register('address')} name='address' type='text' />
          </FormControl>
          <FormControl>
            <FormLabel>Role</FormLabel>
            <Select required {...register('role')} name='role' control={control} placeholder='Select role'>
              <option value='voter'>Voter</option>
              <option value='admin'>Admin</option>
            </Select>
          </FormControl>
          <FormControl className='mt-3'>
            <FormLabel>Password</FormLabel>
            <Input required {...register('password')} name='password' type='password' />
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
