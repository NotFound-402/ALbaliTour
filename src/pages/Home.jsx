import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import SEO from '../SEO';
import { toursData } from '../data/data';
import { airportsData } from '../data/airports';
import AirportCard from '../components/AirportCard';
import { getTourImage } from '../utils/googleMaps';
import useGooglePlacePhoto from '../hooks/useGooglePlacePhoto';
import { openWA } from '../utils/whatsapp';

function TourCardImage({ tour, altText }) {
  const fallback = getTourImage(tour) || tour.image;
  const src = useGooglePlacePhoto({ gm_photo_ref: tour.gm_photo_ref, gm_place_name: tour.gm_place_name, fallback, maxWidth: 800 });
  return <img src={src || fallback} alt={altText} />;
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: index * 0.10,
      ease: 'easeOut'
    }
  })
};

export default function Home() {
  const airport = airportsData && airportsData.length ? airportsData[0] : null;

  return (
    <>
      <SEO
        title="AL Bali Tour — Explore Bali"
        description="Explore Bali with local private tours, custom itineraries and airport transfers."
        path="/"
      />
      <motion.header
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          >
            <h1>Explore Bali, Create Unforgettable Memories</h1>
            <p>"Discover the beauty of Bali with local experiences, private tours, and unforgettable adventures."</p>
            <div className="hero-btns">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                <Link to="/tours" className="btn btn-accent">Explore Our Tours</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                <button onClick={() => openWA('Halo Bali Explore 👋\nSaya ingin merencanakan liburan.')} className="btn btn-wa"><i className="fab fa-whatsapp"></i> Chat on WhatsApp</button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.header>

      <section className="section">
        <div className="container">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            custom={0}
          >
            Why Travel With Us?
          </motion.h2>
          <div className="grid-4" style={{ marginTop: '40px' }}>
            {[
              { icon: '🌴', title: 'Local Experience', text: 'Experienced local drivers and guides.' },
              { icon: '🚗', title: 'Private & Comfortable', text: 'Enjoy Bali at your own pace.' },
              { icon: '✨', title: 'Flexible Itinerary', text: 'Customize your trip.' },
              { icon: '💬', title: 'Easy Booking', text: 'Simply chat with us on WhatsApp.' }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="feature-card"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
                whileHover={{ y: -8, scale: 1.01 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-white)' }}>
        <div className="container">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            custom={0}
          >
            Popular Bali Tours
          </motion.h2>
          <div className="grid-3" style={{ marginTop: '40px' }}>
            {toursData.map((tour, index) => (
              <motion.div
                className="tour-card"
                key={tour.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                custom={index}
                whileHover={{ y: -10 }}
              >
                <div className="tour-img">
                  {tour.bestSeller && <div className="tour-badge">Best Seller</div>}
                  <TourCardImage tour={tour} altText={tour.title} />
                </div>
                <div className="tour-content">
                  <h3 className="tour-title">{tour.title}</h3>
                  <div className="tour-meta">
                    <div><i className="far fa-clock"></i> {tour.duration}</div>
                    <div><i className="fas fa-map-marker-alt"></i> {tour.route}</div>
                  </div>
                  <div className="tour-price">From IDR {tour.price}</div>
                  <Link to={`/tours/${tour.id}`} className="btn btn-primary" style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)' }}>View Details</Link>
                  <button onClick={() => openWA(`Halo Bali Explore 👋\nSaya tertarik dengan ${tour.title}.`)} className="btn btn-wa">Ask on WhatsApp</button>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div className="text-center" style={{ marginTop: '40px' }} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
            <Link to="/tours" className="btn btn-primary">View All Tours</Link>
          </motion.div>
        </div>
      </section>

      {/* Airport Transfer feature */}
      <section className="section">
        <div className="container">
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ textAlign: 'center' }}>Airport Transfer</motion.h2>
          <div style={{ maxWidth: 900, margin: '24px auto' }}>
            {airport ? (
              <>
                <AirportCard tour={airport} />
                <div style={{ marginTop: 12 }}>
                  <Link to="/airport" className="btn btn-primary">More Airport Options</Link>
                </div>
              </>
            ) : (
              <p>No airport transfer data available.</p>
            )}
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
        <div className="container">
          <div className="grid-2 align-items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
              <h2 style={{ color: 'var(--accent)', textAlign: 'left' }}>Your Bali, Your Way</h2>
              <p style={{ color: '#e0e0e0' }}>Have your own travel plan? Tell us what you want and we'll help create your perfect Bali itinerary.</p>
            </motion.div>
            <motion.div
              className="form-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            >
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const msg = `Halo Bali Explore \n\nCustom Trip:\nNama: ${formData.get('name')}\nTanggal: ${formData.get('date')}\nOrang: ${formData.get('guests')}\nDestinasi: ${formData.get('dest')}\n\nPesan: ${formData.get('msg')}`;
                openWA(msg);
              }}>
                <div className="form-group"><label>Name</label><input type="text" name="name" className="form-control" required /></div>
                <div className="grid-2" style={{ gap: '20px' }}>
                  <div className="form-group"><label>Date</label><input type="date" name="date" className="form-control" required /></div>
                  <div className="form-group"><label>Guests</label><input type="number" name="guests" className="form-control" required /></div>
                </div>
                <div className="form-group"><label>Destination / Area</label><input type="text" name="dest" className="form-control" /></div>
                <div className="form-group"><label>Message</label><textarea name="msg" className="form-control" style={{ height: '100px' }}></textarea></div>
                <motion.button type="submit" className="btn btn-wa" style={{ width: '100%' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  Send to WhatsApp
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}