import {
  Flex,
  Button,
  Box,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

import { SearchIcon } from '@chakra-ui/icons';
import logo from '../../../assets/sp2logodark.png';

function Header() {
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
        <Button bg='white'>Sign in</Button>
        <Button bg='brand.600' color='white' _hover={{ bg: 'brand.700 ' }}>
          Register
        </Button>
      </Box>
    </Flex>
  );
}

export default Header;
