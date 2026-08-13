import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function PlaceholderPage({ title }) {
  return (
    <motion.div
      style={{ paddingTop: '150px', paddingBottom: '100px', textAlign: 'center', minHeight: '60vh' }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container">
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}>{title}</motion.h1>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.14, ease: 'easeOut' }} style={{ margin: '20px 0' }}>
          This section is currently under construction in this React demo.
        </motion.p>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </motion.div>
      </div>
    </motion.div>
  );
}