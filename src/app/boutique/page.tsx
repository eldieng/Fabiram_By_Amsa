"use client";

import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { fetchProducts, Product } from "@/lib/products";

export default function BoutiquePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const categories = ["Tous", ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "Tous" || p.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <>
      {/* Banner */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 md:py-20">
        <div className="container-custom px-4 md:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Notre Boutique
          </h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Découvrez notre gamme complète de poudres naturelles du Sénégal
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white sticky top-16 z-30 border-b shadow-sm">
        <div className="container-custom px-4 md:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <SlidersHorizontal size={16} className="text-gray-400 shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    category === cat
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="bg-beige section-padding">
        <div className="container-custom">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                Aucun produit trouvé pour votre recherche.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-6">
                {filtered.length} produit{filtered.length > 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
