import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { fetchProducts, fetchCategories } from '@/data/api';
import type { Product, Category } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    Promise.all([
      fetchProducts().catch(() => [] as Product[]),
      fetchCategories().catch(() => [] as Category[]),
    ]).then(([prods, cats]) => {
      setProducts(prods);
      setCategories(cats);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    return result;
  }, [products, activeCategory, sortBy]);

  const allCategories = [
    { id: 'all', name: 'All Products' },
    ...categories.map(c => ({ id: c.slug, name: c.name })),
  ];

  return (
    <main className="min-h-screen bg-[#f4f4f4] pt-24 pb-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-300 text-[#1a1a1a]">
            Shop
          </h1>
          <p className="mt-2 text-sm font-body text-[#6b6b6b]">
            {loading ? 'Loading…' : `${filtered.length} products available`}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile filter toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm font-body font-500 text-[#1a1a1a] border border-[#e6e6e6] px-4 py-2.5 rounded"
            >
              <SlidersHorizontal size={16} strokeWidth={1.5} />
              Filters
            </button>
          </div>

          {/* Sidebar */}
          <aside
            className={`lg:w-64 flex-shrink-0 ${
              showFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="bg-white p-6 rounded">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-lg text-[#1a1a1a]">Categories</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden p-1"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {allCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`text-left text-sm font-body py-2 px-3 rounded transition-colors ${
                      activeCategory === cat.id
                        ? 'bg-[#1a1a1a] text-white'
                        : 'text-[#6b6b6b] hover:bg-[#f4f4f4] hover:text-[#1a1a1a]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#e6e6e6]">
                <h3 className="font-heading text-lg text-[#1a1a1a] mb-4">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="w-full text-sm font-body text-[#1a1a1a] border border-[#e6e6e6] px-3 py-2.5 rounded focus:outline-none focus:border-[#1a1a1a] bg-white"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-20">
                <p className="font-heading text-xl text-[#1a1a1a]">Loading…</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-heading text-xl text-[#1a1a1a]">No products found</p>
                <p className="text-sm text-[#6b6b6b] mt-2">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filtered.map((product, i) => (
                  <ProductCard key={product._id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
