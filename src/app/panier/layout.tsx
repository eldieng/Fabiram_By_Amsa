import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panier - Votre Commande",
  description:
    "Consultez votre panier et finalisez votre commande de poudres naturelles Fabiram. Livraison à Dakar et au Sénégal.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PanierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
