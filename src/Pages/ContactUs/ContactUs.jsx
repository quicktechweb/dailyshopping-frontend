import { useEffect, useState } from "react";
import axios from "axios";
import ScrollToTop from "../HomePage/ScrollToTop/ScrollToTop";

const ContactUs = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://dailyshopping-backend.onrender.com/api/contactus");
      if (res.data && res.data.data) setData(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!data) return <div className="p-6 text-center">Loading...</div>;

  const card1 = data.cards[0];
  const card2 = data.cards[1];

  return (
    <div
      className="relative bg-gradient-to-b from-white to-blue-50 py-16 px-4 md:px-8 font-[Inter] bg-no-repeat bg-top bg-contain"
      style={{
        backgroundImage: `url('${data.backgroundImage}')`,
      }}
    >
      <ScrollToTop />

      {/* Header */}
      <div className="text-center md:mb-10 mt-16 md:mt-0 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          {data.pageTitle}
        </h2>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          {data.subtitle}
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mb-5 md:mb-0 mx-auto grid grid-cols-1 lg:grid-cols-2 md:gap-8 gap-4 relative z-10">
        {/* Left Card - Card 1 */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <img
                src={card1.icon}
                alt={card1.title}
                className="w-10 h-10"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {card1.title}
            </h3>
            <p
              className="text-gray-600 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: card1.description }}
            ></p>
          </div>
          {card1.linkText && card1.linkUrl && (
            <a
              href={card1.linkUrl}
              className="mt-4 inline-block text-blue-600 font-medium hover:underline"
            >
              {card1.linkText}
            </a>
          )}
        </div>

        {/* Right Card - Card 2 */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 flex flex-col gap-6">
          {/* Banner */}
          {card2.banner && (
            <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-4">
              <div className="flex-1">
                <p className="text-sm text-gray-700">{card2.banner.textMain}</p>
                <p className="text-xs text-gray-500 mt-1">{card2.banner.textSub}</p>
              </div>
              <img
                src={card2.banner.image}
                alt="Support Banner"
                className="w-20 h-20 object-contain"
              />
            </div>
          )}

          {/* Form */}
          {card2.form && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">{card2.form.title}</h4>
              <select className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none">
                {card2.form.options.map((opt, i) => (
                  <option key={i}>{opt}</option>
                ))}
              </select>
              <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md flex justify-center items-center gap-2 transition">
                <span>💬</span> {card2.form.buttonText}
              </button>
            </div>
          )}

          {/* Contact Info */}
          {card2.contactInfo && (
            <div className="text-sm text-gray-700">
              <p>{card2.contactInfo.phoneNote}</p>
              <p className="mt-1">
                📧 Email : <span className="font-medium">{card2.contactInfo.email}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
