import { registerUser } from '../api/authApi';
import { loginUser } from '../api/authApi';

export async function handleRegister(userData) {
  try {
    const response = await registerUser(userData);
    console.log('Registration successful:', response);
    return response;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
}

export async function handleLogin(credentials) {
  try {
    const response = await loginUser(credentials);

    localStorage.setItem('token', response.data.accessToken);
    localStorage.setItem('user', JSON.stringify(response.data));

    console.log('Login successful:', response);
    console.log('AccessToken:', response.data.accessToken);
    return response;
  } catch (error) {
    console.error('Error logging inn:', error.response?.data || error);
    throw error;
  }
}
