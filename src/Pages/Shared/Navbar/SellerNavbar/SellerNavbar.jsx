import { Share2, ArrowLeft } from "lucide-react";
import { FiBell, FiMail, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SellerNavbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Mobile responsive */}
      <div className="sm:hidden fixed top-0 left-0 w-full bg-white z-50 border-b">
        <div className="flex items-center px-3 py-2 gap-2">

          {/* 🔙 Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>

          {/* 🔍 Search */}
          <div className="flex flex-1 items-center border border-gray-500 rounded-lg overflow-hidden h-10">
            <FiSearch className="ml-3 text-gray-400 text-lg" />

            <input
              type="text"
              placeholder="Search For Category"
              className="flex-1 px-2 text-sm outline-none"
            />

            <button className="text-black text-sm font-semibold px-4 h-full">
              {/* optional */}
            </button>
          </div>

          {/* ✉️ 🔔 📤 Icons */}
          <div className="flex items-center gap-3">
            <FiMail className="text-[22px] text-gray-700" />
            <FiBell className="text-[22px] text-gray-700" />
            <Share2 className="text-[22px] text-gray-700" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default SellerNavbar;
