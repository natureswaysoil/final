 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/lib/cart.ts b/lib/cart.ts
index de06afffa25370d639eaa641b3273d96813f89da..94e2cfd44ccd6614d3a342204c7aa7cef1a84793 100644
--- a/lib/cart.ts
+++ b/lib/cart.ts
@@ -1,21 +1,22 @@
 import productsData from '@/data/products.json';
 
 export type Product = {
   id: number;
   slug: string;
   title: string;
   description: string;
   price: number;
   active: boolean;
   sku: string;
+  image: string;
 };
 
 const products = productsData as Product[];
 
 export function listProducts(): Product[] {
   return products.filter((p) => p.active);
 }
 
 export function getProduct(slug: string): Product | undefined {
   return products.find((p) => p.slug === slug && p.active);
 }
 
EOF
)
