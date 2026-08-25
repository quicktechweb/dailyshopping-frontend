import ScrollToTop from "../../../HomePage/ScrollToTop/ScrollToTop";

export default function Policy() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 -mt-10">
        <ScrollToTop/>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-800">
          Policies
        </h1>

        {/* Privacy Policy */}
        <section className="bg-white shadow rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Privacy Policy
          </h2>
          <p className="text-gray-600 text-sm">
            We respect your privacy and are committed to protecting your personal data. 
            This policy explains how we collect, use, and safeguard your information when you use our services.
          </p>
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
            <li>We only collect data necessary to provide our services.</li>
            <li>We do not share your personal information with third parties without your consent.</li>
            <li>Your data is stored securely and encrypted where possible.</li>
          </ul>
        </section>

        {/* Terms of Service */}
        <section className="bg-white shadow rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Terms of Service
          </h2>
          <p className="text-gray-600 text-sm">
            By using our platform, you agree to comply with our terms of service. 
            Please read carefully before continuing.
          </p>
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
            <li>Users must provide accurate information during registration.</li>
            <li>All transactions are subject to verification and approval.</li>
            <li>Misuse of the platform may result in account suspension or termination.</li>
          </ul>
        </section>

        {/* Refund / Cancellation Policy */}
        <section className="bg-white shadow rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Refund & Cancellation Policy
          </h2>
          <p className="text-gray-600 text-sm">
            We aim to provide a smooth shopping experience. Refunds and cancellations are subject to the following rules:
          </p>
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
            <li>Orders can be canceled within 24 hours of purchase.</li>
            <li>Refunds for eligible returns will be processed within 5-7 business days.</li>
            <li>Some products may be non-refundable. Check product details before purchasing.</li>
          </ul>
        </section>

        {/* Contact Info */}
        <section className="bg-white shadow rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Contact Us
          </h2>
          <p className="text-gray-600 text-sm">
            For any policy-related questions, please reach out to our support team.
          </p>
          <p className="text-gray-600 text-sm font-medium">Email: support@example.com</p>
          <p className="text-gray-600 text-sm font-medium">Phone: +1 234 567 890</p>
        </section>

      </div>
    </div>
  );
}
