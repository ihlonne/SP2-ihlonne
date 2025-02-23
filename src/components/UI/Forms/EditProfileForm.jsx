import { useState } from 'react';
import api from '../../../api/axios';
import PropTypes from 'prop-types';
import {
  Input,
  Button,
  Box,
  useToast,
  FormLabel,
  Stack,
} from '@chakra-ui/react';

const EditProfileForm = ({ profile, onProfileUpdate, setUser }) => {
  const toast = useToast();

  const [formData, setFormData] = useState({
    bio: profile.bio || '',
    avatar: profile.avatar?.url || '',
    banner: profile.banner?.url || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {};
    if (formData.bio.trim() !== '') payload.bio = formData.bio;
    if (formData.avatar.trim() !== '')
      payload.avatar = { url: formData.avatar };
    if (formData.banner.trim() !== '')
      payload.banner = { url: formData.banner };

    if (Object.keys(payload).length === 0) {
      toast({ title: 'Please update at least one field!', status: 'warning' });
      return;
    }

    try {
      const response = await api.put(
        `/auction/profiles/${profile.name}`,
        payload
      );

      console.log('API Response:', response.data); // ✅ Check API response

      const updatedProfile = response.data.data;

      setUser((prevUser) => ({
        ...prevUser,
        bio: updatedProfile.bio,
        avatar: updatedProfile.avatar,
        banner: updatedProfile.banner,
      }));

      onProfileUpdate();
      toast({ title: 'Profile updated successfully!', status: 'success' });
    } catch (error) {
      console.error('Failed to update profile:', error.response?.data || error);
      toast({
        title: 'Failed to update profile.',
        description: error.response?.data?.message || 'Something went wrong.',
        status: 'error',
      });
    }
  };
  return (
    <Box as='form' onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <FormLabel>Bio:</FormLabel>
        <Input
          name='bio'
          placeholder='Bio'
          value={formData.bio}
          onChange={handleChange}
        />
        <FormLabel>Avatar URL:</FormLabel>
        <Input
          name='avatar'
          placeholder='Enter Avatar URL'
          value={formData.avatar}
          onChange={handleChange}
        />
        <FormLabel>Banner URL:</FormLabel>
        <Input
          name='banner'
          placeholder='Enter Banner URL'
          value={formData.banner}
          onChange={handleChange}
        />
        <Button type='submit' colorScheme='blue'>
          Save
        </Button>
      </Stack>
    </Box>
  );
};

// PropTypes validation
EditProfileForm.propTypes = {
  profile: PropTypes.object.isRequired,
  onProfileUpdate: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default EditProfileForm;
