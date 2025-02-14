import api from './axios';

// Get all auctions
export const getAuctions = async (page = 1) => {
  try {
    const response = await api.get(
      `/auction/listings?_bids=true&_seller=true&_active=true&sort=created&order=desc&_page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch auctions:', error.response?.data || error);
    throw error;
  }
};

export const createAuction = async (auctionData) => {
  const response = await api.post('/auction/listings', auctionData);
  return response.data;
};

export const updateAuction = async (id, auctionData) => {
  const response = await api.put(`/auctions/listings/${id}`, auctionData);
  const data = response.data;

  return data;
};
