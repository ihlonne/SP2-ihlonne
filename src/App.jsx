import { useMediaQuery } from '@chakra-ui/react';

import Header from './components/Layout/Header/Header';
import Navbar from './components/Layout/Header/Navbar';
import MobileHeader from './components/Layout/Header/MobileHeader';
import MobileNavbar from './components/Layout/Header/MobileNavbar';

function App() {
  const [isLargerThan900] = useMediaQuery('(min-width: 900px)');
  return (
    <>
      {isLargerThan900 ? <Header /> : <MobileHeader />}
      {isLargerThan900 ? <Navbar /> : <MobileNavbar />}
    </>
  );
}

export default App;
