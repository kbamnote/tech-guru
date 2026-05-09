import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const links = [
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <img src="/images/ImatechguruLogo.png" alt="ImTechGuru Logo" className="w-[160px] md:w-[90px] h-auto object-contain mb-4" />
            <p className="text-sm font-body text-white/50 leading-relaxed">
              Curated essentials for mindful living. Premium digital products crafted with care for learners, creators, and dreamers across India.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-body uppercase tracking-[0.1em] text-white/30 mb-4">
              Links
            </h4>
            <div className="flex flex-col gap-3">
              {links.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-body text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-body uppercase tracking-[0.1em] text-white/30 mb-4">
              Stay Inspired
            </h4>
            <p className="text-sm font-body text-white/50 mb-4">
              Get updates on new products and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full bg-transparent border-b border-white/30 pb-2 pr-10 text-sm font-body text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors"
                required
              />
              <button
                type="submit"
                className="absolute right-0 bottom-2 text-white/50 hover:text-white transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight size={16} strokeWidth={1.5} />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-[#3c6e71] mt-2 font-body">Thank you for subscribing!</p>
            )}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-body text-white/30">
            2026 ImTechGuru. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/" className="text-xs font-body text-white/30 hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-xs font-body text-white/30 hover:text-white/60 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
