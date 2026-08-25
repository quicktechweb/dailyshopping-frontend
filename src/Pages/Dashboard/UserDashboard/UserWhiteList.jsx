import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserWhiteList() {
  const [wishlist, setWishlist] = useState([
    {
      _id: "1",
      productTitle: "Apple iPhone 15 Pro Max",
      productPrice: 189000,
      productImg: "https://m.media-amazon.com/images/I/81SigpJN1KL._AC_SL1500_.jpg",
      addedAt: "2025-01-10T10:30:00Z",
    },
    {
      _id: "2",
      productTitle: "Sony WH-1000XM5 Headphone",
      productPrice: 42000,
      productImg: "https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_SL1500_.jpg",
      addedAt: "2025-01-12T14:15:00Z",
    },
    {
      _id: "3",
      productTitle: "MacBook Air M3",
      productPrice: 165000,
      productImg: "https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SL1500_.jpg",
      addedAt: "2025-01-15T09:45:00Z",
    },
    {
      _id: "4",
      productTitle: "Apple Watch Ultra 2",
      productPrice: 98000,
      productImg: "https://m.media-amazon.com/images/I/81SigpJN1KL._AC_SL1500_.jpg",
      addedAt: "2025-01-18T18:20:00Z",
    },
  ]);

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/&/g, "-and-")
      .replace(/[\s\W-]+/g, "-");

  const handleDelete = (id) => {
    setWishlist(wishlist.filter((item) => item._id !== id));
  };

  if (!wishlist.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-gray-400">
        <Heart className="w-12 h-12 mb-3" />
        <p className="text-lg font-medium">Your wishlist is empty</p>
        <p className="text-sm">Start adding products you love 💖</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
          ❤️ My Wishlist
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {wishlist.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative bg-white/70 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all group overflow-hidden"
            >
              <Link
                to={`/productdetails/${slugify(item.productTitle)}`}
                className="block"
              >
                {/* Image */}
                <div className="relative h-52 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
                  <img
                    src={item.productImg}
                    alt={item.productTitle}
                    className="h-44 object-contain transition-transform duration-300 group-hover:scale-110"
                  />

                  {/* Delete */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(item._id);
                    }}
                    className="absolute top-4 right-4 bg-white/90 text-red-500 p-2 rounded-full shadow hover:bg-red-100 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="px-5 pb-5">
                  <h3 className="text-gray-800 font-semibold text-sm line-clamp-2">
                    {item.productTitle}
                  </h3>

                  <p className="text-green-600 font-bold mt-2 text-lg">
                    ৳ {item.productPrice.toLocaleString()}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    Added on{" "}
                    {new Date(item.addedAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
