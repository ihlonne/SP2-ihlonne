import { useState, useEffect } from 'react';
import {
  Avatar,
  Flex,
  Button,
  Text,
  Box,
  IconButton,
  Image,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import logo from '../../../assets/sp2logodark.png';
import CustomModal from '../../UI/Modal';
import RegisterForm from '../../UI/Forms/RegisterForm';
import LoginForm from '../../UI/Forms/LoginForm';
import { handleLogout } from '../../../hooks/authUtils';
import { useAuth } from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import SearchBar from '../../UI/SearchBar';
import { getProfile } from '../../../api/profileApi';

function Header() {
  const { user, setUser } = useAuth();
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserCredits = async () => {
      if (user?.name) {
        try {
          const profileData = await getProfile(user.name);
          setCredits(profileData.credits);
        } catch (error) {
          console.error('Failed to fetch credits:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    getUserCredits();
  }, [user]);

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

  return (
    <Flex align='center' justify='space-between' p='20px 80px' gap='5'>
      <Link to='/'>
        <Image src={logo} maxH='30px' alt='Company logo' />
      </Link>

      <SearchBar />

      {user?.accessToken ? (
        <Flex gap='4' align='center'>
          {!loading && <Text>{credits} credits</Text>}
          <Link to={`/profile/${user.name}`}>
            <Avatar size='sm' name={user?.name} src={user?.avatar?.url} />
          </Link>

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
}

export default Header;
