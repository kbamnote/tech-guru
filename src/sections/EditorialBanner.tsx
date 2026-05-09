import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function EditorialBanner() {
  return (
    <section className="relative z-10 bg-[#f4f4f4] py-10">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px] md:min-h-[500px]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="h-64 md:h-auto overflow-hidden"
          >
            <img
              src="/images/quiet-collection-banner.png"
              alt="The Quiet Collection"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              x: { duration: 0.7, delay: 0.2 },
              opacity: { duration: 0.7, delay: 0.2 },
              y: { 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1 // Start after the initial animation
              }
            }}
            className="bg-[#f7f4ed] flex flex-col justify-center px-8 md:px-16 py-12 relative overflow-hidden"
          >
            {/* Decorative background element */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#3c6e71]/5 rounded-full blur-3xl pointer-events-none" />
            
            <span className="text-xs font-body uppercase tracking-[0.1em] text-[#3c6e71] mb-4">
              New Arrival
            </span>
            <h2 className="font-heading text-3xl md:text-[40px] font-300 text-[#1a1a1a] leading-tight">
              The Quiet Collection
            </h2>
            <p className="mt-4 text-[15px] font-body text-[#6b6b6b] leading-relaxed max-w-[360px]">
              Minimal pieces designed for stillness. Each item is crafted to bring calm to your daily rituals.
            </p>
            <Link
              to="/shop"
              className="mt-8 group inline-flex items-center gap-2 text-sm font-body uppercase tracking-[0.08em] text-[#1a1a1a] border-b border-[#1a1a1a] pb-1 hover:text-[#3c6e71] hover:border-[#3c6e71] transition-colors w-fit"
            >
              Discover
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
