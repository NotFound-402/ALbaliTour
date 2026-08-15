import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWA from './components/FloatingWA';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Tours from './pages/Tours';
import TourDetail from './pages/TourDetail';
import Airport from './pages/Airport';
import PlaceholderPage from './pages/PlaceholderPage';

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:id" element={<TourDetail />} />
        <Route path="/airport" element={<Airport />} />
        <Route path="/about" element={<PlaceholderPage title="About Us" />} />
        <Route path="/faq" element={<PlaceholderPage title="FAQ" />} />
        <Route path="/contact" element={<PlaceholderPage title="Contact" />} />
      </Routes>
      <Footer />
      <FloatingWA />
    </>
  );
}

export default App;