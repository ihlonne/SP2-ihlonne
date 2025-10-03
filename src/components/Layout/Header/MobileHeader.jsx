import { Flex, Image } from '@chakra-ui/react';

import logo from '../../../assets/sp2logodark.png';

import { Link } from 'react-router-dom';
import SearchBar from '../../UI/SearchBar';

function MobileHeader() {
  return (
    <Flex align="center" justify="space-between" p="15px" gap="5">
      <Link to="/">
        <Image src={logo} maxH="30px" alt="Company logo" />
      </Link>
      <SearchBar />
    </Flex>
  );
}

export default MobileHeader;
