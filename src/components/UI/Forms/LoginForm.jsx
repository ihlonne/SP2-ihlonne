import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PropTypes } from 'prop-types';
import { handleLogin } from '../../../hooks/authUtils';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Divider,
  Text,
  Flex,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useAuth } from '../../../hooks/useAuth';

const LoginForm = ({ closeLogin, openRegister }) => {
  const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage('');

    try {
      await handleLogin(data, setUser);
      closeLogin();
    } catch (error) {
      setErrorMessage(
        error.response?.data?.errors[0]?.message || 'Login failed.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errorMessage && (
        <Alert
          status="error"
          mb="4"
          bg="brand.300"
          border="1px"
          borderColor="accent.red"
          rounded="md"
        >
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}

      {/* Email */}
      <FormControl isInvalid={errors.email}>
        <FormLabel>E-mail</FormLabel>
        <Input
          type="text"
          placeholder="name@stud.noroff.no"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && (
          <Text color="red.500" fontSize="sm">
            {errors.email?.message}
          </Text>
        )}
      </FormControl>

      {/* Password */}
      <FormControl isInvalid={errors.password}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="********"
          {...register('password', {
            required: 'Password is required',
          })}
        />
        {errors.password && (
          <Text color="red.500" fontSize="sm">
            {errors.password?.message}
          </Text>
        )}
      </FormControl>
      <Button
        type="submit"
        bg="brand.600"
        color="white"
        _hover={{ bg: 'brand.700' }}
        w="full"
        mt="4"
        isDisabled={loading}
      >
        {loading ? <Spinner size="sm" /> : 'Login'}
      </Button>
      <Divider mt="8" />
      <Flex align="center" gap="2" mt="4">
        <Text fontSize="xs">Don&apos;t have an account?</Text>{' '}
        <Button
          bg="transparent"
          m="0"
          p="0"
          fontSize="xs"
          onClick={() => {
            closeLogin();
            openRegister();
          }}
        >
          Register now
        </Button>
      </Flex>
    </form>
  );
};

LoginForm.propTypes = {
  closeLogin: PropTypes.func.isRequired,
  openRegister: PropTypes.func.isRequired,
};

export default LoginForm;
