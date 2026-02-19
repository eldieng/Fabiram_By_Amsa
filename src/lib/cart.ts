export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  weight: string;
  quantity: number;
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("fabiram_cart");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem("fabiram_cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(item: Omit<CartItem, "quantity">, quantity = 1) {
  const cart = getCart();
  const existing = cart.find((c) => c.productId === item.productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...item, quantity });
  }
  saveCart(cart);
}

export function removeFromCart(productId: string) {
  const cart = getCart().filter((c) => c.productId !== productId);
  saveCart(cart);
}

export function updateQuantity(productId: string, quantity: number) {
  const cart = getCart();
  const item = cart.find((c) => c.productId === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
  }
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}

export function getCartTotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getCartCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
}
