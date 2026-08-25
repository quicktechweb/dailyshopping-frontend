import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ScrollToTop from "../HomePage/ScrollToTop/ScrollToTop";
import axios from "axios";
import { Link } from "react-router-dom";

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch API Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://serverluckyshop.luckyshop.com.bd/api/aboutus");
        setAboutData(res.data);
      } catch (err) {
        console.error("Failed to fetch about data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-500 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-red-500">Failed to load About Us data 😔</p>
      </div>
    );
  }

  const { hero, features = [], divider, contact } = aboutData;

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-white py-10 px-4 sm:px-6 md:px-16 font-[Inter] text-gray-800 overflow-hidden">
      <ScrollToTop />

      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mt-20 md:mt-0 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40 p-6 sm:p-8 md:p-12"
      >
        {/* Image */}
        {hero?.image && (
          <div className="flex justify-center mb-5 sm:mb-6">
            <img
              src={hero.image}
              alt="Hero"
              className="w-40 sm:w-52 md:w-72 drop-shadow-xl animate-fadeIn"
            />
          </div>
        )}

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-3 bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
          {hero?.title || "About LuckyShop"}
        </h2>
        <p className="text-left text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-10">
          {hero?.description}
        </p>

        {/* FEATURES */}
        {features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {features.map((f, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {f.icon && (
                    <div className="bg-blue-100 group-hover:bg-blue-600 p-3 rounded-2xl transition-all duration-300 flex-shrink-0">
                      <img
                        src={f.icon}
                        alt={f.title}
                        className="w-7 h-7 sm:w-8 sm:h-8 group-hover:invert"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-base sm:text-lg mb-1 group-hover:text-blue-600 transition">
                      {f.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Divider */}
        {divider && (
          <div className="border-t border-gray-200 mt-8 pt-4 text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              {divider.text}
              {divider.faqLink && (
                <Link
                  to="/faq"
                  className="text-blue-600 font-medium cursor-pointer hover:underline ml-1"
                >
                  FAQs page
                </Link>
              )}
            </p>
          </div>
        )}
      </motion.div>

      {/* CONTACT SECTION */}
      {contact && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mt-10 sm:mt-12 rounded-3xl shadow-xl text-black p-8 sm:p-10 md:p-14 text-center relative overflow-hidden bg-gradient-to-br from-blue-100 to-white"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3),transparent_70%)] pointer-events-none" />

          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold relative z-10 bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
            {contact.title}
          </h3>
          <p className="text-gray-700 sm:mb-8 relative z-10 text-xs sm:text-sm md:text-base">
            {contact.subtitle}
          </p>

          {/* METHODS */}
          <div className="flex justify-between items-center gap-4 md:-mt-6 mt-2 mb-10 md:mb-0 sm:gap-12 relative z-10 w-full max-w-xl mx-auto px-4">
            {(contact.methods || []).map((method, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center text-center w-1/2"
              >
                <div className="bg-white/40 p-3 sm:p-4 rounded-full group-hover:bg-white/60 transition-all duration-300 shadow-sm backdrop-blur-md">
                  <span className="text-2xl sm:text-3xl">
                    {method.type === "call" ? "📞" : "📧"}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-medium text-gray-700">
                  {method.label}
                </p>
                <p className="text-base sm:text-lg font-semibold mt-1 tracking-wide text-gray-900 break-all">
                  {method.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default About;
