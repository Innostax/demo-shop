/** A demo sign-in: one account, kept in localStorage. The test login for defectly is this one. */
export const DEMO_ACCOUNT = { email: 'shopper@example.com', password: 'demo-pass-1234' };

const KEY = 'demo-shop-session';

export function signedInEmail(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(KEY);
}

export function signIn(email: string, password: string): boolean {
  if (email.trim().toLowerCase() !== DEMO_ACCOUNT.email || password !== DEMO_ACCOUNT.password) {
    return false;
  }
  window.localStorage.setItem(KEY, DEMO_ACCOUNT.email);
  return true;
}

export function signOut(): void {
  window.localStorage.removeItem(KEY);
}
