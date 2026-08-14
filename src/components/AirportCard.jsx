import React, { useState } from 'react';
import { openWA } from '../utils/whatsapp';
import { getTourImage } from '../utils/googleMaps';
import useGooglePlacePhoto from '../hooks/useGooglePlacePhoto';

function AirportImage({ tour, altText }) {
  const fallback = getTourImage(tour) || tour.image;
  const src = useGooglePlacePhoto({ gm_photo_ref: tour.gm_photo_ref, gm_place_name: tour.gm_place_name, fallback, maxWidth: 600 });
  return <img src={src || fallback} alt={altText} style={{ width: 160, height: 100, objectFit: 'cover', borderRadius: 8 }} />;
}

export default function AirportCard({ tour }) {
  if (!tour) return null;

  const [selectedIdx, setSelectedIdx] = useState(null);

  const handleBook = () => {
    let msg = `Halo Bali Explore \nSaya ingin memesan layanan ${tour.title}.`;
    if (selectedIdx !== null && tour.itinerary && tour.itinerary[selectedIdx]) {
      const route = tour.itinerary[selectedIdx];
      msg += `\nRute: ${route.time} - Harga: ${route.activity}`;
    }
    msg += `\nMohon informasi ketersediaan.`;
    openWA(msg);
  };

  const selectedPrice = selectedIdx !== null && tour.itinerary && tour.itinerary[selectedIdx]
    ? tour.itinerary[selectedIdx].activity
    : tour.price;

  return (
    <div className="airport-card" style={{ border: '1px solid #e6e6e6', borderRadius: 10, padding: 18, display: 'flex', gap: 16, alignItems: 'center' }}>
      <AirportImage tour={tour} altText={tour.title} />
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: 0 }}>{tour.title}</h3>
        <p style={{ margin: '6px 0', color: '#666' }}>{tour.route}</p>
        <p style={{ margin: '6px 0', fontWeight: 700, color: 'var(--accent)' }}>From IDR {selectedPrice}</p>

        {tour.itinerary && tour.itinerary.length > 0 && (
          <div style={{ marginTop: 8 }}>
            <strong>Choose route</strong>
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
            </div>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button onClick={handleBook} className="btn btn-wa">Book via WhatsApp</button>
        <a href={`/tours/${tour.id}`} className="btn btn-primary" style={{ textAlign: 'center' }}>View Details</a>
      </div>
    </div>
  );
}
