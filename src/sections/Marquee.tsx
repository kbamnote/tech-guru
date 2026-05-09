export default function Marquee() {
  const items = [
    'Free Delivery on Orders Above Rs. 500',
    'Instant Digital Download',
    'Curated by Educators',
    'Trusted by 10,000+ Customers',
    'NCERT Aligned Content',
    '24/7 Customer Support',
  ];

  const doubled = [...items, ...items];

  return (
    <section className="relative z-10 bg-[#1a1a1a] py-3 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-xs font-body uppercase tracking-[0.08em] text-white/60 mx-8 flex items-center gap-2"
          >
            <span className="w-1 h-1 bg-[#3c6e71] rounded-full inline-block" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
