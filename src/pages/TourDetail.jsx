import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { toursData } from '../data/data';
import { priceIncluded } from '../data/price-included';
import { excluded } from '../data/excluded';
import { openWA } from '../utils/whatsapp';
import { galleryData } from '../data/gallery';
import { getTourImage } from '../utils/googleMaps';
import useGooglePlacePhoto from '../hooks/useGooglePlacePhoto';
import SEO from '../SEO';

function ChooseAdventureSelect({ tour, value, onChange }) {
  return (
    <div style={{ margin: '20px 0 30px' }}>
      <h3 style={{ marginBottom: '12px' }}>Choose Your Adventure</h3>
      <select
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #ddd' }}
      >
        <option value="">-- Select an activity --</option>
        {tour.choose_adventure.map((it, idx) => (
          <option key={idx} value={idx}>{it.time} — {it.activity}</option>
        ))}
      </select>
      {value !== '' && value !== null && (
        <div style={{ marginTop: 12, color: 'var(--accent)' }}>
          Selected: <strong>{tour.choose_adventure[value].time}</strong> — {tour.choose_adventure[value].activity}
        </div>
      )}
    </div>
  );
}

export default function TourDetail() {
  const { id } = useParams();
  const tour = toursData.find(t => t.id === id);
  const [selectedAdventureIdx, setSelectedAdventureIdx] = useState(null);

  if (!tour) return <Navigate to="/tours" />;

  const gallery = galleryData.find(g => g.id === tour.id);

  const heroImageFallback = getTourImage(tour) || tour.image;
  const heroImage = useGooglePlacePhoto({ gm_photo_ref: tour.gm_photo_ref, gm_place_name: tour.gm_place_name, fallback: heroImageFallback });

  return (
    <>
      <SEO title={`${tour.title} | AL Bali Tour`} description={tour.description} path={`/tours/${tour.id}`} image={heroImage || tour.image} />
      <motion.div
        className="detail-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
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
              <p>{tour.description || `Experience the beauty of Bali with our ${tour.title}. Perfect for nature lovers and culture enthusiasts.`}</p>

              {/* choose_adventure (select) has precedence for water-sport type tours */}
              {tour.choose_adventure && tour.choose_adventure.length > 0 ? (
                <ChooseAdventureSelect
                  tour={tour}
                  value={selectedAdventureIdx !== null ? selectedAdventureIdx : ''}
                  onChange={val => setSelectedAdventureIdx(val === '' ? null : Number(val))}
                />
              ) : (
                tour.itinerary && tour.itinerary.length > 0 && (
                  <>
                    <h3 style={{ margin: '20px 0 12px' }}>Itinerary</h3>
                    <ul style={{ listStyle: 'none', marginBottom: '30px' }}>
                      {tour.itinerary.map((item, idx) => (
                        <motion.li
                          key={idx}
                          style={{ marginBottom: '12px', paddingLeft: '18px', borderLeft: '3px solid var(--accent)' }}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.45, delay: 0.08 * idx, ease: 'easeOut' }}
                        >
                          <strong style={{ width: 120, display: 'inline-block' }}>{item.time}</strong> {item.activity}
                        </motion.li>
                      ))}
                    </ul>
                  </>
                )
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
                <span style={{ fontSize: '2rem', color: 'var(--accent)' }}>
                  {selectedAdventureIdx !== null && tour.choose_adventure
                    ? `IDR ${tour.choose_adventure[selectedAdventureIdx].activity}`
                    : `IDR ${tour.price}`}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  let msg = `Halo Bali Explore \nSaya tertarik dengan ${tour.title}.\nMohon informasi jadwal.`;
                  if (selectedAdventureIdx !== null && tour.choose_adventure) {
                    const adv = tour.choose_adventure[selectedAdventureIdx];
                    msg += `\nSaya memilih: ${adv.time} - ${adv.activity}`;
                  }
                  openWA(msg);
                }}
                className="btn btn-wa"
                style={{ width: '100%' }}
              >
                <i className="fab fa-whatsapp"></i> Book This Tour via WhatsApp
              </motion.button>
            </motion.div>
            <div className="gallery">
              <h3 style={{ marginBottom: '15px' }}>Gallery</h3>
              <div className="gallery-grid">
                {(gallery?.images || [getTourImage(tour) || tour.image]).map((image, idx) => (
                  <img key={idx} src={image} alt={tour.title} />
                ))}
              </div>
            </div>

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