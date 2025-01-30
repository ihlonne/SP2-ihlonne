import {
  Image,
  Text,
  Icon,
  Flex,
  IconButton,
  Link,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Stack,
  Divider,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FaSignInAlt } from 'react-icons/fa';
import { TiUserAdd } from 'react-icons/ti';
import logo from '../../../assets/sp2logodark.png';

function MobileNavbar() {
  // Manage drawer state
  const { isOpen, onOpen, onClose } = useDisclosure();

  const categories = [
    'Jewelry',
    'Art',
    'Watches',
    'Fashion',
    'Vintage',
    'Cars',
    'Books',
    'Collectibles',
  ];

  return (
    <Flex
      position='fixed'
      bottom='0'
      left='0'
      justify='space-between'
      align='center'
      p='15px'
      bg='brand.100'
      w='full'
    >
      <Flex flexDirection='column' justify='center'>
        <IconButton bg='brand.100' onClick={onOpen}>
          <HamburgerIcon boxSize='8' />
        </IconButton>
        <Text fontSize='xs'>Categories</Text>
      </Flex>

      <Flex flexDirection='column' justify='center'>
        <IconButton bg='brand.100'>
          <Icon as={FaSignInAlt} boxSize='8' />
        </IconButton>
        <Text fontSize='xs'>Sign in</Text>
      </Flex>

      <Flex flexDirection='column' justify='center'>
        <IconButton bg='brand.100'>
          <Icon as={TiUserAdd} boxSize='8' color='brand.600' />
        </IconButton>
        <Text fontSize='xs'>Register</Text>
      </Flex>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent
          bg='white'
          color='black'
          w={{ base: '100%', md: '400px' }}
        >
          <DrawerCloseButton />
          <DrawerHeader>
            <Image src={logo} />
          </DrawerHeader>
          <DrawerBody>
            <Stack>
              <Link
                to='/auctions'
                onClick={onClose}
                style={{ display: 'block', padding: '10px 0', color: 'black' }}
              >
                View all listings
              </Link>
              <Divider />
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/auctions?category=${category.toLowerCase()}`}
                  onClick={onClose}
                  style={{
                    display: 'block',
                    padding: '10px 0',
                    color: 'black',
                  }}
                >
                  {category}
                </Link>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default MobileNavbar;
