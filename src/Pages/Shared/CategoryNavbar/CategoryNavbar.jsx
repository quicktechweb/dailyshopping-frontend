import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategoryNavbar = () => {
      const navigate = useNavigate();

    const handleBack = () => {
    navigate(-1); // Goes back to the previous page
  };
  return (
    <div className="w-full bg-white border-gray-300">
      <div className="flex items-center justify-between h-12 px-4">

        {/* Left: Back + Title */}
        <div className="flex items-center gap-2">
          <button className="p-1" onClick={handleBack}>
            <ArrowLeft size={22} className="text-black" />
          </button>
          <span className="text-[17px] font-medium text-black">
            Categories
          </span>
        </div>

        {/* Right: Search */}
        <button className="p-1">
          <Search size={22} className="text-black" />
        </button>
      </div>
    </div>
  );
};

export default CategoryNavbar;
