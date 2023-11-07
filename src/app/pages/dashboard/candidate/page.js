'use client'

import React, { useEffect, useState } from 'react'
import { deleteCandidate, loadCandidate, loadElection } from '@/app/libs/api'
import { alert } from '@/app/components/Toast'
import AdminLayout from '@/app/components/dashboard/layout'
import { Avatar, Button, Img, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import Link from 'next/link'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

const Candidate = () => {
  const [candidates, setCandidates] = useState([])
  const [elections, setElections] = useState([])

  const listElections = async () => {
    const response = await loadElection()

    if (response.data) {
      setElections(response.data.data)
    } else {
      console.log(response.response.data.message)
    }
  }

  const listCandidate = async () => {
    const response = await loadCandidate()

    if (response.data) {
      setCandidates(response.data.data)
    } else {
      console.log(response.response.data.message)
    }
  }

  const deleteHandle = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this candidate?')

    if (confirmation) {
      const response = await deleteCandidate(id)

      if (response.data) {
        alert(response.data.message, 'success')
        listCandidate()
      } else {
        alert(response.response.data.message, 'error')
      }
    }
  }

  useEffect(() => {
    listCandidate()
    listElections()
  }, [])

  return (
    <AdminLayout>
      <div className='max-w-5xl p-5 bg-white border-gray-500'>
        <h1 className='text-2xl mb-10 font-bold'>Lists candidates</h1>
        <Link href={'/pages/dashboard/candidate/create'} className='bg-green-600 hover-bg-green-500 p-3 text-white rounded-lg'>
          Add new
        </Link>
        <TableContainer className='mt-5'>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Foto</Th>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Election Name</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {candidates.map((candidate, i) => (
                <Tr key={i}>
                  <Td>{i + 1}</Td>
                  <Td>
                    <Img width={'80px'} src={candidate.foto} alt={`foto ${i}`}/>
                  </Td>
                  <Td>{candidate.name}</Td>
                  <Td>{candidate.description}</Td>
                  <Td>
                    {elections.map((election) => {
                      if (election.id === candidate.electionId) {
                        return election.election_name
                      }
                      return null
                    })}
                  </Td>
                  <Td>
                    <Link href={`/pages/dashboard/candidate/${candidate.id}`} className='bg-blue-600 hover:bg-blue-500 p-3 mr-2 text-white rounded-lg'>
                      <EditIcon />
                    </Link>
                    <Button onClick={() => deleteHandle(candidate.id)} className='bg-red-600 hover:bg-red-500 p-3 text-white rounded-lg'>
                      <DeleteIcon />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </AdminLayout>
  )
}

export default Candidate
