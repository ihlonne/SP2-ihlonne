import { PropTypes } from 'prop-types';
import {
  Box,
  Image,
  Text,
  Link,
  Flex,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertDescription,
  useToast,
} from '@chakra-ui/react';
import { formatDistanceToNow, isPast } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../hooks/useAuth';
import { useCredits } from '../../context/CreditContext';
import { bidAuction } from '../../api/biddingApi';

const AuctionList = ({ listing, sellerName }) => {
  const { user } = useAuth();
  const { credits, setCredits } = useCredits();
  const navigate = useNavigate();
  const toast = useToast();

  const [highestBid, setHighestBid] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(false);

  // Convert listing end time to Date object
  const auctionEndTime = new Date(listing?.endsAt);
  const hasEnded = isPast(auctionEndTime);
  const timeRemaining = hasEnded
    ? 'Auction has ended'
    : `Ends ${formatDistanceToNow(auctionEndTime, { addSuffix: true })}`;

  // Fetch full listing details to get bids
  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await api.get(
          `/auction/listings/${listing.id}?_bids=true`
        );
        const bids = response.data?.data?.bids || [];

        if (bids.length > 0) {
          const highest = Math.max(...bids.map((bid) => bid.amount));
          setHighestBid(highest);
        } else {
          setHighestBid(0); // No bids yet
        }
      } catch (error) {
        console.error('Failed to fetch full listing details:', error);
        setHighestBid(0);
      }
    };

    fetchListingDetails();
  }, [listing.id]);

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
        description: 'Please enter a valid bid amount.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (bidValue <= highestBid) {
      toast({
        title: 'Bid too low',
        description: `Your bid must be higher than ${highestBid} credits.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (bidValue > credits) {
      toast({
        title: 'Insufficient credits',
        description: `You only have ${credits} credits.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      await bidAuction(listing.id, bidValue);
      toast({
        title: 'Bid placed!',
        description: `Your bid of ${bidValue} credits was placed successfully.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setBidAmount('');
      setCredits((prev) => prev - bidValue);

      // Refresh listing details after a bid
      const response = await api.get(
        `/auction/listings/${listing.id}?_bids=true`
      );
      const newBids = response.data?.data?.bids || [];
      setHighestBid(
        newBids.length > 0 ? Math.max(...newBids.map((bid) => bid.amount)) : 0
      );
    } catch (error) {
      toast({
        title: 'Failed to place bid',
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

  const clickToListing = () => {
    navigate(`/auctions/listing/${listing.id}`);
  };

  const clickToProfile = () => {
    navigate(`/profile/${listing.seller?.name}`);
  };

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify='space-between'
      align='stretch'
      gap='6'
      h='auto'
      border='1px solid #eee'
      rounded='md'
      p='4'
      boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'
      w='full'
    >
      <Flex
        gap='4'
        direction={{ base: 'column', md: 'row' }}
        flex='1'
        wrap='wrap'
      >
        <Box w={{ base: '100%', md: '350px' }} h='200px' overflow='hidden'>
          <Image
            src={
              listing.media?.length > 0
                ? listing.media[0].url
                : 'https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
            alt={listing.title || 'Auction Image'}
            w='100%'
            h='100%'
            objectFit='cover'
            rounded='md'
            mb='2'
          />
        </Box>

        <Flex direction='column' justify='space-between' flex='1'>
          <Link
            fontWeight='bold'
            onClick={clickToListing}
            fontSize={{ base: 'md', md: 'lg' }}
          >
            {listing.title}
          </Link>

          <Flex align='center' gap='1'>
            <Text fontSize='xs'>Auction by: </Text>
            <Link
              textDecoration='underline'
              fontSize='xs'
              onClick={clickToProfile}
            >
              {sellerName || 'Unknown Seller'}
            </Link>
          </Flex>

          <Text fontSize='xs' maxW='450px'>
            {listing.description}
          </Text>

          <Flex direction='column'>
            <Flex align='center' gap='2'>
              <Text color='black'>Current bid: </Text>
              <Text fontWeight='600'>
                {highestBid !== null ? `${highestBid} Credits` : 'Loading...'}
              </Text>
            </Flex>
            <Text fontSize='sm'>({listing._count?.bids || 0} Bids)</Text>
          </Flex>

          <Text
            fontSize='xs'
            mt='2'
            fontWeight={hasEnded ? 'bold' : 'normal'}
            color={hasEnded ? 'red.500' : 'black'}
          >
            {timeRemaining}
          </Text>
        </Flex>
      </Flex>

      <Flex
        direction='column'
        justify='flex-end'
        align='flex-start'
        w={{ base: '100%', md: '200px' }}
      >
        <Flex as='form' direction='column' w='100%' onSubmit={handleBidSubmit}>
          <Input
            type='number'
            placeholder='Enter your bid'
            bg='brand.100'
            border='none'
            roundedBottom='0'
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            minW='100px'
          />
          <Button
            type='submit'
            bg='brand.900'
            _hover={{ bg: 'brand.700' }}
            color='white'
            roundedTop='0'
            px='8'
            isLoading={loading}
            w='full'
          >
            Submit a bid
          </Button>

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
              <AlertDescription fontSize='xs'>
                Please sign in to place a bid.
              </AlertDescription>
            </Alert>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

AuctionList.propTypes = {
  listing: PropTypes.object.isRequired,
  sellerName: PropTypes.string,
};

export default AuctionList;
