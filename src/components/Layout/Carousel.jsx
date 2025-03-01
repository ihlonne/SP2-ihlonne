import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import AuctionCard from '../UI/AuctionCard';
import PropTypes from 'prop-types';
import { Box, Heading } from '@chakra-ui/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Carousel = ({ title, listings }) => {
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
        navigation
        breakpoints={{
          320: { slidesPerView: 1 },
          450: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className='chakra-swiper'
      >
        {listings?.length > 0 ? (
          listings.map((listing) => (
            <SwiperSlide key={listing?.id || Math.random()}>
              <AuctionCard
                listing={listing}
                sellerName={listing?.seller?.name || 'Unknown'}
              />
            </SwiperSlide>
          ))
        ) : (
          <p>No listings available</p>
        )}
      </Swiper>
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
