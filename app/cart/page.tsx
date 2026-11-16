'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { type CartLine, cartTotalCents, readCart, setQuantity, writeCart } from '@/lib/cart';
import { findProduct, money } from '@/lib/products';

export default function CartPage() {
  const [lines, setLines] = useState<CartLine[]>([]);
  useEffect(() => setLines(readCart()), []);
  const update = (next: CartLine[]) => {
    writeCart(next);
    setLines(next);
    window.dispatchEvent(new Event('cart-changed'));
  };
  if (lines.length === 0) {
    return (
      <>
        <h1>Your cart is empty</h1>
        <Link className="button" href="/products">
          Continue shopping
        </Link>
      </>
    );
  }
  return (
    <>
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Line total</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line) => {
            const product = findProduct(line.productId)!;
            return (
              <tr key={line.productId}>
                <td>{product.name}</td>
                <td>{money(product.priceCents)}</td>
                <td>
                  <input
                    type="number"
                    min={0}
                    aria-label={`Quantity of ${product.name}`}
                    value={line.quantity}
                    onChange={(e) => update(setQuantity(lines, line.productId, Number(e.target.value)))}
                  />
                </td>
                <td>{money(product.priceCents * line.quantity)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>
        <strong data-testid="cart-total">Total: {money(cartTotalCents(lines))}</strong>
      </p>
      <Link className="button" href="/checkout">
        Checkout
      </Link>
    </>
  );
}
