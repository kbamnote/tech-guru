import { Link } from 'react-router';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 z-[70]"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[80] flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e6e6e6]">
              <h2 className="font-heading text-xl text-[#1a1a1a]">Your Cart</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
                aria-label="Close cart"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} strokeWidth={1} className="text-[#e6e6e6] mb-4" />
                  <p className="font-heading text-lg text-[#1a1a1a] mb-2">Your cart is empty</p>
                  <p className="text-sm text-[#6b6b6b] font-body mb-6">
                    Explore our collection and find something you love.
                  </p>
                  <Link
                    to="/shop"
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-body font-500 uppercase tracking-wider text-[#1a1a1a] border-b border-[#1a1a1a] pb-1 hover:text-[#3c6e71] hover:border-[#3c6e71] transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {items.map(item => (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 pb-4 border-b border-[#e6e6e6]"
                    >
                      <div className="w-20 h-24 flex-shrink-0 rounded overflow-hidden bg-[#f4f4f4]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-body font-500 text-[#1a1a1a] truncate">
                          {item.title}
                        </h3>
                        <p className="text-sm font-body mt-0.5">
                          <span className="text-[#6b6b6b]">Rs. {item.price}</span>
                          {item.originalPrice && (
                            <span className="text-[#a0a0a0] line-through ml-2 text-xs">Rs. {item.originalPrice}</span>
                          )}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center border border-[#e6e6e6] rounded hover:border-[#1a1a1a] transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-body font-500 w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center border border-[#e6e6e6] rounded hover:border-[#1a1a1a] transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="p-1 text-[#6b6b6b] hover:text-red-500 transition-colors self-start"
                        aria-label="Remove item"
                      >
                        <X size={16} strokeWidth={1.5} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-4 border-t border-[#e6e6e6]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-body text-[#6b6b6b]">Subtotal</span>
                  <span className="font-heading text-xl text-[#1a1a1a]">
                    Rs. {totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3 bg-[#1a1a1a] text-white text-sm font-body font-500 uppercase tracking-wider rounded hover:bg-[#3c6e71] transition-colors"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3 mt-2 text-sm font-body text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
