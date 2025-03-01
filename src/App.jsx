import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Chakra UI's media query
import { useMediaQuery } from '@chakra-ui/react';

//  Swiper CSS styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Providers
import { FavoritesProvider } from './context/FavoritesProvider';
import { CreditsProvider } from './context/CreditProvider';

// Components
import Header from './components/Layout/Header/Header';
import Navbar from './components/Layout/Header/Navbar';
import MobileHeader from './components/Layout/Header/MobileHeader';
import MobileNavbar from './components/Layout/Header/MobileNavbar';
import Footer from './components/Layout/Footer';

// Pages
import Home from './pages/Home';
import Auctions from './pages/Auctions';
import ProfilePage from './pages/ProfilePage';
import AuctionDetails from './pages/AuctionDetails';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  const [isLargerThan900] = useMediaQuery('(min-width: 900px)');
  return (
    <FavoritesProvider>
      <CreditsProvider>
        <Router>
          {isLargerThan900 ? <Header /> : <MobileHeader />}
          {isLargerThan900 ? <Navbar /> : <MobileNavbar />}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auctions' element={<Auctions />} />
            <Route path='/auctions/listing/:id' element={<AuctionDetails />} />
            <Route path='/profile/:name' element={<ProfilePage />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </CreditsProvider>
    </FavoritesProvider>
  );
}

export default App;
