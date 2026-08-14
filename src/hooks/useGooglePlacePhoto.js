import { useEffect, useState } from 'react';

let googleScriptLoaded = false;
let googleLoadPromise = null;

function loadGoogleMaps(apiKey) {
  if (googleScriptLoaded) return Promise.resolve(true);
  if (googleLoadPromise) return googleLoadPromise;

  googleLoadPromise = new Promise((resolve, reject) => {
    const src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.defer = true;
    s.onload = () => {
      googleScriptLoaded = true;
      resolve(true);
    };
    s.onerror = (err) => reject(err);
    document.head.appendChild(s);
  });
  return googleLoadPromise;
}

export default function useGooglePlacePhoto({ gm_photo_ref, gm_place_name, fallback, maxWidth = 800 }) {
  const [url, setUrl] = useState(fallback || null);

  useEffect(() => {
    const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!key) {
      setUrl(fallback || null);
      return;
    }

    if (gm_photo_ref) {
      setUrl(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${gm_photo_ref}&key=${key}`);
      return;
    }

    if (gm_place_name) {
      loadGoogleMaps(key).then(() => {
        try {
          const service = new google.maps.places.PlacesService(document.createElement('div'));
          const req = { query: gm_place_name, fields: ['photos'] };
          service.findPlaceFromQuery(req, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results && results[0] && results[0].photos && results[0].photos.length) {
              const photoUrl = results[0].photos[0].getUrl({ maxWidth });
              setUrl(photoUrl);
            } else {
              setUrl(fallback || null);
            }
          });
        } catch (e) {
          setUrl(fallback || null);
        }
      }).catch(() => setUrl(fallback || null));
      return;
    }

    setUrl(fallback || null);
  }, [gm_photo_ref, gm_place_name, fallback, maxWidth]);

  return url;
}
