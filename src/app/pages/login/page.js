import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
 
const Login = () => {
  return (
    <div className='login' style={{ backgroundColor: '#F7FAFC' }}>
      <div className='container mx-auto max-w-md h-screen flex flex-col justify-center'>
        <div className='loginborder p-5 bg-white border-gray-500 shadow-sm shadow-blue-500 rounded-lg'>
          <h1 className='my-5 text-3xl text-center font-semibold'>EVote 📢</h1>
          <form>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input name='username' type='text' />
            </FormControl>
            <FormControl className='mt-3'>
              <FormLabel>Password</FormLabel>
              <Input name='username' type='password' />
            </FormControl>
            <Button className='p-3 mt-3 bg-blue-400 hover:bg-blue-500 text-white rounded-lg'>
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login