import { useEffect, useState } from "react";
import axios from "axios";
import ScrollToTop from "../HomePage/ScrollToTop/ScrollToTop";

const ShippingPolicy = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://dailyshopping-backend.onrender.com/api/shippingpolicy");
      setData(res.data.data); // adjust if your API returns differently
    } catch (err) {
      console.error("Error fetching shipping policy:", err);
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="font-[Inter] mb-10 md:mb-0">
      <ScrollToTop />

      {/* Hero Section */}
      <div
        className="relative bg-blue-600 text-white text-center py-16 px-4"
        style={{
          backgroundImage: `url(${data.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 mt-20 md:mt-0">
            {data.pageTitle}
          </h1>
          <p className="text-sm md:text-base text-gray-100">{data.subtitle}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto py-12 px-4 md:px-8 space-y-10">
        {data.sections.map((section, idx) => (
          <section key={idx}>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              {section.title}
            </h2>

            {section.text && (
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {section.text}
              </p>
            )}

            {/* Render table if available */}
            {section.table && section.table.headers && section.table.headers.length > 0 && (
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left text-sm md:text-base border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      {section.table.headers.map((header, hi) => (
                        <th key={hi} className="py-3 px-4">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows &&
                      section.table.rows.map((row, ri) => (
                        <tr key={ri} className="border-t">
                          {row.map((cell, ci) => (
                            <td key={ci} className="py-3 px-4">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}

        {/* Contact Info Section (static) */}
        <section className="bg-blue-50 rounded-xl p-6 text-center">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
            Have Questions About Shipping?
          </h3>
          <p className="text-gray-600 text-sm md:text-base mb-4">
            Our support team is here to help you with shipping inquiries or
            issues.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg text-sm md:text-base font-medium hover:bg-blue-700 transition"
          >
            Contact Support
          </a>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicy;
