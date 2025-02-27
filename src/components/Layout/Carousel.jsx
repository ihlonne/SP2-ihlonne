import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import AuctionCard from '../UI/AuctionCard';
import PropTypes from 'prop-types';
import { Box, Heading, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Carousel = ({ title, listings }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <Box w='100%' maxW='1290px' mx='auto' py='4' position='relative'>
      <Heading
        display='inline-block'
        w='auto'
        as='h2'
        size='lg'
        fontWeight='500'
        borderBottom='1px'
        borderBottomWidth='3px'
        borderColor='brand.500'
        mb='8'
      >
        {title}
      </Heading>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={4}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          // Fix for Swiper not recognizing refs immediately
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          450: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {listings.map((listing) => (
          <SwiperSlide key={listing.id}>
            <AuctionCard listing={listing} sellerName={listing.seller?.name} />
          </SwiperSlide>
        ))}
      </Swiper>
      <IconButton
        ref={prevRef}
        icon={<ChevronLeftIcon />}
        position='absolute'
        top='45%'
        left='-20px'
        transform='translateY(-50%)'
        bg='white'
        borderRadius='full'
        boxShadow='md'
        _hover={{ bg: 'whiteAlpha.900' }}
        zIndex='10'
      />
      <IconButton
        ref={nextRef}
        icon={<ChevronRightIcon />}
        position='absolute'
        top='45%'
        right='-20px'
        transform='translateY(-50%)'
        bg='white'
        borderRadius='full'
        boxShadow='md'
        _hover={{ bg: 'whiteAlpha.900' }}
        zIndex='10'
      />
    </Box>
  );
};

Carousel.propTypes = {
  title: PropTypes.string.isRequired,
  listings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      media: PropTypes.array,
      endsAt: PropTypes.string.isRequired,
      _count: PropTypes.shape({
        bids: PropTypes.number,
      }),
    })
  ).isRequired,
};

export default Carousel;
