import React from 'react'

import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Text,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react'
import {
    FiHome,
    FiMenu,
    FiChevronDown,
    FiUserPlus,
    FiCalendar,
    FiUsers,
    FiStar,
} from 'react-icons/fi'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

const LinkItems = [
    { name: 'Dashboard', link: '/pages/dashboard', icon: FiHome },
    { name: 'Users', link: '/pages/dashboard/user', icon: FiUserPlus },
    { name: 'Election', link: '/pages/dashboard/election', icon: FiCalendar },
    { name: 'Candidate', link: '/pages/dashboard/candidate', icon: FiUsers },
    { name: 'Winner', link: '/pages/dashboard/winner', icon: FiStar }
]

export const SidebarContent = ({ onClose, ...rest }) => {
    return (
      <Box
        transition="3s ease"
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        {...rest}>
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            EVOTE
          </Text>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem key={link.name} link={link.link} icon={link.icon}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    )
}

const NavItem = ({ link, icon, children, ...rest }) => {
  return (
    <Link href={link}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
    </Link>
  );
}

export const MobileNav = ({ onOpen, ...rest }) => {
    const { data: session } = useSession()

    return (
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
        {...rest}>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
  
        <Text
          display={{ base: 'flex', md: 'none' }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold">
          EVOTE
        </Text>
  
        <HStack spacing={{ base: '0', md: '6' }}>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2">
                    <Text fontSize="sm">{session.user.username}</Text>
                    <Text fontSize="xs" color="gray.600">
                      {session.user.role}
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <MenuItem onClick={() => signOut({
                  redirect: true,
                  callbackUrl: '/'
                })}>
                Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    )
}
