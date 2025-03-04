import { useCallback, useEffect, useState } from 'react';
import { createAuction, getAuctions } from '../api/auctionApi';

import { useAuth } from '../hooks/useAuth';
import { useLocation } from 'react-router-dom';

import {
  Grid,
  GridItem,
  Flex,
  IconButton,
  Text,
  Select,
  Icon,
  Button,
  Heading,
  Stack,
  useToast,
  Skeleton,
  SkeletonCircle,
} from '@chakra-ui/react';
import AuctionCard from '../components/UI/AuctionCard';
import AuctionList from '../components/UI/AuctionList';
import CustomModal from '../components/UI/Modal';
import AuctionForm from '../components/UI/Forms/AuctionForm';

import {
  filterByCategory,
  searchListings,
  sortListings,
} from '../hooks/auctionUtils';

import { FaListUl } from 'react-icons/fa';
import { IoGrid } from 'react-icons/io5';
import { AddIcon } from '@chakra-ui/icons';

const Auctions = () => {
  const toast = useToast();
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [sortOption, setSortOption] = useState('ending_soon');

  const [currentPage, setCurrentPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(8);

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAuction, setEditAuction] = useState(null);
  const [isGridView, setIsGridView] = useState(true);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const query = params.get('search') || '';
  const category = params.get('category') || '';

  const fetchListings = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const data = await getAuctions(page);
        let processedListings = data.data.filter(
          (item) =>
            !item.title.toLowerCase().includes('test') &&
            !item.title.toLowerCase().includes('yo') &&
            !item.title.toLowerCase().includes('string')
        );

        const uniqueListings = Array.from(
          new Map(processedListings.map((item) => [item.id, item])).values()
        );

        if (query) {
          processedListings = searchListings(uniqueListings, query);
        }

        if (category) {
          processedListings = filterByCategory(processedListings, category);
        }

        processedListings = sortListings(processedListings, sortOption);
        setListings(processedListings);

        setHasMore(processedListings.length > visibleCount);
      } catch (error) {
        console.error('Failed to fetch listings:', error);
      } finally {
        setLoading(false);
      }
    },
    [query, category, sortOption, visibleCount]
  );

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const handleCreateClick = () => {
    setEditAuction(null);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setLoading(true);

    const formattedData = {
      ...formData,
      endsAt: new Date(formData.endsAt).toISOString(),
    };

    try {
      await createAuction(formattedData);
      toast({
        title: 'Auction Created!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      fetchListings();
      setIsModalOpen(false);
    } catch (error) {
      toast({
        title: 'Failed to create auction.',
        description:
          error.response?.data?.errors?.[0]?.message || 'An error occurred.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setVisibleCount((prevCount) => prevCount + 12);
      setCurrentPage((prevPage) => prevPage + 1);
      fetchListings(currentPage + 1);
    }
  };

  return (
    <>
      {loading ? (
        <Flex
          direction='column'
          mx='auto'
          maxW='1200px'
          w='100%'
          minH='100vh'
          justify='flex-start'
          align='center'
          px={{ base: '8', xl: 0 }}
          pb={{ base: '12', xl: 0 }}
        >
          {/* 🔹 Filter & Sorting Skeleton */}
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify='space-between'
            align={{ base: 'flex-start', md: 'center' }}
            gap={{ base: '4', md: '0' }}
            mt='16'
            w='full'
          >
            <Flex gap='2' align='center'>
              <SkeletonCircle size='10' />
              <SkeletonCircle size='10' />
              <Skeleton height='20px' width='100px' />
            </Flex>
            <Flex gap='4' direction={{ base: 'column', sm: 'row' }}>
              <Skeleton height='40px' width='150px' />
              <Skeleton height='40px' width='120px' />
            </Flex>
          </Flex>

          <Heading display='flex' alignSelf='flex-start' mt='10' mb='6'>
            Browse Auctions
          </Heading>

          {/* 🔹 Skeleton Grid for Auctions */}
          <Grid
            w='100%'
            templateColumns='repeat(auto-fill, minmax(230px, 1fr))'
            gap='5'
            rowGap='12'
            mt='8'
            mb='24'
            mx='auto'
            justify='flex-start'
          >
            {Array(8)
              .fill('')
              .map((_, index) => (
                <Skeleton key={index} height='250px' rounded='md' />
              ))}
          </Grid>

          {/* 🔹 Load More Button Skeleton */}
          <Skeleton height='40px' width='150px' mb='16' />
        </Flex>
      ) : (
        <Flex
          direction='column'
          mx='auto'
          maxW='1200px'
          w='100%'
          minH='100lvh'
          justify='flex-start'
          align='center'
          px={{ base: '8', xl: 0 }}
          pb={{ base: '12', xl: 0 }}
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
                bg={isGridView ? 'brand.600' : 'transparent'}
                color={isGridView ? 'white' : 'black'}
                border='1px'
                rounded='lg'
                borderColor='brand.100'
                onClick={() => setIsGridView(true)}
                aria-label='Grid View'
                icon={<Icon as={IoGrid} />}
              />
              <IconButton
                bg={!isGridView ? 'brand.600' : 'transparent'}
                color={!isGridView ? 'white' : 'black'}
                border='1px'
                rounded='lg'
                borderColor='brand.100'
                onClick={() => setIsGridView(false)}
                aria-label='List View'
                icon={<Icon as={FaListUl} />}
              />
              <Text>{listings.length} results</Text>
            </Flex>
            <Flex gap='4' direction={{ base: 'column', sm: 'row' }}>
              {user?.accessToken ? (
                <Stack direction='row' spacing='4'>
                  <Button
                    leftIcon={<AddIcon />}
                    bg='brand.600'
                    color='white'
                    _hover={{ bg: 'brand.700' }}
                    p='4'
                    fontSize='sm'
                    onClick={handleCreateClick}
                  >
                    New Auction
                  </Button>
                </Stack>
              ) : null}
              <Select
                placeholder='All auctions'
                onChange={(e) => setSortOption(e.target.value)}
                value={sortOption}
              >
                <option value='ending_soon'>Ending soon</option>
                <option value='latest_added'>Newly added</option>
                <option value='highest_bid'>Highest bid</option>
              </Select>
            </Flex>
          </Flex>
          <Heading display='flex' alignSelf='flex-start' mt='10' mb='6'>
            Browse Auctions
          </Heading>
          {isGridView ? (
            <Grid
              w='100%'
              templateColumns='repeat(auto-fill, minmax(230px, 1fr))'
              gap='5'
              rowGap='12'
              mt='8'
              mb='24'
              mx='auto'
              justify='flex-start'
            >
              {listings.length > 0 ? (
                listings.slice(0, visibleCount).map((listing) => (
                  <GridItem key={listing.id}>
                    <AuctionCard
                      listing={listing}
                      w='100%'
                      sellerName={listing.seller?.name}
                    />
                  </GridItem>
                ))
              ) : (
                <p>No listings available</p>
              )}
            </Grid>
          ) : (
            <Grid
              w='100%'
              templateColumns='1fr'
              gap='5'
              rowGap='12'
              mt='8'
              mb='24'
              mx='auto'
              justify='flex-start'
            >
              {listings.length > 0 ? (
                listings.slice(0, visibleCount).map((listing) => (
                  <GridItem key={listing.id}>
                    <AuctionList
                      listing={listing}
                      w='100%'
                      sellerName={listing.seller?.name}
                    />
                  </GridItem>
                ))
              ) : (
                <p>No listings available</p>
              )}
            </Grid>
          )}

          {hasMore && (
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

          <CustomModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title='Create a New Auction'
          >
            <AuctionForm
              onSubmit={handleFormSubmit}
              auctionData={editAuction}
            />
          </CustomModal>
        </Flex>
      )}
    </>
  );
};

export default Auctions;
