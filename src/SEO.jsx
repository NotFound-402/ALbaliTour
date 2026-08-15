import { Helmet } from "react-helmet-async";

const SITE_URL = "https://albalitour.karyaweb.my.id";

export default function SEO({
  title = "Bali Private Tour & Travel | AL Bali Tour",
  description = "Explore Bali with AL Bali Tour. Private Bali tours, custom itineraries, airport transfers, Ubud, Kintamani, Uluwatu and Nusa Penida tours.",
  path = "/",
  image = "/og-image.jpg",
}) {
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="AL Bali Tour" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}
