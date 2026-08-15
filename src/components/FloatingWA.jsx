import { motion } from 'motion/react';
import { openWA } from '../utils/whatsapp';

export default function FloatingWA() {
  return (
    <motion.a whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} onClick={(e) => { e.preventDefault(); openWA('Halo Bali Explore '); }} className="floating-wa" href="#!">
      <i className="fab fa-whatsapp"></i>
    </motion.a>
  );
}