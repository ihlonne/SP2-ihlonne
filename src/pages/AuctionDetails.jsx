import {
  Alert,
  AlertDescription,
  AlertIcon,
  Avatar,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  InputGroup,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import Carousel from '../components/Layout/Carousel';
import { sortListings } from '../hooks/auctionUtils';
import { useEffect, useState } from 'react';
import { getAuctions } from '../api/auctionApi';
import api from '../api/axios';
import { formatDistanceToNow } from 'date-fns';
import BiddingTable from '../components/UI/BiddingTable';
import { useAuth } from '../hooks/useAuth';
import { bidAuction } from '../api/biddingApi';
import { useCredits } from '../context/CreditContext';

import { getProfile } from '../api/profileApi';

const AuctionDetails = () => {
  const { id } = useParams();
  const { user } = useAuth() || {};
  const { credits, setCredits } = useCredits();

  const [auctions, setAuctions] = useState([]);
  const [listing, setListing] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const auctionEnded = new Date(listing?.data?.endsAt) < new Date();
  const auctionEndDate = listing?.data?.endsAt
    ? new Date(listing.data.endsAt)
    : null;
  const now = new Date();

  const timeRemaining =
    auctionEndDate && !isNaN(auctionEndDate.getTime())
      ? auctionEndDate > now
        ? `Auction ends ${formatDistanceToNow(auctionEndDate, {
            addSuffix: true,
          })}`
        : `Auction ended ${formatDistanceToNow(auctionEndDate, {
            addSuffix: true,
          })}`
      : 'Auction date unavailable';

  const toast = useToast();

  useEffect(() => {
    const getListing = async () => {
      try {
        const response = await api.get(
          `/auction/listings/${id}?_seller=true&_bids=true`
        );
        const data = response.data;
        setListing(data);

        setSelectedImage(
          data?.data?.media?.[0]?.url ||
            'https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        );
      } catch (error) {
        console.error('Failed to fetch listing:', error);
      }
    };

    getListing();
  }, [id]);

  useEffect(() => {
    async function fetchListings() {
      const data = await getAuctions();
      let processedListings = data.data.filter(
        (item) =>
          !item.title.toLowerCase().includes('test') &&
          !item.title.toLowerCase().includes('yo')
      );
      setAuctions(processedListings);
    }
    fetchListings();
  }, []);

  // Fetch random auctions for "featured listings"
  const randomAuctions = sortListings(auctions)
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  if (!listing) {
    return <div>Loading...</div>;
  }

  // Convert to a more readable date
  const listingCreatedAt = new Date(listing.data.created);
  const listingUpdatedAt = new Date(listing.data.updated);

  const handleBidSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'You must be signed in to place a bid.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const bidValue = Number(bidAmount);

    if (isNaN(bidValue) || bidValue <= 0) {
      toast({
        title: 'Invalid bid',
        description: 'Please enter a valid bid amount',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const highestBid = listing?.data?.bids?.length
      ? Math.max(...listing.data.bids.map((bid) => bid.amount))
      : 0;

    const lastBidder = listing.data?.bids.length
      ? listing.data.bids[listing.data.bids.length - 1].bidder.name
      : null;

    if (lastBidder === user.name) {
      toast({
        title: 'Cannot bid twice in a row',
        description: 'You cannot outbid yourself. Please wait for another bid.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (bidValue <= highestBid) {
      toast({
        title: 'Bid is too low',
        description: `Your bid must be higher than ${highestBid} credits.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (bidValue > credits) {
      toast({
        title: 'Not enough credits',
        description: `You only have ${credits} credits.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await bidAuction(id, bidValue);
      toast({
        title: 'Bid placed!',
        description: `Your bid of ${bidValue} credits has been placed successfully.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setBidAmount('');

      const profileData = await getProfile(user.name);
      setCredits(profileData.credits);

      const response = await api.get(
        `/auction/listings/${id}?_seller=true&_bids=true`
      );
      setListing(response.data);
    } catch (error) {
      toast({
        title: 'Failed to place a bid',
        description:
          error.response?.data?.errors?.[0]?.message || 'An error occurred.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <Flex direction='column' justify='center' align='center' mb='16' w='full'>
      <Grid
        templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
        gap='16'
        maxW='1290px'
        w={{ base: '90%', md: '90%', lg: '90% ', xl: '100%' }}
        mt='24'
      >
        <Flex direction='column'>
          {/* Main Image */}
          <Image
            src={selectedImage}
            alt={listing.data.title}
            w='100%'
            maxH='400px'
            objectFit='cover'
            rounded='md'
            mb='4'
          />

          {/* Thumbnails - Only show if there are extra images */}
          {listing.data.media.length > 1 && (
            <Flex gap='2' justify='center'>
              {listing.data.media.map((img, index) => (
                <Image
                  key={index}
                  src={img.url}
                  alt={listing.data.title}
                  w='60px'
                  h='60px'
                  objectFit='cover'
                  cursor='pointer'
                  rounded='md'
                  border={
                    selectedImage === img.url ? '2px solid black' : 'none'
                  }
                  onClick={() => setSelectedImage(img.url)}
                  _hover={{ opacity: 0.8 }}
                />
              ))}
            </Flex>
          )}
        </Flex>

        <Flex direction='column' gap='12' w='100%'>
          <Flex direction='column' w={{ base: '90%', md: '100%' }}>
            <Heading as='h1' size={{ base: 'md', md: 'xl' }}>
              {listing.data.title}
            </Heading>
            <Flex gap='2' align='center' mt='4' wrap='wrap'>
              <Text>Auction held by</Text>
              <Flex gap='2' align='center'>
                <Link to={user?.name ? `/profile/${user.name}` : '#'}>
                  <Avatar
                    size='xs'
                    name={listing.data.seller.name}
                    src={listing.data.seller.avatar?.url}
                  />
                </Link>
                <Link
                  to={
                    listing?.data?.seller?.name
                      ? `/profile/${listing.data.seller.name}`
                      : '#'
                  }
                >
                  <Text>{listing.data.seller.name}</Text>
                </Link>
              </Flex>
            </Flex>
            <Text my='12' fontSize={{ base: 'sm', md: 'md' }}>
              {listing.data.description}
            </Text>
          </Flex>

          <Flex direction='column' w={{ base: '90%', md: '100%' }}>
            <Text fontSize='s' fontWeight='400'>
              Current Bid
            </Text>
            <Heading as='h2' mb='8' size='md'>
              {listing.data.bids?.length > 0
                ? Math.max(...listing.data.bids.map((bid) => bid.amount))
                : 0}{' '}
              Credits
            </Heading>
            <Text>{timeRemaining}</Text>
            <Flex justify='space-between' maxW='400px' w='100%'>
              <Text fontSize='xs' fontWeight='400'>
                Created at:{' '}
                {`${listingCreatedAt.getDate()}/${
                  listingCreatedAt.getMonth() + 1
                }/${listingCreatedAt.getFullYear()}`}
              </Text>
              <Text fontSize='xs' fontWeight='400'>
                Last updated:{' '}
                {`${listingUpdatedAt.getDate()}/${
                  listingUpdatedAt.getMonth() + 1
                }/${listingUpdatedAt.getFullYear()}`}
              </Text>
            </Flex>
            <Flex
              direction='column'
              as='form'
              mt='8'
              onSubmit={handleBidSubmit}
            >
              <InputGroup maxW='400px' w='100%'>
                <Input
                  type='number'
                  placeholder='Enter your bid'
                  value={bidAmount}
                  bg='brand.100'
                  border='none'
                  roundedRight='md'
                  onChange={(e) => setBidAmount(e.target.value)}
                  disabled={!user}
                />
                <Button
                  type='submit'
                  bg='brand.900'
                  color='white'
                  roundedLeft='0'
                  roundedRight='md'
                  px='8'
                  isDisabled={!user || auctionEnded}
                >
                  Submit a bid
                </Button>
              </InputGroup>

              {!user && (
                <Alert
                  status='info'
                  mt='4'
                  bg='brand.200'
                  border='1px'
                  borderColor='purple'
                  rounded='md'
                  maxW='400px'
                  w='100%'
                >
                  <AlertIcon color='purple' />
                  <AlertDescription>
                    Please sign in to place a bid.
                  </AlertDescription>
                </Alert>
              )}
              {auctionEnded && (
                <Alert
                  status='error'
                  mt='4'
                  bg='brand.200'
                  border='1px'
                  borderColor='purple'
                  rounded='md'
                  maxW='400px'
                  w='100%'
                >
                  <AlertIcon color='purple' />
                  <AlertDescription>The auction has ended.</AlertDescription>
                </Alert>
              )}
            </Flex>
          </Flex>

          <Flex direction='column'>
            <Heading as='h2' mb='12'>
              Bidding history
            </Heading>
            {listing.data?._count?.bids > 0 ? (
              <BiddingTable bids={listing.data.bids} />
            ) : (
              <Text>No bids yet. Be the first one!</Text>
            )}
          </Flex>
        </Flex>
      </Grid>

      <Flex
        mt='24'
        w={{ base: '90%', xl: '100%' }}
        justify='flex-start'
        mb={{ base: '12', md: 0 }}
      >
        <Carousel title='Featured listings' listings={randomAuctions} />
      </Flex>
    </Flex>
  );
};

export default AuctionDetails;
