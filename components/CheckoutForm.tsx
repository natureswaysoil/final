 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/components/CheckoutForm.tsx b/components/CheckoutForm.tsx
index bfc63388e62cfa3e597f7795d95cf5a0343762e6..bcec4bfc29b8e2383981667a56d59fd33f3d1bab 100644
--- a/components/CheckoutForm.tsx
+++ b/components/CheckoutForm.tsx
@@ -1,39 +1,63 @@
 import { FormEvent, useState } from 'react';
 import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
+import { createClient } from '@supabase/supabase-js';
+
+const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
+const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
+const supabase = createClient(supabaseUrl, supabaseKey);
 
 export default function CheckoutForm() {
   const stripe = useStripe();
   const elements = useElements();
   const [message, setMessage] = useState<string | null>(null);
   const [loading, setLoading] = useState(false);
+  const [name, setName] = useState('');
+  const [email, setEmail] = useState('');
 
   const handleSubmit = async (e: FormEvent) => {
     e.preventDefault();
     if (!stripe || !elements) return;
     setLoading(true);
+    const orderId = Date.now().toString();
+    await supabase.from('orders').insert({ order_id: orderId, name, email });
     const { error } = await stripe.confirmPayment({
       elements,
       confirmParams: {
         return_url: window.location.origin + '/checkout?status=success',
       },
     });
     if (error) {
       setMessage(error.message || 'An unexpected error occurred.');
     }
     setLoading(false);
   };
 
   return (
     <form onSubmit={handleSubmit} className="space-y-4">
+      <input
+        className="w-full border p-2"
+        placeholder="Name"
+        value={name}
+        onChange={(e) => setName(e.target.value)}
+        required
+      />
+      <input
+        className="w-full border p-2"
+        type="email"
+        placeholder="Email"
+        value={email}
+        onChange={(e) => setEmail(e.target.value)}
+        required
+      />
       <PaymentElement />
       <button
         type="submit"
         disabled={!stripe || loading}
         className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
       >
         {loading ? 'Processing…' : 'Pay now'}
       </button>
       {message && <div className="text-red-500">{message}</div>}
     </form>
   );
 }
 
EOF
)
