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

export const metadata: Metadata = {
  title: "Fabiram - Poudres Naturelles du Sénégal",
  description:
    "Découvrez nos poudres naturelles et biologiques : Baobab, Bissap, Gingembre, Moringa. Produits 100% naturels du Sénégal, Dakar.",
  keywords:
    "fabiram, poudre baobab, bissap, moringa, gingembre, produits naturels, sénégal, dakar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} font-body antialiased`}>
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
