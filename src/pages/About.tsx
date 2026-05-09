import { motion } from 'framer-motion';
import { BookOpen, Users, Star, Globe } from 'lucide-react';

const stats = [
  { icon: BookOpen, value: '50+', label: 'Digital Products' },
  { icon: Users, value: '10,000+', label: 'Happy Customers' },
  { icon: Star, value: '4.8', label: 'Average Rating' },
  { icon: Globe, value: '28', label: 'States Reached' },
];

const values = [
  {
    title: 'Quality First',
    description: 'Every product is meticulously crafted by experts and undergoes rigorous quality checks before it reaches you.',
  },
  {
    title: 'Accessible Learning',
    description: 'We believe quality education should be affordable. Our pricing ensures everyone can access premium learning resources.',
  },
  {
    title: 'Made for India',
    description: 'Our educational content is deeply aligned with the Indian curriculum — NCERT, state boards, and competitive exams.',
  },
  {
    title: 'Creator Community',
    description: 'We empower content creators with tools and templates designed for the Indian digital landscape.',
  },
];

export default function About() {
  return (
    <main className="min-h-screen bg-[#f4f4f4] pt-24 pb-20">
      {/* Hero */}
      <div className="max-w-[1200px] mx-auto px-6 text-center py-12 md:py-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-body uppercase tracking-[0.1em] text-[#6b6b6b] mb-4"
        >
          About Us
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-heading text-4xl md:text-5xl font-300 text-[#1a1a1a] leading-tight max-w-[900px] mx-auto"
        >
          Empowering Learners and Creators Across India
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-[15px] font-body text-[#6b6b6b] leading-relaxed max-w-2xl mx-auto mb-12"
        >
          imtechguru.in was born from a simple belief: quality digital resources should be accessible, affordable, and beautifully designed. We curate educational ebooks, study guides, and creator toolkits that help Indians learn, grow, and create.
        </motion.p>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-full h-[300px] md:h-[500px] overflow-hidden rounded-lg shadow-sm"
        >
          <img 
            src="/images/about-hero.png" 
            alt="Modern creative workspace" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
          />
        </motion.div>
      </div>

      {/* Stats */}
      <div className="bg-white py-16">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon size={24} strokeWidth={1.5} className="text-[#3c6e71] mx-auto mb-3" />
                <p className="font-heading text-3xl font-300 text-[#1a1a1a]">{stat.value}</p>
                <p className="text-xs font-body text-[#6b6b6b] mt-1 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Story with Image Layout */}
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 md:order-1 h-[400px] md:h-[600px] overflow-hidden rounded-lg shadow-md"
          >
            <img 
              src="/images/about-story.png" 
              alt="Passionate creator working" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <div className="mb-10">
              <p className="text-xs font-body uppercase tracking-[0.1em] text-[#3c6e71] mb-4">Our Story</p>
              <h2 className="font-heading text-3xl md:text-4xl font-300 text-[#1a1a1a] leading-tight">
                From Passion to Purpose
              </h2>
            </div>
            
            <div className="space-y-6 text-[15px] font-body text-[#6b6b6b] leading-relaxed">
              <p>
                It started with a frustration. As educators and content creators ourselves, we struggled to find high-quality digital resources that were both affordable and relevant to the Indian context. International platforms offered expensive products with little regard for our curriculum or culture.
              </p>
              <p>
                So we built imtechguru.in — a curated marketplace where every product is designed with India in mind. Our educational books align with NCERT and state boards. Our content creation bundles are tailored for the Indian digital ecosystem. And our kids ebooks reflect the stories, colors, and values that Indian families cherish.
              </p>
              <p className="font-medium text-[#1a1a1a]">
                Today, we serve thousands of learners, teachers, parents, and creators across 28 states. Every product is crafted with care, priced fairly, and delivered instantly. Because we believe that when knowledge and creativity flow freely, everyone wins.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-[#f7f4ed] py-20">
        <div className="max-w-[1000px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-body uppercase tracking-[0.1em] text-[#3c6e71] mb-4">Our Values</p>
            <h2 className="font-heading text-3xl font-400 text-[#1a1a1a]">
              What We Stand For
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 rounded shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-heading text-xl font-400 text-[#1a1a1a] mb-3">
                  {value.title}
                </h3>
                <p className="text-sm font-body text-[#6b6b6b] leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
