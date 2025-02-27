import api from './axios';

export const bidAuction = async (id, amount) => {
  try {
    // Place the bid
    const response = await api.post(`/auction/listings/${id}/bids`, {
      amount: amount, // ID is already in the URL, so it's not needed in the body
    });

    return response.data;
  } catch (error) {
    console.error('Failed to place a bid:', error);
    throw error;
  }
};
