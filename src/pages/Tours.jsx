import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { toursData } from '../data/data';
import { getTourImage } from '../utils/googleMaps';
import useGooglePlacePhoto from '../hooks/useGooglePlacePhoto';

function TourThumb({ tour, alt }) {
  const fallback = getTourImage(tour) || tour.image;
  const src = useGooglePlacePhoto({ gm_photo_ref: tour.gm_photo_ref, gm_place_name: tour.gm_place_name, fallback, maxWidth: 800 });
  return <img src={src || fallback} alt={alt} />;
}
import { openWA } from '../utils/whatsapp';
import SEO from '../SEO';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.12,
      ease: 'easeOut'
    }
  })
};

export default function Tours() {
  return (
    <div style={{ paddingTop: '120px', paddingBottom: '80px', background: 'var(--bg-white)', minHeight: '100vh' }}>
      <SEO title="All Bali Tours | AL Bali Tour" description="Browse our private Bali tours and activities in Bali." path="/tours" />
      <div className="container">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '20px' }}
        >
          All Bali Tours
        </motion.h1>
        <div className="grid-3" style={{ marginTop: '40px' }}>
          {toursData.map((tour, index) => (
            <motion.div
              key={tour.id}
              className="tour-card"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={index}
              whileHover={{ y: -10 }}
            >
              <div className="tour-img"><TourThumb tour={tour} alt={tour.title} /></div>
              <div className="tour-content">
                <h3 className="tour-title">{tour.title}</h3>
                <div className="tour-meta">
                  <div><i className="far fa-clock"></i> {tour.duration}</div>
                  <div><i className="fas fa-map-marker-alt"></i> {tour.route}</div>
                </div>
                <div className="tour-price">From IDR {tour.price}</div>
                <Link to={`/tours/${tour.id}`} className="btn btn-primary" style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)' }}>View Details</Link>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openWA(`Halo Bali Explore \nSaya tertarik dengan ${tour.title}.`)}
                  className="btn btn-wa"
                >
                  Ask on WhatsApp
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}