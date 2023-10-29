import {
  Box,
  Heading,
  Image,
  Text,
  useColorModeValue,
  Container,
  Divider,
} from '@chakra-ui/react'

const Step = () => {
  return (
    <Container className='pb-16 md:pb-28' maxW={'7xl'} p="12">
      <Box className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 md:mb-0'>
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center">
          <Box
            width={{ base: '100%', sm: '85%' }}
            zIndex="2"
            marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%">
            <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <Image
                borderRadius="lg"
                src={
                  '/images/bgStep.jpg'
                }
                alt="some good alt text"
                objectFit="contain"
              />
            </Box>
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                'radial(blue.600 1px, transparent 1px)',
                'radial(blue.300 1px, transparent 1px)',
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: '3', sm: '0' }}>
          <Heading marginTop="1">
            <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
              Selection Steps
            </Text>
          </Heading>
          <ul className='mt-3 list-none text-xl'>
            <li className='my-2'>asdcadcad</li>
            <Divider />
            <li className='my-2'>asdcadcad</li>
            <Divider />
            <li className='my-2'>asdcadcad</li>
            <Divider />
            <li className='my-2'>asdcadcad</li>
            <Divider />
          </ul>
        </Box>
      </Box>
    </Container>
  )
}

export default Step