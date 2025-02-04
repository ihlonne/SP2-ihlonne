import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PropTypes } from 'prop-types';
import { handleRegister } from '../../../hooks/authUtils';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Divider,
  Flex,
  Text,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

const RegisterForm = ({ closeRegister, openLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await handleRegister(data);
      setSuccessMessage('Registration successful! You can now log in.');
      setTimeout(() => {
        setSuccessMessage('');
        closeRegister();
      }, 2000);
      closeRegister();
      openLogin();
    } catch (error) {
      setErrorMessage(
        error.response?.data?.errors[0]?.message || 'Registration failed'
      );
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Success & Error Messages */}
      {successMessage && (
        <Alert
          status='success'
          mb='4'
          bg='brand.400'
          border='1px'
          borderColor='accent.green'
          rounded='md'
        >
          <AlertIcon />
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert
          status='error'
          mb='4'
          bg='brand.300'
          border='1px'
          borderColor='accent.red'
          rounded='md'
        >
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}

      {/* Name Field */}
      <FormControl isInvalid={errors.name}>
        <FormLabel>Name</FormLabel>
        <Input
          type='text'
          placeholder='Enter your name'
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 3, message: 'Must be at least 3 characters' },
          })}
        />
        {errors.name && (
          <Text color='red.500' fontSize='sm'>
            {errors.name?.message}
          </Text>
        )}
      </FormControl>

      {/* Email Field - Fixed Regex Validation */}
      <FormControl isInvalid={errors.email}>
        <FormLabel>Email</FormLabel>
        <Input
          type='email'
          placeholder='name@stud.noroff.no'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/,
              message: 'Must be a @stud.noroff.no email',
            },
          })}
        />
        {errors.email && (
          <Text color='red.500' fontSize='sm'>
            {errors.email?.message}
          </Text>
        )}
      </FormControl>

      {/* Password Field - Fixed Validation */}
      <FormControl isInvalid={errors.password}>
        <FormLabel>Password</FormLabel>
        <Input
          type='password'
          placeholder='********'
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Must be at least 8 characters',
            },
          })}
        />
        {errors.password && (
          <Text color='red.500' fontSize='sm'>
            {errors.password?.message}
          </Text>
        )}
      </FormControl>

      {/* Register Button */}
      <Button
        type='submit'
        bg='brand.600'
        color='white'
        _hover={{ bg: 'brand.700' }}
        w='full'
        mt='4'
        isDisabled={loading}
      >
        {loading ? <Spinner size='sm' /> : 'Register'}
      </Button>

      {/* Divider & Link to Login */}
      <Divider mt='8' />
      <Flex align='center' gap='2' mt='4'>
        <Text fontSize='xs'>Already have an account?</Text>
        <Button
          bg='transparent'
          m='0'
          p='0'
          fontSize='xs'
          onClick={() => {
            closeRegister();
            openLogin();
          }}
        >
          Login here
        </Button>
      </Flex>
    </form>
  );
};

RegisterForm.propTypes = {
  closeRegister: PropTypes.func.isRequired,
  openLogin: PropTypes.func.isRequired,
};

export default RegisterForm;
