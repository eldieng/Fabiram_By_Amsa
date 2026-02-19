import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Nous Joindre à Dakar",
  description:
    "Contactez Fabiram à Dakar, Sénégal. Commandez vos poudres naturelles par WhatsApp, email ou téléphone. Livraison à Dakar et partout au Sénégal.",
  keywords: [
    "contact fabiram dakar",
    "commander poudre naturelle dakar",
    "whatsapp fabiram",
    "livraison produits bio dakar",
    "téléphone fabiram sénégal",
  ],
  openGraph: {
    title: "Contactez Fabiram - Dakar, Sénégal",
    description:
      "Commandez vos poudres naturelles par WhatsApp, email ou téléphone. Livraison à Dakar et au Sénégal.",
  },
  alternates: {
    canonical: "https://fabiram.sn/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
