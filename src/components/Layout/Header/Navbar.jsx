import { Flex, HStack, Divider } from '@chakra-ui/react';

import { Link } from 'react-router-dom';

function Navbar() {
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
  return (
    <Flex
      align="center"
      justify="center"
      p="5px"
      gap="5"
      w="full"
      borderY="1px"
      borderColor="brand.100"
    >
      <HStack spacing="8">
        <Link
          to="/auctions"
          style={{ display: 'block', padding: '10px 0', color: 'black' }}
        >
          View all listings
        </Link>
        <Divider orientation="vertical" h="8" />
        {categories.map((category) => (
          <Link
            key={category}
            to={`/auctions?category=${category.toLowerCase()}`}
            style={{
              display: 'inline-block',
              padding: '10px 0',
              color: 'black',
            }}
          >
            {category}
          </Link>
        ))}
      </HStack>
    </Flex>
  );
}

export default Navbar;
