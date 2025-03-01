import { Box, Heading, Text, VStack, Flex } from '@chakra-ui/react';

const About = () => {
  return (
    <Flex maxW='800px' py='12' h='90lvh' m='auto'>
      <VStack spacing='6' align='start'>
        <Heading as='h1' fontSize={{ base: '2xl', md: '3xl' }}>
          About Us
        </Heading>
        <Text fontSize='md' color='gray.600'>
          Welcome to NexBid, the ultimate platform for discovering, bidding on,
          and winning incredible auctions. Whether you&apos;re a collector, a
          seller, or just looking for a great deal, we&apor;ve built a seamless
          auction experience just for you.
        </Text>

        <Box>
          <Heading as='h2' fontSize='xl' mb='2'>
            Our Mission
          </Heading>
          <Text color='gray.600'>
            We aim to connect buyers and sellers in a{' '}
            <span style={{ fontWeight: 'bold' }}>
              secure, transparent, and user-friendly environment
            </span>
            . Our goal is to create a marketplace where everyone can{' '}
            <span style={{ fontWeight: 'bold' }}>bid with confidence</span> and
            find{' '}
            <span style={{ fontWeight: 'bold' }}>
              unique, high-quality items
            </span>
            .
          </Text>
        </Box>

        <Box>
          <Heading as='h2' fontSize='xl' mb='2'>
            Why Choose Us?
          </Heading>
          <Text color='gray.600'>
            <ul style={{ listStyle: 'none' }}>
              <li>User-Friendly Experience</li>
              <li>Intuitive navigation and smooth bidding</li>
              <li>Trusted Sellers</li>
              <li>Verified listings ensure quality and reliability</li>
              <li>Secure Transactions</li>
              <li>Your data and payments are protected</li>
              <li>Exciting Auctions</li>
              <li>
                Find everything from **vintage treasures** to **cutting-edge
                tech
              </li>
            </ul>
          </Text>
        </Box>

        <Box>
          <Heading as='h2' fontSize='xl' mb='2'>
            Join Our Community
          </Heading>
          <Text color='gray.600'>
            Be part of an auction experience like no other! Sign up today and
            start bidding, selling, and winning{' '}
            <span style={{ fontWeight: 'bold' }}>amazing deals</span>.
          </Text>
        </Box>

        <Text fontSize='sm' color='gray.500'>
          Have questions? Reach out to us at support@example.com.
        </Text>
      </VStack>
    </Flex>
  );
};

export default About;
