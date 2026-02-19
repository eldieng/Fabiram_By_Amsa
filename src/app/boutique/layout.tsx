import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boutique - Poudres Naturelles Bio",
  description:
    "Achetez nos poudres naturelles et biologiques à Dakar : Bouye (baobab), Bissap rouge et blanc, Gingembre, Moringa. Livraison au Sénégal.",
  keywords: [
    "acheter poudre baobab dakar",
    "boutique bio dakar",
    "bissap poudre sénégal",
    "moringa acheter dakar",
    "gingembre poudre sénégal",
    "superaliments africains achat",
  ],
  openGraph: {
    title: "Boutique Fabiram - Poudres Naturelles Bio à Dakar",
    description:
      "Découvrez notre gamme de poudres naturelles : Bouye, Bissap, Gingembre, Moringa. Livraison à Dakar et au Sénégal.",
  },
  alternates: {
    canonical: "https://fabiram.sn/boutique",
  },
};

export default function BoutiqueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
