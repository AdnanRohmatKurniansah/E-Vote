import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Spinner } from '@chakra-ui/react'

const LoadSession = ({ children }) => {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true)
    } else if (session) {
      setLoading(false)
    }
  }, [status, session])

  if (loading) {
    return (
      <div className="flex flex-col justify-center min-h-screen items-center">
        <Spinner size="xl" />
      </div>
    )
  }

  return <>
    {children}
  </>
}

export default LoadSession
