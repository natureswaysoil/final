 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a//dev/null b/pages/api/chat.ts
index 0000000000000000000000000000000000000000..e4a9254397492d6be69c60c58a97dfc91064454d 100644
--- a//dev/null
+++ b/pages/api/chat.ts
@@ -0,0 +1,24 @@
+import type { NextApiRequest, NextApiResponse } from 'next';
+import OpenAI from 'openai';
+
+const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
+
+export default async function handler(
+  req: NextApiRequest,
+  res: NextApiResponse
+) {
+  if (req.method !== 'POST') {
+    res.status(405).end();
+    return;
+  }
+  try {
+    const { messages } = req.body;
+    const completion = await openai.chat.completions.create({
+      model: 'gpt-3.5-turbo',
+      messages,
+    });
+    res.status(200).json({ reply: completion.choices[0].message?.content || '' });
+  } catch (err) {
+    res.status(500).json({ error: 'Failed to generate response.' });
+  }
+}
 
EOF
)
