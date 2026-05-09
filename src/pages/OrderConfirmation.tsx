import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { motion } from 'framer-motion';
import { Mail, Download, Clock } from 'lucide-react';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
}

function generateConfetti(count: number): ConfettiPiece[] {
  const colors = ['#3c6e71', '#1a1a1a', '#f7f4ed', '#d4a574', '#7b9e87', '#c9a96e'];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3,
    size: 6 + Math.random() * 8,
  }));
}

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-UNKNOWN';
  const email = searchParams.get('email') || 'your email';
  const [confetti] = useState(() => generateConfetti(60));
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowEmail(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#f4f4f4] pt-24 pb-20 relative overflow-hidden">
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {confetti.map(piece => (
          <div
            key={piece.id}
            className="absolute animate-confetti"
            style={{
              left: `${piece.x}%`,
              top: '-20px',
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              backgroundColor: piece.color,
              borderRadius: piece.id % 3 === 0 ? '50%' : '2px',
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-[600px] mx-auto px-6 text-center relative z-10">
        {/* Animated Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
          className="w-20 h-20 mx-auto bg-[#3c6e71] rounded-full flex items-center justify-center mb-8"
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <motion.path
              d="M10 20L17 27L30 13"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="font-heading text-4xl font-300 text-[#1a1a1a]">
            Order Confirmed!
          </h1>
          <p className="mt-3 text-sm font-body text-[#6b6b6b]">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 bg-white p-6 rounded"
        >
          <div className="flex justify-between items-center py-3 border-b border-[#e6e6e6]">
            <span className="text-sm font-body text-[#6b6b6b]">Order ID</span>
            <span className="text-sm font-body font-500 text-[#1a1a1a]">{orderId}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-[#e6e6e6]">
            <span className="text-sm font-body text-[#6b6b6b]">Status</span>
            <span className="text-sm font-body font-500 text-[#3c6e71] flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#3c6e71] rounded-full" />
              Confirmed
            </span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-sm font-body text-[#6b6b6b]">Delivery</span>
            <span className="text-sm font-body font-500 text-[#1a1a1a] flex items-center gap-1.5">
              <Clock size={14} strokeWidth={1.5} />
              Instant Digital
            </span>
          </div>
        </motion.div>

        {/* Email Delivery Simulation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showEmail ? 1 : 0, y: showEmail ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="mt-6 bg-[#f7f4ed] p-6 rounded border border-[#e6e6e6]"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Mail size={20} strokeWidth={1.5} className="text-[#3c6e71]" />
            <h3 className="font-heading text-lg text-[#1a1a1a]">Delivered to Your Email</h3>
          </div>
          <p className="text-sm font-body text-[#6b6b6b]">
            Your download link has been sent to{' '}
            <span className="font-500 text-[#1a1a1a]">{email}</span>
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm font-body text-[#3c6e71]">
            <Download size={14} strokeWidth={1.5} />
            <span>Check your inbox for the download link</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/shop"
            className="px-8 py-3 bg-[#1a1a1a] text-white text-sm font-body font-500 uppercase tracking-wider rounded hover:bg-[#3c6e71] transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="text-sm font-body text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
