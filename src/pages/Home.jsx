import { Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <VStack spacing={4} textAlign='center'>
      <Heading>Welcome to AuctionWave!</Heading>

      <Text>Sign up today and get 1000 free credits to start bidding!</Text>
      <Button as={Link} to='/auctions' colorScheme='blue'>
        View Auctions
      </Button>
    </VStack>
  );
}

export default Home;
