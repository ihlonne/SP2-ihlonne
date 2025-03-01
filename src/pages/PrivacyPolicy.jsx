import { Box, Heading, Text, Container } from '@chakra-ui/react';

const PrivacyPolicy = () => {
  return (
    <Container maxW='800px' py='12'>
      <Heading as='h1' fontSize={{ base: '2xl', md: '3xl' }} mb='6'>
        Privacy Policy
      </Heading>

      <Text fontSize='md' color='gray.600' mb='4'>
        Your privacy is important to us. This Privacy Policy explains how we
        collect, use, and protect your information.
      </Text>

      <Box mb='6'>
        <Heading as='h2' fontSize='xl' mb='2'>
          1. Information We Collect
        </Heading>
        <Text color='gray.600'>
          We collect personal information that you voluntarily provide, such as
          name, email, and payment details. We may also collect data
          automatically, including cookies and usage analytics.
        </Text>
      </Box>

      <Box mb='6'>
        <Heading as='h2' fontSize='xl' mb='2'>
          2. How We Use Your Information
        </Heading>
        <Text color='gray.600'>
          We use your information to provide, improve, and personalize our
          services. This includes account management, order processing, and
          customer support.
        </Text>
      </Box>

      <Box mb='6'>
        <Heading as='h2' fontSize='xl' mb='2'>
          3. Data Protection
        </Heading>
        <Text color='gray.600'>
          We implement security measures to protect your data. However, no
          method of transmission over the internet is 100% secure.
        </Text>
      </Box>

      <Box mb='6'>
        <Heading as='h2' fontSize='xl' mb='2'>
          4. Third-Party Services
        </Heading>
        <Text color='gray.600'>
          We may use third-party services for analytics and payment processing.
          These services have their own privacy policies.
        </Text>
      </Box>

      <Box mb='6'>
        <Heading as='h2' fontSize='xl' mb='2'>
          5. Your Rights
        </Heading>
        <Text color='gray.600'>
          You have the right to access, update, or delete your personal data. If
          you have any concerns, contact us at support@example.com.
        </Text>
      </Box>

      <Text fontSize='sm' color='gray.500' mt='12'>
        Last updated: {new Date().toLocaleDateString()}
      </Text>
    </Container>
  );
};

export default PrivacyPolicy;
