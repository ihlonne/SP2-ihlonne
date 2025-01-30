import { Button, Text } from '@chakra-ui/react';

function App() {
  return (
    <div>
      <Text fontSize='xl'>Chakra UI is working! 🎉</Text>
      <Button bg='brand.600' color='white' _hover={{ bg: 'brand.700' }}>
        Click Me
      </Button>
    </div>
  );
}

export default App;
