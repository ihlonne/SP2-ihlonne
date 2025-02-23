import api from './axios';

export const getProfile = async (name) => {
  try {
    const response = await api.get(`/auction/profiles/${name}`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch profiles:', error.response?.data || error);
    throw error;
  }
};

export const getListings = async (name) => {
  try {
    const response = await api.get(`/auction/profiles/${name}/listings`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch listings:', error);
    throw error;
  }
};

export const getWins = async (name) => {
  try {
    const response = await api.get(`/auction/profiles/${name}/wins`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch listings:', error);
    throw error;
  }
};
