import {
  Avatar,
  Image,
  Text,
  Icon,
  Flex,
  IconButton,
  Link,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Stack,
  Divider,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FaSignInAlt } from 'react-icons/fa';
import { TiUserAdd } from 'react-icons/ti';

import { FiLogOut } from 'react-icons/fi';
import logo from '../../../assets/sp2logodark.png';
import CustomModal from '../../UI/Modal';
import { useAuth } from '../../../hooks/useAuth';
import { handleLogout } from '../../../hooks/authUtils';

function MobileNavbar() {
  const { user, setUser } = useAuth();

  // Manage drawer state
  const {
    isOpen: isMenuOpen,
    onOpen: openMenu,
    onClose: closeMenu,
  } = useDisclosure();

  const {
    isOpen: isRegisterOpen,
    onOpen: openRegister,
    onClose: closeRegister,
  } = useDisclosure();

  const {
    isOpen: isLoginOpen,
    onOpen: openLogin,
    onClose: closeLogin,
  } = useDisclosure();

  const categories = [
    'Jewelry',
    'Art',
    'Watches',
    'Fashion',
    'Vintage',
    'Cars',
    'Books',
    'Collectibles',
  ];

  return (
    <Flex
      position='fixed'
      bottom='0'
      left='0'
      justify='space-between'
      align='center'
      p='15px'
      bg='brand.100'
      w='full'
    >
      {user?.accessToken ? (
        <Flex
          position='fixed'
          bottom='0'
          left='0'
          justify='space-between'
          align='center'
          p='15px'
          bg='brand.100'
          w='full'
        >
          <Flex flexDirection='column' justify='center'>
            <IconButton bg='brand.100' onClick={openMenu}>
              <HamburgerIcon boxSize='8' />
            </IconButton>
            <Text fontSize='xs'>Categories</Text>
          </Flex>
          <Flex gap='4' align='center'>
            <Text>1000 credits</Text>
            <Avatar size='sm' name={user?.name} src={user?.avatar?.url} />

            <IconButton
              bg='transparent'
              color='black'
              onClick={() => {
                handleLogout(setUser);
              }} // ✅ Call function on click
            >
              <Icon as={FiLogOut} boxSize='8' />
            </IconButton>
          </Flex>
        </Flex>
      ) : (
        <Flex
          position='fixed'
          bottom='0'
          left='0'
          justify='space-between'
          align='center'
          p='15px'
          bg='brand.100'
          w='full'
        >
          <Flex flexDirection='column' justify='center'>
            <IconButton bg='brand.100' onClick={openMenu}>
              <HamburgerIcon boxSize='8' />
            </IconButton>
            <Text fontSize='xs'>Categories</Text>
          </Flex>

          <Flex flexDirection='column' justify='center'>
            <IconButton bg='brand.100' onClick={openLogin}>
              <Icon as={FaSignInAlt} boxSize='8' />
            </IconButton>
            <Text fontSize='xs'>Sign in</Text>
          </Flex>

          <Flex flexDirection='column' justify='center'>
            <IconButton bg='brand.100' onClick={openRegister}>
              <Icon as={TiUserAdd} boxSize='8' color='brand.600' />
            </IconButton>
            <Text fontSize='xs'>Register</Text>
          </Flex>
        </Flex>
      )}

      <Drawer placement='left' onClose={closeMenu} isOpen={isMenuOpen}>
        <DrawerOverlay />
        <DrawerContent
          bg='white'
          color='black'
          w={{ base: '100%', md: '400px' }}
        >
          <DrawerCloseButton />
          <DrawerHeader>
            <Image src={logo} />
          </DrawerHeader>
          <DrawerBody>
            <Stack>
              <Link
                to='/auctions'
                onClick={closeMenu}
                style={{ display: 'block', padding: '10px 0', color: 'black' }}
              >
                View all listings
              </Link>
              <Divider />
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/auctions?category=${category.toLowerCase()}`}
                  onClick={closeMenu}
                  style={{
                    display: 'block',
                    padding: '10px 0',
                    color: 'black',
                  }}
                >
                  {category}
                </Link>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <CustomModal
        isOpen={isLoginOpen}
        onClose={closeLogin}
        title='Login to Your Account'
      >
        <FormControl isRequired>
          <FormLabel>E-mail</FormLabel>
          <Input placeholder='name@stud.noroff.no' />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input placeholder='********' />
        </FormControl>
        <Button
          type='submit'
          bg='brand.600'
          color='white'
          _hover={{ bg: 'brand.700' }}
          w='full'
          mt='4'
        >
          Login
        </Button>
        <Divider mt='8' />
        <Flex align='center' gap='2' mt='4'>
          <Text fontSize='xs'>Don&apos;t have an account?</Text>{' '}
          <Button
            bg='transparent'
            m='0'
            p='0'
            fontSize='xs'
            onClick={() => {
              closeLogin();
              openRegister();
            }}
          >
            Register now
          </Button>
        </Flex>
      </CustomModal>

      <CustomModal
        isOpen={isRegisterOpen}
        onClose={closeRegister}
        title='Create a New Account'
      >
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input placeholder='Name' />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>E-mail</FormLabel>
          <Input placeholder='name@stud.noroff.no' />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input placeholder='********' />
        </FormControl>
        <Button
          type='submit'
          bg='brand.600'
          color='white'
          _hover={{ bg: 'brand.700' }}
          w='full'
          mt='4'
        >
          Register
        </Button>
        <Divider mt='8' />
        <Flex align='center' gap='2' mt='4'>
          <Text fontSize='xs'>Already have an account?</Text>{' '}
          <Button
            bg='transparent'
            m='0'
            p='0'
            fontSize='xs'
            onClick={() => {
              closeRegister();
              openLogin();
            }}
          >
            Login here
          </Button>
        </Flex>
      </CustomModal>
    </Flex>
  );
}

export default MobileNavbar;
