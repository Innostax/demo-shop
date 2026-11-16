import Link from 'next/link';
import { notFound } from 'next/navigation';

import { AddToCartButton } from '@/components/AddToCartButton';
import { findProduct, money, PRODUCTS } from '@/lib/products';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) notFound();
  return (
    <article className="card">
      <h1>{product.name}</h1>
      <p className="price">{money(product.priceCents)}</p>
      <p>{product.description}</p>
      <AddToCartButton productId={product.id} />{' '}
      <Link className="button secondary" href="/">
        Back to products
      </Link>
    </article>
  );
}
