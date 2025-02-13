import {
  Avatar,
  Image,
  Text,
  Icon,
  Flex,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Stack,
  Divider,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FaSignInAlt } from 'react-icons/fa';
import { TiUserAdd } from 'react-icons/ti';

import { FiLogOut } from 'react-icons/fi';
import logo from '../../../assets/sp2logodark.png';
import CustomModal from '../../UI/Modal';
import { useAuth } from '../../../hooks/useAuth';
import { handleLogout } from '../../../hooks/authUtils';
import LoginForm from '../../UI/Forms/LoginForm';
import RegisterForm from '../../UI/Forms/RegisterForm';

import { Link } from 'react-router-dom';

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
      zIndex='1000'
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
        <LoginForm closeLogin={closeLogin} openRegister={openRegister} />
      </CustomModal>

      <CustomModal
        isOpen={isRegisterOpen}
        onClose={closeRegister}
        title='Create a New Account'
      >
        <RegisterForm closeRegister={closeRegister} openLogin={openLogin} />
      </CustomModal>
    </Flex>
  );
}

export default MobileNavbar;
