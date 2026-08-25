import { FiBell, FiMail, FiSearch, FiShoppingCart } from "react-icons/fi";

const DashboardNavbar = () => {
  return (
    <>
      {/* MOBILE DASHBOARD NAVBAR */}
      <div className="sm:hidden fixed top-0 left-0 w-full bg-white z-50 border-b p-2">
        <div className="flex items-center justify-end px-3 py-2">
          
          {/* RIGHT ICONS */}
          <div className="flex items-center gap-3">
            <FiSearch className="text-[22px] text-gray-700" />
            <FiMail className="text-[22px] text-gray-700" />
            <FiBell className="text-[22px] text-gray-700" />
            <FiShoppingCart className="text-[22px] text-gray-700" />
          </div>

        </div>
      </div>
    </>
  );
};

export default DashboardNavbar;
