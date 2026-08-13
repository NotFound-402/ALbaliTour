import { openWA } from '../utils/whatsapp';
export default function FloatingWA() {
  return (
    <a href="#!" onClick={(e) => { e.preventDefault(); openWA('Halo Bali Explore '); }} className="floating-wa">
      <i className="fab fa-whatsapp"></i>
    </a>
  );
}