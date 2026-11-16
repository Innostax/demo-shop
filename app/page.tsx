import Link from 'next/link';

import { AddToCartButton } from '@/components/AddToCartButton';
import { money, PRODUCTS } from '@/lib/products';

export default function HomePage() {
  return (
    <>
      <h1>Products</h1>
      <div className="grid">
        {PRODUCTS.map((p) => (
          <article key={p.id} className="card">
            <h3>
              <Link href={`/products/${p.id}`}>{p.name}</Link>
            </h3>
            <p className="price">{money(p.priceCents)}</p>
            <p className="muted">{p.description}</p>
            <AddToCartButton productId={p.id} />
          </article>
        ))}
      </div>
    </>
  );
}
