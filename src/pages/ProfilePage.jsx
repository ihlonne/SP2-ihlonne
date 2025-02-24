import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import AuctionCard from '../components/UI/AuctionCard';
import CustomModal from '../components/UI/Modal';
import EditProfileForm from '../components/UI/Forms/EditProfileForm';
import LoginForm from '../components/UI/Forms/LoginForm';
import RegisterForm from '../components/UI/Forms/RegisterForm';
import { useAuth } from '../hooks/useAuth';
import { getListings, getProfile, getWins } from '../api/profileApi';

function ProfilePage() {
  const { name } = useParams();
  const { user, setUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [listings, setListings] = useState([]);
  const [wins, setWins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('active');

  const toast = useToast();
  const now = new Date();

  const activeListings = listings.filter(
    (listing) => new Date(listing.endsAt) > now
  );
  const allListings = listings;

  useEffect(() => {
    const loadData = async () => {
      if (!user) {
        setIsLoginModalOpen(true);
        return;
      }

      try {
        setLoading(true);
        const profileData = await getProfile(name);
        const listingsData = await getListings(name);

        setProfile(profileData);
        setListings(listingsData);

        if (user.name === name) {
          const winsData = await getWins(name);
          setWins(winsData);
        } else {
          setWins([]);
        }
      } catch (error) {
        console.error('Error loading profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [name, user]);

  if (!user) {
    return (
      <>
        {/* Login Modal */}
        <CustomModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          title='Login Required'
        >
          <LoginForm
            closeLogin={() => setIsLoginModalOpen(false)}
            openRegister={() => {
              setIsLoginModalOpen(false);
              setIsRegisterModalOpen(true);
            }}
          />
        </CustomModal>

        {/* Register Modal */}
        <CustomModal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
          title='Create an Account'
        >
          <RegisterForm
            closeRegister={() => setIsRegisterModalOpen(false)}
            openLogin={() => {
              setIsRegisterModalOpen(false);
              setIsLoginModalOpen(true);
            }}
          />
        </CustomModal>
      </>
    );
  }

  if (loading) return <Text>Loading profile...</Text>;
  if (!profile) return <Text>Error: Profile not found.</Text>;

  const handleProfileUpdate = async () => {
    await getProfile(name);
    toast({ title: 'Profile updated successfully!', status: 'success' });
    setIsProfileModalOpen(false);
  };

  return (
    <Flex
      direction='column'
      justify='center'
      align='center'
      my={{ base: '12', md: '24' }}
      maxW='1290px'
      w={{ base: '90%', xl: '100%' }}
      mx='auto'
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify={{ base: 'center', md: 'flex-start' }}
        align={{ base: 'center', md: 'flex-start' }}
        w='100%'
      >
        <Box position='relative' w='100px' h='100px'>
          <Avatar size='2xl' name={profile.name} src={profile.avatar?.url} />
          {user.name === name ? (
            <IconButton
              icon={<FaCamera />}
              size='sm'
              bg='black'
              color='white'
              _hover={{ bg: 'brand.600', color: 'white' }}
              position='absolute'
              bottom='-22px'
              right='-22px'
              onClick={() => setIsProfileModalOpen(true)}
              aria-label='Change avatar'
              borderRadius='full'
            />
          ) : null}
        </Box>

        <Flex direction='column' align='flex-start' ml={{ base: 0, md: '16' }}>
          <Heading as='h2' mt='4'>
            {profile.name}
          </Heading>
          <Heading as='h3' size='xs' mt='4'>
            Bio
          </Heading>
          <Text fontSize='xs'>{profile.bio || 'No bio available.'}</Text>
        </Flex>
      </Flex>

      <Flex gap='6' borderBottom='1px solid #ccc' w='100%' mt='24'>
        {['all', 'active', ...(user.name === name ? ['wins'] : [])].map(
          (tab) => (
            <Text
              key={tab}
              cursor='pointer'
              fontWeight={selectedTab === tab ? 'bold' : 'normal'}
              position='relative'
              pb='4'
              _after={{
                content: '""',
                position: 'absolute',
                bottom: '-1px',
                left: '-1px',
                width: selectedTab === tab ? '100%' : '0',
                height: '4px',
                bg: selectedTab === tab ? 'brand.500' : 'transparent',
                transition: 'width 0.3s ease-in-out',
              }}
              onClick={() => setSelectedTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} (
              {tab === 'active'
                ? activeListings.length
                : tab === 'wins'
                ? wins.length
                : allListings.length}
              )
            </Text>
          )
        )}
      </Flex>

      <Grid
        w='100%'
        templateColumns='repeat(auto-fill, minmax(230px, 1fr))'
        gap='5'
        rowGap='12'
        mt='8'
        mb='24'
        mx='auto'
      >
        {selectedTab === 'all' &&
          (listings.length > 0 ? (
            listings.map((listing) => (
              <GridItem key={listing.id}>
                <AuctionCard listing={listing} w='100%' profile={profile} />
              </GridItem>
            ))
          ) : (
            <Text>No listings available.</Text>
          ))}
        {selectedTab === 'active' &&
          (activeListings.length > 0 ? (
            activeListings.map((listing) => (
              <GridItem key={listing.id}>
                <AuctionCard
                  listing={listing}
                  isProfilePage={true}
                  sellerName={profile?.name}
                  w='100%'
                />
              </GridItem>
            ))
          ) : (
            <Text>No active listings available.</Text>
          ))}
        {user.name === name &&
          selectedTab === 'wins' &&
          (wins.length > 0 ? (
            wins.map((win) => (
              <GridItem key={win.id}>
                <AuctionCard listing={win} w='100%' />
              </GridItem>
            ))
          ) : (
            <Text>No wins yet.</Text>
          ))}
      </Grid>

      <CustomModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title='Edit Profile'
      >
        <EditProfileForm
          profile={profile}
          onProfileUpdate={handleProfileUpdate}
          setUser={setUser}
        />
      </CustomModal>
    </Flex>
  );
}

export default ProfilePage;
