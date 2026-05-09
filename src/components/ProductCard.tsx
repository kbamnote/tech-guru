import { Link } from 'react-router';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="aspect-[3/4] overflow-hidden bg-[#f4f4f4] relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 text-[10px] font-body font-500 uppercase tracking-wider bg-white/90 text-[#1a1a1a] px-2.5 py-1 rounded">
              {product.badge}
            </span>
          )}
        </div>
        <div className="mt-3">
          <h3 className="text-[15px] font-body font-500 text-[#1a1a1a] group-hover:text-[#3c6e71] transition-colors">
            {product.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-0.5">
              <Star size={12} className="text-amber-500 fill-amber-500" />
              <span className="text-xs font-body text-[#6b6b6b]">{product.rating}</span>
            </div>
            <span className="text-xs text-[#e6e6e6]">|</span>
            <span className="text-xs font-body text-[#6b6b6b]">({product.reviews})</span>
          </div>
          <p className="text-sm font-body text-[#6b6b6b] mt-1">
            Rs. {product.price.toLocaleString('en-IN')}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
