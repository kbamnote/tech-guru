import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, Star, Minus, Plus, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchProduct, fetchProducts } from '@/data/api';
import { reviews } from '@/data/products';
import type { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'reviews'>('description');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchProduct(id)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  // Static reviews filtered by productId — just for demo display
  const productReviews = reviews.filter(r => r.productId === 1);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4f4f4] pt-24 pb-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center py-20">
          <h1 className="font-heading text-3xl text-[#1a1a1a]">Loading…</h1>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f4f4f4] pt-24 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 text-center py-20">
          <h1 className="font-heading text-3xl text-[#1a1a1a]">Product not found</h1>
          <Link to="/shop" className="mt-4 inline-block text-sm text-[#3c6e71] hover:underline">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Fetch related products (same category)
  const [related, setRelated] = useState<Product[]>([]);
  useEffect(() => {
    fetchProducts().then(all => {
      setRelated(all.filter(p => p.category === product.category && p._id !== product._id).slice(0, 3));
    });
  }, [product]);

  return (
    <main className="min-h-screen bg-[#f4f4f4] pt-24 pb-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm font-body text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors mb-8"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[3/4] bg-white overflow-hidden rounded">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="inline-block text-[10px] font-body font-500 uppercase tracking-wider px-2.5 py-1 rounded bg-[#f4f4f4] text-[#6b6b6b]">
              {product.category}
            </span>

            <h1 className="font-heading text-3xl md:text-4xl font-300 text-[#1a1a1a] mt-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-amber-500 fill-amber-500" />
                <span className="text-sm font-body font-500 text-[#1a1a1a]">{product.rating}</span>
              </div>
              <span className="text-xs text-[#e6e6e6]">|</span>
              <span className="text-sm font-body text-[#6b6b6b]">{product.reviews} reviews</span>
            </div>

            <p className="font-heading text-2xl text-[#1a1a1a] mt-6 flex items-center gap-3">
              Rs. {product.price.toLocaleString('en-IN')}
              {product.originalPrice && (
                <span className="text-lg text-[#6b6b6b] line-through font-body">Rs. {product.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </p>

            <p className="text-sm font-body text-[#6b6b6b] leading-relaxed mt-4">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="mt-8">
              <label className="text-xs font-body uppercase tracking-wider text-[#6b6b6b] mb-2 block">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-[#e6e6e6] rounded hover:border-[#1a1a1a] transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center font-body font-500">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-[#e6e6e6] rounded hover:border-[#1a1a1a] transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className={`mt-8 w-full py-4 text-sm font-body font-500 uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all duration-300 ${
                added
                  ? 'bg-[#3c6e71] text-white'
                  : 'bg-[#1a1a1a] text-white hover:bg-[#3c6e71]'
              }`}
            >
              <ShoppingCart size={16} strokeWidth={1.5} />
              {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="flex gap-6 border-b border-[#e6e6e6]">
            {(['description', 'features', 'reviews'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-body capitalize transition-colors relative ${
                  activeTab === tab
                    ? 'text-[#1a1a1a] font-500'
                    : 'text-[#6b6b6b] hover:text-[#1a1a1a]'
                }`}
              >
                {tab === 'features' ? "What's Inside" : tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1a1a1a]"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-[15px] font-body text-[#6b6b6b] leading-relaxed max-w-2xl">
                  {product.description}
                </p>
              </motion.div>
            )}

            {activeTab === 'features' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ul className="space-y-3 max-w-2xl">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] font-body text-[#6b6b6b]">
                      <span className="w-1.5 h-1.5 bg-[#3c6e71] rounded-full mt-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {productReviews.length === 0 ? (
                  <p className="text-sm text-[#6b6b6b] font-body">No reviews yet. Be the first to review!</p>
                ) : (
                  <div className="space-y-6 max-w-2xl">
                    {productReviews.map(review => (
                      <div key={review.id} className="pb-6 border-b border-[#e6e6e6]">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-[#f7f4ed] rounded-full flex items-center justify-center">
                            <span className="text-xs font-body font-500 text-[#1a1a1a]">
                              {review.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-body font-500 text-[#1a1a1a]">{review.name}</p>
                            <p className="text-xs font-body text-[#6b6b6b]">{review.date}</p>
                          </div>
                          <div className="ml-auto flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-[#e6e6e6]'}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm font-body text-[#6b6b6b] leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl text-[#1a1a1a] mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {related.map((p, i) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link to={`/product/${p._id}`} className="group block">
                    <div className="aspect-[3/4] overflow-hidden bg-[#f4f4f4]">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="mt-3 text-sm font-body font-500 text-[#1a1a1a] group-hover:text-[#3c6e71] transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm font-body">
                      <span className="text-[#1a1a1a] font-500">Rs. {p.price.toLocaleString('en-IN')}</span>
                      {p.originalPrice && (
                        <span className="text-[#6b6b6b] line-through ml-2 text-xs">Rs. {p.originalPrice.toLocaleString('en-IN')}</span>
                      )}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
