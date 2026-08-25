import  { useEffect, useState } from "react";
import { Star, Share2, MessageCircle,  ChevronDown } from "lucide-react";
import axios from "axios";
import ScrollToTop from "../../HomePage/ScrollToTop/ScrollToTop";
import { Link } from "react-router-dom";

export default function SellerShopCategoryProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://serverluckyshop.luckyshop.com.bd/api/products")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.products || [];
        setProducts(data);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <ScrollToTop/>
      {/* ================= STORE HEADER ================= */}
      <div
  className="
    bg-white rounded-xl border
    p-4 sm:p-6
    flex flex-col md:flex-row
    md:items-center md:justify-between
    gap-4 md:gap-6 -mt-24 md:mt-0
  "
>
  {/* Left */}
  <div className="flex items-start sm:items-center gap-3 sm:gap-4">
    {/* Avatar */}
    <div className="
      w-12 h-12 sm:w-16 sm:h-16
      rounded-full bg-red-600
      flex items-center justify-center
      text-white font-bold
      text-lg sm:text-2xl
      shrink-0
    ">
      DK
    </div>

    <div>
      <h1 className="text-base sm:text-xl font-bold text-gray-900">
      Daily Shop
      </h1>

      <p className="text-xs sm:text-sm text-gray-500">
        Central Dhaka Bangladesh
      </p>

      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1 text-xs sm:text-sm text-gray-600">
        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
        <span className="font-semibold text-gray-900">4.9</span>
        <span>(47.6k reviews)</span>
        <span className="text-gray-300 hidden sm:inline">•</span>
        <span className="hidden sm:inline">200k sold</span>
      </div>
    </div>
  </div>

  {/* Right Buttons */}
  <div
    className="
      flex md:flex-row
      gap-2 sm:gap-3
      overflow-x-auto md:overflow-visible
      scrollbar-hide
    "
  >
    <button
      className="
        flex-1 md:flex-none
        px-4 sm:px-6 py-2
        rounded-full
        bg-green-500 text-white
        text-sm sm:text-base
        font-semibold
        hover:bg-green-600
        transition
        shrink-0
      "
    >
      Follow
    </button>

    <button
      className="
        flex-1 md:flex-none
        px-4 sm:px-6 py-2
        rounded-full
        border border-green-500
        text-green-600
        text-sm sm:text-base
        font-semibold
        flex items-center justify-center gap-2
        hover:bg-green-50
        transition
        shrink-0
      "
    >
      <MessageCircle className="w-4 h-4" />
      Chat Seller
    </button>

    <button
      className="
        p-2
        rounded-full
        border
        shrink-0
        hover:bg-gray-100
        transition
      "
    >
      <Share2 className="w-4 h-4" />
    </button>
  </div>
</div>


      {/* ================= TABS ================= */}
       <div className="mt-6 border-b flex gap-8 text-sm font-medium">
            <Link to="/sellershop">
            <button className="pb-3 border-b-2 border-green-500 text-green-600">
              Home
            </button>
          </Link>
            
           <Link to="/sellershop-category">
            <button className="pb-3 text-gray-500 hover:text-green-600">
              Product
            </button>
            </Link>
            <Link to="/seller-review">
            <button className="pb-3 text-gray-500 hover:text-green-600">
              Reviews
            </button>
            </Link>
            
          </div>

      {/* ================= CONTENT ================= */}
      <div className="mt-6 flex gap-6">
        {/* ===== LEFT SIDEBAR ===== */}
        <aside className="w-64 bg-white border rounded-xl md:block hidden p-4 h-fit">
          <h3 className="font-bold mb-3">Shop Showcase (22)</h3>

          <ul className="space-y-2 text-sm">
            <li className="px-3 py-2 rounded bg-gray-100 font-semibold">
              All Product
            </li>
            <li className="px-3 py-2 hover:bg-gray-100 rounded">
              Products Sold
            </li>
            <li className="px-3 py-2 hover:bg-gray-100 rounded">Advan</li>
            <li className="px-3 py-2 hover:bg-gray-100 rounded">HP Infinix</li>
            <li className="px-3 py-2 hover:bg-gray-100 rounded">HP Samsung</li>
            <li className="px-3 py-2 hover:bg-gray-100 rounded">Misc</li>
            <li className="px-3 py-2 hover:bg-gray-100 rounded">Spare Part</li>
            <li className="px-3 py-2 hover:bg-gray-100 rounded">
              Travel Charger
            </li>
            <li className="px-3 py-2 hover:bg-gray-100 rounded">Accessories</li>
            <li className="px-3 py-2 hover:bg-gray-100 rounded">HP iPhone</li>
            <li className="px-3 py-2 hover:bg-gray-100 rounded">HP ZTE</li>
            <li className="px-3 py-2 hover:bg-gray-100 rounded">HP Oppo</li>
          </ul>
        </aside>

        {/* ===== RIGHT CONTENT ===== */}
        <main className="flex-1">
          {/* Sort */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold">All Product</h2>
            <div className="flex items-center gap-2 text-sm">
              <span>Sort by</span>
              <button className="border px-4 py-2 rounded-lg flex items-center gap-2">
                Latest
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
            {products.map((item) => (
              <div key={item._id} className="group">
                <div className="bg-white shadow-sm rounded-lg p-2 group-hover:shadow-md transition">
                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="w-full h-40 object-contain mb-2"
                  />
                  <h3 className="text-sm font-semibold leading-snug line-clamp-2 min-h-[38px]">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-bold text-sm">
                    BDT{item.ProductPrice}
                  </p>

                  {/* {item.oldPrice && (
                    <div className="flex items-center gap-2 text-xs mt-1">
                      <span className="line-through text-gray-400">
                        Rp{item.oldPrice.toLocaleString("id-ID")}
                      </span>
                      <span className="text-red-500 font-semibold">
                        -{item.discount}%
                      </span>
                    </div>
                  )} */}
                </div>

              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
