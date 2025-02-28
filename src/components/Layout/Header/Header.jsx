import {
  Avatar,
  Flex,
  Button,
  Text,
  Box,
  Image,
  Icon,
  useDisclosure,
  Divider,
  Stack,
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import logo from '../../../assets/sp2logodark.png';
import CustomModal from '../../UI/Modal';
import RegisterForm from '../../UI/Forms/RegisterForm';
import LoginForm from '../../UI/Forms/LoginForm';
import { handleLogout } from '../../../hooks/authUtils';
import { useAuth } from '../../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../../UI/SearchBar';
import { useCredits } from '../../../context/CreditContext';
import { FaRegHeart } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
  const { user, setUser } = useAuth();
  const { credits } = useCredits();
  const navigate = useNavigate();
  const [isProfileNavOpen, setIsProfileNavOpen] = useState(false);
  const menuRef = useRef(null);

  const avatarRef = useRef(null);

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

  // Navigate and close menu
  const handleNavigation = (path) => {
    setIsProfileNavOpen(false);
    navigate(path);
  };

  return (
    <Flex align='center' justify='space-between' p='20px 100px' gap='5'>
      <Link to='/'>
        <Image src={logo} maxH='30px' alt='Company logo' />
      </Link>

      <SearchBar />

      {user?.accessToken ? (
        <Flex gap='4' align='center'>
          <Text>{credits} credits</Text>

          <Avatar
            ref={avatarRef}
            size='md'
            name={user?.name}
            src={user?.avatar?.url}
            onClick={() => setIsProfileNavOpen((prev) => !prev)}
            cursor='pointer'
            aria-label='Profile menu'
          />

          {/* Profile Navigation Menu */}
          {isProfileNavOpen && (
            <Flex
              ref={menuRef}
              position='absolute'
              bg='white'
              border='1px solid #eee'
              rounded='md'
              right='115px'
              top='75px'
              w='200px'
              direction='column'
              p='1rem'
              zIndex='1000'
              gap='2'
            >
              <Stack spacing='2'>
                <Flex
                  align='center'
                  gap='1'
                  cursor='pointer'
                  onClick={() => handleNavigation(`/profile/${user.name}`)}
                >
                  <Icon as={CgProfile} />
                  <Text>My Profile</Text>
                </Flex>
                <Flex
                  align='center'
                  gap='1'
                  cursor='pointer'
                  onClick={() => handleNavigation(`/favourites`)}
                >
                  <Icon as={FaRegHeart} />
                  <Text>My Favourites</Text>
                </Flex>
              </Stack>
              <Divider my='2' />
              <Flex
                align='center'
                gap='1'
                cursor='pointer'
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
      ) : (
        <Box gap='2'>
          <Button bg='white' onClick={openLogin}>
            Sign in
          </Button>
          <Button
            bg='brand.600'
            color='white'
            _hover={{ bg: 'brand.700 ' }}
            onClick={openRegister}
          >
            Register
          </Button>
        </Box>
      )}

      {/* Login Modal */}
      <CustomModal
        isOpen={isLoginOpen}
        onClose={closeLogin}
        title='Login to Your Account'
      >
        <LoginForm closeLogin={closeLogin} openRegister={openRegister} />
      </CustomModal>

      {/* Register Modal */}
      <CustomModal
        isOpen={isRegisterOpen}
        onClose={closeRegister}
        title='Create a New Account'
      >
        <RegisterForm closeRegister={closeRegister} openLogin={openLogin} />
      </CustomModal>
    </Flex>
  );
};

export default Header;
