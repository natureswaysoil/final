
 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/scripts/generate-products.js b/scripts/generate-products.js
index f9f53bb2f384f68b49b8a80ff1a3ce0cd03321a0..ba0ca3a5fd94f25079bf77cf79b552c6ac4cafec 100644
--- a/scripts/generate-products.js
+++ b/scripts/generate-products.js
@@ -1,24 +1,45 @@
 const fs = require('fs');
 const path = require('path');
 
 const src = path.join(__dirname, '..', 'Products (10).csv');
 const out = path.join(__dirname, '..', 'data', 'products.json');
+const imagesSrc = path.join(
+  __dirname,
+  '..',
+  'product images for website.txt'
+);
 
 const raw = fs.readFileSync(src, 'utf8').trim();
 const lines = raw.split(/\r?\n/).slice(1); // skip header
+
+// parse image mapping
+const imageLines = fs
+  .readFileSync(imagesSrc, 'utf8')
+  .split(/\r?\n/)
+  .filter((l) => /^\d+\./.test(l));
+const images = {};
+imageLines.forEach((line) => {
+  const match = line.match(/^(\d+)\.\s+(.*)$/);
+  if (match) {
+    images[Number(match[1])] = match[2].trim();
+  }
+});
+
 const products = lines.map((line) => {
   const [id, title, description, price, active, sku] = line.split(',');
+  const numericId = Number(id);
   return {
-    id: Number(id),
+    id: numericId,
     slug: sku.toLowerCase(),
     title,
     description,
     price: Number(price),
     active: active === 'TRUE',
     sku,
+    image: images[numericId] || '/placeholder-product.png',
   };
 });
 
 fs.mkdirSync(path.dirname(out), { recursive: true });
 fs.writeFileSync(out, JSON.stringify(products, null, 2));
 console.log(`Generated ${products.length} products.`);
 
EOF
)
