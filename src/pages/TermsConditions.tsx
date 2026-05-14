import { motion } from 'framer-motion';

export default function TermsConditions() {
  return (
    <main className="min-h-screen bg-[#f4f4f4] pt-24 pb-20">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-body uppercase tracking-[0.1em] text-[#6b6b6b] mb-4">
            Terms & Conditions
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-300 text-[#1a1a1a]">
            Terms of use for ImTechGuru
          </h1>
          <p className="mt-4 text-[15px] font-body text-[#6b6b6b] max-w-2xl mx-auto">
            These terms govern your access to our digital learning resources, ebooks, study guides, and creator toolkits on imtechguru.in.
          </p>
        </motion.div>

        <div className="space-y-10">
          <section className="bg-white p-8 rounded shadow-sm">
            <h2 className="font-heading text-2xl text-[#1a1a1a] mb-4">Acceptance of Terms</h2>
            <p className="text-sm font-body text-[#6b6b6b] leading-relaxed">
              By using imtechguru.in, you agree to these Terms & Conditions. Please read them carefully before making a purchase or using our services.
            </p>
          </section>

          <section className="bg-white p-8 rounded shadow-sm">
            <h2 className="font-heading text-2xl text-[#1a1a1a] mb-4">Digital Products</h2>
            <p className="text-sm font-body text-[#6b6b6b] leading-relaxed">
              Our products are digital downloads and online resources. After purchase, you receive instant access to the items you buy. Because our offerings are delivered digitally, they are not eligible for physical shipment.
            </p>
          </section>

          <section className="bg-white p-8 rounded shadow-sm">
            <h2 className="font-heading text-2xl text-[#1a1a1a] mb-4">Order Processing</h2>
            <p className="text-sm font-body text-[#6b6b6b] leading-relaxed">
              Orders are confirmed once payment is successfully processed. We use Razorpay to securely handle payments through UPI, cards, net banking, and other supported methods.
            </p>
          </section>

          <section className="bg-white p-8 rounded shadow-sm">
            <h2 className="font-heading text-2xl text-[#1a1a1a] mb-4">Payment and Security</h2>
            <p className="text-sm font-body text-[#6b6b6b] leading-relaxed">
              Razorpay processes your payment details and ensures a secure checkout experience. ImTechGuru does not store full payment card information on its servers.
            </p>
          </section>

          <section className="bg-white p-8 rounded shadow-sm">
            <h2 className="font-heading text-2xl text-[#1a1a1a] mb-4">Intellectual Property</h2>
            <p className="text-sm font-body text-[#6b6b6b] leading-relaxed">
              All content on this website, including ebooks, guides, and images, belongs to ImTechGuru or its partners. You may use purchased digital products for personal or educational purposes only.
            </p>
          </section>

          <section className="bg-white p-8 rounded shadow-sm">
            <h2 className="font-heading text-2xl text-[#1a1a1a] mb-4">Limitation of Liability</h2>
            <p className="text-sm font-body text-[#6b6b6b] leading-relaxed">
              We strive to provide accurate and useful digital resources. However, we are not responsible for indirect losses or outcomes from using our content. If you have concerns, please contact us before purchasing.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
