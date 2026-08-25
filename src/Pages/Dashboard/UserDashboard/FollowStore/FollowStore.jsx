import { Link } from "react-router-dom";

const stores = [
  {
    name: "Mati Store House",
    logo: "https://static-01.daraz.com.bd/other/shop/ae23358ebc2c847e112cde2526862582.png_80x80q80.jpg_.webp",
    badges: [],
  },
  {
    name: "CASIFY",
    logo: "https://static-01.daraz.com.bd/other/shop/ae23358ebc2c847e112cde2526862582.png_80x80q80.jpg_.webp",
    badges: ["Mall", "Flagship Store"],
  },
  {
    name: "Regal Inc.",
    logo: "https://static-01.daraz.com.bd/other/shop/ae23358ebc2c847e112cde2526862582.png_80x80q80.jpg_.webp",
    badges: ["Mall", "Certified Store"],
  },
  {
    name: "CTG Sell Bazar.",
    logo: "https://static-01.daraz.com.bd/other/shop/ae23358ebc2c847e112cde2526862582.png_80x80q80.jpg_.webp",
    badges: [],
  },
];

export default function FollowStore() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] md:-mt-10">
      <div className="max-w-[1180px] mx-auto px-3 lg:px-0">
        {/* Header */}
        <div className="bg-white px-4 lg:px-6 pt-5 pb-3 mb-3">
          <h2 className="text-[18px] font-medium text-[#212121] mb-3">
            My Wishlist & Followed Stores
          </h2>

          {/* Tabs */}
          <div className="flex gap-6 lg:gap-8 border-b border-[#e5e5e5] text-[14px] overflow-x-auto">
            <Link to="/dashboard/mywishlist">
             <button className="pb-3 text-[#757575] whitespace-nowrap hover:text-[#f57224]">
              My Wishlist
            </button>
            </Link>
           
            <button className="pb-3 text-[#757575] whitespace-nowrap hover:text-[#f57224]">
              Past Purchases
            </button>
            <button className="pb-3 border-b-2 border-[#f57224] text-[#f57224] font-medium whitespace-nowrap">
              Followed Stores
            </button>
          </div>
        </div>

        {/* Store Cards */}
        <div className="space-y-3">
          {stores.map((store, index) => (
            <div
              key={index}
              className="bg-white shadow-sm px-4 lg:px-6 py-4 lg:py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-3"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <img
                  src={store.logo}
                  alt={store.name}
                  className="w-[52px] h-[52px] border border-[#e5e5e5] bg-white object-cover flex-shrink-0"
                />

                <div>
                  <h3 className="text-[14px] font-medium text-[#212121]">
                    {store.name}
                  </h3>

                  {store.badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {store.badges.map((badge, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2 leading-[16px] rounded-sm bg-[#f3edff] text-[#6b3eff]"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT */}
              <div className="text-[13px] text-[#757575] flex items-center gap-3 lg:gap-0">
                <span className="text-[#212121] font-medium">
                  ✓ FOLLOWING
                </span>
                <span className="hidden lg:inline mx-3 text-[#ddd]">|</span>
                <button className="text-[#1a9cb7] hover:underline">
                  VISIT
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
