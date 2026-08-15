import React, { useState } from 'react';
import { motion } from 'motion/react';
import { openWA } from '../utils/whatsapp';
import { getTourImage } from '../utils/googleMaps';
import useGooglePlacePhoto from '../hooks/useGooglePlacePhoto';
import { carTypes } from '../data/cartype';

function AirportImage({ tour, altText }) {
  const fallback = getTourImage(tour) || tour.image;
  const src = useGooglePlacePhoto({ gm_photo_ref: tour.gm_photo_ref, gm_place_name: tour.gm_place_name, fallback, maxWidth: 600 });
  return <img src={src || fallback} alt={altText} style={{ width: 160, height: 100, objectFit: 'cover', borderRadius: 8 }} />;
}

export default function AirportCard({ tour }) {
  if (!tour) return null;

  const [selectedIdx, setSelectedIdx] = useState(null);
  const [selectedCarType, setSelectedCarType] = useState('');
  const [selectedModelId, setSelectedModelId] = useState('');

  const parsePrice = (p) => {
    if (!p && p !== 0) return NaN;
    try {
      const digits = String(p).replace(/[^0-9]/g, '');
      return digits === '' ? NaN : parseInt(digits, 10);
    } catch (e) { return NaN; }
  };

  const formatPrice = (num) => {
    if (isNaN(num)) return String(num);
    return num.toLocaleString('id-ID');
  };

  const handleBook = () => {
    let msg = `Halo Bali Explore \nSaya ingin memesan layanan ${tour.title}.`;
    if (selectedIdx !== null && tour.itinerary && tour.itinerary[selectedIdx]) {
      const route = tour.itinerary[selectedIdx];
      msg += `\nRute: ${route.time} - Harga: ${route.activity}`;
    }
    if (selectedCarType) {
      const car = carTypes.find(c => c.id === selectedCarType);
      if (car) {
        msg += `\nTipe kendaraan: ${car.name}`;
        if (selectedModelId) {
          const model = (car.models || []).find(m => m.id === selectedModelId);
          if (model) msg += ` - Model: ${model.name} (+IDR ${model.price})`;
        } else if (car.price) {
          msg += ` (+IDR ${car.price})`;
        }
      }
    }
    msg += `\nMohon informasi ketersediaan.`;
    openWA(msg);
  };

  let selectedPrice = selectedIdx !== null && tour.itinerary && tour.itinerary[selectedIdx]
    ? tour.itinerary[selectedIdx].activity
    : tour.price;

  // If car type selected, try to compute numeric sum and format
  if (selectedCarType) {
    const car = carTypes.find(c => c.id === selectedCarType);
    if (car) {
      const baseNum = parsePrice(selectedPrice);
      // prefer model price when selected
      let addon = NaN;
      if (selectedModelId && car.models) {
        const model = car.models.find(m => m.id === selectedModelId);
        addon = model ? parsePrice(model.price) : NaN;
      }
      if (isNaN(addon)) addon = parsePrice(car.price);

      if (!isNaN(baseNum) && !isNaN(addon)) {
        selectedPrice = formatPrice(baseNum + addon);
      } else {
        selectedPrice = addon && !isNaN(addon) ? `${selectedPrice} (+${addon})` : `${selectedPrice}`;
      }
    }
  }

  return (
    <motion.div
      className="airport-card"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.35 }}
      style={{ border: '1px solid #e6e6e6', borderRadius: 10, padding: 18, display: 'flex', gap: 16, alignItems: 'center' }}
    >
      <AirportImage tour={tour} altText={tour.title} />
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: 0 }}>{tour.title}</h3>
        <p style={{ margin: '6px 0', color: '#666' }}>{tour.route}</p>
        <p style={{ margin: '6px 0', fontWeight: 700, color: 'var(--accent)' }}>From IDR {selectedPrice}</p>

        {tour.itinerary && tour.itinerary.length > 0 && (
          <div style={{ marginTop: 8 }}>
            <strong>Choose route and car</strong>
            <div style={{ marginTop: 8 }}>
              <select
                className="form-control"
                value={selectedIdx !== null ? selectedIdx : ''}
                onChange={e => setSelectedIdx(e.target.value === '' ? null : Number(e.target.value))}
                style={{ maxWidth: 360 }}
              >
                <option value="">-- Select route --</option>
                {tour.itinerary.map((it, idx) => (
                  <option key={idx} value={idx}>{it.time} — {it.activity}</option>
                ))}
              </select>
              <select
                className="form-control"
                id="car-type-select"
                style={{ maxWidth: 360, marginTop: 8 }}
                value={selectedCarType}
                onChange={e => { setSelectedCarType(e.target.value); setSelectedModelId(''); }}
              >
                <option value="">-- Select car type --</option>
                {carTypes.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.name} — +IDR {car.price} (Max: {car.maxPassengers} passengers)
                  </option>
                ))}
              </select>
              {/* car models preview */}
              {selectedCarType && (() => {
                const car = carTypes.find(c => c.id === selectedCarType);
                if (!car || !car.models) return null;
                return (
                  <div style={{ marginTop: 12 }} className="car-model-grid">
                    {car.models.map(model => (
                      <div
                        key={model.id}
                        className={`car-model-card ${selectedModelId === model.id ? 'selected' : ''}`}
                        onClick={() => setSelectedModelId(model.id)}
                        role="button"
                        tabIndex={0}
                      >
                        <img src={model.image} alt={model.name} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8 }} />
                        <div style={{ padding: '8px 6px' }}>
                          <div style={{ fontWeight: 600 }}>{model.name}</div>
                          <div style={{ color: '#666', fontSize: '0.9rem' }}>+ IDR {model.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleBook} className="btn btn-wa">Book via WhatsApp</motion.button>
        <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href={`/tours/${tour.id}`} className="btn btn-primary" style={{ textAlign: 'center' }}>View Details</motion.a>
      </div>
    </motion.div>
  );
}
