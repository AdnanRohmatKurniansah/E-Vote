import React from 'react'
import {
  Heading,
  Avatar,
  Box,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

const candidates = [
  {
    id: 1,
    name: 'John Doe',
    jobTitle: 'Frontend Developer',
    followers: 23000,
    imageUrl:
      'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  },
  {
    id: 1,
    name: 'John Doe',
    jobTitle: 'Frontend Developer',
    followers: 23000,
    imageUrl:
      'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  },
  {
    id: 1,
    name: 'John Doe',
    jobTitle: 'Frontend Developer',
    followers: 23000,
    imageUrl:
      'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  },
];

const ListCandidate = () => {
  return (
    <div className='pb-20' style={{ backgroundColor: '#F7FAFC' }}>
      <h1 className='text-3xl text-center pt-10 my-10 font-extrabold'>List Candidate</h1>
      <div className='listCandidate mx-10 md:px-20 md:container  grid grid-cols-1 md:grid-cols-3 gap-8'>
        {candidates.map((candidate) => (
          <Box
            key={candidate.id}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'xl'}
            rounded={'md'}
            overflow={'hidden'}
            display="flex"
            flexDirection="column" 
          >
            <Image
              h={'120px'}
              w={'full'}
              src={candidate.imageUrl}
              objectFit='cover'
              alt='#'
            />
            <Flex justify={'center'} mt={-12}>
              <Avatar
                size={'xl'}
                src={candidate.avatarUrl}
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
                <Text color={'gray.500'}>{candidate.jobTitle}</Text>
              </Stack>
              <Stack direction={'row'} justify={'center'} spacing={6}>
                <Stack spacing={0} align={'center'}>
                  <Text fontWeight={600}>{candidate.followers}</Text>
                  <Text fontSize={'sm'} color={'gray.500'}>
                    Followers
                  </Text>
                </Stack>
                <Stack spacing={0} align={'center'}>
                  <Text fontWeight={600}>{candidate.followers}</Text>
                  <Text fontSize={'sm'} color={'gray.500'}>
                    Followers
                  </Text>
                </Stack>
              </Stack>
              <Button
                className='bg-blue-600'
                w={'full'}
                mt={8}
                color={'white'}
                rounded={'md'}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              >
                Follow
              </Button>
            </Box>
          </Box>
        ))}
      </div>
    </div>
  );
};

export default ListCandidate;
