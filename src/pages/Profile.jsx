import { Avatar, Flex, Text } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';

function Profile() {
  const { user } = useAuth();

  return (
    <>
      <Flex
        gap='4'
        justify='center'
        align='center'
        maxW='1200px'
        w='100%'
        h='auto'
        my='16'
      >
        <Avatar size='2xl' name={user?.name} src={user?.avatar?.url} />
        <Flex direction='column'>
          <Text fontSize='lg'>{user?.name}</Text>
          <Text>You have 1000 credits to spend</Text>
        </Flex>
      </Flex>
    </>
  );
}

export default Profile;
