import { Box, Image, Text, Link } from '@chakra-ui/react';

const AuctionCard = ({ title, image, currentBid, bids }) => {
  return (
    <Box borderRadius='sm' overflow='hidden' p={4}>
      <Image src={image} alt={title} />
      <Link fontWeight='bold'>{title}</Link>
      <Text color='black'>Current bid:{currentBid} Credits</Text>
      <Text>({bids}) bids</Text>
    </Box>
  );
};

export default AuctionCard;
