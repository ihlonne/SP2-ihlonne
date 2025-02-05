import { PropTypes } from 'prop-types';
import { Box, Image, Text, Link } from '@chakra-ui/react';

const AuctionCard = ({ listing }) => {
  const getHoursRemaining = (endTime) => {
    const endDate = new Date(endTime);
    const now = new Date();

    const diffMs = endDate - now;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    return diffHours > 0 ? `${diffHours} hours remaining` : 'Auction ended';
  };

  return (
    <Box p={4} maxW='300px'>
      <Image
        src={listing.media[0]?.url}
        alt={listing.title}
        w='100%'
        h='175px'
        objectFit='cover'
        rounded='lg'
        mb='2'
      />
      <Link fontWeight='bold'>{listing.title}</Link>
      <Text color='black' mt='3'>
        Current bid:
      </Text>
      <Text fontSize='sm'>{listing._count.bids} Credits</Text>
      <Text fontSize='xs' mt='2'>
        {getHoursRemaining(listing.endsAt)}
      </Text>
    </Box>
  );
};

AuctionCard.propTypes = {
  listing: PropTypes.object.isRequired,
};

export default AuctionCard;
