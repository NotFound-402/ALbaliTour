export const WHATSAPP_NUMBER = "6281234567890"; 
export const openWA = (message) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
};