 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a//dev/null b/components/ChatBox.tsx
index 0000000000000000000000000000000000000000..eb070fce4e072c3375656b7819aa2a8b0af2232c 100644
--- a//dev/null
+++ b/components/ChatBox.tsx
@@ -0,0 +1,49 @@
+import { useState } from 'react';
+
+type Msg = { role: 'user' | 'assistant'; content: string };
+
+export default function ChatBox() {
+  const [messages, setMessages] = useState<Msg[]>([]);
+  const [input, setInput] = useState('');
+  const send = async () => {
+    if (!input) return;
+    const newMessages: Msg[] = [...messages, { role: 'user', content: input }];
+    setMessages(newMessages);
+    setInput('');
+    try {
+      const res = await fetch('/api/chat', {
+        method: 'POST',
+        headers: { 'Content-Type': 'application/json' },
+        body: JSON.stringify({ messages: newMessages }),
+      });
+      const data = await res.json();
+      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
+    } catch (err) {
+      setMessages([...newMessages, { role: 'assistant', content: 'Error contacting AI.' }]);
+    }
+  };
+  return (
+    <div>
+      <div className="border p-2 h-64 overflow-y-auto mb-2">
+        {messages.map((m, i) => (
+          <div key={i} className={m.role === 'user' ? 'text-right' : ''}>
+            <span className="inline-block px-2 py-1 m-1 rounded bg-gray-100">
+              {m.content}
+            </span>
+          </div>
+        ))}
+      </div>
+      <div className="flex">
+        <input
+          className="flex-grow border p-1 mr-2"
+          value={input}
+          onChange={(e) => setInput(e.target.value)}
+          placeholder="Ask about gardening..."
+        />
+        <button onClick={send} className="bg-green-600 text-white px-3 py-1 rounded">
+          Send
+        </button>
+      </div>
+    </div>
+  );
+}
 
EOF
)
