export function getGooglePhotoUrl(photoRef, maxWidth = 800) {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!photoRef || !key) return null;
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoRef}&key=${key}`;
}

export function getTourImage(tour, maxWidth = 800) {
  if (!tour) return null;
  if (tour.gm_photo_ref) {
    const url = getGooglePhotoUrl(tour.gm_photo_ref, maxWidth);
    if (url) return url;
  }
  return tour.image || null;
}
