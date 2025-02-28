import { registerUser, loginUser } from '../api/authApi';

// User register
export async function handleRegister(userData) {
  try {
    const response = await registerUser(userData);
    return response;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
}

// User login
export async function handleLogin(credentials, setUser) {
  try {
    const response = await loginUser(credentials);
    const data = response.data;

    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('user', JSON.stringify(response));

    setUser(data);
    return data;
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error);
    throw error;
  }
}

// User logout
export async function handleLogout(setUser) {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  setUser(null);
  window.location.reload();
}
