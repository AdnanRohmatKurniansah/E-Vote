import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
 
const Login = () => {
  return (
      <div className='container mx-auto max-w-md h-screen flex flex-col justify-center'>
        <div className='loginborder p-5 border-gray-300 shadow-sm shadow-blue-400 rounded-lg'>
          <h1 className='my-5 text-3xl text-center font-semibold'>Login now</h1>
          <form>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input name='username' type='text' />
            </FormControl>
            <FormControl className='mt-3'>
              <FormLabel>Password</FormLabel>
              <Input name='username' type='password' />
            </FormControl>
            <Button className='mt-5' loadingText='Submitting' colorScheme='blue' variant='outline'>
              Submit
            </Button>
          </form>
        </div>
      </div>
  )
}

export default Login