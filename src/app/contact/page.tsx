"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Send, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <>
      {/* Banner */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 md:py-20">
        <div className="container-custom px-4 md:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Contactez-nous
          </h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Une question ? Une commande ? N&apos;hésitez pas à nous écrire
          </p>
        </div>
      </section>

      <section className="bg-beige section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Adresse</h3>
                    <p className="text-sm text-gray-600">
                      Sicap Mbao, Dakar
                      <br />
                      Sénégal
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Téléphone</h3>
                    <p className="text-sm text-gray-600">
                      +221 77 295 84 43<br />
                      +221 76 161 71 69<br />
                      +221 77 543 22 18
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Email</h3>
                    <p className="text-sm text-gray-600">fabiramproduct@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-500 p-6 rounded-2xl text-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">WhatsApp</h3>
                    <p className="text-sm text-green-100 mb-3">
                      Contactez-nous directement sur WhatsApp pour une réponse
                      rapide
                    </p>
                    <a
                      href="https://wa.me/221772958443"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-green-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-50 transition-colors"
                    >
                      <MessageCircle size={16} />
                      Écrire sur WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                  Envoyez-nous un message
                </h2>

                {sent && (
                  <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl mb-6">
                    Merci pour votre message ! Nous vous répondrons dans les
                    plus brefs délais.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sujet
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                      placeholder="Objet de votre message"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm resize-none"
                      placeholder="Votre message..."
                    />
                  </div>
                  <button type="submit" className="btn-primary">
                    <Send size={16} />
                    Envoyer le message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
