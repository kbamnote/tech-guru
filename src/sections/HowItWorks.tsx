import { BookOpen, CreditCard, Mail, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: Sparkles,
    title: 'Browse & Discover',
    description: 'Explore our curated collection of ebooks, guides, and creator bundles.',
  },
  {
    icon: CreditCard,
    title: 'Quick Checkout',
    description: 'Secure payment with UPI, cards, or wallets. No hassle, no delay.',
  },
  {
    icon: Mail,
    title: 'Instant Delivery',
    description: 'Download link sent to your email within minutes of purchase.',
  },
  {
    icon: BookOpen,
    title: 'Start Learning',
    description: 'Access your digital products anytime, anywhere. Begin your journey.',
  },
];

export default function HowItWorks() {
  return (
    <section className="relative z-10 bg-[#f4f4f4] py-24">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-body uppercase tracking-[0.1em] text-[#6b6b6b] mb-3">
            How It Works
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-400 text-[#1a1a1a]">
            Simple Steps to Get Started
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-[#f7f4ed] border border-[#e6e6e6] mb-4">
                <step.icon size={22} strokeWidth={1.5} className="text-[#3c6e71]" />
              </div>
              <div className="text-xs font-body text-[#3c6e71] font-500 mb-2">
                Step {i + 1}
              </div>
              <h3 className="font-heading text-lg font-400 text-[#1a1a1a] mb-2">
                {step.title}
              </h3>
              <p className="text-sm font-body text-[#6b6b6b] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
