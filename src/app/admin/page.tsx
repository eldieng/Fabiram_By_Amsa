"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  Lock,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Package,
  Save,
  X,
  Eye,
  Upload,
  ImageIcon,
  Loader2,
} from "lucide-react";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct as apiDeleteProduct,
  uploadImage,
  Product,
} from "@/lib/products";
import { formatPrice } from "@/lib/cart";
import Link from "next/link";

const ADMIN_PASSWORD = "Fabirambyamsa";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  useEffect(() => {
    const session = sessionStorage.getItem("fabiram_admin");
    if (session === "true") {
      setIsLoggedIn(true);
      loadProducts();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      sessionStorage.setItem("fabiram_admin", "true");
      loadProducts();
      setError("");
    } else {
      setError("Mot de passe incorrect");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("fabiram_admin");
  };

  const handleSaveProduct = async (product: Product) => {
    setSaving(true);
    try {
      if (isCreating) {
        await createProduct(product);
      } else {
        await updateProduct(product);
      }
      await loadProducts();
      setEditingProduct(null);
      setIsCreating(false);
    } catch {
      alert("Erreur lors de la sauvegarde");
    }
    setSaving(false);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Supprimer ce produit ?")) return;
    await apiDeleteProduct(id);
    await loadProducts();
  };

  const handleNewProduct = () => {
    setIsCreating(true);
    setEditingProduct({
      id: "produit-" + Date.now(),
      name: "",
      subtitle: "",
      description: "",
      longDescription: "",
      benefits: [""],
      usage: "",
      price: 0,
      weight: "",
      image: "/images/Logo_Fabiram.png",
      category: "",
      badge: "Produit Naturel",
      inStock: true,
      variants: [{ weight: "", price: 0 }],
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProduct) return;

    setUploading(true);
    try {
      const url = await uploadImage(file);
      setEditingProduct({ ...editingProduct, image: url });
    } catch {
      alert("Erreur lors de l'upload de l'image");
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center bg-cream">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-olive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={28} className="text-olive" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-bark">
              Administration
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Connectez-vous pour gérer vos produits
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive"
                placeholder="Entrez le mot de passe"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              <Lock size={16} />
              Se connecter
            </button>
          </form>
        </div>
      </section>
    );
  }

  // Product Edit Form
  if (editingProduct) {
    return (
      <section className="bg-cream min-h-screen">
        <div className="bg-white border-b sticky top-0 z-30">
          <div className="container-custom px-4 md:px-8 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-bark">
              {isCreating ? "Nouveau produit" : `Modifier : ${editingProduct.name}`}
            </h1>
            <button
              onClick={() => {
                setEditingProduct(null);
                setIsCreating(false);
              }}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="container-custom px-4 md:px-8 py-8">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm max-w-3xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveProduct(editingProduct);
              }}
              className="space-y-6"
            >
              {/* IMAGE UPLOAD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo du produit
                </label>
                <div className="flex items-start gap-4">
                  {/* Preview */}
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-sand border-2 border-dashed border-gray-300 shrink-0">
                    {editingProduct.image ? (
                      <Image
                        src={editingProduct.image}
                        alt="Aperçu"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon size={32} className="text-gray-300" />
                      </div>
                    )}
                  </div>
                  {/* Upload button */}
                  <div className="flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="w-full border-2 border-dashed border-olive/30 rounded-xl p-6 text-center hover:border-olive hover:bg-olive/5 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {uploading ? (
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 size={24} className="text-olive animate-spin" />
                          <span className="text-sm text-gray-500">Envoi en cours...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Upload size={24} className="text-olive" />
                          <span className="text-sm font-medium text-bark">
                            Cliquez pour choisir une photo
                          </span>
                          <span className="text-xs text-gray-400">
                            JPG, PNG — max 5 Mo
                          </span>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du produit *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive text-sm"
                    placeholder="ex: Moringa"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sous-titre
                  </label>
                  <input
                    type="text"
                    value={editingProduct.subtitle}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, subtitle: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive text-sm"
                    placeholder="ex: Poudre de Moringa"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix (FCFA) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive text-sm"
                    placeholder="ex: 2000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Poids *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.weight}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, weight: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive text-sm"
                    placeholder="ex: 200g"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie
                  </label>
                  <input
                    type="text"
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, category: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive text-sm"
                    placeholder="ex: Superaliments"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description courte
                </label>
                <textarea
                  rows={2}
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive text-sm resize-none"
                  placeholder="Courte description pour la carte produit"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description longue
                </label>
                <textarea
                  rows={4}
                  value={editingProduct.longDescription}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      longDescription: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive text-sm resize-none"
                  placeholder="Description détaillée pour la page produit"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mode d&apos;emploi
                </label>
                <textarea
                  rows={2}
                  value={editingProduct.usage}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, usage: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive text-sm resize-none"
                  placeholder="Comment utiliser ce produit"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bienfaits
                </label>
                {editingProduct.benefits.map((benefit, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => {
                        const newBenefits = [...editingProduct.benefits];
                        newBenefits[i] = e.target.value;
                        setEditingProduct({ ...editingProduct, benefits: newBenefits });
                      }}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive text-sm"
                      placeholder="Un bienfait du produit..."
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newBenefits = editingProduct.benefits.filter(
                          (_, idx) => idx !== i
                        );
                        setEditingProduct({ ...editingProduct, benefits: newBenefits });
                      }}
                      className="text-red-400 hover:text-red-600 p-2"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setEditingProduct({
                      ...editingProduct,
                      benefits: [...editingProduct.benefits, ""],
                    })
                  }
                  className="text-olive text-sm font-medium flex items-center gap-1 mt-1"
                >
                  <Plus size={14} />
                  Ajouter un bienfait
                </button>
              </div>

              {/* Variantes poids / prix */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Variantes (poids / prix)
                </label>
                {(editingProduct.variants || []).map((variant, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={variant.weight}
                      onChange={(e) => {
                        const newVariants = [...(editingProduct.variants || [])];
                        newVariants[i] = { ...newVariants[i], weight: e.target.value };
                        setEditingProduct({ ...editingProduct, variants: newVariants });
                      }}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive text-sm"
                      placeholder="ex: 200g"
                    />
                    <input
                      type="number"
                      value={variant.price}
                      onChange={(e) => {
                        const newVariants = [...(editingProduct.variants || [])];
                        newVariants[i] = { ...newVariants[i], price: parseInt(e.target.value) || 0 };
                        setEditingProduct({ ...editingProduct, variants: newVariants });
                      }}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive text-sm"
                      placeholder="Prix en FCFA"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newVariants = (editingProduct.variants || []).filter((_, idx) => idx !== i);
                        setEditingProduct({ ...editingProduct, variants: newVariants });
                      }}
                      className="text-red-400 hover:text-red-600 p-2"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setEditingProduct({
                      ...editingProduct,
                      variants: [...(editingProduct.variants || []), { weight: "", price: 0 }],
                    })
                  }
                  className="text-olive text-sm font-medium flex items-center gap-1 mt-1"
                >
                  <Plus size={14} />
                  Ajouter une variante
                </button>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={editingProduct.inStock}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, inStock: e.target.checked })
                  }
                  className="w-4 h-4 text-olive rounded"
                />
                <label htmlFor="inStock" className="text-sm text-gray-700">
                  En stock
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary flex-1 justify-center disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  {isCreating ? "Créer le produit" : "Enregistrer"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsCreating(false);
                  }}
                  className="btn-outline"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }

  // Dashboard
  return (
    <section className="bg-cream min-h-screen">
      {/* Admin Header */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="container-custom px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package size={20} className="text-olive" />
            <h1 className="text-xl font-bold text-bark">
              Administration Fabiram
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-olive flex items-center gap-1"
            >
              <Eye size={16} />
              Voir le site
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
            >
              <LogOut size={16} />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom px-4 md:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-sand">
            <p className="text-sm text-gray-500">Produits</p>
            <p className="text-2xl font-bold text-bark">{products.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-sand">
            <p className="text-sm text-gray-500">En stock</p>
            <p className="text-2xl font-bold text-olive">
              {products.filter((p) => p.inStock).length}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-sand">
            <p className="text-sm text-gray-500">Catégories</p>
            <p className="text-2xl font-bold text-bark">
              {new Set(products.map((p) => p.category)).size}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-sand">
            <p className="text-sm text-gray-500">Prix moyen</p>
            <p className="text-2xl font-bold text-secondary">
              {products.length > 0
                ? formatPrice(
                    Math.round(
                      products.reduce((s, p) => s + p.price, 0) / products.length
                    )
                  )
                : "0 FCFA"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button onClick={handleNewProduct} className="btn-primary">
            <Plus size={16} />
            Nouveau produit
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-sand">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-sand/50 border-b border-sand">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-bark">
                    Produit
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-bark">
                    Catégorie
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-bark">
                    Prix
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-bark">
                    Poids
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-bark">
                    Stock
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-bark">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-cream/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-sand">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-bark text-sm">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {product.subtitle}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-olive bg-olive/10 px-2.5 py-1 rounded-full font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-secondary text-sm">
                        {formatPrice(product.price)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.weight}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          product.inStock
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.inStock ? "En stock" : "Rupture"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditingProduct({ ...product })}
                          className="text-olive hover:text-olive-dark p-2 hover:bg-olive/10 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
