import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { toursData } from '../data/data';
import { priceIncluded } from '../data/price-included';
import { excluded } from '../data/excluded';
import { openWA } from '../utils/whatsapp';

export default function TourDetail() {
  const { id } = useParams();
  const tour = toursData.find(t => t.id === id);

  if (!tour) return <Navigate to="/tours" />;

  return (
    <>
      <motion.div
        className="detail-hero"
        style={{ backgroundImage: `url(${tour.image})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}>{tour.title}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.18 }} style={{ color: '#eee', fontSize: '1.1rem' }}><i className="fas fa-map-marker-alt"></i> {tour.route}</motion.p>
        </div>
      </motion.div>
      <div className="container section" style={{ paddingTop: 0 }}>
        <motion.div
          className="detail-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.15 }}
        >
          <div className="detail-grid">
            <div>
              <h2 style={{ textAlign: 'left' }}>Tour Overview</h2>
              <p>Experience the beauty of Bali with our {tour.title}. Perfect for nature lovers and culture enthusiasts.</p>

              {tour.itinerary && tour.itinerary.length > 0 && (
                <>
                  <h3 style={{ margin: '30px 0 15px' }}>Itinerary</h3>
                  <ul style={{ listStyle: 'none', marginBottom: '30px' }}>
                    {tour.itinerary.map((item, idx) => (
                      <motion.li
                        key={idx}
                        style={{ marginBottom: '15px', paddingLeft: '20px', borderLeft: '3px solid var(--accent)' }}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45, delay: 0.12 * idx, ease: 'easeOut' }}
                      >
                        <strong>{item.time}</strong> - {item.activity}
                      </motion.li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <motion.div
              className="detail-sidebar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            >
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '20px' }}>
                Price starting from<br />
                <span style={{ fontSize: '2rem', color: 'var(--accent)' }}>IDR {tour.price}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openWA(`Halo Bali Explore \nSaya tertarik dengan ${tour.title}.\nMohon informasi jadwal.`)}
                className="btn btn-wa"
                style={{ width: '100%' }}
              >
                <i className="fab fa-whatsapp"></i> Book This Tour via WhatsApp
              </motion.button>
            </motion.div>
            <div className="price-list-wrap">
              <div className="price-box included-box">
                <h3>What's Included</h3>
                <ul>
                  {priceIncluded.map((item, idx) => (
                    <li key={idx}><span className="price-check">✓</span> {item}</li>
                  ))}
                </ul>
              </div>

              <div className="price-box excluded-box">
                <h3>What's Excluded</h3>
                <ul>
                  {excluded.map((item, idx) => (
                    <li key={idx}><span className="price-check">✕</span> {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}