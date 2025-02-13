import { PropTypes } from 'prop-types';
import { Box, Image, Text, Link } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const AuctionCard = ({ listing }) => {
  const timeRemaining = formatDistanceToNow(new Date(listing.endsAt), {
    addSuffix: true,
  });
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/auctions/listing/${listing.id}`);
  };

  return (
    <Box maxW='308px'>
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
      <Link fontWeight='bold' onClick={handleClick}>
        {listing.title}
      </Link>
      <Text color='black' mt='3'>
        Current bid:
      </Text>
      <Text fontSize='sm'>{listing._count.bids} Credits</Text>
      <Text fontSize='xs' mt='2'>
        Ends {timeRemaining}
      </Text>
    </Box>
  );
};

AuctionCard.propTypes = {
  listing: PropTypes.object.isRequired,
};

export default AuctionCard;
