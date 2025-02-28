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

// Create auction
export const createAuction = async (auctionData) => {
  try {
    const response = await api.post('/auction/listings', auctionData);
    return response.data;
  } catch (error) {
    console.error('Failed to create auction:', error.response?.data || error);
    throw error;
  }
};

// Update auction
export const updateAuction = async (id, auctionData) => {
  try {
    const response = await api.put(`/auction/listings/${id}`, auctionData);
    return response.data;
  } catch (error) {
    console.error('Failed to update auction:', error.response?.data || error);
    throw error;
  }
};

// Delete auction
export const deleteAuction = async (id) => {
  try {
    const response = await api.delete(`/auction/listings/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete auction:', error);
    throw error;
  }
};
