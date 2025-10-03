import { Box, Image, HStack, Divider } from '@chakra-ui/react';
import logo from '../../assets/sp2logolight.png';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <Box
      as="footer"
      display="flex"
      flexDirection={{ base: 'column', md: 'row' }}
      justifyContent="space-between"
      alignItems="center"
      gap={{ base: '20', md: '0' }}
      w="full"
      bg="black"
      p={{ base: '24px 8px', md: '24px 80px' }}
      mt="auto"
      position={{ base: 'relative', md: 'unset' }}
      bottom={{ base: '80px', md: '0', lg: '0' }}
    >
      <Link to="/">
        <Image src={logo} alt="Company logo" maxH="40px" />
      </Link>
      <HStack spacing={{ base: '4', md: '8' }}>
        <Link to="/about" style={{ color: 'white' }}>
          About
        </Link>
        <Divider orientation="vertical" h="6" />
        <Link to="/privacy-policy" style={{ color: 'white' }}>
          Privacy & Policy
        </Link>
      </HStack>
      <a
        href="https://github.com/ihlonne"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: 'white' }}
      >
        © ihlonne
      </a>
    </Box>
  );
}

export default Footer;
