import { Metadata } from "next";

export const metadata: Metadata = {
  title: "À Propos - Notre Histoire",
  description:
    "Fabiram, entreprise sénégalaise basée à Dakar, spécialisée dans les poudres naturelles et biologiques. Découvrez notre mission : valoriser les superaliments africains.",
  keywords: [
    "fabiram dakar",
    "entreprise bio sénégal",
    "superaliments africains",
    "produits naturels dakar",
    "histoire fabiram",
  ],
  openGraph: {
    title: "À Propos de Fabiram - Poudres Naturelles à Dakar",
    description:
      "Entreprise sénégalaise spécialisée dans les poudres naturelles et biologiques. Notre mission : valoriser les superaliments africains.",
  },
  alternates: {
    canonical: "https://fabiram.sn/a-propos",
  },
};

export default function AProposLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
