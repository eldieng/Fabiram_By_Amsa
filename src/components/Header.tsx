"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X, User, Phone } from "lucide-react";
import { getCart, getCartCount } from "@/lib/cart";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateCart = () => {
      const cart = getCart();
      setCartCount(getCartCount(cart));
    };
    updateCart();
    window.addEventListener("cart-updated", updateCart);
    window.addEventListener("storage", updateCart);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("cart-updated", updateCart);
      window.removeEventListener("storage", updateCart);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/boutique", label: "Boutique" },
    { href: "/a-propos", label: "À propos" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="bg-olive-dark text-white text-xs py-2 hidden md:block">
        <div className="container-custom px-4 md:px-8 flex items-center justify-between">
          <span>Bienvenue chez Fabiram — Poudres 100% Naturelles du Sénégal</span>
          <div className="flex items-center gap-4">
            <a href="tel:+221772958443" className="flex items-center gap-1 hover:text-accent transition-colors">
              <Phone size={12} />
              +221 77 295 84 43
            </a>
            <Link href="/admin" className="hover:text-accent flex items-center gap-1">
              <User size={12} />
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-lg py-2"
            : "bg-cream py-3"
        }`}
      >
        <div className="container-custom flex items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/Logo_princiaple.png"
              alt="Fabiram"
              width={160}
              height={50}
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-bark hover:text-olive font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-olive group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link href="/panier" className="relative group">
              <div className="w-10 h-10 rounded-full bg-olive/10 flex items-center justify-center group-hover:bg-olive/20 transition-colors">
                <ShoppingCart size={20} className="text-olive" />
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-bark w-10 h-10 rounded-full bg-olive/10 flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg animate-in">
            <nav className="flex flex-col py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-6 py-3.5 text-bark hover:bg-cream hover:text-olive transition-colors border-b border-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/admin"
                className="px-6 py-3.5 text-bark hover:bg-cream hover:text-olive transition-colors flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={16} />
                Administration
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
