import { useEffect } from 'react';
import { useLocation } from 'react-router';
import Navbar from './Navbar';
import CartDrawer from './CartDrawer';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <Navbar />
      <CartDrawer />
      {children}
      <Footer />
    </div>
  );
}
