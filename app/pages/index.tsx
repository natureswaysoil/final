

 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/pages/index.tsx b/pages/index.tsx
index b5f56c1efe62c8055a76f202616f07750d246a50..3a793f93038e9dff4d79f63057bc343aeeb0ae17 100644
--- a/pages/index.tsx
+++ b/pages/index.tsx
@@ -1,23 +1,34 @@
 import Link from 'next/link';
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
-          </Link>
-        </div>
-      ))}
-    </main>
+    <>
+      <header className="p-4 bg-green-700 text-white flex flex-col items-center">
+        <img src="/logo.svg" alt="Nature's Way Soil logo" className="h-16 mb-2" />
+        <p className="text-sm">Nurture your soil naturally</p>
+      </header>
+      <main className="p-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
+        {products.map((p) => (
+          <div key={p.id} className="border rounded p-4 flex flex-col">
+            <img
+              src={p.image}
+              alt={p.title}
+              className="mb-2 w-full h-48 object-cover"
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
+    </>
   );
 }
 
EOF
)
