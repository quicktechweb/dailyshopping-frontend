import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiSearch,
  FiShoppingCart,
  FiMenu,
  FiShare2,
  FiX,
  FiLink,
  FiMoreHorizontal,
  FiMessageSquare,
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaFacebookF,
  FaLine,
} from "react-icons/fa";

const DetailsNavbar = () => {
  const [showTabs, setShowTabs] = useState(false);
  const [activeTab, setActiveTab] = useState("review");
  const [openShare, setOpenShare] = useState(false);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setShowTabs(window.scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ================= TOP NAVBAR ================= */}
      <div className="fixed top-0 left-0 w-full bg-white z-50 border-b">
        <div className="flex items-center justify-between px-3 h-12">
          {/* Left */}
          <Link to="/">
            <FiArrowLeft className="text-2xl text-gray-700" />
          </Link>

          {/* Right */}
          <div className="flex items-center gap-4">
            <FiSearch className="text-xl text-gray-700" />

            {/* Share icon */}
            <FiShare2
              onClick={() => setOpenShare(true)}
              className="text-xl text-gray-700 cursor-pointer"
            />

            <FiShoppingCart className="text-xl text-gray-700" />

            {/* 3 menu icon */}
            <FiMenu
              onClick={() => setOpenShare(true)}
              className="text-xl text-gray-700 cursor-pointer"
            />
          </div>
        </div>

        {/* ================= SCROLL TABS ================= */}
        {showTabs && (
          <div className="border-t bg-white">
            <div className="flex justify-around text-sm font-medium">
              {["review", "details", "recommend"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 relative ${
                    activeTab === tab
                      ? "text-emerald-600"
                      : "text-gray-500"
                  }`}
                >
                  {tab === "review" && "Review"}
                  {tab === "details" && "Product Details"}
                  {tab === "recommend" && "Recommend"}

                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-600 rounded" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Spacers */}
      <div className="h-12" />
      {showTabs && <div className="h-10" />}

      {/* ================= SHARE MODAL ================= */}
      {openShare && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setOpenShare(false)}
            className="fixed inset-0 bg-black/40 z-50"
          />

          {/* Bottom Sheet */}
          <div className="fixed bottom-0 left-0 w-full bg-white z-50 rounded-t-2xl animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <p className="font-semibold text-gray-800">
                Share with your friends
              </p>
              <FiX
                onClick={() => setOpenShare(false)}
                className="text-xl cursor-pointer"
              />
            </div>

            {/* Product Info */}
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-12 h-12 bg-gray-200 rounded" />
              <p className="text-sm font-medium text-gray-700 line-clamp-1">
                Selling EIGER MIGRATES PACK 1...
              </p>
            </div>

            {/* Share Buttons */}
            <div className="grid grid-cols-4 gap-4 px-4 pb-12 text-center text-xs">
              <ShareItem icon={<FaWhatsapp />} label="Whatsapp" color="text-green-500" />
              <ShareItem icon={<FaTelegramPlane />} label="Telegram" color="text-sky-500" />
              <ShareItem icon={<FaLine />} label="Line" color="text-green-600" />
              <ShareItem icon={<FaFacebookF />} label="Facebook" color="text-blue-600" />
              <ShareItem icon={<FiLink />} label="Copy link" />
              <ShareItem icon={<FiMessageSquare />} label="SMS" />
              <ShareItem icon={<FiMoreHorizontal />} label="Other" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

const ShareItem = ({ icon, label, color = "text-gray-600" }) => (
  <div className="flex flex-col items-center gap-1 cursor-pointer">
    <div
      className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl ${color}`}
    >
      {icon}
    </div>
    <span>{label}</span>
  </div>
);

export default DetailsNavbar;
