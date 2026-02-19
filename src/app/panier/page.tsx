"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingCart,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import {
  getCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getCartTotal,
  formatPrice,
  CartItem,
} from "@/lib/cart";

export default function PanierPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());
    const handleUpdate = () => setCart(getCart());
    window.addEventListener("cart-updated", handleUpdate);
    return () => window.removeEventListener("cart-updated", handleUpdate);
  }, []);

  const total = getCartTotal(cart);

  const handleQuantityChange = (productId: string, newQty: number) => {
    updateQuantity(productId, newQty);
    setCart(getCart());
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    setCart(getCart());
  };

  const handleClear = () => {
    clearCart();
    setCart([]);
  };

  const handleOrder = () => {
    const message = cart
      .map(
        (item) =>
          `- ${item.name} (${item.weight}) x${item.quantity} = ${formatPrice(item.price * item.quantity)}`
      )
      .join("\n");
    const total = getCartTotal(cart);
    const fullMessage = `Bonjour Fabiram ! Je souhaite commander :\n\n${message}\n\nTotal : ${formatPrice(total)}\n\nMerci !`;
    const encoded = encodeURIComponent(fullMessage);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  if (cart.length === 0) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <ShoppingCart size={64} className="text-gray-300 mx-auto" />
          <h1 className="text-2xl font-heading font-bold text-gray-800">
            Votre panier est vide
          </h1>
          <p className="text-gray-500">
            Découvrez nos produits naturels et ajoutez-les à votre panier
          </p>
          <Link href="/boutique" className="btn-primary inline-flex">
            <ArrowLeft size={18} />
            Voir la boutique
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12">
        <div className="container-custom px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold">
            Mon Panier
          </h1>
          <p className="text-green-200 mt-2">
            {cart.length} article{cart.length > 1 ? "s" : ""}
          </p>
        </div>
      </section>

      <section className="bg-beige section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="bg-white rounded-2xl p-4 md:p-6 shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.weight}</p>
                    <p className="text-secondary font-semibold mt-1">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border rounded-full">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.productId, item.quantity - 1)
                        }
                        className="p-2 hover:bg-gray-50 rounded-l-full"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 font-semibold text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.productId, item.quantity + 1)
                        }
                        className="p-2 hover:bg-gray-50 rounded-r-full"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-bold text-gray-800 min-w-[100px] text-right">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="text-red-400 hover:text-red-600 p-2 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center pt-4">
                <Link
                  href="/boutique"
                  className="text-primary hover:text-primary-dark font-medium text-sm flex items-center gap-1"
                >
                  <ArrowLeft size={16} />
                  Continuer les achats
                </Link>
                <button
                  onClick={handleClear}
                  className="text-red-400 hover:text-red-600 text-sm font-medium"
                >
                  Vider le panier
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Résumé
                </h2>
                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div
                      key={item.productId}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-600">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-secondary">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleOrder}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-colors mb-3"
                >
                  <MessageCircle size={18} />
                  Commander via WhatsApp
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Votre commande sera envoyée par WhatsApp. Nous vous
                  contacterons pour confirmer et organiser la livraison.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
