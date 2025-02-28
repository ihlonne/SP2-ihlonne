import api from './axios';

// Place bid on auction
export const bidAuction = async (id, amount) => {
  try {
    const response = await api.post(`/auction/listings/${id}/bids`, {
      amount: amount,
    });

    return response.data;
  } catch (error) {
    console.error('Failed to place a bid:', error);
    throw error;
  }
};
