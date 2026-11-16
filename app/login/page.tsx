'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { DEMO_ACCOUNT, signIn } from '@/lib/session';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (signIn(email, password)) {
          window.dispatchEvent(new Event('cart-changed'));
          router.push('/');
        } else {
          setError('That email and password do not match.');
        }
      }}
    >
      <h1>Sign in</h1>
      <p className="muted">
        Demo account: <code>{DEMO_ACCOUNT.email}</code> / <code>{DEMO_ACCOUNT.password}</code>
      </p>
      <label htmlFor="email">Email</label>
      <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p className="error">{error}</p>}
      <p>
        <button type="submit">Sign in</button>
      </p>
    </form>
  );
}
