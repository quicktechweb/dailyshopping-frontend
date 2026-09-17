import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ScrollToTop from "../HomePage/ScrollToTop/ScrollToTop";
import axios from "axios";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqData, setFaqData] = useState({ header: {}, faqs: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch FAQ data from backend
    const fetchFAQ = async () => {
      try {
        const res = await axios.get("https://dailyshopping-backend.onrender.com/api/faq"); // update if different port/path
        if (res.data.success && res.data.data) {
          setFaqData(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching FAQ:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQ();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) return <p className="text-center mt-20">Loading FAQ...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white text-gray-900">
      {/* Hero Section */}
      <section className="text-center py-20 relative overflow-hidden">
        <ScrollToTop />
        <div className="relative z-10 max-w-2xl mx-auto px-6 mt-16 md:mt-0">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-gray-900"
          >
            {faqData.header?.title || "Frequently Asked Questions"}
          </motion.h2>
          <p className="mt-4 text-gray-600 text-lg">
            {faqData.header?.subtitle ||
              "Find quick answers to common questions about orders, shipping, and more."}
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <main className="max-w-4xl mx-auto px-6 pb-24 -mt-16 md:-mt-8">
        <div className="space-y-4">
          {faqData.faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition-all overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between text-left px-6 py-5 focus:outline-none"
              >
                <span className="font-semibold text-gray-900 text-lg">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="text-indigo-600"
                >
                  <ChevronDown size={22} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0, y: -10 }}
                    animate={{ height: "auto", opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="bg-gradient-to-r from-gray-50 to-gray-100 border-t px-6 pb-5 text-gray-600 text-sm leading-relaxed"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {faq.answer}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
