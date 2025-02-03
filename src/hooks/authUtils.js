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
    console.log('Login successful:', response);
    return response;
  } catch (error) {
    console.error('Error logging inn:', error);
    throw error;
  }
}
