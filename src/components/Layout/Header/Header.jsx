import {
  Flex,
  Button,
  Box,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import logo from '../../../assets/sp2logodark.png';
import CustomModal from '../../UI/Modal';
import RegisterForm from '../../UI/Forms/RegisterForm';
import LoginForm from '../../UI/Forms/LoginForm';

function Header() {
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
      <Image src={logo} maxH='30px' alt='Company logo' />
      <InputGroup maxW='400px'>
        <Input
          placeholder='Search listings...'
          bg='brand.100'
          border='none'
          id='searchbar'
          name='searchbar'
        />
        <InputRightElement>
          <IconButton bg='brand.100'>
            <SearchIcon />
          </IconButton>
        </InputRightElement>
      </InputGroup>

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
