# demo-shop

A small storefront that defectly.ai tests on every preview deploy: products, a product page, a cart,
a checkout form and a demo sign-in. No database; the cart and the session live in `localStorage`.

- Demo account: `shopper@example.com` / `demo-pass-1234` (also the test login given to defectly).
- `npm install && npm run dev` → http://localhost:3000

## Deploy and connect

1. Import the repo into Vercel (framework preset: Next.js). Every pull request then gets a preview
   deployment, which GitHub sees as a `deployment_status` for the `Preview` environment.
2. Install the defectly.ai GitHub App on the repo. In defectly, pick the repo, choose
   **Gate before production** with the default branch, report-only (the default), and add the
   demo account as the test login. Scanning: on.
3. Open a pull request from the branch `pr/ai-refactor-cart` (see `PLANTED_BUGS.md`): the check
   `defectly/gate` runs on the preview deploy and files one issue per bug it reproduces.

## Planted bugs

The default branch is correct. The patch `../demo-shop.bugs.patch` (applied on a branch named
`pr/ai-refactor-cart`, commit message "refactor(cart): simplify totals and checkout validation")
plants three bugs of the kind an AI refactor leaves behind:

1. **Cart total ignores quantities** (`lib/cart.ts`): the total sums unit prices. Add a mug and set
   its quantity to 3: the line says $42.00, the total says $14.00.
2. **Checkout accepts an empty email on the second submit** (`app/checkout/page.tsx`): after a
   first attempt, only the fields the shopper edited since are re-checked. Sign out (so no email
   is prefilled), submit the empty form once, fill in name and address, submit again: the order is
   placed with no email.
3. **"Continue shopping" from the empty cart is a 404** (`app/cart/page.tsx`): the link goes to
   `/products`, a page that does not exist.
