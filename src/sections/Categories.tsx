import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { categories } from '@/data/products';

function CategoryCard({ cat, i }: { cat: typeof categories[0]; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    const pctX = Math.round((x / rect.width) * 100);
    const pctY = Math.round((y / rect.height) * 100);

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    card.style.setProperty('--mx', `${pctX}%`);
    card.style.setProperty('--my', `${pctY}%`);
    card.style.setProperty('--spot-opacity', '1');
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    card.style.setProperty('--spot-opacity', '0');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: i * 0.15 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transition: 'transform 0.15s ease-out',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          '--mx': '50%',
          '--my': '50%',
          '--spot-opacity': '0',
        } as React.CSSProperties}
      >
        <Link
          to={`/category/${cat.slug}`}
          className="group block relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-500"
        >
          <div className="aspect-[3/4] overflow-hidden relative">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
              loading="lazy"
            />

            {/* Base gradient overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-80"
              style={{
                background: 'linear-gradient(transparent 20%, rgba(0,0,0,0.8) 100%)',
              }}
            />

            {/* Spotlight — follows cursor via CSS vars */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle 180px at var(--mx) var(--my), rgba(255,255,255,0.12) 0%, transparent 70%)',
                opacity: 'var(--spot-opacity)',
                transition: 'opacity 0.3s ease',
              }}
            />

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-heading text-2xl font-300 text-white mb-2">
                  {cat.name}
                </h3>
                <div className="h-[1px] w-0 group-hover:w-12 bg-[#3c6e71] transition-all duration-500 mb-4" />
                <p className="text-sm font-body text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {cat.count} curated resources
                </p>
              </div>
            </div>

            {/* Glass border */}
            <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-all duration-500 rounded-xl" />
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

export default function Categories() {
  return (
    <section className="relative z-10 bg-[#f4f4f4] pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-body uppercase tracking-[0.1em] text-[#6b6b6b] mb-3">
            Browse by Category
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-400 text-[#1a1a1a]">
            Find Your Perfect Resource
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}