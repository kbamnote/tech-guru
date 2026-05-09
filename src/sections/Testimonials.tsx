import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent(prev => (prev + 1) % testimonials.length);
  const prev = () => setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="relative z-10 bg-[#f7f4ed] py-24">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-body uppercase tracking-[0.1em] text-[#6b6b6b] mb-8">
            What Our Customers Say
          </p>
        </motion.div>

        <div className="relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-amber-500 fill-amber-500" />
                ))}
              </div>
              <blockquote className="font-heading text-xl md:text-2xl font-300 text-[#1a1a1a] leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <div className="mt-6">
                <p className="text-sm font-body font-500 text-[#1a1a1a]">{t.name}</p>
                <p className="text-xs font-body text-[#6b6b6b] mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            className="w-10 h-10 flex items-center justify-center border border-[#1a1a1a]/20 rounded-full hover:border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? 'bg-[#1a1a1a] w-6' : 'bg-[#1a1a1a]/20'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 flex items-center justify-center border border-[#1a1a1a]/20 rounded-full hover:border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
