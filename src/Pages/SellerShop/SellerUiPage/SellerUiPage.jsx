import { Star, Share2, MessageCircle, ChevronDown } from "lucide-react";
import ScrollToTop from "../../HomePage/ScrollToTop/ScrollToTop";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    title: "Reolink E321 3MP Indoor CCTV IP Baby Cam",
    price: "BDT545.000",
    img: "https://i.ibb.co/fdvNRmTj/0094034-safemet-dome-camera-2-mp-wp-ah5215vt.jpg",
  },
  {
    id: 2,
    title: "CCTV IP Camera Reolink P324 RLC520A 5MP POE",
    price: "BDT975.000",
    img: "https://i.ibb.co/nsxgDZQQ/bakery.png",
  },
  {
    id: 3,
    title: "TWS iQOO 1E Monster Sound Gaming Earbuds",
    price: "BDT195.000",
    img: "https://luckyshop.com.bd/demo/1768452233220_10.webp",
    // rating: "4.0",
  },
  {
    id: 4,
    title: "CCTV IP Camera Reolink P334 RLC820A 8MP POE",
    price: "BDT1.399.000",
    img: "https://luckyshop.com.bd/demo/1768467799352_40.jpg",
  },
  {
    id: 5,
    title: "Xiaomi Mi TV A Pro 65 2025 QLED",
    price: "BDT.150.000",
    img: "https://i.ibb.co/nsxgDZQQ/bakery.png",
  },
  {
    id: 6,
    title: "CCTV IP Camera Reolink P320 RLC510A 5MP",
    price: "BDT975.000",
    img: "https://i.ibb.co/fdvNRmTj/0094034-safemet-dome-camera-2-mp-wp-ah5215vt.jpg",
  },
  {
    id: 1,
    title: "Reolink E321 3MP Indoor CCTV IP Baby Cam",
    price: "BDT545.000",
    img: "https://i.ibb.co/fdvNRmTj/0094034-safemet-dome-camera-2-mp-wp-ah5215vt.jpg",
  },
  {
    id: 2,
    title: "CCTV IP Camera Reolink P324 RLC520A 5MP POE",
    price: "BDT975.000",
    img: "https://i.ibb.co/nsxgDZQQ/bakery.png",
  },
  {
    id: 3,
    title: "TWS iQOO 1E Monster Sound Gaming Earbuds",
    price: "BDT195.000",
    img: "https://luckyshop.com.bd/demo/1768452233220_10.webp",
    // rating: "4.0",
  },
  {
    id: 4,
    title: "CCTV IP Camera Reolink P334 RLC820A 8MP POE",
    price: "BDT1.399.000",
    img: "https://luckyshop.com.bd/demo/1768467799352_40.jpg",
  },
  {
    id: 5,
    title: "Xiaomi Mi TV A Pro 65 2025 QLED",
    price: "BDT.150.000",
    img: "https://i.ibb.co/nsxgDZQQ/bakery.png",
  },
  {
    id: 6,
    title: "CCTV IP Camera Reolink P320 RLC510A 5MP",
    price: "BDT975.000",
    img: "https://i.ibb.co/fdvNRmTj/0094034-safemet-dome-camera-2-mp-wp-ah5215vt.jpg",
  },
];



export default function SellerUiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6  md:mt-0">
      <ScrollToTop/>
      {/* Store Header */}
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
      {/* Tabs */}
      
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

 <h2 className="mt-6 mb-4 text-lg font-bold">Semua Produk</h2>
       <div className="flex items-center gap-2 bg-white p-2 -mt-4 md:mt-0 -ms-2 md:ms-0">
      {/* Filter */}
      <button className="flex items-center gap-2 px-4 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50">
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white text-xs font-bold">
          8
        </span>
        Filter
      </button>

      {/* Terbaru */}
      <button className="flex items-center gap-1 px-4 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50">
        Price
        <ChevronDown size={16} />
      </button>

      {/* Etalase Toko */}
      <button className="flex items-center gap-1 px-4 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50">
        Name
        <ChevronDown size={16} />
      </button>
    </div>

      {/* Product Section */}
     
      

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md hover:shadow-md transition p-3"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-40 object-contain mb-3"
            />
            <h3 className="text-sm font-medium line-clamp-2 min-h-[40px]">
              {item.title}
            </h3>
            {item.rating && (
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                {item.rating}
              </div>
            )}
            <p className="mt-2 text-black-600 font-bold text-sm">
              {item.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
