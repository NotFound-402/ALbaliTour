# AL Bali Tour — SEO Starter

SEO files/components sudah ditambahkan untuk project Vite + React.

## Yang ditambahkan

- `src/SEO.jsx` — title, description, canonical, Open Graph, Twitter Card
- `src/TravelAgencySchema.jsx` — Schema.org TravelAgency
- `public/robots.txt`
- `public/sitemap.xml`
- dependency `react-helmet-async`

## 1. Install dependency

```bash
npm install
```

## 2. Bungkus app dengan HelmetProvider

Di entry file seperti `src/main.jsx`:

```jsx
import { HelmetProvider } from "react-helmet-async";

<HelmetProvider>
  <App />
</HelmetProvider>
```

Sesuaikan dengan struktur `main.jsx` project.

## 3. Pakai SEO di setiap halaman

```jsx
import SEO from "./SEO";

export default function UbudTour() {
  return (
    <>
      <SEO
        title="Ubud Private Tour | Bali Tour Package"
        description="Explore Ubud with a private Bali tour. Visit rice terraces, temples, waterfalls and other popular Ubud destinations."
        path="/ubud-tour"
      />

      {/* isi halaman */}
    </>
  );
}
```

## 4. Schema di homepage

```jsx
import TravelAgencySchema from "./TravelAgencySchema";

export default function Home() {
  return (
    <>
      <TravelAgencySchema />
      {/* isi halaman */}
    </>
  );
}
```

## 5. WAJIB ganti domain

Di `src/SEO.jsx`, `src/TravelAgencySchema.jsx`,
`public/robots.txt`, dan `public/sitemap.xml`:

```text
https://example.com
```

ganti dengan domain asli AL Bali Tour.

## 6. Ganti data bisnis

Di `TravelAgencySchema.jsx`, sesuaikan:
- nama bisnis
- nomor telepon
- alamat
- URL
- area layanan

## Catatan

Sitemap hanya boleh berisi URL yang benar-benar ada di website.
Kalau route belum dibuat, hapus route tersebut dari sitemap.
