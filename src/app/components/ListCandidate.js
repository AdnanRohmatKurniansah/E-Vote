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
  import { addVote, checkHasVoted, getCandidateVoteCount, loadWinner, onGoingCandidate, onGoingElection } from '../libs/api'
  import { alert } from './Toast'

  const ListCandidate = () => {
    const [election, setElection] = useState({})
    const [winners, setWinners] = useState({})
    const [candidates, setCandidates] = useState([])
    const [isLoading, setIsLoading] = useState(false)
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
        winnerElection()
      } else {
        console.log(response.response.data.message)
      }
    }

    const handleVote = async (id) => {
      const data = {
        electionId: election.id,
        candidateId: id,
      }
      setIsLoading(true)
      const response = await addVote(data)

      if (response.data) {
        setIsLoading(false)
        alert(response.data.message, 'success')
        setHasVoted(true)
        loadCount()
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
      if (election.id) {
        const electionId = election.id 
        const candidateIds = candidates.map(candidate => candidate.id) 
    
        const hasVotedForAnyCandidate = await Promise.all(
          candidateIds.map(async candidateId => {
            const data = {
              electionId,
              candidateId
            }
            const response = await checkHasVoted(data)
            
            if (!response.data) {
              setHasVoted(false)
            } else {
              loadCount()
              return response.data
            }
          })
        )
      }
    }

    const loadCount = async () => {
      const candidateVoteCounts = await Promise.all(
        candidates.map(async (candidate) => {
          const voteCountResponse = await getCandidateVoteCount(election.id, candidate.id)
          return {
            ...candidate,
            voteCount: voteCountResponse.data.data,
          }
        })
      )
      setCandidates(candidateVoteCounts)
    }

    const winnerElection = async () => {
      const response = await loadWinner(election.id)
    
      if (response.data) {
        setWinners(response.data.data)
      } else {
        console.log(response.response.data.message)
      }
    }

    useEffect(() => {
      loadElection()
    }, [])
  
    useEffect(() => {
      if (election.id) {
        listCandidate()
      }
    }, [election.id])
  
    useEffect(() => {
      if (election.id) {
        loadHasVoted()
      }
    }, [election.id, candidates])

    return (
          <div className='pb-20' style={{ backgroundColor: '#F7FAFC' }}>
            <h1 className='text-3xl text-center pt-10 my-10 font-extrabold'>{election.election_name}</h1>
            <div className='listCandidate mx-10 md:px-20 md:container  grid grid-cols-1 md:grid-cols-3 gap-8'>
              {candidates.map((candidate, c) => (
                <form key={c} onSubmit={(e) => e.preventDefault()}>
                  <Box boxShadow={'xl'} rounded={'md'} overflow={'hidden'} display="flex" flexDirection="column">
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
                        hasVoted || winners ? (
                          <>
                            {
                              winners.candidateId == candidate.id && (
                                <Button className='bg-blue-600' 
                                  w={'full'}
                                  mt={8}
                                  color={'white'}
                                  rounded={'md'}
                                  _hover={{
                                  transform: 'translateY(-2px)',
                                    boxShadow: 'lg',
                                  }}>
                                  Winner
                                </Button>
                              )
                            }
                            <Button className='bg-indigo-800' 
                              w={'full'}
                              mt={8}
                              color={'white'}
                              rounded={'md'}
                              _hover={{
                              transform: 'translateY(-2px)',
                                boxShadow: 'lg',
                              }}>
                              {candidate.voteCount}
                            </Button>
                          </>
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
                              onClick={() => handleVote(candidate.id)}
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


  // import React, { useEffect, useState } from 'react'
  // import {
  //   Heading,
  //   Avatar,
  //   Box,
  //   Image,
  //   Flex,
  //   Text,
  //   Stack,
  //   Button,
  // } from '@chakra-ui/react'
  // import { addVote, checkHasVoted, getCandidateVoteCount, loadWinner, onGoingCandidate, onGoingElection } from '../libs/api'
  // import { alert } from './Toast'

  // const ListCandidate = () => {
  //   const [election, setElection] = useState({})
  //   const [winners, setWinners] = useState({})
  //   const [candidates, setCandidates] = useState([])
  //   const [isLoading, setIsLoading] = useState(false)
  //   const [hasVoted, setHasVoted] = useState(false)

  //   const loadElection = async () => {
  //     const response = await onGoingElection()

  //     if (response.data) {
  //       setElection(response.data.data)
  //     } else {
  //       console.log(response.response.data.message)
  //     }
  //   }

  //   const listCandidate = async () => {
  //     const response = await onGoingCandidate(election.id)

  //     if (response.data) {
  //       setCandidates(response.data.data)
  //     } else {
  //       console.log(response.response.data.message)
  //     }
  //   }

  //   const handleVote = async (id) => {
  //     const data = {
  //       electionId: election.id,
  //       candidateId: id,
  //     }
  //     setIsLoading(true)
  //     const response = await addVote(data)

  //     if (response.data) {
  //       setIsLoading(false)
  //       alert(response.data.message, 'success')
  //       setHasVoted(true)
  //       loadCount()
  //     } else {
  //       setIsLoading(false)
  //       console.log(response)
  //       if (response.response.status === 422) {
  //         alert(response.response.data.message[0].message, 'error')
  //       } else {
  //         alert(response.response.data.message, 'error')
  //       }
  //     }
  //   }

  //   const winnerElection = async () => {
  //     const response = await loadWinner(election.id)

  //     if (response.data) {
  //       setWinners(response.data.data)
  //     } else {
  //       console.log(response.response.data.message)
  //     }
  //   }

  //   const loadHasVoted = async () => {
  //     if (election.id) {
  //       const electionId = election.id 
  //       const candidateIds = candidates.map(candidate => candidate.id) 
    
  //       const hasVotedForAnyCandidate = await Promise.all(
  //         candidateIds.map(async candidateId => {
  //           const data = {
  //             electionId,
  //             candidateId
  //           }
  //           const response = await checkHasVoted(data)
            
  //           if (!response.data) {
  //             setHasVoted(false)
  //           } else {
  //             loadCount()
  //             return response.data
  //           }
  //         })
  //       )
  //     }
  //   }

  //   const loadCount = async () => {
  //     const candidateVoteCounts = await Promise.all(
  //       candidates.map(async (candidate) => {
  //         const voteCountResponse = await getCandidateVoteCount(election.id, candidate.id)
  //         return {
  //           ...candidate,
  //           voteCount: voteCountResponse.data.data,
  //         }
  //       })
  //     )
  //     setCandidates(candidateVoteCounts)
  //   } 

  //   useEffect(() => {
  //     loadElection()
  //   }, [])
  
  //   useEffect(() => {
  //     if (election.id) {
  //       listCandidate()
  //     }
  //   }, [election.id])
  
  //   useEffect(() => {
  //     if (election.id) {
  //       loadHasVoted()
  //     }
  //   }, [election.id, candidates])

  //   return (
  //     <div className='pb-20' style={{ backgroundColor: '#F7FAFC' }}>
  //       <h1 className='text-3xl text-center pt-10 my-10 font-extrabold'>{election.election_name}</h1>
  //       <div className='listCandidate mx-10 md:px-20 md:container  grid grid-cols-1 md:grid-cols-3 gap-8'>
  //         {candidates.map((candidate, c) => (
  //           <form key={c} onSubmit={(e) => e.preventDefault()}>
  //             <Box boxShadow={'xl'} rounded={'md'} overflow={'hidden'} display="flex" flexDirection="column">
  //               <Image
  //                 h={'120px'}
  //                 w={'full'}
  //                 src={'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'}
  //                 objectFit='cover'
  //                 alt='#'
  //               />
  //               <Flex justify={'center'} mt={-12}>
  //                 <Avatar
  //                   size={'xl'}
  //                   src={candidate.foto}
  //                   css={{
  //                     border: '2px solid white',
  //                   }}
  //                 />
  //               </Flex>
  //               <Box p={6} flex="1"> 
  //                 <Stack spacing={0} align={'center'} mb={5}>
  //                   <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
  //                     {candidate.name}
  //                   </Heading>
  //                 </Stack>
  //                 <Stack direction={'row'} justify={'center'} spacing={6}>
  //                   <Stack spacing={0} align={'center'}>
  //                     <Text fontSize={'sm'} color={'gray.500'}>
  //                       {candidate.description}
  //                     </Text>
  //                   </Stack>
  //                 </Stack>
  //                 {
  //                   hasVoted || winners ? (
  //                     <>
  //                       {
  //                         winners.candidateId == candidate.id && (
  //                           <Button className='bg-blue-600' 
  //                             w={'full'}
  //                             mt={8}
  //                             color={'white'}
  //                             rounded={'md'}
  //                             _hover={{
  //                             transform: 'translateY(-2px)',
  //                               boxShadow: 'lg',
  //                             }}>
  //                             Winner
  //                           </Button>
  //                         )
  //                       }
  //                       <Button className='bg-indigo-800' 
  //                         w={'full'}
  //                         mt={8}
  //                         color={'white'}
  //                         rounded={'md'}
  //                         _hover={{
  //                         transform: 'translateY(-2px)',
  //                           boxShadow: 'lg',
  //                         }}>
  //                         {candidate.voteCount}
  //                       </Button>
  //                     </>
  //                     ) : (
  //                       <Button
  //                         className='bg-blue-600'
  //                         type='submit'
  //                         w={'full'}
  //                         mt={8}
  //                         color={'white'}
  //                         rounded={'md'}
  //                         _hover={{
  //                         transform: 'translateY(-2px)',
  //                           boxShadow: 'lg',
  //                         }}
  //                         onClick={() => handleVote(candidate.id)}
  //                       >
  //                       {
  //                         isLoading ? 'Vote...' : 'Vote'
  //                       }
  //                       </Button>
  //                     )
  //                 }
  //               </Box>
  //             </Box>
  //           </form>
  //         ))}
  //       </div>
  //     </div>
  //   )
  // }

  // export default ListCandidate



