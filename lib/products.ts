export type Product = {
  id: string;
  name: string;
  priceCents: number;
  description: string;
};

/** The catalogue: in memory on purpose, so the app runs anywhere with no database. */
export const PRODUCTS: Product[] = [
  { id: 'mug', name: 'Enamel mug', priceCents: 1400, description: 'Camp-style, 350 ml, dishwasher safe.' },
  { id: 'tote', name: 'Canvas tote', priceCents: 2200, description: 'Heavy cotton, 40 × 42 cm, inside pocket.' },
  { id: 'cap', name: 'Corduroy cap', priceCents: 2800, description: 'Six panels, brass buckle.' },
  { id: 'notebook', name: 'Dot-grid notebook', priceCents: 900, description: 'A5, 160 pages, lay-flat binding.' },
  { id: 'bottle', name: 'Steel bottle', priceCents: 2600, description: '750 ml, keeps cold for a day.' },
  { id: 'socks', name: 'Wool socks', priceCents: 1200, description: 'Merino blend, one size.' },
];

export const findProduct = (id: string): Product | undefined => PRODUCTS.find((p) => p.id === id);

export const money = (cents: number): string => `$${(cents / 100).toFixed(2)}`;
