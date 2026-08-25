import { Tag, Ticket } from "lucide-react";
import { FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import ScrollToTop from "../HomePage/ScrollToTop/ScrollToTop";

const products = [
  {
    _id: "1",
    title: "Torenda Four Leaf Clover Gold",
    ProductPrice: 880000,
    oldPrice: 950000,
    discount: 78,
    images: ["https://luckyshop.com.bd/demo/1769706236323_20.1.jpg"],
  },
  {
    _id: "2",
    title: "Torenda Bunga (Flower) Kalung",
    ProductPrice: 799000,
    oldPrice: 870000,
    discount: 51,
    images: ["https://luckyshop.com.bd/demo/1768404882037_nbSiTWxow4YuaSgs9Rd8TNWGujzd0cSrm4qAUBNe.jpg"],
  },
  {
    _id: "3",
    title: "144 PCS Torenda Rhodium Payet",
    ProductPrice: 96000,
    oldPrice: 120000,
    discount: 81,
    images: ["https://luckyshop.com.bd/demo/1768404882037_nbSiTWxow4YuaSgs9Rd8TNWGujzd0cSrm4qAUBNe.jpg"],
  },
  {
    _id: "3",
    title: "144 PCS Torenda Rhodium Payet",
    ProductPrice: 96000,
    oldPrice: 120000,
    discount: 81,
    images: ["https://luckyshop.com.bd/demo/1768404882037_nbSiTWxow4YuaSgs9Rd8TNWGujzd0cSrm4qAUBNe.jpg"],
  },
  {
    _id: "4",
    title: "Torenda Crystal Hotfix",
    ProductPrice: 60000,
    oldPrice: 75000,
    discount: 56,
    images: ["https://luckyshop.com.bd/demo/1768404882037_nbSiTWxow4YuaSgs9Rd8TNWGujzd0cSrm4qAUBNe.jpg"],
  },
  {
    _id: "5",
    title: "Torenda Crystal Jahit Payet",
    ProductPrice: 7200,
    oldPrice: 12000,
    discount: 69,
    images: ["https://luckyshop.com.bd/demo/1768404882037_nbSiTWxow4YuaSgs9Rd8TNWGujzd0cSrm4qAUBNe.jpg"],
  },
];

const PromopartSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 -mt-24 md:mt-0">
        <ScrollToTop/>

      {/* ================= PROMO BANNER ================= */}
      <div className="relative h-32 md:h-40 rounded-2xl overflow-hidden mb-6">
        <img
          src="https://i.ibb.co.com/nM52FPs4/Capture666.png"
          className="w-full h-full object-cover"
          alt="Promo"
        />
      </div>

    <div className="flex bg-gray-100 rounded-full p-1 mb-8 max-w-md mx-auto">
  <button className="flex-1 bg-white rounded-full py-2 text-sm font-semibold shadow flex items-center justify-center gap-1">
    <Tag className="w-4 h-4 text-pink-500" /> 
    Promo
  </button>
  <button className="flex-1 py-2 text-sm font-medium text-gray-500 flex items-center justify-center gap-1">
    <FaTicketAlt className="w-4 h-4 text-purple-500" /> 
    Kupon
  </button>
</div>

      {/* ================= SECTION ================= */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
        <h2 className="bg-green-700 text-white px-5 py-2 rounded-full text-sm font-semibold">
  Buy Local, Champion Quality
</h2>

<button className="border border-green-600 text-green-600 px-4 py-1.5 rounded-full text-sm hover:bg-green-50">
  View All
</button>

        </div>

        {/* ================= PRODUCTS GRID ================= */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
          {products.map((product, idx) => (
          <Link
          to={`/productdetails/microsoft-xbox-wireless-controller-electric-volt`}
          key={`${product._id}-${idx}`}
          className="group hover:shadow-lg  transition transform hover:-translate-y-1 flex flex-col bg-white rounded-xl"
        >
          {/* IMAGE */}
        <div className="relative w-full h-44  shadow-sm">
  <div className="w-full h-full overflow-hidden bg-gray-200">
    <img
      src={product.images?.[0]}
      alt={product.title}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  </div>

  <div className="discount-ribbon">
    <span>{product.discount || 78}%</span>
  </div>
</div>


          {/* INFO */}
          <div className="p-2 flex-grow flex flex-col justify-between">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {product.title}
            </p>

            <div className="flex items-center gap-2 my-1">
              <span className="text-red-600 font-bold text-base">
                ৳{product.ProductPrice}
              </span>
              <span className="line-through text-gray-400 text-xs">
                ৳{product.oldPrice}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-500">
              <div className="flex items-center gap-1">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-yellow-400">
                  <path d="M12 2l2.9 6.6L22 9.2l-5 4.9L18.3 22 12 18.3 5.7 22 7 14.1 2 9.2l7.1-.6L12 2z" />
                </svg>
                <span className="text-gray-700 text-sm">4.9</span>
                <span className="text-sm ms-2 font-medium">1k+ sold</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium mt-1 ">
              <img
                className="h-4 w-4 "
                src="https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/img/official_store/badge_os.png~tplv-zr7vqa5nfb-image.image"
                alt="Official Store"
              />
              <span>Apple Official Store</span>
            </div>
          </div>
        </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromopartSection;
