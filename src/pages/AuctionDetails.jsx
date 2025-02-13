import {
  Alert,
  AlertDescription,
  AlertIcon,
  Avatar,
  Button,
  CloseButton,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  InputGroup,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import Carousel from '../components/Layout/Carousel';
import { sortListings } from '../hooks/auctionUtils';
import { useEffect, useState } from 'react';
import { getAuctions } from '../api/auctionApi';
import api from '../api/axios';
import { formatDistanceToNow } from 'date-fns';

const AuctionDetails = () => {
  const { id } = useParams();
  const [auctions, setAuctions] = useState([]);
  const [listing, setListing] = useState(null);

  /*   const [infoMessage, setInfoMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 */
  useEffect(() => {
    const getListing = async () => {
      try {
        const response = await api.get(`/auction/listings/${id}`);
        const data = response.data;
        setListing(data);
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

  // Convert to a more readable time
  const timeRemaining = formatDistanceToNow(new Date(listing.data.endsAt), {
    addSuffix: true,
  });

  const listingCreatedAt = new Date(listing.data.created);

  return (
    <Flex direction='column' justify='center' align='center' mb='16' w='full'>
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 50%)' }}
        gap='16'
        maxW='1290px'
        w='100%'
        mt='24'
      >
        <Image
          src={
            listing.data.media &&
            listing.data.media.length > 0 &&
            listing.data.media[0]?.url?.trim()
              ? listing.data.media[0].url
              : 'https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          }
          alt={listing.data.title}
          w='100%'
          maxH='400px'
          objectFit='cover'
        />

        <Flex direction='column'>
          <Text fontSize='s' fontWeight='400'>
            Current Bid
          </Text>
          <Heading as='h2' mb='8'>
            {listing.data._count.bids} Credits
          </Heading>
          <Text>Auction ends {timeRemaining}</Text>
          <Text fontSize='xs' fontWeight='400'>
            Created at:{' '}
            {`${listingCreatedAt.getDate()}/${
              listingCreatedAt.getMonth() + 1
            }/${listingCreatedAt.getFullYear()}`}
          </Text>
          <Flex direction='column' as='form' mt='8'>
            <InputGroup maxW='400px' w='100%'>
              <Input
                placeholder='Search listings...'
                bg='brand.100'
                border='none'
              />
              <Button
                bg='brand.900'
                color='white'
                roundedLeft='0'
                roundedRight='md'
                px='8'
              >
                Submit a bid
              </Button>
            </InputGroup>

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
              <CloseButton />
            </Alert>
          </Flex>
        </Flex>
      </Grid>

      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 50%)' }}
        gap='16'
        maxW='1290px'
        w='100%'
        mt='16'
      >
        <Flex direction='column'>
          <Heading as='h1'>{listing.data.title}</Heading>
          <Text my='12'>{listing.data.description}</Text>
          <Flex gap='4' align='center'>
            <Text>Auction held by</Text>
            <Flex gap='2' align='center'>
              <Link to='/profile'>
                <Avatar
                  size='sm'
                  name={listing.data.name}
                  src={listing.data.avatar?.url}
                />
              </Link>
              <Link to='/profile'>
                <Text>linnie</Text>
              </Link>
            </Flex>
          </Flex>
        </Flex>

        <Flex direction='column'>
          <Heading as='h2' mb='12'>
            Bidding history
          </Heading>
          {listing.data?._count?.bids > 0 ? (
            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                  <Tr>
                    <Td>feet</Td>
                    <Td>centimetres (cm)</Td>
                    <Td isNumeric>30.48</Td>
                  </Tr>
                  <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr>
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          ) : (
            <Text>No bids yet. Be the first one!</Text>
          )}
        </Flex>
      </Grid>

      <Flex
        mt='24'
        w={{ base: '80%', xl: '100%' }}
        justify='flex-start'
        mb={{ base: '12', md: 0 }}
      >
        <Carousel title='Featured listings' listings={randomAuctions} />
      </Flex>
    </Flex>
  );
};

export default AuctionDetails;
