import { Providers } from '../../provider'
import { Box, Drawer, DrawerContent, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { MobileNav, SidebarContent } from './SidebarHeader'

export default function AdminLayout({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
      <Providers>
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
          <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full">
            <DrawerContent>
              <SidebarContent onClose={onClose} />
            </DrawerContent>
          </Drawer>
          <MobileNav onOpen={onOpen} />
          <Box ml={{ base: 0, md: 60 }} p="4">
            {children}
          </Box>
        </Box>
      </Providers>
  )
}
