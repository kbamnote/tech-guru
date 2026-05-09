import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="relative z-10 bg-white py-24">
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-400 text-[#1a1a1a]">
            Stay in the Loop
          </h2>
          <p className="mt-3 text-sm font-body text-[#6b6b6b] leading-relaxed">
            Be the first to know about new products, exclusive offers, and helpful tips for learners and creators.
          </p>

          {subscribed ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-sm font-body text-[#3c6e71] font-500"
            >
              Thank you for subscribing! Check your inbox soon.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 border border-[#e6e6e6] rounded text-sm font-body text-[#1a1a1a] placeholder:text-[#6b6b6b]/50 focus:outline-none focus:border-[#1a1a1a] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#1a1a1a] text-white text-sm font-body font-500 uppercase tracking-wider rounded hover:bg-[#3c6e71] transition-colors flex items-center justify-center gap-2"
              >
                Subscribe
                <ArrowRight size={14} strokeWidth={1.5} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
