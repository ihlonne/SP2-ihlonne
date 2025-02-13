import {
  Box,
  Image,
  HStack,
  Divider,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
} from '@chakra-ui/react';
import logo from '../../assets/sp2logolight.png';
import CustomModal from '../UI/Modal';
import { Link } from 'react-router-dom';

function Footer() {
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
    <Box
      as='footer'
      display='flex'
      flexDirection={{ base: 'column', md: 'row' }}
      justifyContent='space-between'
      alignItems='center'
      gap={{ base: '20', md: '0' }}
      w='full'
      bg='black'
      p={{ base: '24px 8px', md: '24px 80px' }}
      mt='auto'
      position='relative'
      bottom={{ base: '80px', md: '0' }}
    >
      <Link to='/'>
        <Image src={logo} alt='Company logo' maxH='40px' />
      </Link>
      <HStack spacing={{ base: '4', md: '8' }}>
        <Button
          to='/auctions'
          bg='transparent'
          color='white'
          m='0'
          p='0'
          _hover={{ bg: 'transparent', textDecoration: 'underline' }}
          onClick={openLogin}
        >
          Login
        </Button>
        <Button
          to='/auctions'
          bg='transparent'
          color='white'
          m='0'
          p='0'
          _hover={{ bg: 'transparent', textDecoration: 'underline' }}
          onClick={openRegister}
        >
          Register
        </Button>
        <Divider orientation='vertical' h='6' />
        <Link to='/privacy' style={{ color: 'white' }}>
          Privacy & Policy
        </Link>
      </HStack>
      <Link href='https://github.com/ihlonne' color='white'>
        © ihlonne
      </Link>

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
    </Box>
  );
}

export default Footer;
