import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-slate-900/50 rounded-lg p-8 border border-cyan-500/30">
            <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
            
            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-3">1. Introduction</h2>
                <p>
                  Apex Meridian LLC ("we," "our," or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you visit our website or use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-3">2. Information We Collect</h2>
                <p className="mb-3">We collect information that you provide directly to us, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name, email address, and contact information</li>
                  <li>Company name and professional details</li>
                  <li>Communications with us</li>
                  <li>Usage data and analytics</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-3">3. How We Use Your Information</h2>
                <p className="mb-3">We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Respond to your inquiries and requests</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Communicate about products, services, and events</li>
                  <li>Monitor and analyze trends and usage</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-3">4. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction. Our security measures include 
                  encryption, access controls, and regular security assessments.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-3">5. Data Retention</h2>
                <p>
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in 
                  this Privacy Policy, unless a longer retention period is required or permitted by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-3">6. Your Rights</h2>
                <p className="mb-3">Depending on your location, you may have the following rights:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate data</li>
                  <li>Deletion of your personal information</li>
                  <li>Objection to processing</li>
                  <li>Data portability</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-3">7. International Data Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries other than your country of residence. 
                  We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-3">8. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                  the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-3">9. Contact Us</h2>
                <p className="mb-3">
                  If you have questions about this Privacy Policy, please contact us:
                </p>
                <div className="ml-4 space-y-1">
                  <p><strong className="text-white">Email:</strong> info@apex-meridian.com</p>
                  <p><strong className="text-white">Phone:</strong> +201 2 00 92 90 92</p>
                </div>
              </section>

              <div className="mt-8 pt-6 border-t border-cyan-500/30">
                <p className="text-sm text-gray-400">
                  Last Updated: January 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
