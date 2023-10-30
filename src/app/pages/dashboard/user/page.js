'use client'

import AdminLayout from '@/app/components/dashboard/layout'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { listUser } from '@/app/libs/api'
import { alert } from '@/app/components/Toast'
import { deleteUser } from '@/app/libs/api'

const User = () => {
  const [users, setUsers] = useState([])

  const loadUser = async () => {
    const response = await listUser()

    if (response.data) {
      setUsers(response.data.data)
    } else {
      console.log(response)
    }
  }

  const deleteHandle = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this user?')

    if (confirmation) {
      const response = await deleteUser(id)

      if (response.data) {
        alert(response.data.message, 'success')
        loadUser()
      } else {
        alert(response.response.data.message, 'error')
      }
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <AdminLayout>
      <div className='loginborder max-w-5xl p-5 bg-white border-gray-500'>
        <h1 className='text-2xl mb-10 font-bold'>Lists user</h1>
        <Link href={'/pages/dashboard/user/create'} className='bg-green-600 hover:bg-green-500 p-3 text-white rounded-lg'>Add new</Link>
        <TableContainer className='mt-5'>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Name</Th>
                <Th>Username</Th>
                <Th>Address</Th>
                <Th>Date Birth</Th>
                <Th>Role</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                users.map((user, i) => (
                  <Tr key={i}>
                    <Td>{i + 1}</Td>
                    <Td>{user.name}</Td>
                    <Td>{user.username}</Td>
                    <Td>{user.address}</Td>
                    <Td>{user.dateBirth}</Td>
                    <Td>{user.role}</Td>
                    <Td>
                      <Link href={`/pages/dashboard/user/${user.id}`} className='bg-blue-600 hover:bg-blue-500 p-3 mr-2 text-white rounded-lg'><EditIcon /></Link>
                      <Button onClick={() => deleteHandle(user.id)} className='bg-red-600 hover:bg-red-500 p-3 text-white rounded-lg'><DeleteIcon /></Button>
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

export default User