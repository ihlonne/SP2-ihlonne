import {
  Flex,
  Button,
  Box,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Divider,
  useDisclosure,
  FormControl,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import logo from '../../../assets/sp2logodark.png';
import CustomModal from '../../UI/Modal';

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

export default Header;
