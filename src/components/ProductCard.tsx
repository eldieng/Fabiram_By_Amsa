"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Leaf, Check } from "lucide-react";
import { Product } from "@/lib/products";
import { addToCart, formatPrice } from "@/lib/cart";

export default function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      weight: product.weight,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/produit/${product.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-sand">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-sand">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {/* Badge */}
          <div className="absolute top-3 left-3 bg-olive text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
            <Leaf size={12} />
            {product.badge}
          </div>
          {/* Weight badge */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-bark text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm">
            {product.variants && product.variants.length > 0
              ? product.variants.map(v => v.weight).join(' / ')
              : product.weight}
          </div>
          {/* Quick add button */}
          <button
            onClick={handleAddToCart}
            className={`absolute bottom-3 right-3 p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg ${
              added
                ? "bg-leaf text-white"
                : "bg-white/90 backdrop-blur-sm text-olive hover:bg-olive hover:text-white"
            }`}
          >
            {added ? <Check size={18} /> : <ShoppingCart size={18} />}
          </button>
        </div>

        {/* Info */}
        <div className="p-5">
          <p className="text-xs text-olive font-semibold uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 className="text-lg font-heading font-bold text-bark mb-1 group-hover:text-olive transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-1">{product.subtitle}</p>
          <div className="flex items-center justify-between pt-3 border-t border-sand">
            <div>
              {product.variants && product.variants.length > 0 ? (
                <>
                  <span className="text-xs text-gray-400">À partir de</span>
                  <span className="text-lg font-bold text-secondary block -mt-0.5">
                    {formatPrice(Math.min(...product.variants.map(v => v.price)))}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-secondary">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <span className="text-xs text-olive bg-primary-50 px-3 py-1 rounded-full font-medium">
              Voir
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
