import { useEffect, useState } from 'react';
import { Flex, Grid, GridItem, Heading, Skeleton } from '@chakra-ui/react';
import AuctionCard from '../components/UI/AuctionCard';
import api from '../api/axios';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [visibleCount] = useState(8);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      const storedFavorites =
        JSON.parse(localStorage.getItem('favorites')) || [];

      if (storedFavorites.length === 0) {
        setFavorites([]);
        return;
      }

      try {
        const favoriteListings = await Promise.all(
          storedFavorites.map(async (id) => {
            const response = await api.get(
              `/auction/listings/${id}?_seller=true&_bids=true`
            );
            return response.data; // Extract response data
          })
        );
        setFavorites(favoriteListings);
      } catch (error) {
        console.error('Error fetching favorite auctions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (!favorites.length) {
    return (
      <Flex direction='column' align='center' maxW='1200px' w='100%' mx='auto'>
        <Heading>Your Favorite Auctions</Heading>

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
          {Array(6)
            .fill('')
            .map((_, index) => (
              <Skeleton key={index} height='250px' rounded='md' />
            ))}
        </Grid>
      </Flex>
    );
  }

  return (
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
      mt='16'
    >
      <Heading display='flex' alignSelf='flex-start' mt='10' mb='6'>
        Your Favorite Auctions
      </Heading>
      {loading ? (
        // ✅ LOADING STATE (Show Skeletons)
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
          {Array(6)
            .fill('')
            .map((_, index) => (
              <Skeleton key={index} height='250px' rounded='md' />
            ))}
        </Grid>
      ) : (
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
          {favorites.length > 0 ? (
            favorites.slice(0, visibleCount).map(({ data }) => (
              <GridItem key={data.id}>
                <AuctionCard
                  listing={data}
                  sellerName={data.seller?.name}
                  setFavorites={setFavorites}
                />
              </GridItem>
            ))
          ) : (
            <p>No favorites yet</p>
          )}
        </Grid>
      )}
    </Flex>
  );
};

export default Favorites;
