import { Button, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { TfiFaceSad } from 'react-icons/tfi';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Flex
      mx="auto"
      direction="column"
      justify="center"
      align="center"
      h="80lvh"
      w={{ base: '90%', md: '100vh' }}
      textAlign="center"
    >
      <Icon as={TfiFaceSad} boxSize={24} />

      <Heading fontSize={{ base: '2xl', md: '4xl' }} fontWeight="400" mt="12">
        Oops! Page Not Found
      </Heading>
      <Text fontSize="md" color="gray.600" mt="2">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </Text>

      <Button
        as={Link}
        to="/"
        bg="brand.600"
        color="white"
        _hover={{ bg: 'brand.700' }}
        mt="6"
        px="6"
        size="lg"
      >
        Go Back Home
      </Button>
    </Flex>
  );
};

export default NotFound;
