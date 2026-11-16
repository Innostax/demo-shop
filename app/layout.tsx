import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Header } from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Demo shop',
  description: 'A small storefront defectly.ai tests on every preview deploy.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
