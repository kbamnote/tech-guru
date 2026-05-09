import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Download, Star } from 'lucide-react';
import { Link } from 'react-router';

export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video 
        src="/images/mp4.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content overlay */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span>Over 10,000+ Happy Readers</span>
          </div>
          
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] tracking-tight mb-8">
            Unlock Your <br/>
            <span className="text-[#e5d3b3] italic font-light">Digital</span> Library
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl font-body text-white/80 mb-10 max-w-2xl mx-auto">
            Access premium eBooks, educational resources, and content bundles instantly. Elevate your learning experience today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Link 
              to="/shop" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#e5d3b3] text-[#1a1a1a] font-semibold rounded-lg hover:bg-[#d4c2a2] transition-all duration-300 shadow-lg text-lg"
            >
              Browse Collection
              <ArrowRight size={20} />
            </Link>
            <button 
              onClick={scrollToContent}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 text-lg"
            >
              Explore Categories
            </button>
          </div>
        </motion.div>
      </div>
      
      <div ref={scrollRef} className="absolute bottom-0 w-full h-1" />
    </section>
  );
}
