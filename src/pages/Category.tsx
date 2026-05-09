import { useParams, Link } from 'react-router';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function Category() {
  const { slug } = useParams<{ slug: string }>();

  const category = useMemo(() => {
    return categories.find(c => c.slug === slug);
  }, [slug]);

  const filtered = useMemo(() => {
    if (!category) return [];
    return products.filter(p => p.category === category.id);
  }, [category]);

  if (!category) {
    return (
      <main className="min-h-screen bg-[#f4f4f4] pt-24 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 text-center py-20">
          <h1 className="font-heading text-3xl text-[#1a1a1a]">Category not found</h1>
          <Link to="/shop" className="mt-4 inline-block text-sm text-[#3c6e71] hover:underline">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f4f4] pt-24 pb-20">
      {/* Category Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden mb-12">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(transparent 20%, rgba(0,0,0,0.7) 100%)' }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-[1400px] mx-auto w-full">
          <Link
            to="/shop"
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-body mb-3 transition-colors w-fit"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Back to Shop
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl font-300 text-white"
          >
            {category.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-2 text-sm font-body text-white/70"
          >
            {category.description}
          </motion.p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm font-body text-[#6b6b6b]">
            {filtered.length} products
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-heading text-xl text-[#1a1a1a]">No products yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
