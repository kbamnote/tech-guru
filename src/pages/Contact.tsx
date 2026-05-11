import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, ChevronDown } from 'lucide-react';
import { faqs } from '@/data/products';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'support@imtechguru.in' },
    { icon: MapPin, label: 'Location', value: 'Wathoda, Ring Road, Near Swaminarayan Mandir, Nagpur, Maharashtra' },
  ];

  return (
    <main className="min-h-screen bg-[#f4f4f4] pt-24 pb-20">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-body uppercase tracking-[0.1em] text-[#6b6b6b] mb-4">
            Get in Touch
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-300 text-[#1a1a1a]">
            Contact Us
          </h1>
          <p className="mt-4 text-[15px] font-body text-[#6b6b6b] max-w-lg mx-auto">
            Have a question, feedback, or just want to say hello? We would love to hear from you.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((info, i) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-6 rounded text-center"
            >
              <info.icon size={22} strokeWidth={1.5} className="text-[#3c6e71] mx-auto mb-3" />
              <p className="text-xs font-body uppercase tracking-wider text-[#6b6b6b] mb-1">{info.label}</p>
              <p className="text-sm font-body font-500 text-[#1a1a1a]">{info.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-white p-8 rounded"
          >
            <h2 className="font-heading text-2xl text-[#1a1a1a] mb-6">Send a Message</h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#f7f4ed] p-6 rounded text-center"
              >
                <div className="w-12 h-12 bg-[#3c6e71] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={18} className="text-white" />
                </div>
                <h3 className="font-heading text-lg text-[#1a1a1a] mb-2">Message Sent!</h3>
                <p className="text-sm font-body text-[#6b6b6b]">
                  Thank you for reaching out. We will get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-body uppercase tracking-wider text-[#6b6b6b] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-[#e6e6e6] rounded text-sm font-body text-[#1a1a1a] placeholder:text-[#6b6b6b]/40 focus:outline-none focus:border-[#1a1a1a] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-body uppercase tracking-wider text-[#6b6b6b] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-[#e6e6e6] rounded text-sm font-body text-[#1a1a1a] placeholder:text-[#6b6b6b]/40 focus:outline-none focus:border-[#1a1a1a] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-body uppercase tracking-wider text-[#6b6b6b] mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={e => setForm(prev => ({ ...prev, subject: e.target.value }))}
                    required
                    placeholder="What is this about?"
                    className="w-full px-4 py-3 border border-[#e6e6e6] rounded text-sm font-body text-[#1a1a1a] placeholder:text-[#6b6b6b]/40 focus:outline-none focus:border-[#1a1a1a] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-body uppercase tracking-wider text-[#6b6b6b] mb-2">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                    rows={5}
                    placeholder="Tell us more..."
                    className="w-full px-4 py-3 border border-[#e6e6e6] rounded text-sm font-body text-[#1a1a1a] placeholder:text-[#6b6b6b]/40 focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-[#1a1a1a] text-white text-sm font-body font-500 uppercase tracking-wider rounded hover:bg-[#3c6e71] transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={14} strokeWidth={1.5} />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h2 className="font-heading text-2xl text-[#1a1a1a] mb-6">Frequently Asked</h2>
            <div className="space-y-3">
              {faqs.map(faq => (
                <div key={faq.id} className="bg-white rounded overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <span className="text-sm font-body font-500 text-[#1a1a1a] pr-4">{faq.question}</span>
                    <ChevronDown
                      size={16}
                      strokeWidth={1.5}
                      className={`text-[#6b6b6b] flex-shrink-0 transition-transform ${openFaq === faq.id ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 pb-4"
                    >
                      <p className="text-sm font-body text-[#6b6b6b] leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
