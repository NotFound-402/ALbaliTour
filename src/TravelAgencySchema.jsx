import { Helmet } from "react-helmet-async";

const SITE_URL = "https://albalitour.karyaweb.my.id";

export default function TravelAgencySchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "AL Bali Tour",
    url: SITE_URL,
    telephone: "+62895326173476",
    description: "Private Bali tours, custom Bali tour packages and airport transfers.",
    areaServed: {
      "@type": "Place",
      name: "Bali",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gianyar",
      addressRegion: "Bali",
      addressCountry: "ID",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
}
