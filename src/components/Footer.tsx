"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-olive-dark text-white">
      {/* Decorative wave */}
      <div className="bg-cream">
        <svg viewBox="0 0 1440 60" className="w-full h-10 text-olive-dark">
          <path fill="currentColor" d="M0,20 C360,60 720,0 1080,30 C1260,45 1380,20 1440,20 L1440,60 L0,60 Z" />
        </svg>
      </div>

      <div className="container-custom section-padding !pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/Logo_princiaple.png"
                alt="Fabiram"
                width={140}
                height={45}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-green-200/80 text-sm leading-relaxed mb-1 italic">
              Saveurs locales, plaisir global
            </p>
            <p className="text-green-200/80 text-sm leading-relaxed mb-4">
              Poudres naturelles et biologiques du Sénégal. Des superaliments
              africains pour votre bien-être quotidien.
            </p>
            <div className="flex items-center gap-2 text-leaf">
              <Leaf size={16} />
              <span className="text-sm font-medium">100% Naturel</span>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-accent inline-block" />
              Liens rapides
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Accueil" },
                { href: "/boutique", label: "Boutique" },
                { href: "/a-propos", label: "À propos" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-200/80 hover:text-accent transition-colors text-sm hover:pl-1 duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Produits */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-accent inline-block" />
              Nos Produits
            </h3>
            <ul className="space-y-2.5">
              {["Poudre de Baobab", "Bissap Rouge", "Bissap Blanc", "Gingembre", "Moringa"].map(
                (name) => (
                  <li key={name}>
                    <Link
                      href="/boutique"
                      className="text-green-200/80 hover:text-accent transition-colors text-sm hover:pl-1 duration-200"
                    >
                      {name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-accent inline-block" />
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={14} className="text-leaf" />
                </div>
                <span className="text-green-200/80 text-sm">
                  Sicap Mbao, Dakar, Sénégal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Phone size={14} className="text-leaf" />
                </div>
                <span className="text-green-200/80 text-sm">+221 77 295 84 43</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Mail size={14} className="text-leaf" />
                </div>
                <span className="text-green-200/80 text-sm">fabiramproduct@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-green-200/60 text-sm">
            &copy; {new Date().getFullYear()} Fabiram. Tous droits réservés.
          </p>
          <p className="text-green-200/40 text-xs flex items-center gap-1">
            <Leaf size={12} />
            Fait avec amour au Sénégal
          </p>
        </div>
      </div>
    </footer>
  );
}
