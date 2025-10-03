import { SearchIcon } from '@chakra-ui/icons';
import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/auctions?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <Flex as="form" onSubmit={handleSearch}>
      <InputGroup maxW="400px">
        <Input
          value={query}
          placeholder="Search listings..."
          onChange={(e) => setQuery(e.target.value)}
          bg="brand.100"
          border="none"
        />
        <InputRightElement>
          <IconButton bg="brand.100" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

export default SearchBar;
