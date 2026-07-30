// ── Types matching the API (MongoDB) ──────────────────────────────
export interface Product {
  _id: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  description: string;
  features: string[];
  driveLink?: string;
  active: boolean;
  sortOrder: number;
  createdAt?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  sortOrder: number;
  count: number;
}

// ── Static demo data (not from API) ──────────────────────────────
export interface Review {
  id: number;
  productId: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export const reviews: Review[] = [
  { id: 1, productId: 1, name: 'Priya Sharma', rating: 5, date: '2026-04-15', comment: 'My 4-year-old absolutely loves this! The illustrations are beautiful and the tracing activities keep her engaged for hours.' },
  { id: 2, productId: 1, name: 'Rahul Mehta', rating: 5, date: '2026-04-10', comment: 'Best alphabet book we have purchased. The print quality is excellent and the content is very well structured.' },
  { id: 3, productId: 1, name: 'Ananya Gupta', rating: 4, date: '2026-03-28', comment: 'Great book for early learners. Would love to see more interactive elements in future editions.' },
  { id: 4, productId: 4, name: 'Vikram Singh', rating: 5, date: '2026-04-20', comment: 'This science guide helped my son score 95% in his boards. The solved examples are incredibly helpful.' },
  { id: 5, productId: 4, name: 'Sneha Patel', rating: 5, date: '2026-04-12', comment: 'NCERT coverage is thorough and the revision notes are a lifesaver before exams. Highly recommended!' },
  { id: 6, productId: 7, name: 'Karan Joshi', rating: 5, date: '2026-04-18', comment: 'Went from 1K to 50K subscribers in 3 months using the strategies from this bundle. Absolutely worth every rupee!' },
  { id: 7, productId: 7, name: 'Meera Reddy', rating: 4, date: '2026-04-05', comment: 'The thumbnail templates are fantastic. My CTR improved by 40% after using these designs.' },
  { id: 8, productId: 2, name: 'Deepa Nair', rating: 5, date: '2026-04-08', comment: 'The stories are magical! My kids ask for a new tale every night. The moral lessons are beautifully woven in.' },
  { id: 9, productId: 5, name: 'Arun Kumar', rating: 5, date: '2026-04-22', comment: 'Cracked JEE Mains with the help of this book. The shortcut methods save so much time during the exam.' },
  { id: 10, productId: 8, name: 'Shruti Desai', rating: 5, date: '2026-04-14', comment: 'The content calendar alone is worth the price. My Instagram engagement has doubled since I started using this pack.' },
];

export const testimonials: Testimonial[] = [
  { id: 1, name: 'Priya Sharma', role: 'Parent', text: 'The kids ebooks are absolutely delightful. My daughter looks forward to learning every day now. The quality exceeds everything else we have tried.' },
  { id: 2, name: 'Vikram Singh', role: 'Teacher', text: 'As a science teacher, I recommend the educational guides to all my students. They are comprehensive, well-structured, and actually make learning enjoyable.' },
  { id: 3, name: 'Karan Joshi', role: 'YouTuber', text: 'The content bundles transformed my channel. I went from struggling with thumbnails to having a consistent, professional brand look. Game changer!' },
  { id: 4, name: 'Ananya Gupta', role: 'Homeschooling Mom', text: 'We use imtechguru.in resources for our homeschool curriculum. The educational books are thorough and the kids ebooks keep my little ones engaged for hours.' },
  { id: 5, name: 'Rahul Mehta', role: 'Content Creator', text: 'The video presets bundle gave my footage a cinematic look that my audience immediately noticed. Comments asking about my color grade went up 10x!' },
  { id: 6, name: 'Sneha Patel', role: 'Student', text: 'The Class 10 Science guide was my secret weapon for board exams. Scored 97%! The revision notes and practice problems are pure gold.' },
];

export const faqs: FAQ[] = [
  { id: 1, question: 'How do I receive my digital product after purchase?', answer: 'After completing your purchase, you will receive an instant download link on the order confirmation page. We also send the download link to your email within minutes. All products are delivered digitally — no shipping required!' },
  { id: 2, question: 'What payment methods do you accept?', answer: 'We accept UPI (Google Pay, PhonePe, Paytm), all major credit and debit cards, and digital wallets. All transactions are processed securely through our trusted payment gateway.' },
  { id: 3, question: 'Can I get a refund if I am not satisfied?', answer: 'Due to the digital nature of our products, we generally do not offer refunds once the download link has been accessed. However, if you experience any technical issues, please contact us and we will resolve it promptly.' },
  { id: 4, question: 'Are the educational books aligned with the Indian curriculum?', answer: 'Yes! All our educational books are carefully aligned with NCERT and major state board curricula. They are designed by experienced educators who understand the Indian education system thoroughly.' },
  { id: 5, question: 'Can I use the content bundles for commercial purposes?', answer: 'Absolutely! Our content creation bundles come with a commercial license. You can use the templates, presets, and resources for your own brand and client work without any attribution required.' },
  { id: 6, question: 'Do you offer bulk discounts for schools or institutions?', answer: 'Yes, we offer special pricing for schools, coaching centers, and educational institutions. Please reach out to us through the contact page with your requirements and we will create a custom package for you.' },
];
