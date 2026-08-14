export const WHATSAPP_NUMBER = "62895326173476"; 
export const openWA = (message) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
};