'use client'

import AdminLayout from '@/app/components/dashboard/layout'
import { Button, FormControl, FormLabel, Img, Input, Select, Textarea } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { addCandidate, loadElection } from '@/app/libs/api'
import { alert } from '@/app/components/Toast'
import { useRouter } from 'next/navigation'

const Create = () => {
  const { register, handleSubmit } = useForm()
  const [elections, setElections] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const router = useRouter()

  const listElection = async () => {
    const response = await loadElection()

    if (response.data) {
      setElections(response.data.data)
    } else {
      console.log(response.response.data.message)
    }
  }

  useEffect(() => {
    listElection()
  }, [])

  const addHandle = async (data) => {
    setIsLoading(true)

    const formData = new FormData()
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("electionId", data.electionId);
    formData.append("foto", data.foto[0])

    const response = await addCandidate(formData)
    if (!response.data) {
      setIsLoading(false)
      alert(response.response.data.message[0].message, 'error')
    } else {
      setIsLoading(false)
      router.push('/pages/dashboard/candidate')
      alert(response.data.message, 'success')
    }
  }

  const changeHandler = (event) => {
    const file = event.target.files[0]
    setImagePreview(URL.createObjectURL(file))
  }

  return (
    <AdminLayout>
      <div className='max-w-4xl p-5 bg-white border-gray-500'>
        <h1 className='my-5 text-2xl font-semibold'>Add new candidate</h1>
        <form onSubmit={handleSubmit(addHandle)} encType='multipart/form-data'>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input required {...register("name")} name='name' type='text' />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea required {...register("description")} name='description'></Textarea>
          </FormControl>
          <FormControl>
            <FormLabel>Foto</FormLabel>
            {imagePreview && <Img src={imagePreview} style={{ width: '200px', marginBottom: '10px' }} />}
            <Input type='file' required {...register("foto", { onChange: changeHandler })} name='foto' />
          </FormControl>
          <FormControl>
            <FormLabel>Election</FormLabel>
            <Select required {...register("electionId")} name='electionId' placeholder='Select election'>
              {elections.map((election, i) => (
                <option key={i} value={election.id}>
                  {election.election_name}
                </option>
              ))}
            </Select>
          </FormControl>
          <Button type='submit' className='p-3 mt-3 bg-blue-400 hover.bg-blue-500 text-white rounded-lg'>
            {isLoading ? 'Submit...' : 'Submit'}
          </Button>
        </form>
      </div>
    </AdminLayout>
  )
}

export default Create
