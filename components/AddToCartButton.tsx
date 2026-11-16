'use client';

import { addToCart, readCart, writeCart } from '@/lib/cart';

export function AddToCartButton({ productId }: { productId: string }) {
  return (
    <button
      onClick={() => {
        writeCart(addToCart(readCart(), productId));
        window.dispatchEvent(new Event('cart-changed'));
      }}
    >
      Add to cart
    </button>
  );
}
