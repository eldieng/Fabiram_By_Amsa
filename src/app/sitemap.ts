import { MetadataRoute } from "next";

const siteUrl = "https://fabiram.sn";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/boutique`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Pages produits dynamiques
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/products`, {
      cache: "no-store",
    });
    if (res.ok) {
      const products = await res.json();
      productPages = products.map((product: { id: string }) => ({
        url: `${siteUrl}/produit/${product.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    }
  } catch {
    // fallback: pas de pages produits dynamiques
  }

  return [...staticPages, ...productPages];
}
