import { Helmet } from "react-helmet-async";

const SITE_URL = "https://example.com";

export default function TravelAgencySchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "AL Bali Tour",
    url: SITE_URL,
    description:
      "Private Bali tours, custom Bali tour packages and airport transfers.",
    areaServed: {
      "@type": "Place",
      name: "Bali, Indonesia",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bali",
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
