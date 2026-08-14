import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { openWA } from '../utils/whatsapp';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navs = [
    { name: 'Home', path: '/' },
    { name: 'Tours', path: '/tours' },
    { name: 'Bali Airport', path: '/airport' },
    { name: 'Activities', path: '/activities' },
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">AL<span>BaliTour</span>
        <p style={{color: '#000000', marginTop: '0px', fontSize: '0.8rem'}}>Tour In Bali</p>
        </Link>
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          {navs.map(nav => (
            <Link key={nav.name} to={nav.path} className={location.pathname === nav.path ? 'active' : ''} onClick={() => setIsOpen(false)}>
              {nav.name}
            </Link>
          ))}
          <button onClick={() => openWA('Halo Bali Explore \nSaya ingin bertanya tentang layanan tour Anda.')} className="btn btn-primary" style={{padding: '8px 20px'}}>Book via WA</button>
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