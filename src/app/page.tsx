"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Leaf,
  Truck,
  Shield,
  Heart,
  ArrowRight,
  Star,
  ChevronRight,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { fetchProducts, Product } from "@/lib/products";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-cream via-cream-dark to-sand overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>

        <div className="container-custom px-4 md:px-8 py-20 md:py-32 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-olive/10 text-olive px-4 py-2 rounded-full text-sm font-medium">
                <Leaf size={16} />
                100% Naturel &bull; Made in Sénégal
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-bark leading-tight">
                Des poudres{" "}
                <span className="text-olive">naturelles</span> pour votre{" "}
                <span className="text-secondary">bien-être</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Découvrez nos superaliments africains : Baobab, Bissap,
                Gingembre et Moringa. Des produits purs, récoltés avec soin à
                Dakar, Sénégal.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/boutique" className="btn-primary">
                  Découvrir nos produits
                  <ArrowRight size={18} />
                </Link>
                <Link href="/a-propos" className="btn-outline">
                  Notre histoire
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-4 bg-olive/10 rounded-full" />
                <Image
                  src="/images/Poudre-de-moringa-scaled.jpg"
                  alt="Produits Fabiram - Poudres naturelles"
                  fill
                  className="object-cover rounded-3xl shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AVANTAGES */}
      <section className="bg-white section-padding border-y border-sand">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: Leaf,
                title: "100% Naturel",
                desc: "Sans additifs ni conservateurs",
              },
              {
                icon: Shield,
                title: "Qualité Premium",
                desc: "Sélection rigoureuse",
              },
              {
                icon: Truck,
                title: "Livraison Dakar",
                desc: "Rapide et sécurisée",
              },
              {
                icon: Heart,
                title: "Fait avec Amour",
                desc: "Du Sénégal avec passion",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl hover:bg-cream transition-colors duration-300 group"
              >
                <div className="w-14 h-14 bg-olive/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-olive/20 transition-colors">
                  <item.icon size={24} className="text-olive" />
                </div>
                <h3 className="font-bold text-bark mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUITS VEDETTES */}
      <section className="bg-cream section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-olive font-semibold text-sm uppercase tracking-wider">
              Notre sélection
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mt-2">
              Nos Produits Phares
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Des superaliments africains soigneusement sélectionnés pour votre
              santé et votre plaisir
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/boutique" className="btn-primary">
              Voir tous les produits
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* À PROPOS SECTION */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <Image
                  src="/images/Poudre-de-baobab-scaled.jpg"
                  alt="Poudre de Baobab Fabiram"
                  width={300}
                  height={400}
                  className="rounded-2xl shadow-lg w-full object-cover aspect-[3/4]"
                />
                <Image
                  src="/images/Poudre-de-bissap-rouge-scaled.jpg"
                  alt="Bissap Rouge Fabiram"
                  width={300}
                  height={400}
                  className="rounded-2xl shadow-lg w-full object-cover aspect-[3/4] mt-8"
                />
              </div>
            </div>
            <div className="space-y-6">
              <span className="text-olive font-semibold text-sm uppercase tracking-wider">
                Notre histoire
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
                Fabiram, la nature au service de votre bien-être
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Née à Dakar, Fabiram est une marque sénégalaise passionnée par
                les trésors naturels de l&apos;Afrique. Nous sélectionnons avec
                soin les meilleurs ingrédients pour vous offrir des poudres
                100% naturelles, sans additifs ni conservateurs.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Chaque produit est préparé avec amour dans notre atelier de
                Sicap Mbao, en respectant les traditions ancestrales tout en
                garantissant les normes de qualité les plus strictes.
              </p>
              <Link href="/a-propos" className="btn-outline">
                En savoir plus
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="bg-cream section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-olive font-semibold text-sm uppercase tracking-wider">
              Témoignages
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mt-2">
              Ce que disent nos clients
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Aminata D.",
                text: "Le Bouye Fabiram est le meilleur que j'ai goûté ! Mes enfants adorent. La qualité est vraiment au rendez-vous.",
                rating: 5,
              },
              {
                name: "Fatou S.",
                text: "J'utilise le Moringa tous les matins dans mon smoothie. Je me sens pleine d'énergie ! Merci Fabiram.",
                rating: 5,
              },
              {
                name: "Ousmane N.",
                text: "Le Bissap rouge menthe-citronnelle est une tuerie ! Parfait pour les journées chaudes à Dakar. Je recommande.",
                rating: 5,
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className="fill-accent text-accent"
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4 leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <p className="font-bold text-gray-800">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER / CTA */}
      <section className="bg-olive section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Restez connecté avec Fabiram
          </h2>
          <p className="text-green-200 mb-8 max-w-xl mx-auto">
            Inscrivez-vous pour recevoir nos offres exclusives et découvrir nos
            nouveaux produits en avant-première.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Merci pour votre inscription !");
            }}
          >
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-5 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
            <button
              type="submit"
              className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              S&apos;inscrire
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
