 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/pages/index.tsx b/pages/index.tsx
index b5f56c1efe62c8055a76f202616f07750d246a50..d1b13d168956facdead782aab743039a5123e52a 100644
--- a/pages/index.tsx
+++ b/pages/index.tsx
@@ -1,23 +1,47 @@
 import Link from 'next/link';
+import Image from 'next/image';
 import { listProducts } from '@/lib/cart';
 
 export default function Home() {
   const products = listProducts();
   return (
-    <main className="p-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
-      {products.map((p) => (
-        <div key={p.id} className="border rounded p-4 flex flex-col">
-          <h2 className="text-lg font-semibold mb-2">{p.title}</h2>
-          <p className="flex-grow">{p.description}</p>
-          <p className="mt-2 font-bold">${p.price.toFixed(2)}</p>
-          <Link
-            href={`/checkout?slug=${p.slug}&qty=1`}
-            className="mt-4 inline-block bg-green-600 text-white px-3 py-1 rounded text-center"
-          >
-            Buy now
+    <div>
+      <header className="flex flex-col sm:flex-row items-center justify-between p-4 bg-green-100">
+        <Image src="/logo.png" alt="Nature's Way Soil" width={120} height={120} />
+        <nav className="space-x-4 mt-4 sm:mt-0">
+          <Link href="/knowledge" className="text-green-800 underline">
+            Knowledge Base
           </Link>
-        </div>
-      ))}
-    </main>
+          <Link href="/privacy" className="text-green-800 underline">
+            Privacy
+          </Link>
+          <Link href="/refund" className="text-green-800 underline">
+            Refund Policy
+          </Link>
+        </nav>
+      </header>
+      <main className="p-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
+        {products.map((p) => (
+          <div key={p.id} className="border rounded p-4 flex flex-col">
+            <Image
+              src={p.image || '/placeholder-product.png'}
+              alt={p.title}
+              width={300}
+              height={300}
+              className="object-cover mb-2"
+            />
+            <h2 className="text-lg font-semibold mb-2">{p.title}</h2>
+            <p className="flex-grow">{p.description}</p>
+            <p className="mt-2 font-bold">${p.price.toFixed(2)}</p>
+            <Link
+              href={`/checkout?slug=${p.slug}&qty=1`}
+              className="mt-4 inline-block bg-green-600 text-white px-3 py-1 rounded text-center"
+            >
+              Buy now
+            </Link>
+          </div>
+        ))}
+      </main>
+    </div>
   );
 }
 
EOF
)



