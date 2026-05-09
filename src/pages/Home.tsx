import Hero from '@/sections/Hero';
import Categories from '@/sections/Categories';
import FeaturedProducts from '@/sections/FeaturedProducts';
import EditorialBanner from '@/sections/EditorialBanner';
import HowItWorks from '@/sections/HowItWorks';
import Testimonials from '@/sections/Testimonials';
import Marquee from '@/sections/Marquee';
import Newsletter from '@/sections/Newsletter';

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Marquee />
      <EditorialBanner />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
