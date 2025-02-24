import { PropTypes } from 'prop-types';
import { Box, Image, Text, Link, IconButton } from '@chakra-ui/react';
import { formatDistanceToNow, isPast } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { EditIcon } from '@chakra-ui/icons';
import { useAuth } from '../../hooks/useAuth';

const AuctionCard = ({ listing, isProfilePage, sellerName }) => {
  const { user } = useAuth();

  // Convert listing end time to Date object
  const auctionEndTime = new Date(listing?.endsAt);

  // Check if auction has ended
  const hasEnded = isPast(auctionEndTime);

  // Format time remaining (or show "Auction Ended")
  const timeRemaining = hasEnded
    ? 'Auction has ended'
    : `Ends ${formatDistanceToNow(auctionEndTime, { addSuffix: true })}`;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/auctions/listing/${listing.id}`);
  };

  return (
    <Box>
      <Box position='relative'>
        <Image
          src={
            listing.media &&
            listing.media.length > 0 &&
            listing.media[0]?.url?.trim()
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
        {isProfilePage && user?.name === sellerName ? (
          <IconButton
            icon={<EditIcon />}
            size='sm'
            bg='black'
            color='white'
            _hover={{ bg: 'brand.600', color: 'white' }}
            position='absolute'
            top='2'
            right='2'
            aria-label='Change avatar'
            borderRadius='full'
          />
        ) : null}
      </Box>
      <Link fontWeight='bold' onClick={handleClick}>
        {listing.title}
      </Link>
      <Text color='black' mt='3'>
        Current bid:
      </Text>
      <Text fontSize='sm'>{listing._count.bids} Credits</Text>
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
  isProfilePage: PropTypes.boolean.isRequired,
  sellerName: PropTypes.string.isRequired,
};

export default AuctionCard;
