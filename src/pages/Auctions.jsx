import { useEffect, useState } from 'react';
import {
  SimpleGrid,
  GridItem,
  Flex,
  IconButton,
  Text,
  Select,
  Icon,
  Button,
  Heading,
} from '@chakra-ui/react';
import { getAuctions } from '../api/auctionApi';
import AuctionCard from '../components/UI/AuctionCard';
import { FaListUl } from 'react-icons/fa';
import { IoGrid } from 'react-icons/io5';

const Auctions = () => {
  const [listings, setListings] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchListings() {
      try {
        const data = await getAuctions();
        const validListings = data.filter(
          (listing) =>
            listing.media && listing.media.length > 0 && listing.media[0]?.url
        );
        setListings(validListings);
      } catch (error) {
        console.error('Failed to fetch listings:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchListings();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 12);
  };

  return (
    <Flex
      direction='column'
      mx='auto'
      maxW='1200px'
      w='100%'
      justify='center'
      align='center'
      px='8'
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify='space-between'
        align={{ base: 'flex-start', md: 'center' }}
        gap={{ base: '4', md: '0' }}
        mt='16'
        w='full'
      >
        <Flex gap='2' align='center'>
          <IconButton
            bg='transparent'
            border='1px'
            rounded='lg'
            borderColor='brand.100'
          >
            <Icon as={FaListUl} />
          </IconButton>
          <IconButton
            bg='transparent'
            border='1px'
            rounded='lg'
            borderColor='brand.100'
          >
            <Icon as={IoGrid} />
          </IconButton>
          <Text>{listings.length} results</Text>
        </Flex>
        <Select placeholder='Categories' maxW='250px'>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
      </Flex>
      <Heading display='flex' alignSelf='flex-start' mt='10' mb='6'>
        Browse Auctions
      </Heading>
      <SimpleGrid
        maxW='1200px'
        w='100%'
        minChildWidth='280px'
        spacing='16px'
        mt='8'
        mb='24'
        justifyContent='center'
      >
        {listings.length > 0 ? (
          listings.slice(0, visibleCount).map((listing, i) => (
            <GridItem key={i} w='300px'>
              <AuctionCard listing={listing} />
            </GridItem>
          ))
        ) : (
          <p>No listings available</p>
        )}
      </SimpleGrid>
      {visibleCount < listings.length && (
        <Button
          bg='brand.100'
          w='150px'
          mb='16'
          onClick={handleLoadMore}
          isLoading={loading}
        >
          Load more
        </Button>
      )}
    </Flex>
  );
};

export default Auctions;
