'use client';

import { useEffect, useState } from 'react';

import { cartTotalCents, readCart, writeCart } from '@/lib/cart';
import { money } from '@/lib/products';
import { signedInEmail } from '@/lib/session';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** What the form refuses; an empty object means the order may be placed. */
export function validate(values: { email: string; name: string; address: string }) {
  const errors: Record<string, string> = {};
  if (!EMAIL.test(values.email.trim())) errors.email = 'Enter a valid email address.';
  if (!values.name.trim()) errors.name = 'Enter your name.';
  if (!values.address.trim()) errors.address = 'Enter a delivery address.';
  return errors;
}

export default function CheckoutPage() {
  const [values, setValues] = useState({ email: '', name: '', address: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [placed, setPlaced] = useState<string | null>(null);
  const edit = (field: 'email' | 'name' | 'address', value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    setTouched((t) => (t.includes(field) ? t : [...t, field]));
  };
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(cartTotalCents(readCart()));
    const email = signedInEmail();
    if (email) setValues((v) => ({ ...v, email }));
  }, []);

  if (placed) {
    return (
      <>
        <h1>Thanks!</h1>
        <p>
          Order <code>{placed}</code> is on its way. A confirmation goes to {values.email}.
        </p>
      </>
    );
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // After the first attempt, only re-check what the shopper changed since.
        const all = validate(values);
        const problems = submitted
          ? Object.fromEntries(Object.entries(all).filter(([field]) => touched.includes(field)))
          : all;
        setSubmitted(true);
        setTouched([]);
        setErrors(problems);
        if (Object.keys(problems).length > 0) return;
        writeCart([]);
        window.dispatchEvent(new Event('cart-changed'));
        setPlaced(`DS-${Date.now().toString(36).toUpperCase()}`);
      }}
    >
      <h1>Checkout</h1>
      <p className="muted">Order total: {money(total)}</p>
      <label htmlFor="email">Email</label>
      <input id="email" value={values.email} onChange={(e) => edit('email', e.target.value)} />
      {errors.email && <p className="error">{errors.email}</p>}
      <label htmlFor="name">Name</label>
      <input id="name" value={values.name} onChange={(e) => edit('name', e.target.value)} />
      {errors.name && <p className="error">{errors.name}</p>}
      <label htmlFor="address">Address</label>
      <input id="address" value={values.address} onChange={(e) => edit('address', e.target.value)} />
      {errors.address && <p className="error">{errors.address}</p>}
      <p>
        <button type="submit" disabled={total === 0}>
          Place order
        </button>
      </p>
    </form>
  );
}
