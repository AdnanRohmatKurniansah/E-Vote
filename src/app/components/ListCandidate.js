import React, { useEffect, useState } from 'react'
import {
  Heading,
  Avatar,
  Box,
  Image,
  Flex,
  Text,
  Stack,
  Button,
} from '@chakra-ui/react'
import { addVote, checkHasVoted, onGoingCandidate, onGoingElection } from '../libs/api'
import { useForm } from 'react-hook-form'
import { alert } from './Toast'

const ListCandidate = () => {
  const [election, setElection] = useState({})
  const [candidates, setCandidates] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit } = useForm()
  const [hasVoted, setHasVoted] = useState(false)

  const loadElection = async () => {
    const response = await onGoingElection()

    if (response.data) {
      setElection(response.data.data)
    } else {
      console.log(response.response.data.message)
    }
  }

  const listCandidate = async () => {
    const response = await onGoingCandidate(election.id)

    if (response.data) {
      setCandidates(response.data.data)
    } else {
      console.log(response.response.data.message)
    }
  }

  const handleVote = async (data) => {
    setIsLoading(true)
    const response = await addVote(data)

    if (response.data) {
      setIsLoading(false)
      alert(response.data.message, 'success')
    } else {
      setIsLoading(false)
      console.log(response)
      if (response.response.status === 422) {
        alert(response.response.data.message[0].message, 'error')
      } else {
        alert(response.response.data.message, 'error')
      }
    }
  }

  const loadHasVoted = async () => {
    const electionId = election.id 
    const candidateIds = candidates.map(candidate => candidate.id) 
  
    const hasVotedForAnyCandidate = await Promise.all(
      candidateIds.map(async candidateId => {
        const data = {
          electionId,
          candidateId
        }
        const response = await checkHasVoted(data)
  
        return response.data
      })
    )
  
    if (hasVotedForAnyCandidate.some(item => item !== null)) {
      setHasVoted(true) 
    }
  }

  useEffect(() => {
    loadElection()
  }, [])

  useEffect(() => {
    listCandidate()
    loadHasVoted()
  }, [election])

  return (
    <div className='pb-20' style={{ backgroundColor: '#F7FAFC' }}>
      <h1 className='text-3xl text-center pt-10 my-10 font-extrabold'>{election.election_name}</h1>
      <div className='listCandidate mx-10 md:px-20 md:container  grid grid-cols-1 md:grid-cols-3 gap-8'>
        {candidates.map((candidate, c) => (
          <form key={c} onSubmit={handleSubmit(handleVote)}>
                <Box boxShadow={'xl'} rounded={'md'} overflow={'hidden'} display="flex" flexDirection="column">
                    <input type='hidden' {...register('electionId')} value={election.id} name='electionId'/>
                    <input type='hidden' {...register('candidateId')} value={candidate.id} name='candidateId' />
                    <Image
                      h={'120px'}
                      w={'full'}
                      src={'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'}
                      objectFit='cover'
                      alt='#'
                    />
                    <Flex justify={'center'} mt={-12}>
                      <Avatar
                        size={'xl'}
                        src={candidate.foto}
                        css={{
                          border: '2px solid white',
                        }}
                      />
                    </Flex>
                    <Box p={6} flex="1"> 
                      <Stack spacing={0} align={'center'} mb={5}>
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                          {candidate.name}
                        </Heading>
                      </Stack>
                      <Stack direction={'row'} justify={'center'} spacing={6}>
                        <Stack spacing={0} align={'center'}>
                          <Text fontSize={'sm'} color={'gray.500'}>
                            {candidate.description}
                          </Text>
                        </Stack>
                      </Stack>
                      {
                        hasVoted ? (
                          <Button className='bg-green-600' 
                          w={'full'}
                          mt={8}
                          color={'white'}
                          rounded={'md'}
                          _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                          }}>
                            Voted
                          </Button>
                        ) : (
                          <Button
                            className='bg-blue-600'
                            type='submit'
                            w={'full'}
                            mt={8}
                            color={'white'}
                            rounded={'md'}
                            _hover={{
                              transform: 'translateY(-2px)',
                              boxShadow: 'lg',
                            }}
                          >
                          {
                            isLoading ? 'Vote...' : 'Vote'
                          }
                          </Button>
                        )
                      }
                    </Box>
                </Box>
          </form>
        ))}
      </div>
    </div>
  )
}

export default ListCandidate
