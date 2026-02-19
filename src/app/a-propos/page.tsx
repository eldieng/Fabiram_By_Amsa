"use client";

import Image from "next/image";
import { Leaf, Heart, Award, Users } from "lucide-react";

export default function AProposPage() {
  return (
    <>
      {/* Banner */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 md:py-20">
        <div className="container-custom px-4 md:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            À Propos de Fabiram
          </h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Notre passion pour les trésors naturels de l&apos;Afrique
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Notre histoire
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
                Née au coeur du Sénégal
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Fabiram est née d&apos;une passion profonde pour les richesses
                naturelles de l&apos;Afrique. Basée à Sicap Mbao, Dakar, notre
                entreprise s&apos;engage à offrir des produits 100% naturels,
                préparés avec soin et amour.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Chaque poudre que nous proposons est le fruit d&apos;un savoir-faire
                ancestral, combiné à des normes de qualité modernes. Du baobab
                majestueux au moringa miraculeux, nous sélectionnons les
                meilleurs ingrédients pour votre bien-être.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Notre mission est simple : rendre accessible à tous les
                bienfaits extraordinaires des superaliments africains, tout en
                soutenant les communautés locales et en respectant
                l&apos;environnement.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="/images/Poudre-de-moringa-scaled.webp"
                alt="Moringa Fabiram"
                width={300}
                height={400}
                className="rounded-2xl shadow-lg w-full object-cover aspect-[3/4]"
              />
              <Image
                src="/images/Poudre-de-gingembre-scaled.webp"
                alt="Gingembre Fabiram"
                width={300}
                height={400}
                className="rounded-2xl shadow-lg w-full object-cover aspect-[3/4] mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Nos valeurs
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mt-2">
              Ce qui nous guide
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Leaf,
                title: "Naturel",
                desc: "Tous nos produits sont 100% naturels, sans additifs, sans conservateurs, sans colorants artificiels.",
              },
              {
                icon: Award,
                title: "Qualité",
                desc: "Nous sélectionnons rigoureusement chaque ingrédient pour garantir une qualité premium à nos clients.",
              },
              {
                icon: Heart,
                title: "Passion",
                desc: "Chaque produit est préparé avec amour et dévouement, dans le respect des traditions sénégalaises.",
              },
              {
                icon: Users,
                title: "Communauté",
                desc: "Nous travaillons avec les producteurs locaux pour soutenir l'économie et les familles du Sénégal.",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon size={28} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products showcase */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Nos produits
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mt-2">
              Des superaliments d&apos;exception
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Chaque produit Fabiram est soigneusement préparé dans notre
              atelier de Dakar, avec les meilleurs ingrédients du Sénégal.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { src: "/images/Poudre-de-baobab-scaled.webp", name: "Bouye (Baobab)" },
              { src: "/images/Poudre-de-bissap-rouge-scaled.webp", name: "Bissap Rouge" },
              { src: "/images/Poudre-de-bissap-blanc-scaled.webp", name: "Bissap Blanc" },
              { src: "/images/Poudre-de-gingembre-scaled.webp", name: "Gingembre" },
              { src: "/images/Poudre-de-moringa-scaled.webp", name: "Moringa" },
            ].map((product, i) => (
              <div key={i} className="text-center">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
                  <Image
                    src={product.src}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="font-medium text-gray-800 text-sm">
                  {product.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
