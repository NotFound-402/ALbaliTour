import { Link } from 'react-router-dom';
import { openWA } from '../utils/whatsapp';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="logo" style={{color: 'var(--bg-white)'}}>AL<span style={{color: 'var(--accent)'}}>BaliTour</span></Link>
            <p style={{color: '#d0d0d0', marginTop: '15px'}}>Your local partner for unforgettable Bali experiences.</p>
          </div>
          <div>
            <h4 style={{color: 'var(--accent)', marginBottom: '15px'}}>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/tours">Tours</Link></li>
              <li><Link to="/destinations">Destinations</Link></li>
              <li><Link to="/car-rental">Car Rental</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{color: 'var(--accent)', marginBottom: '15px'}}>Connect</h4>
            <ul className="footer-links">
              <li><a href="#!" onClick={(e) => { e.preventDefault(); openWA('Halo Bali Explore 👋'); }}><i className="fab fa-whatsapp"></i> WhatsApp</a></li>
              <li><a href="#!"><i className="fab fa-instagram"></i> Instagram</a></li>
            </ul>
          </div>
        </div>
        <div style={{textAlign: 'center', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#a0a0a0', fontSize: '0.9rem'}}>
          &copy; 2026 Bali Explore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}