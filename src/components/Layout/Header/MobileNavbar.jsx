import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { useCredits } from '../../../context/CreditContext';
import { useAuth } from '../../../hooks/useAuth';
import CustomModal from '../../UI/Modal';
import LoginForm from '../../UI/Forms/LoginForm';
import RegisterForm from '../../UI/Forms/RegisterForm';

import logo from '../../../assets/sp2logodark.png';
import { handleLogout } from '../../../hooks/authUtils';

import { HamburgerIcon } from '@chakra-ui/icons';
import { FiLogOut } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { FaRegHeart, FaSignInAlt } from 'react-icons/fa';
import { TiUserAdd } from 'react-icons/ti';

function MobileNavbar() {
  const { user, setUser } = useAuth();
  const { credits } = useCredits();
  const navigate = useNavigate();
  const [isProfileNavOpen, setIsProfileNavOpen] = useState(false);
  const menuRef = useRef(null);

  const avatarRef = useRef(null);

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        avatarRef.current !== event.target
      ) {
        setTimeout(() => setIsProfileNavOpen(false), 100);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navigate and close profile menu
  const handleNavigation = (path) => {
    setIsProfileNavOpen(false);
    navigate(path);
  };

  return (
    <Flex
      position="fixed"
      bottom="0"
      left="0"
      justify="space-between"
      align="center"
      p="15px"
      bg="brand.100"
      w="full"
      zIndex="1000"
    >
      {user?.accessToken ? (
        <Flex
          position="fixed"
          bottom="0"
          left="0"
          justify="space-between"
          align="center"
          p="15px"
          bg="brand.100"
          w="full"
        >
          <Flex flexDirection="column" justify="center">
            <IconButton bg="brand.100" onClick={openMenu}>
              <HamburgerIcon boxSize="8" />
            </IconButton>
            <Text fontSize="xs">Categories</Text>
          </Flex>
          <Flex gap="4" align="center">
            <Flex direction="column" align="flex-end">
              <Link to={`/profile/${user.name}`}>
                <Text fontWeight="600">{user.name}</Text>
              </Link>
              <Text fontSize="xs">{credits} Credits</Text>
            </Flex>
            <Avatar
              id="profile-avatar"
              size="md"
              name={user?.name}
              src={user?.avatar?.url}
              onClick={() => setIsProfileNavOpen((prev) => !prev)}
              cursor="pointer"
              aria-label="Profile menu"
            />

            {/* Profile Navigation Menu */}
            {isProfileNavOpen && (
              <Flex
                ref={menuRef}
                position="absolute"
                bg="white"
                border="1px solid #eee"
                rounded="md"
                right="35px"
                bottom="75px"
                w="200px"
                direction="column"
                p="1rem"
                zIndex="1000"
                gap="2"
              >
                <Stack spacing="2">
                  <Flex
                    align="center"
                    gap="1"
                    cursor="pointer"
                    onClick={() => handleNavigation(`/profile/${user.name}`)}
                  >
                    <Icon as={CgProfile} />
                    <Text>My Profile</Text>
                  </Flex>
                  <Flex
                    align="center"
                    gap="1"
                    cursor="pointer"
                    onClick={() => handleNavigation(`/favorites`)}
                  >
                    <Icon as={FaRegHeart} />
                    <Text>My Favorites</Text>
                  </Flex>
                </Stack>
                <Divider my="2" />
                <Flex
                  align="center"
                  gap="1"
                  cursor="pointer"
                  onClick={() => {
                    handleNavigation('/');
                    handleLogout(setUser);
                    setIsProfileNavOpen(false);
                  }}
                >
                  <Icon as={FiLogOut} />
                  <Text>Logout</Text>
                </Flex>
              </Flex>
            )}
          </Flex>
        </Flex>
      ) : (
        <Flex
          position="fixed"
          bottom="0"
          left="0"
          justify="space-between"
          align="center"
          p="15px"
          bg="brand.100"
          w="full"
        >
          <Flex flexDirection="column" justify="center">
            <IconButton bg="brand.100" onClick={openMenu}>
              <HamburgerIcon boxSize="8" />
            </IconButton>
            <Text fontSize="xs">Categories</Text>
          </Flex>

          <Flex flexDirection="column" justify="center">
            <IconButton bg="brand.100" onClick={openLogin}>
              <Icon as={FaSignInAlt} boxSize="8" />
            </IconButton>
            <Text fontSize="xs">Sign in</Text>
          </Flex>

          <Flex flexDirection="column" justify="center">
            <IconButton bg="brand.100" onClick={openRegister}>
              <Icon as={TiUserAdd} boxSize="8" color="brand.600" />
            </IconButton>
            <Text fontSize="xs">Register</Text>
          </Flex>
        </Flex>
      )}

      <Drawer placement="left" onClose={closeMenu} isOpen={isMenuOpen}>
        <DrawerOverlay />
        <DrawerContent
          bg="white"
          color="black"
          w={{ base: '100%', md: '400px' }}
        >
          <DrawerCloseButton />
          <DrawerHeader>
            <Image src={logo} />
          </DrawerHeader>
          <DrawerBody>
            <Stack>
              <Link
                to="/auctions"
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
        title="Login to Your Account"
      >
        <LoginForm closeLogin={closeLogin} openRegister={openRegister} />
      </CustomModal>

      <CustomModal
        isOpen={isRegisterOpen}
        onClose={closeRegister}
        title="Create a New Account"
      >
        <RegisterForm closeRegister={closeRegister} openLogin={openLogin} />
      </CustomModal>
    </Flex>
  );
}

export default MobileNavbar;
