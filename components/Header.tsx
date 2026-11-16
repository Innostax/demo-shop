'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { cartCount, readCart, STORAGE_KEY } from '@/lib/cart';
import { signedInEmail, signOut } from '@/lib/session';

export function Header() {
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    const refresh = () => {
      setCount(cartCount(readCart()));
      setEmail(signedInEmail());
    };
    refresh();
    window.addEventListener('storage', refresh);
    window.addEventListener('cart-changed', refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('cart-changed', refresh);
    };
  }, []);
  return (
    <header>
      <nav>
        <Link href="/">Demo shop</Link>
        <Link href="/cart" data-testid="cart-link">Cart ({count})</Link>
        <span className="spacer" />
        {email ? (
          <>
            <span className="muted">{email}</span>
            <button
              className="secondary"
              onClick={() => {
                signOut();
                window.localStorage.removeItem(STORAGE_KEY);
                window.dispatchEvent(new Event('cart-changed'));
              }}
            >
              Sign out
            </button>
          </>
        ) : (
          <Link href="/login">Sign in</Link>
        )}
      </nav>
    </header>
  );
}
