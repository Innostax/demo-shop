import { findProduct } from './products';

export type CartLine = { productId: string; quantity: number };

export const STORAGE_KEY = 'demo-shop-cart';

export function readCart(): CartLine[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const lines = raw ? (JSON.parse(raw) as CartLine[]) : [];
    return Array.isArray(lines) ? lines.filter((l) => findProduct(l.productId) && l.quantity > 0) : [];
  } catch {
    return [];
  }
}

export function writeCart(lines: CartLine[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
}

export function addToCart(lines: CartLine[], productId: string): CartLine[] {
  const existing = lines.find((l) => l.productId === productId);
  if (existing) {
    return lines.map((l) => (l.productId === productId ? { ...l, quantity: l.quantity + 1 } : l));
  }
  return [...lines, { productId, quantity: 1 }];
}

export function setQuantity(lines: CartLine[], productId: string, quantity: number): CartLine[] {
  if (quantity <= 0) return lines.filter((l) => l.productId !== productId);
  return lines.map((l) => (l.productId === productId ? { ...l, quantity } : l));
}

/** The order total: every line's price times its quantity. */
export function cartTotalCents(lines: CartLine[]): number {
  return lines.reduce((sum, line) => {
    const product = findProduct(line.productId);
    return product ? sum + product.priceCents * line.quantity : sum;
  }, 0);
}

export const cartCount = (lines: CartLine[]): number => lines.reduce((n, l) => n + l.quantity, 0);
