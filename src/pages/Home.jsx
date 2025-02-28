import {
  Heading,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import Carousel from '../components/Layout/Carousel';
import { useEffect, useState } from 'react';
import { getAuctions } from '../api/auctionApi';
import { sortListings } from '../hooks/auctionUtils';
import CustomModal from '../components/UI/Modal';
import RegisterForm from '../components/UI/Forms/RegisterForm';
import LoginForm from '../components/UI/Forms/LoginForm';
import { useAuth } from '../hooks/useAuth';

function Home() {
  const { user } = useAuth();
  const {
    isOpen: isRegisterOpen,
    onOpen: openRegister,
    onClose: closeRegister,
  } = useDisclosure();

  const {
    isOpen: isLoginOpen,
    onOpen: openLogin,
    onClose: closeLogin,
  } = useDisclosure();

  const [auctions, setAuctions] = useState([]);

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

  const lastChance = sortListings(auctions, 'ending_soon').slice(0, 10);
  const newlyAdded = sortListings(auctions, 'latest_added').slice(0, 10);

  return (
    <Flex direction='column' justify='center' align='center' mb='16' w='full'>
      <Flex
        w='100%'
        maxH={{ base: '100lvh', lg: '500px' }}
        mx='auto'
        position='relative'
        overflow='hidden'
        direction={{ base: 'column', lg: 'row' }}
      >
        <Flex w={{ base: ' 100%', lg: '40%' }} bg='brand.50'>
          <Flex
            justify='center'
            align='center'
            w='100%'
            px='12'
            py={{ base: '12', lg: 0 }}
          >
            {user ? (
              <Flex direction='column' gap='4' textAlign='center'>
                <Heading
                  as='h1'
                  fontSize={{ base: '2xl', xl: '4xl' }}
                  fontStyle='italic'
                  fontWeight='500'
                  textAlign='left'
                >
                  Welcome back, {user.name}
                </Heading>
                <Text textAlign='left'>
                  Find new auctions that match your interests and place your
                  bids before time runs out. The next great deal could be yours!
                </Text>

                <Flex gap='2' alignSelf='flex-start' mt='4'>
                  <Button
                    as={Link}
                    to='/favorites'
                    bg='brand.600'
                    color='white'
                  >
                    Your Favorites
                  </Button>
                  <Button
                    as={Link}
                    to='/auctions'
                    bg='transparent'
                    border='2px'
                    borderColor='brand.600'
                  >
                    View All Auctions
                  </Button>
                </Flex>
              </Flex>
            ) : (
              <Flex direction='column' gap='4' textAlign='center'>
                <Heading
                  as='h1'
                  fontSize={{ base: '2xl', xl: '4xl' }}
                  fontStyle='italic'
                  fontWeight='500'
                  textAlign='left'
                >
                  A new account means 1,000 credits in your pocket. Sign up and
                  enjoy the ride!
                </Heading>
                <Text textAlign='left'>
                  Discover exclusive auctions from trusted sellers worldwide.
                  From vintage collectibles to the latest tech, there&apos;s
                  something for everyone. Start bidding today and find your next
                  great deal!
                </Text>

                <Flex gap='2' alignSelf='flex-start' mt='4'>
                  <Button
                    onClick={openRegister}
                    bg='brand.600'
                    color='white'
                    _hover={{ bg: 'brand.700' }}
                  >
                    Register now
                  </Button>
                  <Button
                    as={Link}
                    to='/auctions'
                    bg='transparent'
                    border='2px'
                    borderColor='brand.600'
                  >
                    View Auctions
                  </Button>
                </Flex>
              </Flex>
            )}
          </Flex>
        </Flex>
        <Image
          src='https://images.pexels.com/photos/10361481/pexels-photo-10361481.jpeg'
          alt='Watch'
          w={{ base: '100%', lg: '60%' }}
          h={{ base: '300px', lg: '600px' }}
          objectFit='cover'
        />
      </Flex>

      <Flex mt='24' w={{ base: '80%', xl: '100%' }} justify='flex-start'>
        <Carousel title='Last chance' listings={lastChance} />
      </Flex>

      <Flex
        mt='24'
        w={{ base: '80%', xl: '100%' }}
        justify='flex-start'
        mb={{ base: '12', md: 0 }}
      >
        <Carousel title='Newly added' listings={newlyAdded} />
      </Flex>

      {/* Login Modal */}
      <CustomModal
        isOpen={isLoginOpen}
        onClose={closeLogin}
        title='Login to Your Account'
      >
        <LoginForm closeLogin={closeLogin} openRegister={openRegister} />
      </CustomModal>

      {/* Register Modal */}
      <CustomModal
        isOpen={isRegisterOpen}
        onClose={closeRegister}
        title='Create a New Account'
      >
        <RegisterForm closeRegister={closeRegister} openLogin={openLogin} />
      </CustomModal>
    </Flex>
  );
}

export default Home;
