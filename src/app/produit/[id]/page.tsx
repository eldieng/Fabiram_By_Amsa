"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Minus,
  Plus,
  Leaf,
  Check,
  ArrowLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { fetchProducts, Product, Variant } from "@/lib/products";
import { addToCart, formatPrice } from "@/lib/cart";
import ProductCard from "@/components/ProductCard";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  useEffect(() => {
    fetchProducts().then((products) => {
      const found = products.find((p) => p.id === params.id);
      setProduct(found || null);
      if (found) {
        setRelatedProducts(
          products.filter((p) => p.id !== found.id).slice(0, 3)
        );
        // Sélectionner la variante par défaut (celle qui correspond au poids du produit)
        if (found.variants && found.variants.length > 0) {
          const defaultVariant = found.variants.find(v => v.weight === found.weight) || found.variants[0];
          setSelectedVariant(defaultVariant);
        }
      }
    });
  }, [params.id]);

  const activePrice = selectedVariant ? selectedVariant.price : product?.price || 0;
  const activeWeight = selectedVariant ? selectedVariant.weight : product?.weight || "";

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Produit non trouvé</p>
          <Link href="/boutique" className="btn-primary">
            Retour à la boutique
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(
      {
        productId: product.id,
        name: product.name + (selectedVariant ? ` (${selectedVariant.weight})` : ''),
        price: activePrice,
        image: product.image,
        weight: activeWeight,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-cream py-3">
        <div className="container-custom px-4 md:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary">
              Accueil
            </Link>
            <ChevronRight size={14} />
            <Link href="/boutique" className="hover:text-primary">
              Boutique
            </Link>
            <ChevronRight size={14} />
            <span className="text-gray-800 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            {/* Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 bg-primary text-white text-sm px-4 py-1.5 rounded-full flex items-center gap-1">
                <Leaf size={14} />
                {product.badge}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-1">
                  {product.category}
                </p>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-500 mt-1">{product.subtitle}</p>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-secondary">
                  {formatPrice(activePrice)}
                </span>
                <span className="text-sm text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                  {activeWeight}
                </span>
              </div>

              {/* Sélecteur de variante */}
              {product.variants && product.variants.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">Choisir le format</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-5 py-2.5 rounded-full border-2 text-sm font-semibold transition-all ${
                          selectedVariant?.weight === variant.weight
                            ? "border-olive bg-olive text-white shadow-md"
                            : "border-sand bg-white text-bark hover:border-olive hover:bg-olive/5"
                        }`}
                      >
                        {variant.weight} — {formatPrice(variant.price)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-gray-600 leading-relaxed">
                {product.longDescription}
              </p>

              {/* Bienfaits */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3">Bienfaits</h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check size={16} className="text-primary shrink-0 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Utilisation */}
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Mode d&apos;emploi</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.usage}
                </p>
              </div>

              {/* Add to cart + WhatsApp */}
              <div className="flex flex-col gap-4 pt-4 border-t">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex items-center border rounded-full">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-50 rounded-l-full transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-5 font-semibold text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-50 rounded-r-full transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 px-6 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                      added
                        ? "bg-green-500 text-white"
                        : "bg-olive text-white hover:bg-olive-dark"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check size={18} />
                        Ajouté au panier !
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} />
                        Ajouter au panier
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Bonjour Fabiram ! Je souhaite commander :\n\n` +
                    `Produit : ${product.name} (${product.subtitle})\n` +
                    `Format : ${activeWeight}\n` +
                    `Quantité : ${quantity}\n` +
                    `Prix unitaire : ${formatPrice(activePrice)}\n` +
                    `Total : ${formatPrice(activePrice * quantity)}\n\n` +
                    `Merci !`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-6 rounded-full font-semibold flex items-center justify-center gap-2 bg-green-500 text-white hover:bg-green-600 transition-colors shadow-md"
                >
                  <MessageCircle size={18} />
                  Commander sur WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-beige section-padding">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-8">
              Vous aimerez aussi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/boutique" className="btn-outline">
                <ArrowLeft size={16} />
                Retour à la boutique
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
