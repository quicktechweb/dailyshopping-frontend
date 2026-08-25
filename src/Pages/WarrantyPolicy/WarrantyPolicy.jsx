const PrivacyPolicy = () => {
  return (
    <div className="font-[Inter] text-gray-700">
      {/* Hero Section */}
      <section
        className="relative bg-gray-200 text-white text-center py-20 px-4"
        style={{
          backgroundImage:
            "url('https://www.global.ubuy.com/skin/frontend/default/ubuycom-v1/images/support-bg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gray-900/60"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 mt-16 md:mt-0">
            LuckyShop Privacy Policy
          </h1>
          <p className="text-base md:text-lg text-blue-100 leading-relaxed">
            Last Updated: 21/11/2025
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-[1280px] md:max-w-[1380px] sm:max-w-[95%] mx-auto bg-white py-10 px-4 md:px-8 lg:px-20 space-y-16">

        {/* 1. Information We Collect */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            📝 Information We Collect
          </h2>
          <p className="leading-relaxed">
            We collect information to operate, improve, and protect our services.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">a) Personal Information</h3>
              <ul className="list-disc pl-6 space-y-1 leading-relaxed">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Shipping or delivery address</li>
                <li>Profile-related information</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold">b) Account & Transaction Details</h3>
              <ul className="list-disc pl-6 space-y-1 leading-relaxed">
                <li>Order and purchase records</li>
                <li>Coupon or entry purchases</li>
                <li>Wallet balance and referral activity</li>
                <li>Transaction logs</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold">c) Device & Usage Data</h3>
              <ul className="list-disc pl-6 space-y-1 leading-relaxed">
                <li>Device type, model, OS</li>
                <li>IP address</li>
                <li>Usage patterns, session logs</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold">d) Payment Information</h3>
              <p className="leading-relaxed">
                We do not store full mobile banking or card details. All payments are processed securely through trusted gateways (e.g., bKash).
              </p>
            </div>
          </div>
        </section>

        {/* 2. How We Use Your Information */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            📌 How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-2 leading-relaxed">
            <li>Create and manage accounts</li>
            <li>Process orders, coupons, and transactions</li>
            <li>Conduct draw selections</li>
            <li>Provide customer support</li>
            <li>Improve app performance</li>
            <li>Prevent fraud or misuse</li>
            <li>Send updates, offers, and notifications</li>
          </ul>
        </section>

        {/* 3. Sharing of Information */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            🔄 Sharing of Information
          </h2>
          <p className="leading-relaxed">
            We do not sell, trade, or rent your personal information.
          </p>
          <p className="leading-relaxed">We may share data only with:</p>
          <ul className="list-disc pl-6 space-y-2 leading-relaxed">
            <li>Payment gateways</li>
            <li>Delivery partners</li>
            <li>Legal authorities (when required)</li>
          </ul>
        </section>

        {/* 4. Data Security */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            🔐 Data Security
          </h2>
          <p className="leading-relaxed">
            We take multiple measures to protect your data:
          </p>
          <ul className="list-disc pl-6 space-y-2 leading-relaxed">
            <li>Encrypted data transmission (HTTPS)</li>
            <li>Secure servers and storage</li>
            <li>Regular security audits</li>
            <li>Admin-level two-factor authentication</li>
          </ul>
        </section>

        {/* 5. Your Rights */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            👤 Your Rights
          </h2>
          <ul className="list-disc pl-6 space-y-2 leading-relaxed">
            <li>Edit or update profile information</li>
            <li>Request account deletion</li>
            <li>View order and transaction history</li>
            <li>Opt out of promotional notifications</li>
          </ul>
        </section>

        {/* 6. Cookies */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            🍪 Cookies & Tracking Technologies
          </h2>
          <p className="leading-relaxed">
            We may use cookies to improve user experience, analyze usage, and show relevant content.
          </p>
        </section>

        {/* 7. Third-Party Services */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            🔗 Third-Party Services
          </h2>
          <p className="leading-relaxed">Our platform may integrate with:</p>
          <ul className="list-disc pl-6 space-y-2 leading-relaxed">
            <li>Payment processors</li>
            <li>Notification services</li>
            <li>Authentication providers</li>
          </ul>
        </section>

        {/* 8. Changes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            🔄 Changes to This Policy
          </h2>
          <p className="leading-relaxed">
            We may update this Privacy Policy periodically. Continued use of our app means you accept the updated terms.
          </p>
        </section>

        {/* 9. Contact */}
        <section className="bg-blue-50 rounded-xl p-8 text-center space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">
            📞 Contact Us
          </h3>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            If you have questions or need support, reach out to us anytime.
          </p>
          <div className="space-y-1 text-gray-800 leading-relaxed">
            <p>📧 Email: luckyshoppingmallbd@gmail.com</p>
            <p>📞 Phone: +880 1898-932489</p>
            <p>🌐 Website: luckyshop.com.bd</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
