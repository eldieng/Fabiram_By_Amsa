export interface Variant {
  weight: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  longDescription: string;
  benefits: string[];
  usage: string;
  price: number;
  weight: string;
  image: string;
  category: string;
  badge: string;
  inStock: boolean;
  variants?: Variant[];
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("/api/products", { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export async function createProduct(product: Product): Promise<Product> {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function updateProduct(product: Product): Promise<Product> {
  const res = await fetch("/api/products", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function deleteProduct(id: string): Promise<void> {
  await fetch("/api/products", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data.url;
}
