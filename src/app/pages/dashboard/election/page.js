'use client'

import { alert } from '@/app/components/Toast'
import AdminLayout from '@/app/components/dashboard/layout'
import { closeElection, deleteElection, loadElection } from '@/app/libs/api'
import { CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Badge, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const List = () => {
  const [elections, setElections] = useState([])

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

  const deleteHandle = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this election?')

    if (confirmation) {
      const response = await deleteElection(id)

      if (response.data) {
        alert(response.data.message, 'success')
        listElection()
      } else {
        alert(response.response.data.message, 'error')
      }
    }
  }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', options)
  }

  const closeHandle = async (id) => {
    const confirmation = window.confirm('Close this election?')

    if (confirmation) {
      const response = await closeElection(id)

      if (response.data) {
        alert(response.data.message, 'success')
        listElection()
      } else {
        alert(response.response.data.message, 'error')
      }
    }
  }

  return (
    <AdminLayout>
      <div className='loginborder p-5 bg-white border-gray-500'>
        <h1 className='text-2xl mb-10 font-bold'>Lists election</h1>
        <Link href={'/pages/dashboard/election/create'} className='bg-green-600 hover:bg-green-500 p-3 text-white rounded-lg'>Add new</Link>
        <TableContainer className='mt-5'>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Election Name</Th>
                <Th>Description</Th>
                <Th>Start date</Th>
                <Th>End date</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                elections.map((election, i) => (
                  <Tr key={i}>
                    <Td>{i + 1}</Td>
                    <Td>{election.election_name}</Td>
                    <Td>{election.description}</Td>
                    <Td>{formatDate(election.start_date)}</Td>
                    <Td>{formatDate(election.end_date)}</Td>
                    <Td>
                      <Badge variant='solid' colorScheme={election.status  === 'notFinished' ? 'red' : 'green'}>
                        {election.status}
                      </Badge></Td>
                    <Td>
                      <Link href={`/pages/dashboard/election/${election.id}`} className='bg-blue-600 hover:bg-blue-500 p-3 mr-2 text-white rounded-lg'><EditIcon /></Link>
                      <Button onClick={() => deleteHandle(election.id)} className='bg-red-600 hover:bg-red-500 mr-2 p-3 text-white rounded-lg'><DeleteIcon /></Button>
                      <Button onClick={() => closeHandle(election.id)} className='bg-green-600 hover:bg-green-500 p-3 text-white rounded-lg'><CloseIcon /></Button>
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

export default List