'use client'

import { Box, Flex, SimpleGrid, Stat, StatLabel, StatNumber, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsAwardFill, BsFillCalendarCheckFill, BsFillPersonLinesFill, BsPerson } from 'react-icons/bs'
import AdminLayout from "@/app/components/dashboard/layout"
import { loadStats } from '@/app/libs/api'

function StatsCard(props) {
    const { title, stat, icon } = props
    return (
      <Stat
        px={{ base: 2, md: 4 }}
        py={'5'}
        shadow={'xl'}
        border={'1px solid'}
        backgroundColor={'white'}
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded={'lg'}>
        <Flex justifyContent={'space-between'}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'medium'} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={'auto'}
            color={useColorModeValue('gray.800', 'gray.200')}
            alignContent={'center'}>
            {icon}
          </Box>
        </Flex>
      </Stat>
    )
}

const Dashboard = () => {
    const [stats, setStats] = useState([])

    const loadHandle = async () => {
      const response = await loadStats()
      if (response.data) {
        setStats(response.data)
      } else {
        console.log(response.response.data.message)
      }
    }

    useEffect(() => {
      loadHandle()
    }, [])

    return (
        <AdminLayout>
             <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                    <StatsCard title={'Users'} stat={stats.user} icon={<BsPerson size={'3em'} />} />
                    <StatsCard title={'Candidates'} stat={stats.candidate} icon={<BsFillPersonLinesFill size={'3em'} />} />
                    <StatsCard title={'Elections'} stat={stats.election} icon={<BsFillCalendarCheckFill size={'3em'} />} />
                    <StatsCard title={'Winners'} stat={stats.winner} icon={<BsAwardFill size={'3em'} />} />
                </SimpleGrid>
            </Box>
        </AdminLayout>
    )
}

export default Dashboard