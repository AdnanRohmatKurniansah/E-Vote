import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'


const Footer = () => {
  return (
    <Box
      borderTop={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.900')}
      color={'black'}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        align={{ base: 'center', md: 'flex-start' }}>
        <Text>© 2023 ARK. All rights reserved</Text>
      </Container>
    </Box>
  )
}

export default Footer