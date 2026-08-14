import { motion } from 'motion/react';
import { airportsData } from '../data/airports';
import AirportCard from '../components/AirportCard';
import { openWA } from '../utils/whatsapp';

export default function Airport() {
  const airportTour = airportsData.find(t => t.id === 'airport transfer') || airportsData[0];

  return (
    <div>
      <motion.div className="detail-hero" style={{ backgroundImage: `url(${airportTour?.image || ''})` }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <div className="container">
          <h1 style={{ color: '#fff' }}>{airportTour ? 'Bali Airport Transfer' : 'Airport Services'}</h1>
        </div>
      </motion.div>

      <div className="container section">
        {airportTour ? (
          <div style={{ maxWidth: 900, margin: '20px auto' }}>
            <AirportCard tour={airportTour} />
            <p style={{ marginTop: 18 }}>Kami menyediakan layanan antar-jemput bandara ke berbagai area populer di Bali. Klik tombol <strong>Book via WhatsApp</strong> untuk langsung mengontak kami.</p>
            <div style={{ marginTop: 12 }}>
              <button className="btn btn-wa" onClick={() => openWA(`Halo Bali Explore \nSaya tertarik layanan ${airportTour.title}. Mohon info.`)}>Contact via WhatsApp</button>
            </div>
          </div>
        ) : (
          <p>Tidak ada data airport tersedia saat ini.</p>
        )}
      </div>
    </div>
  );
}
