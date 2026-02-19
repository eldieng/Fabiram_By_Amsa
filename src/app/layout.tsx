import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const siteUrl = "https://fabiram.sn";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fabiram - Poudres Naturelles & Bio du Sénégal | Dakar",
    template: "%s | Fabiram",
  },
  description:
    "Fabiram, boutique de poudres naturelles et biologiques à Dakar, Sénégal. Bouye (baobab), Bissap, Gingembre, Moringa. Livraison à Dakar et partout au Sénégal.",
  keywords: [
    "fabiram",
    "poudre naturelle dakar",
    "poudre de baobab sénégal",
    "bouye dakar",
    "bissap poudre",
    "moringa sénégal",
    "gingembre poudre dakar",
    "produits bio dakar",
    "superaliments africains",
    "produits naturels sénégal",
    "boutique bio dakar",
    "poudre hibiscus",
    "compléments alimentaires naturels",
  ],
  authors: [{ name: "Fabiram" }],
  creator: "Fabiram",
  publisher: "Fabiram",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "fr_SN",
    url: siteUrl,
    siteName: "Fabiram",
    title: "Fabiram - Poudres Naturelles & Bio du Sénégal | Dakar",
    description:
      "Boutique de poudres naturelles et biologiques à Dakar. Bouye, Bissap, Gingembre, Moringa. 100% naturel, livraison au Sénégal.",
    images: [
      {
        url: "/images/Logo_princiaple.png",
        width: 1200,
        height: 630,
        alt: "Fabiram - Poudres Naturelles du Sénégal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fabiram - Poudres Naturelles & Bio | Dakar, Sénégal",
    description:
      "Poudres naturelles et biologiques du Sénégal. Bouye, Bissap, Gingembre, Moringa. Livraison à Dakar.",
    images: ["/images/Logo_princiaple.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "shopping",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#business`,
  name: "Fabiram",
  description:
    "Boutique de poudres naturelles et biologiques à Dakar, Sénégal. Bouye (baobab), Bissap, Gingembre, Moringa.",
  url: siteUrl,
  logo: `${siteUrl}/images/Logo_princiaple.png`,
  image: `${siteUrl}/images/Logo_princiaple.png`,
  telephone: "+221772958443",
  email: "fabiramproduct@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sicap Mbao",
    addressLocality: "Dakar",
    addressRegion: "Dakar",
    addressCountry: "SN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 14.6928,
    longitude: -17.4467,
  },
  areaServed: [
    {
      "@type": "City",
      name: "Dakar",
    },
    {
      "@type": "Country",
      name: "Sénégal",
    },
  ],
  priceRange: "$$",
  currenciesAccepted: "XOF",
  paymentAccepted: "Cash, Mobile Money, Virement",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "20:00",
    },
  ],
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Poudres Naturelles",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Bouye - Poudre de Baobab",
          category: "Superaliments",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Bissap Rouge - Poudre d'Hibiscus",
          category: "Boissons",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Gingembre en poudre",
          category: "Épices & Santé",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Moringa en poudre",
          category: "Superaliments",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} font-body antialiased`}>
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
