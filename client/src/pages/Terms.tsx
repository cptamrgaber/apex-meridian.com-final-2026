import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-slate-900/50 rounded-lg p-8 border border-cyan-500/30">
            <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
            
            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using the services provided by Apex Meridian LLC ("Company," "we," or "us"), 
                  you agree to be bound by these Terms of Service. If you do not agree to these terms, 
                  please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-3">2. Description of Services</h2>
                <p>
                  Apex Meridian provides artificial intelligence solutions including Aviation Intelligence, 
                  Cybersecurity Shield, Education & Cognitive Enhancement platforms, and AGI Research services. 
                  We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-3">3. User Responsibilities</h2>
                <p className="mb-3">You agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Use our services in compliance with applicable laws</li>
                  <li>Not interfere with or disrupt our services</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-3">4. Intellectual Property</h2>
                <p>
                  All content, features, and functionality of our services, including but not limited to text, 
                  graphics, logos, software, and the Meridian Engine platform, are owned by Apex Meridian LLC 
                  and protected by international copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-3">5. Confidentiality</h2>
                <p>
                  Both parties agree to maintain the confidentiality of any proprietary or confidential information 
                  disclosed during the course of using our services. This obligation survives termination of the agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-3">6. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, Apex Meridian LLC shall not be liable for any indirect, 
                  incidental, special, consequential, or punitive damages resulting from your use of or inability 
                  to use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-3">7. Warranties and Disclaimers</h2>
                <p>
                  Our services are provided "as is" and "as available" without warranties of any kind, either express 
                  or implied. We do not warrant that our services will be uninterrupted, secure, or error-free.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-3">8. Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless Apex Meridian LLC from any claims, damages, losses, 
                  liabilities, and expenses arising from your use of our services or violation of these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-3">9. Termination</h2>
                <p>
                  We reserve the right to terminate or suspend your access to our services at any time, 
                  with or without cause, with or without notice. Upon termination, your right to use our services 
                  will immediately cease.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-3">10. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the jurisdiction 
                  in which Apex Meridian LLC is registered, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-3">11. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time. We will notify users of any material 
                  changes by posting the new Terms on this page. Your continued use of our services after such 
                  modifications constitutes your acceptance of the updated Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cyan-400 mb-3">12. Contact Information</h2>
                <p className="mb-3">
                  For questions about these Terms of Service, please contact us:
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
