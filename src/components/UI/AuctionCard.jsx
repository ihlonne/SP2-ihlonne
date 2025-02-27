import { PropTypes } from 'prop-types';
import { Box, Image, Text, Link, IconButton, Flex } from '@chakra-ui/react';
import { formatDistanceToNow, isPast } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { EditIcon } from '@chakra-ui/icons';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import api from '../../api/axios';

const AuctionCard = ({ listing, isProfilePage, sellerName, onEdit }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [highestBid, setHighestBid] = useState(null);

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
        setHighestBid(0); // Fallback in case of an error
      }
    };

    fetchListingDetails();
  }, [listing.id]);

  const clickToListing = () => {
    navigate(`/auctions/listing/${listing.id}`);
  };

  const clickToProfile = () => {
    navigate(`/profile/${listing.seller.name}`);
  };

  return (
    <Box>
      <Box position='relative'>
        <Image
          src={
            listing.media?.length > 0
              ? listing.media[0].url
              : 'https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          }
          alt={listing.title || 'Auction Image'}
          w='100%'
          h='175px'
          objectFit='cover'
          rounded='md'
          mb='2'
        />
        {isProfilePage && user?.name === sellerName && onEdit && (
          <IconButton
            icon={<EditIcon />}
            size='sm'
            bg='black'
            color='white'
            _hover={{ bg: 'brand.600', color: 'white' }}
            position='absolute'
            top='2'
            right='2'
            aria-label='Edit listing'
            borderRadius='full'
            onClick={() => onEdit(listing)}
          />
        )}
      </Box>
      <Link fontWeight='bold' onClick={() => clickToListing()}>
        {listing.title}
      </Link>
      <Flex align='center' gap='1'>
        <Text fontSize='xs'>Auction by: </Text>

        <Link
          textDecoration='underline'
          fontSize='xs'
          onClick={() => clickToProfile()}
        >
          {listing.seller?.name || 'Unknown Seller'}
        </Link>
      </Flex>
      <Flex align='center' gap='2' mt='3'>
        <Text color='black'>Current bid: </Text>
        {highestBid !== null ? (
          <Text fontWeight='600'>{highestBid} Credits</Text>
        ) : (
          'Loading...'
        )}
      </Flex>
      <Text fontSize='sm'>({listing._count?.bids || 0} Bids)</Text>
      <Text
        fontSize='xs'
        mt='2'
        fontWeight={hasEnded ? 'bold' : 'normal'}
        color={hasEnded ? 'red.500' : 'black'}
      >
        {timeRemaining}
      </Text>
    </Box>
  );
};

AuctionCard.propTypes = {
  listing: PropTypes.object.isRequired,
  isProfilePage: PropTypes.bool,
  sellerName: PropTypes.string,
  onEdit: PropTypes.func,
};

export default AuctionCard;
