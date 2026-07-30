import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { fetchProducts } from '@/data/api';
import type { Product } from '@/data/products';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(all => setProducts(all.slice(0, 4)))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null; // don't show empty state on home

  const featured = products.length > 0 ? products.slice(0, 4) : [];
  if (featured.length === 0) return null;

  // Duplicate for seamless infinite loop
  const items = [...featured, ...featured];

  return (
    <section className="relative z-10 bg-[#f4f4f4] py-20">
      <style>{`
        @keyframes scroll-carousel {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .carousel-track {
          animation: scroll-carousel 18s linear infinite;
          will-change: transform;
        }
        .carousel-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-400 text-[#1a1a1a]">
            Featured
          </h2>
          <p className="text-sm font-body text-[#1a1a1a]/50 mt-2">
            Handpicked this week
          </p>
        </motion.div>

        {/* Carousel viewport — clips overflow */}
        <div className="overflow-hidden">
          <div className="carousel-track flex gap-4 md:gap-6">
            {items.map((product, i) => (
              <div
                key={`${product._id}-${i}`}
                className="shrink-0 w-[calc(50%-8px)] md:w-[calc(25%-18px)]"
              >
                <Link to={`/product/${product._id}`} className="group block">
                  <div className="aspect-square overflow-hidden bg-[#f4f4f4]">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:-translate-y-1"
                      style={{ boxShadow: 'none' }}
                      loading="lazy"
                    />
                  </div>
                  <h3 className="mt-3 text-[15px] font-body font-500 text-[#1a1a1a] group-hover:text-[#3c6e71] transition-colors truncate">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-sm font-body text-[#6b6b6b]">
                    Rs. {product.price.toLocaleString('en-IN')}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            to="/shop"
            className="inline-block text-sm font-body font-500 uppercase tracking-[0.08em] text-[#1a1a1a] border-b border-[#1a1a1a] pb-1 hover:text-[#3c6e71] hover:border-[#3c6e71] transition-colors"
          >
            View All Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
