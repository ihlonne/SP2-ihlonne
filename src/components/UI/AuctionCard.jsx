import { PropTypes } from 'prop-types';
import {
  Box,
  Image,
  Text,
  Link,
  IconButton,
  Flex,
  useTheme,
} from '@chakra-ui/react';
import { formatDistanceToNow, isPast } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { EditIcon } from '@chakra-ui/icons';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useFavorites } from '../../context/FavoritesContext';

const AuctionCard = ({ listing, isProfilePage, sellerName, onEdit }) => {
  const { user } = useAuth();
  const theme = useTheme();
  const heartColor = theme.colors.accent.like;
  const navigate = useNavigate();
  const [highestBid, setHighestBid] = useState(null);
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(listing.id);

  // Ensure `endsAt` exists before formatting
  const auctionEndTime = listing?.endsAt ? new Date(listing.endsAt) : null;
  const hasEnded = auctionEndTime ? isPast(auctionEndTime) : false;
  const timeRemaining = auctionEndTime
    ? hasEnded
      ? 'Auction has ended'
      : `Ends ${formatDistanceToNow(auctionEndTime, { addSuffix: true })}`
    : 'No end time available';

  // Fetch highest bid
  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await api.get(
          `/auction/listings/${listing.id}?_bids=true`
        );
        const bids = response.data?.data?.bids || [];

        if (bids.length > 0) {
          setHighestBid(Math.max(...bids.map((bid) => bid.amount)));
        } else {
          setHighestBid(0);
        }
      } catch (error) {
        console.error('Failed to fetch bids:', error);
        setHighestBid(0);
      }
    };

    fetchListingDetails();
  }, [listing.id]);

  return (
    <Box position='relative' borderRadius='md' overflow='hidden'>
      {/* Auction Image */}
      <Image
        src={
          listing.media?.length > 0
            ? listing.media[0].url
            : 'https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
        alt={listing.title || 'Auction Image'}
        w='100%'
        h='175px'
        objectFit='cover'
        rounded='md'
        opacity={hasEnded ? 0.6 : 1}
      />

      {/* Favorite Button */}
      {user
        ? user?.name !== sellerName && (
            <IconButton
              size='sm'
              icon={
                isFavorite ? (
                  <FaHeart color={heartColor} />
                ) : (
                  <FaRegHeart color='gray' />
                )
              }
              position='absolute'
              top='2'
              right='2'
              aria-label='Toggle Favorite'
              borderRadius='full'
              onClick={() => toggleFavorite(listing.id)}
            />
          )
        : null}

      {/* Edit Button (Only if user is seller) */}
      {isProfilePage && user?.name === sellerName && onEdit && (
        <IconButton
          icon={<EditIcon />}
          size='sm'
          bg='black'
          color='white'
          _hover={{ bg: 'brand.600', color: 'white' }}
          position='absolute'
          top='2'
          right='2'
          aria-label='Edit listing'
          borderRadius='full'
          onClick={() => onEdit(listing)}
        />
      )}

      {/* Auction Details */}
      <Box p='4'>
        <Link
          fontWeight='bold'
          onClick={() => navigate(`/auctions/listing/${listing.id}`)}
        >
          {listing.title}
        </Link>

        {/* Seller Info */}
        <Flex align='center' gap='1'>
          <Text fontSize='xs'>Auction by: </Text>
          <Link
            textDecoration='underline'
            fontSize='xs'
            onClick={() => navigate(`/profile/${listing.seller.name}`)}
          >
            {sellerName || 'Unknown Seller'}
          </Link>
        </Flex>

        {/* Bid Information */}
        <Flex align='center' gap='2' mt='3'>
          <Text color='black'>Current bid: </Text>
          <Text fontWeight='600'>
            {highestBid !== null ? `${highestBid} Credits` : 'No Bids Yet'}
          </Text>
        </Flex>

        <Text fontSize='sm'>({listing._count?.bids || 0} Bids)</Text>

        {/* Auction End Status */}
        <Text
          fontSize='xs'
          mt='2'
          fontWeight='bold'
          color={hasEnded ? 'red.500' : 'black'}
        >
          {timeRemaining}
        </Text>
      </Box>
    </Box>
  );
};

AuctionCard.propTypes = {
  listing: PropTypes.object.isRequired,
  isProfilePage: PropTypes.bool,
  sellerName: PropTypes.string,
  onEdit: PropTypes.func,
};

export default AuctionCard;
