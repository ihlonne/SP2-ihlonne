import api from './axios';

export const getAuctions = async () => {
  try {
    const response = await api.get('/auction/listings');
    const data = response.data;
    console.log(data);
    return data.data;
  } catch (error) {
    console.error('Failed to fetch auctions:', error.response?.data || error);
    throw error;
  }
};
