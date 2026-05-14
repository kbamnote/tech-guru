import { motion } from 'framer-motion';

export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-[#f4f4f4] pt-24 pb-20">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-body uppercase tracking-[0.1em] text-[#6b6b6b] mb-4">
            Cancellation & Refund Policy
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-300 text-[#1a1a1a]">
            Easy refunds for digital purchases
          </h1>
          <p className="mt-4 text-[15px] font-body text-[#6b6b6b] max-w-2xl mx-auto">
            We want you to be satisfied with your purchase. This policy explains how refunds work for our instant digital products and Razorpay payments.
          </p>
        </motion.div>

        <div className="space-y-10">
          <section className="bg-white p-8 rounded shadow-sm">
            <h2 className="font-heading text-2xl text-[#1a1a1a] mb-4">Scope</h2>
            <p className="text-sm font-body text-[#6b6b6b] leading-relaxed">
              This policy applies to all digital products sold on imtechguru.in, including ebooks, study materials, and creator toolkits.
            </p>
          </section>

          <section className="bg-white p-8 rounded shadow-sm">
            <h2 className="font-heading text-2xl text-[#1a1a1a] mb-4">Cancellation</h2>
            <p className="text-sm font-body text-[#6b6b6b] leading-relaxed">
              Because our products are delivered instantly in digital format, cancellations must be requested before the digital download link is accessed. If you need help, please reach out to support@imtechguru.in immediately.
            </p>
          </section>

          <section className="bg-white p-8 rounded shadow-sm">
            <h2 className="font-heading text-2xl text-[#1a1a1a] mb-4">Refund Eligibility</h2>
            <ul className="list-disc list-inside space-y-3 text-sm font-body text-[#6b6b6b] leading-relaxed">
              <li>Refunds may be issued if the product is defective or not accessible due to an error on our side.</li>
              <li>Refunds are not guaranteed for change of mind after download unless there is a clear issue with the product.</li>
              <li>Eligibility is reviewed on a case-by-case basis.</li>
            </ul>
          </section>

          <section className="bg-white p-8 rounded shadow-sm">
            <h2 className="font-heading text-2xl text-[#1a1a1a] mb-4">How to Request a Refund</h2>
            <p className="text-sm font-body text-[#6b6b6b] leading-relaxed">
              Email support@imtechguru.in with your order details, purchase date, and the issue you faced. Our support team will review the request and respond within 24 hours.
            </p>
          </section>

          <section className="bg-white p-8 rounded shadow-sm">
            <h2 className="font-heading text-2xl text-[#1a1a1a] mb-4">Razorpay Refunds</h2>
            <p className="text-sm font-body text-[#6b6b6b] leading-relaxed">
              If a refund is approved, the amount will be processed through Razorpay and credited back to your original payment method. The time taken for funds to appear may vary by bank or wallet provider.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
