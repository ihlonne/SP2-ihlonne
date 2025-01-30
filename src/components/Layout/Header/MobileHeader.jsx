import {
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

import { SearchIcon } from '@chakra-ui/icons';
import logo from '../../../assets/sp2logodark.png';

function MobileHeader() {
  return (
    <Flex align='center' justify='space-between' p='15px' gap='5'>
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
    </Flex>
  );
}

export default MobileHeader;
