'use client'

import { alert } from '@/app/components/Toast'
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
 
const Login = () => {
  const { register, handleSubmit } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const loginHandle = async (data) => {
    setIsLoading(true)
    
    const response = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false
    })
    
    if (response.error) {
      alert('Invalid credentials', 'error')
      setIsLoading(false)
    } else {
      setIsLoading(false)
      router.push('/pages/dashboard', { shallow: true })
      alert('Login successfully', 'success')
    }
  }

  return (
    <div className='login' style={{ backgroundColor: '#F7FAFC' }}>
      <div className='container mx-auto max-w-md h-screen flex flex-col justify-center'>
        <div className='loginborder p-5 bg-white border-gray-500 shadow-sm shadow-blue-500 rounded-lg'>
          <h1 className='my-5 text-3xl text-center font-semibold'>EVote 📢</h1>
          <form onSubmit={handleSubmit(loginHandle)}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input required {...register("username")} name='username' type='text' />
            </FormControl>
            <FormControl className='mt-3'>
              <FormLabel>Password</FormLabel>
              <Input required {...register("password")} name='password' type='password' />
            </FormControl>
            <Button type='submit' className='p-3 mt-3 bg-blue-400 hover:bg-blue-500 text-white rounded-lg'>
              {
                isLoading ? 'Login...' : 'Login'
              }
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login