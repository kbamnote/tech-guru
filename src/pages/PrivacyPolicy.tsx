import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#f4f4f4] pt-24 pb-20">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-body uppercase tracking-[0.1em] text-[#6b6b6b] mb-4">
            Privacy Policy
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-300 text-[#1a1a1a]">
            Your privacy is our priority
          </h1>
          <p className="mt-4 text-[15px] font-body text-[#6b6b6b] max-w-2xl mx-auto">
            ImTechGuru is committed to protecting your personal information while you shop our digital products, ebooks, study guides, and creator toolkits.
          </p>
        </motion.div>

        <div className="space-y-10">
          <section className="bg-white p-8 rounded shadow-sm">
            <h2 className="font-heading text-2xl text-[#1a1a1a] mb-4">Information We Collect</h2>
            <p className="text-sm font-body text-[#6b6b6b] leading-relaxed">
              When you place an order, sign up for our newsletter, or contact support, we may collect your name, email address, and billing information. We only collect what is necessary to deliver our digital products and manage your account.
            </p>
          </section>

          <section className="bg-white p-8 rounded shadow-sm">
            <h2 className="font-heading text-2xl text-[#1a1a1a] mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-3 text-sm font-body text-[#6b6b6b] leading-relaxed">
              <li>Process orders and issue digital downloads instantly.</li>
              <li>Send purchase confirmations, receipts, and updates about your order.</li>
              <li>Respond to support requests and questions.</li>
              <li>Improve our product experience and personalize recommendations.</li>
            </ul>
          </section>

          <section className="bg-white p-8 rounded shadow-sm">
            <h2 className="font-heading text-2xl text-[#1a1a1a] mb-4">Payment and Razorpay</h2>
            <p className="text-sm font-body text-[#6b6b6b] leading-relaxed">
              Payments on imtechguru.in are processed securely through Razorpay. Razorpay handles your payment details and helps ensure secure checkout for credit cards, debit cards, UPI, and other supported payment methods.
            </p>
            <p className="mt-4 text-sm font-body text-[#6b6b6b] leading-relaxed">
              We never store full payment card data on our servers. If you have questions about a payment, refunds, or transaction status, our support team is available at support@imtechguru.in.
            </p>
          </section>

          <section className="bg-white p-8 rounded shadow-sm">
            <h2 className="font-heading text-2xl text-[#1a1a1a] mb-4">Data Security</h2>
            <p className="text-sm font-body text-[#6b6b6b] leading-relaxed">
              We use industry-standard safeguards to protect your information and follow best practices for data security. Access to sensitive information is restricted to authorized personnel only.
            </p>
          </section>

          <section className="bg-white p-8 rounded shadow-sm">
            <h2 className="font-heading text-2xl text-[#1a1a1a] mb-4">Your Rights</h2>
            <p className="text-sm font-body text-[#6b6b6b] leading-relaxed">
              You can request access to, correction of, or deletion of your personal information. If you would like to update your details, please contact us at support@imtechguru.in.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
