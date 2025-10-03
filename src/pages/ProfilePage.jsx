import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import api from '../api/axios';
import { getListings, getProfile, getWins } from '../api/profileApi';
import { deleteAuction, updateAuction } from '../api/auctionApi';

import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Skeleton,
  SkeletonCircle,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';

import AuctionCard from '../components/UI/AuctionCard';
import CustomModal from '../components/UI/Modal';
import EditProfileForm from '../components/UI/Forms/EditProfileForm';
import LoginForm from '../components/UI/Forms/LoginForm';
import RegisterForm from '../components/UI/Forms/RegisterForm';
import AuctionForm from '../components/UI/Forms/AuctionForm';

import { EditIcon } from '@chakra-ui/icons';

function ProfilePage() {
  const { name } = useParams();
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [listings, setListings] = useState([]);
  const [wins, setWins] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('active');

  const [editAuction, setEditAuction] = useState(null);
  const [isAuctionModalOpen, setIsAuctionModalOpen] = useState(false);

  const toast = useToast();
  const now = new Date();

  const activeListings = listings.filter(
    (listing) => new Date(listing.endsAt) > now
  );
  const allListings = listings;

  const fetchListings = async () => {
    try {
      const listingsData = await getListings(name);
      setListings(listingsData);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

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

          // Fetch seller info for each won auction
          const winsWithSellers = await Promise.all(
            winsData.map(async (win) => {
              try {
                const response = await api.get(
                  `/auction/listings/${win.id}?_seller=true`
                );
                return response.data?.data || win;
              } catch (error) {
                console.error(
                  `Error fetching seller for listing ${win.id}:`,
                  error
                );
                return win;
              }
            })
          );

          setWins(winsWithSellers);
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
          onClose={() => {
            navigate('/');
            setIsLoginModalOpen(false);
          }}
          title="Login Required"
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
          onClose={() => {
            navigate('/');
            setIsRegisterModalOpen(false);
          }}
          title="Create an Account"
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

  if (!profile) return <Text>Error: Profile not found.</Text>;

  const handleProfileUpdate = async () => {
    await getProfile(name);
    toast({ title: 'Profile updated successfully!', status: 'success' });
    setIsProfileModalOpen(false);
  };

  const handleEditAuction = (auction) => {
    setEditAuction(auction);
    setIsAuctionModalOpen(true);
  };

  // Update auction

  const handleAuctionUpdate = async (formData) => {
    setLoading(true);

    const formattedData = {
      ...formData,
      endsAt: new Date(formData.endsAt).toISOString(),
    };

    try {
      setLoading(true);
      await updateAuction(editAuction.id, formattedData);
      toast({
        title: 'Auction Updated!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setTimeout(() => {
        fetchListings();
        setIsAuctionModalOpen(false);
        setEditAuction(null);
      }, 3000);
    } catch (error) {
      toast({
        title: 'Failed to update auction.',
        description:
          error.response?.data?.errors?.[0]?.message || 'An error occurred.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete auction

  const handleAuctionDelete = async () => {
    try {
      await deleteAuction(editAuction.id);

      toast({
        title: 'Auction deleted',
        description: 'Your auction has been successfully deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        fetchListings();
        setIsAuctionModalOpen(false);
        setEditAuction(null);
      }, 3000);
    } catch (error) {
      toast({
        title: 'Failed to delete auction',
        description:
          error.response?.data?.errors?.[0]?.message || 'An error occurred.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        // ✅ LOADING STATE
        <Flex
          direction="column"
          justify="center"
          align="center"
          my={{ base: '12', md: '24' }}
          maxW="1290px"
          w={{ base: '90%', xl: '100%' }}
          mx="auto"
        >
          {/* 🔹 Banner Skeleton */}
          <Skeleton height="260px" width="100%" />

          {/* 🔹 Avatar & User Info Skeleton */}
          <Flex direction="column" justify="center" align="center" w="100%">
            <Box position="relative" w="100px" h="100px" mt="-20">
              <SkeletonCircle size="24" />
            </Box>
            <Flex direction="column" align="center" mt="8">
              <Skeleton height="30px" width="150px" mb="2" />
              <Skeleton height="15px" width="250px" />
            </Flex>
          </Flex>

          {/* 🔹 Tabs Skeleton */}
          <Flex gap="6" borderBottom="1px solid #ccc" w="100%" mt="24">
            {['all', 'active', 'wins'].map((tab) => (
              <Skeleton key={tab} height="30px" width="80px" />
            ))}
          </Flex>

          {/* 🔹 Auction Listings Grid Skeleton */}
          <Grid
            w="100%"
            templateColumns="repeat(auto-fill, minmax(230px, 1fr))"
            gap="5"
            rowGap="12"
            mt="8"
            mb="24"
            mx="auto"
          >
            {Array(6)
              .fill('')
              .map((_, index) => (
                <Skeleton key={index} height="250px" rounded="md" />
              ))}
          </Grid>
        </Flex>
      ) : (
        <Flex
          direction="column"
          justify="center"
          align="center"
          my={{ base: '12', md: '24' }}
          maxW="1290px"
          w={{ base: '90%', xl: '100%' }}
          mx="auto"
        >
          <Box
            bgImage={profile.banner.url}
            bgRepeat="no-repeat"
            bgPosition="center"
            bgSize="cover"
            w="100%"
            h="260px"
          ></Box>
          <Flex direction="column" justify="center" align="center" w="100%">
            <Box position="relative" w="100px" h="100px" mt="-20">
              <Avatar
                size="2xl"
                name={profile.name}
                src={profile.avatar?.url}
                border="8px solid white"
              />
              {user.name === name ? (
                <IconButton
                  icon={<EditIcon />}
                  size="sm"
                  bg="black"
                  color="white"
                  _hover={{ bg: 'brand.600', color: 'white' }}
                  position="absolute"
                  bottom="-22px"
                  right="-22px"
                  onClick={() => setIsProfileModalOpen(true)}
                  aria-label="Change avatar"
                  borderRadius="full"
                />
              ) : null}
            </Box>

            <Flex direction="column" align="center" mt="8">
              <Heading as="h2" mt="4">
                {profile?.name || 'Unknown'}
              </Heading>
              <Text fontSize="xs" mt="4">
                {profile.bio || 'No bio available.'}
              </Text>
            </Flex>
          </Flex>

          <Flex gap="6" borderBottom="1px solid #ccc" w="100%" mt="24">
            {['all', 'active', ...(user.name === name ? ['wins'] : [])].map(
              (tab) => (
                <Text
                  key={tab}
                  cursor="pointer"
                  fontWeight={selectedTab === tab ? 'bold' : 'normal'}
                  position="relative"
                  pb="4"
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
            w="100%"
            templateColumns="repeat(auto-fill, minmax(230px, 1fr))"
            gap="5"
            rowGap="12"
            mt="8"
            mb="24"
            mx="auto"
          >
            {selectedTab === 'all' &&
              (listings.length > 0 ? (
                listings.map((listing) => (
                  <GridItem key={listing.id}>
                    <AuctionCard
                      listing={listing}
                      w="100%"
                      profile={profile}
                      sellerName={profile?.name}
                    />
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
                      onEdit={handleEditAuction}
                      w="100%"
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
                    <AuctionCard
                      listing={win}
                      w="100%"
                      sellerName={win.seller?.name || 'Unknown Seller'}
                    />
                  </GridItem>
                ))
              ) : (
                <Text>No wins yet.</Text>
              ))}
          </Grid>

          <CustomModal
            isOpen={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
            title="Edit Profile"
          >
            <EditProfileForm
              profile={profile}
              onProfileUpdate={handleProfileUpdate}
              setUser={setUser}
            />
          </CustomModal>

          <CustomModal
            isOpen={isAuctionModalOpen}
            onClose={() => setIsAuctionModalOpen(false)}
            title="Edit Auction"
          >
            <AuctionForm
              onSubmit={handleAuctionUpdate}
              auctionData={editAuction}
              onDelete={handleAuctionDelete}
            />
          </CustomModal>
        </Flex>
      )}
    </>
  );
}

export default ProfilePage;
