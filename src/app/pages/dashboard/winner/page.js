'use client'

import AdminLayout from '@/app/components/dashboard/layout'
import { Img, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { listWinner, loadCandidate, loadElection } from '@/app/libs/api'

const Winner = () => {
  const [candidates, setCandidates] = useState([])
  const [winners, setWinners] = useState([])
  const [elections, setElections] = useState([])

  const listCandidate = async () => {
    const response = await loadCandidate()

    if (response.data) {
      setCandidates(response.data.data)
    } else {
      console.log(response.response.data.message)
    }
  }

  const listElections = async () => {
    const response = await loadElection()

    if (response.data) {
      setElections(response.data.data)
    } else {
      console.log(response.response.data.message)
    }
  }

  const loadHandle = async () => {
    const response = await listWinner()

    if (response.data) {
      setWinners(response.data.data)
    } else {
      console.log(response)
    }
  }

  useEffect(() => {
    loadHandle()
    listCandidate()
    listElections()
  }, [])

  return (
    <AdminLayout>
      <div className='max-w-5xl p-5 bg-white border-gray-500'>
        <h1 className='text-2xl mb-10 font-bold'>Lists winner</h1>
        <TableContainer className='mt-5'>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Name</Th>
                <Th>Foto</Th>
                <Th>Election name</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                winners.map((winner, i) => (
                  <Tr key={i}>
                    <Td>{i + 1}</Td>
                    <Td>
                        {candidates.map((candidate) => {
                        if (candidate.id === winner.candidateId) {
                            return candidate.name
                        }
                            return null
                        })}
                    </Td>
                    <Td>
                        <Img width={'80px'} src={
                        candidates.map((candidate) => {
                            if (candidate.id === winner.candidateId) {
                                return candidate.foto
                            }
                            return null
                        })} alt={`foto ${i}`}/>
                    </Td>
                    <Td>
                        {elections.map((election) => {
                        if (election.id === winner.electionId) {
                            return election.election_name
                        }
                            return null
                        })}
                    </Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </AdminLayout>
  )
}

export default Winner