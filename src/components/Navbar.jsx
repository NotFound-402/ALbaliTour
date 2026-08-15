import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { openWA } from '../utils/whatsapp';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navs = [
    { name: 'Home', path: '/' },
    { name: 'Tours', path: '/tours' },
    { name: 'Bali Airport', path: '/airport' },
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">AL<span>BaliTour</span>
        <p style={{color: '#000000', marginTop: '0px', fontSize: '0.8rem'}}>Tour In Bali</p>
        </Link>
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          {navs.map(nav => (
            <motion.div key={nav.name} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} style={{ display: 'inline-block' }}>
              <Link to={nav.path} className={location.pathname === nav.path ? 'active' : ''} onClick={() => setIsOpen(false)}>
                {nav.name}
              </Link>
            </motion.div>
          ))}
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={() => openWA('Halo Bali Explore \nSaya ingin bertanya tentang layanan tour Anda.')} className="btn btn-primary" style={{padding: '8px 20px'}}>Book via WA</motion.button>
        </div>
        <button
          className={`hamburger ${isOpen ? 'is-open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>
    </nav>
  );
}