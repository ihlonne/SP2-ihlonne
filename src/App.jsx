import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useMediaQuery } from '@chakra-ui/react';

import Header from './components/Layout/Header/Header';
import Navbar from './components/Layout/Header/Navbar';
import MobileHeader from './components/Layout/Header/MobileHeader';
import MobileNavbar from './components/Layout/Header/MobileNavbar';

import Home from './pages/Home';
import Auctions from './pages/Auctions';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Footer from './components/Layout/Header/Footer';

function App() {
  const [isLargerThan900] = useMediaQuery('(min-width: 900px)');
  return (
    <Router>
      {isLargerThan900 ? <Header /> : <MobileHeader />}
      {isLargerThan900 ? <Navbar /> : <MobileNavbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auctions' element={<Auctions />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
