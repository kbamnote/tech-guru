import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { ArrowLeft, CreditCard, Wallet, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

function loadScript(src: string) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'wallet'>('upi');
  const [form, setForm] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    if (submitting) return;
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const orderId = 'ORD-' + Date.now().toString(36).toUpperCase();
    setSubmitting(true);

    try {
      // 1. Load Razorpay script
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        setSubmitting(false);
        return;
      }

      // 2. Create Order on Backend
      const orderResponse = await fetch('https://tech-guru-backend-production.up.railway.app/api/orders/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice }),
      });
      const orderData = await orderResponse.json();

      if (!orderData.success) {
        console.error('Order creation failed:', orderData);
        alert(`Failed to create order on server: ${orderData.error || 'Unknown error'}`);
        setSubmitting(false);
        return;
      }

      // 3. Fetch Razorpay key ID
      const keyResponse = await fetch('https://tech-guru-backend-production.up.railway.app/api/orders/razorpay-key');
      const keyData = await keyResponse.json();

      // 4. Initialize Razorpay Checkout
      const options = {
        key: keyData.key,
        amount: orderData.order.amount,
        currency: "INR",
        name: "ImTechGuru",
        description: "Test Transaction",
        order_id: orderData.order.id,
        handler: async function (response: any) {
          try {
            // 5. Save Order on Backend
            await fetch('https://tech-guru-backend-production.up.railway.app/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: form.name,
                email: form.email,
                orderId: orderId,
                paymentMethod: paymentMethod,
                orderTotal: totalPrice,
                items: items,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              }),
            });

            // 6. Automatic Ebook Delivery via Email
            // Only send for Kids Ebooks (IDs 101-112)
            for (const item of items) {
              if (item.id >= 101 && item.id <= 112) {
                const bookIdMap: Record<number, string> = {
                  101: 'kids_book_1',  // Activity Book School Bus
                  102: 'kids_book_2',  // Coloring Books Collection
                  103: 'kids_book_3',  // Kids Cyber Security Guide
                  104: 'kids_book_4',  // Fun with Letters and Numbers
                  112: 'kids_book_5',  // Fun Activity Books Combo
                  109: 'kids_book_6',  // Ramadan Kids Book
                  105: 'kids_book_7',  // Kids Activity Busy Book
                  106: 'kids_book_8',  // Kids Funbook Adventures
                  107: 'kids_book_9',  // Kids Tracing and Coloring
                  108: 'kids_book_10', // Nursery Activity Books
                  110: 'kids_book_11', // Ramadan Activity Booklet
                  111: 'kids_book_12'  // Summer Activity Book
                };
                
                const bookId = bookIdMap[item.id];
                if (bookId) {
                  console.log(`Triggering delivery for ${bookId}...`);
                  await fetch('https://tech-guru-backend-production.up.railway.app/api/payments/verify-payment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      bookId,
                      email: form.email,
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_signature: response.razorpay_signature
                    }),
                  });
                }
              }
            }
            
            clearCart();
            navigate(`/order-confirmation?orderId=${orderId}&email=${encodeURIComponent(form.email)}`);
          } catch (err) {
            console.error('Error saving order or delivering ebook:', err);
            alert('Payment received but there was an issue delivering your ebook. Please contact support.');
          } finally {
            setSubmitting(false);
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
        },
        theme: {
          color: "#1a1a1a",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on('payment.failed', function (response: any) {
        alert(response.error.description);
        setSubmitting(false);
      });
      paymentObject.open();

    } catch (err) {
      console.error('Checkout error:', err);
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#f4f4f4] pt-24 pb-20">
        <div className="max-w-[600px] mx-auto px-6 text-center py-20">
          <h1 className="font-heading text-3xl text-[#1a1a1a]">Your cart is empty</h1>
          <p className="text-sm text-[#6b6b6b] mt-2 font-body">Add some products to proceed with checkout.</p>
          <Link
            to="/shop"
            className="mt-6 inline-block text-sm font-body font-500 uppercase tracking-wider text-[#1a1a1a] border-b border-[#1a1a1a] pb-1"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  const paymentMethods = [
    { id: 'upi' as const, label: 'UPI', icon: Smartphone, description: 'Google Pay, PhonePe, Paytm' },
    { id: 'card' as const, label: 'Credit / Debit Card', icon: CreditCard, description: 'Visa, Mastercard, RuPay' },
    { id: 'wallet' as const, label: 'Digital Wallet', icon: Wallet, description: 'Paytm, Mobikwik, Freecharge' },
  ];

  return (
    <main className="min-h-screen bg-[#f4f4f4] pt-24 pb-20">
      <div className="max-w-[900px] mx-auto px-6">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm font-body text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors mb-8"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Back to Shop
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-4xl font-300 text-[#1a1a1a] mb-10"
        >
          Checkout
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit}>
              <div className="bg-white p-6 rounded mb-6">
                <h2 className="font-heading text-lg text-[#1a1a1a] mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-body uppercase tracking-wider text-[#6b6b6b] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => {
                        setForm(prev => ({ ...prev, name: e.target.value }));
                        if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                      }}
                      placeholder="Your full name"
                      className={`w-full px-4 py-3 border rounded text-sm font-body text-[#1a1a1a] placeholder:text-[#6b6b6b]/40 focus:outline-none focus:border-[#1a1a1a] transition-colors ${
                        errors.name ? 'border-red-400' : 'border-[#e6e6e6]'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1 font-body">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-body uppercase tracking-wider text-[#6b6b6b] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => {
                        setForm(prev => ({ ...prev, email: e.target.value }));
                        if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                      }}
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 border rounded text-sm font-body text-[#1a1a1a] placeholder:text-[#6b6b6b]/40 focus:outline-none focus:border-[#1a1a1a] transition-colors ${
                        errors.email ? 'border-red-400' : 'border-[#e6e6e6]'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1 font-body">{errors.email}</p>}
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded">
                <h2 className="font-heading text-lg text-[#1a1a1a] mb-4">Payment Method</h2>
                <div className="space-y-3">
                  {paymentMethods.map(method => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full flex items-center gap-4 p-4 border rounded transition-all ${
                        paymentMethod === method.id
                          ? 'border-[#1a1a1a] bg-[#f7f4ed]'
                          : 'border-[#e6e6e6] hover:border-[#1a1a1a]/30'
                      }`}
                    >
                      <method.icon size={20} strokeWidth={1.5} className="text-[#3c6e71]" />
                      <div className="text-left">
                        <p className="text-sm font-body font-500 text-[#1a1a1a]">{method.label}</p>
                        <p className="text-xs font-body text-[#6b6b6b]">{method.description}</p>
                      </div>
                      <div
                        className={`ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === method.id ? 'border-[#3c6e71]' : 'border-[#e6e6e6]'
                        }`}
                      >
                        {paymentMethod === method.id && (
                          <div className="w-2 h-2 bg-[#3c6e71] rounded-full" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 w-full py-4 bg-[#1a1a1a] text-white text-sm font-body font-500 uppercase tracking-wider rounded hover:bg-[#3c6e71] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Processing…' : 'Complete Purchase'}
              </button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="bg-white p-6 rounded sticky top-24">
              <h2 className="font-heading text-lg text-[#1a1a1a] mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-16 flex-shrink-0 bg-[#f4f4f4] rounded overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-body font-500 text-[#1a1a1a] truncate">{item.title}</p>
                      <p className="text-xs font-body text-[#6b6b6b]">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-body text-[#1a1a1a]">
                      Rs. {(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#e6e6e6] pt-4 space-y-2">
                <div className="flex justify-between text-sm font-body text-[#6b6b6b]">
                  <span>Subtotal</span>
                  <span>Rs. {totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm font-body text-[#6b6b6b]">
                  <span>Delivery</span>
                  <span className="text-[#3c6e71]">Free</span>
                </div>
                <div className="flex justify-between font-heading text-lg text-[#1a1a1a] pt-2 border-t border-[#e6e6e6]">
                  <span>Total</span>
                  <span>Rs. {totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
